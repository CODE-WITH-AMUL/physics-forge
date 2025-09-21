import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState('formulas');
  const [formulaInput, setFormulaInput] = useState('');
  const [simulationData, setSimulationData] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [animationProgress, setAnimationProgress] = useState(0);
  const animationRef = useRef(null);
  const navigate = useNavigate();

  const refreshToken = useCallback(async () => {
    try {
      const refresh = localStorage.getItem('refresh_token');
      const response = await fetch('http://localhost:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        return true;
      } else {
        handleLogout();
        return false;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      handleLogout();
      return false;
    }
  }, [navigate]);

  const fetchUserData = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:8000/api/home/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else if (response.status === 401) {
        const refreshed = await refreshToken();
        if (refreshed) {
          await fetchUserData();
        }
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  }, [refreshToken]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Animation loop for simulations
  useEffect(() => {
    if (isSimulating && simulationData?.result !== null) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      const animate = () => {
        setAnimationProgress(prev => {
          const newProgress = prev + 0.01 * simulationSpeed;
          return newProgress >= 1 ? 0 : newProgress;
        });
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSimulating, simulationData, simulationSpeed]);

  const handleLogout = async () => {
    try {
      const refreshTokenValue = localStorage.getItem('refresh_token');
      await fetch('http://localhost:8000/api/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshTokenValue }),
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/login');
    }
  };

  const handleFormulaSubmit = (e) => {
    e.preventDefault();
    
    // Check if formula is F=ma (Newton's Second Law)
    if (formulaInput.trim().toLowerCase() === 'f=ma' || 
        formulaInput.trim().toLowerCase() === 'f = ma' ||
        formulaInput.trim().toLowerCase() === 'force = mass × acceleration') {
      setIsSimulating(true);
      setSimulationData({
        formula: 'F = m × a',
        name: "Newton's Second Law of Motion",
        description: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass",
        inputs: [
          { id: 'mass', label: 'Mass (kg)', value: '', min: 0.1, max: 100, step: 0.1 },
          { id: 'acceleration', label: 'Acceleration (m/s²)', value: '', min: 0.1, max: 100, step: 0.1 }
        ],
        result: null
      });
    } else {
      alert('This formula is not available yet. We are working on adding more formulas!');
    }
  };

  const handleInputChange = (inputId, value) => {
    setSimulationData(prev => ({
      ...prev,
      inputs: prev.inputs.map(input => 
        input.id === inputId ? { ...input, value } : input
      )
    }));
  };

  const runSimulation = () => {
    if (!simulationData.inputs.every(input => input.value !== '')) {
      alert('Please provide all required values');
      return;
    }

    const mass = parseFloat(simulationData.inputs.find(i => i.id === 'mass').value);
    const acceleration = parseFloat(simulationData.inputs.find(i => i.id === 'acceleration').value);
    const force = mass * acceleration;

    setSimulationData(prev => ({
      ...prev,
      result: force
    }));
    setAnimationProgress(0);
  };

  const resetSimulation = () => {
    setSimulationData(null);
    setFormulaInput('');
    setIsSimulating(false);
    setAnimationProgress(0);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading Physics Forge...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-content">
          <h1 className="logo">Physics Forge</h1>
          <div className="nav-menu">
            <button 
              className={activeNav === 'formulas' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveNav('formulas')}
            >
              <span className="nav-icon">∫</span> Formulas
            </button>
            <button 
              className={activeNav === 'simulations' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveNav('simulations')}
            >
              <span className="nav-icon">⎌</span> Simulations
            </button>
            <button 
              className={activeNav === 'documentation' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveNav('documentation')}
            >
              <span className="nav-icon">📚</span> Documentation
            </button>
            <button 
              className={activeNav === 'notes' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveNav('notes')}
            >
              <span className="nav-icon">📝</span> Notes
            </button>
            <button 
              className={activeNav === 'profile' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveNav('profile')}
            >
              <span className="nav-icon">👤</span> Profile
            </button>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <span className="btn-icon">↩</span> Logout
          </button>
        </div>
      </nav>

      <div className="home-content">
        {activeNav === 'formulas' && (
          <div className="formula-section">
            <div className="section-header">
              <h2>Physics Formula Simulator</h2>
              <p>Enter a formula to visualize and simulate physics concepts in 3D</p>
            </div>
            
            <form onSubmit={handleFormulaSubmit} className="formula-input-form">
              <div className="input-group">
                <label htmlFor="formula">
                  <span className="input-icon">ƒ</span> Enter Physics Formula
                </label>
                <input
                  type="text"
                  id="formula"
                  value={formulaInput}
                  onChange={(e) => setFormulaInput(e.target.value)}
                  placeholder="e.g., F=ma, E=mc², V=IR"
                  required
                />
                <div className="input-hint">Try: F=ma or Force = mass × acceleration</div>
              </div>
              <button type="submit" className="simulate-btn">
                <span className="btn-icon">⚡</span> Simulate Formula
              </button>
            </form>

            {isSimulating && simulationData && (
              <div className="simulation-panel">
                <div className="panel-header">
                  <h3>{simulationData.name}</h3>
                  <p>{simulationData.description}</p>
                  <div className="formula-display">{simulationData.formula}</div>
                </div>

                <div className="simulation-container">
                  <div className="control-panel">
                    <div className="input-section">
                      <h4>Input Parameters</h4>
                      <div className="input-fields">
                        {simulationData.inputs.map(input => (
                          <div key={input.id} className="input-group">
                            <label htmlFor={input.id}>
                              <span className="param-icon">📊</span> {input.label}
                            </label>
                            <input
                              type="number"
                              id={input.id}
                              value={input.value}
                              onChange={(e) => handleInputChange(input.id, e.target.value)}
                              min={input.min}
                              max={input.max}
                              step={input.step}
                              placeholder={`Enter ${input.label}`}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="control-buttons">
                        <button onClick={runSimulation} className="run-btn">
                          <span className="btn-icon">▶</span> Run Simulation
                        </button>
                        <button onClick={resetSimulation} className="reset-btn">
                          <span className="btn-icon">↻</span> Reset
                        </button>
                      </div>

                      <div className="speed-control">
                        <label htmlFor="speed">
                          <span className="speed-icon">⏱</span> Simulation Speed: {simulationSpeed}x
                        </label>
                        <input
                          type="range"
                          id="speed"
                          min="0.1"
                          max="5"
                          step="0.1"
                          value={simulationSpeed}
                          onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
                        />
                      </div>
                    </div>

                    {simulationData.result !== null && (
                      <div className="result-section">
                        <h4>Simulation Result</h4>
                        <div className="result-value">
                          <span className="result-icon">📈</span>
                          Force = {simulationData.result.toFixed(2)} N
                        </div>
                        <div className="result-explanation">
                          <p>The force required is <strong>{simulationData.result.toFixed(2)} Newtons</strong></p>
                          <p>This means you would need to apply {simulationData.result.toFixed(2)}N of force to accelerate the object at the given rate.</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="visualization-panel">
                    <h4>3D Visualization</h4>
                    <div className="visualization-container">
                      <div className="physics-scene">
                        <div className="environment">
                          <div className="floor"></div>
                          <div className="grid-lines"></div>
                          
                          <div className="physics-objects">
                            <div className="person-character">
                              <div className="head"></div>
                              <div className="body"></div>
                              <div className="arm-left"></div>
                              <div className="arm-right"></div>
                              <div className="leg-left"></div>
                              <div className="leg-right"></div>
                            </div>
                            
                            <div 
                              className="ball-object" 
                              style={{ 
                                transform: `translateX(${simulationData.result ? Math.min(simulationData.result * 5 * animationProgress, 300) : 0}px)`,
                                opacity: simulationData.result ? 1 : 0.5
                              }}
                            >
                              <div className="inner-glow"></div>
                            </div>
                            
                            <div 
                              className="force-vector"
                              style={{ 
                                height: `${simulationData.result ? Math.min(simulationData.result * 0.5, 80) : 30}px`,
                                opacity: 0.7 + (0.3 * animationProgress)
                              }}
                            ></div>
                            
                            <div className="motion-path">
                              <div 
                                className="path-progress" 
                                style={{ width: `${animationProgress * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="physics-labels">
                            <div className="force-label">
                              F = {simulationData.result ? simulationData.result.toFixed(2) : '0.00'} N
                            </div>
                            <div className="mass-label">
                              m = {simulationData.inputs.find(i => i.id === 'mass')?.value || '0'} kg
                            </div>
                            <div className="acceleration-label">
                              a = {simulationData.inputs.find(i => i.id === 'acceleration')?.value || '0'} m/s²
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Other navigation sections would go here */}
        {activeNav !== 'formulas' && (
          <div className="section-content">
            <h2>{activeNav.charAt(0).toUpperCase() + activeNav.slice(1)}</h2>
            <p>This section is under development. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;