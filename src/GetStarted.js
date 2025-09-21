import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise.js';

// --- CSS STYLES ---
// All styles are encapsulated in this template literal.
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

  :root {
      --color-background: #0D0D0D;
      --color-surface: rgba(255, 255, 255, 0.05);
      --color-border: rgba(255, 255, 255, 0.1);
      --color-text-primary: #F0F0F0;
      --color-text-secondary: #A0A0A0;
      
      --gradient-text: linear-gradient(90deg, #EAD637, #C651CD);
      --gradient-interactive: linear-gradient(90deg, #A020F0, #D946EF);
      --gradient-interactive-hover: linear-gradient(90deg, #B349F7, #E062F5);

      --font-family: 'Inter', sans-serif;
      --container-width: 1200px;
      --border-radius: 16px;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html {
      scroll-behavior: smooth;
  }

  body {
      font-family: var(--font-family);
      background: var(--color-background);
      color: var(--color-text-primary);
      overflow-x: hidden;
  }

  #bg-canvas {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      z-index: -1;
  }

  .container {
      max-width: var(--container-width);
      margin: 0 auto;
      padding: 0 2rem;
  }

  /* Header */
  .header {
      position: fixed;
      top: 0; left: 0; right: 0;
      padding: 1.5rem 0;
      z-index: 100;
      background: rgba(13, 13, 13, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--color-border);
  }
  
  .header .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }

  .header-logo {
      font-weight: 700;
      font-size: 1.5rem;
  }

  .header-nav {
      display: flex;
      gap: 2rem;
      align-items: center;
  }

  .header-nav a {
      color: var(--color-text-secondary);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
  }
  .header-nav a:hover { color: var(--color-text-primary); }

  .btn {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      border-radius: 999px;
      font-weight: 600;
      text-decoration: none;
      transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
      border: none;
  }

  .btn-primary {
      background: var(--gradient-interactive);
      color: white;
  }
  .btn-primary:hover {
      transform: scale(1.05);
      box-shadow: 0 0 20px rgba(160, 32, 240, 0.6);
      background: var(--gradient-interactive-hover);
  }

  /* Hero */
  .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      text-align: center;
      padding-top: 80px; /* Offset for fixed header */
  }

  .hero-content {
      animation: fadeIn 1s ease-out forwards;
  }

  .hero h1 {
      font-size: clamp(3rem, 7vw, 5.5rem);
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -2px;
      margin-bottom: 1.5rem;
      background: var(--gradient-text);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: fadeInUp 1s ease-out 0.2s forwards;
      opacity: 0;
  }

  .hero p {
      max-width: 700px;
      margin: 0 auto 2.5rem auto;
      font-size: 1.25rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
      animation: fadeInUp 1s ease-out 0.4s forwards;
      opacity: 0;
  }
  
  .hero .btn-primary {
      padding: 1rem 2.5rem;
      font-size: 1.1rem;
      animation: fadeInUp 1s ease-out 0.6s forwards;
      opacity: 0;
  }

  /* Features Section */
  .features {
      padding: 6rem 0;
  }

  .section-header {
      text-align: center;
      margin-bottom: 4rem;
      animation: fadeIn 1s ease-out;
  }

  .section-header h2 {
      font-size: 2.8rem;
      margin-bottom: 1rem;
      background: var(--gradient-text);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
  }

  .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
  }
  
  .feature-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      padding: 2.5rem;
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
      overflow: hidden;
      animation: fadeIn 1s ease-out;
  }
  
  .feature-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      border-radius: var(--border-radius);
      border: 2px solid transparent;
      background: var(--gradient-interactive) border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
      opacity: 0;
      transition: opacity 0.3s ease;
  }

  .feature-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .feature-card:hover::before {
      opacity: 1;
  }

  .feature-card .icon {
      height: 48px;
      width: 48px;
      margin: 0 auto 1.5rem auto;
      color: #D946EF;
  }
  .feature-card h3 {
      font-size: 1.4rem;
      margin-bottom: 0.75rem;
  }
  .feature-card p {
      color: var(--color-text-secondary);
      line-height: 1.6;
  }

  /* CTA Section */
  .cta {
      padding: 5rem 0;
  }
  .cta-card {
      text-align: center;
      padding: 4rem;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
  }
  .cta h2 {
      font-size: 2.2rem;
      margin-bottom: 2rem;
  }
  .cta-buttons {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      flex-wrap: wrap;
  }
  .btn-outline {
      border: 2px solid var(--color-border);
      background: transparent;
      color: var(--color-text-primary);
  }
  .btn-outline:hover {
      background: var(--color-text-primary);
      color: var(--color-background);
      border-color: var(--color-text-primary);
  }

  /* Footer */
  .footer {
      padding: 3rem 0;
      text-align: center;
      color: var(--color-text-secondary);
      border-top: 1px solid var(--color-border);
      margin-top: 4rem;
  }
  .footer .socials {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      gap: 1.5rem;
  }
  .footer .socials a {
      color: var(--color-text-secondary);
      text-decoration: none;
      transition: color 0.3s ease;
  }
  .footer .socials a:hover { color: var(--color-text-primary); }

  /* Animations */
  @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
  }
  @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .header-nav { display: none; } /* Simple hiding for demo, can be replaced with a hamburger menu */
    .hero h1 { font-size: 2.5rem; }
    .section-header h2 { font-size: 2.2rem; }
    .container { padding: 0 1rem; }
  }
`;

// --- HTML STRUCTURE ---
// The entire body content is now a string.
const htmlContent = `
    <header class="header">
        <div class="container">
            <div class="header-logo">Physics Forge</div>
            <nav class="header-nav">
                <a href="#">Simulations</a>
                <a href="#">Docs</a>
                <a href="/login" class="btn btn-primary">Get Started</a>
            </nav>
        </div>
    </header>

    <main>
        <section class="hero">
            <div class="container">
                <div class="hero-content">
                    <h1>Master Physics Like Never Before</h1>
                    <p>Visualize formulas, track subjects, manage exams and notes — all in one smart platform designed for students who want to learn faster and smarter.</p>
                    <a href="/login" class="btn btn-primary">Start Your Journey</a>
                </div>
            </div>
        </section>

        <section class="features" id="features">
            <div class="container">
                <div class="section-header">
                    <h2>Why Choose Physics Forge?</h2>
                </div>
                <div class="features-grid">
                    <div class="feature-card" style="animation-delay: 0.2s;">
                        <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0-2.25l2.25 1.313M4.5 15.75l2.25-1.313M4.5 15.75l2.25 1.313M4.5 15.75V18m15-2.25l-2.25-1.313M19.5 15.75l-2.25 1.313M19.5 15.75V18M9 21V9M15 21V9m-9 6h12" /></svg>
                        <h3>Interactive Visuals</h3>
                        <p>See physics concepts come alive with stunning 3D animations.</p>
                    </div>
                    <div class="feature-card" style="animation-delay: 0.4s;">
                        <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.75h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <h3>Organized Learning</h3>
                        <p>Track subjects, notes & references — all in one place.</p>
                    </div>
                    <div class="feature-card" style="animation-delay: 0.6s;">
                        <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <h3>Smart Reminders</h3>
                        <p>Get notified before exams & deadlines with AI reminders.</p>
                    </div>
                    <div class="feature-card" style="animation-delay: 0.8s;">
                        <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v18M20.25 3v18M8.25 3v18M15.75 3v18M3 8.25h17.25M3 15.75h17.25" /></svg>
                        <h3>Progress Tracking</h3>
                        <p>Measure your growth with charts and performance insights.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="cta">
            <div class="container">
                <div class="cta-card">
                    <h2>Ready to Forge Your Physics Journey?</h2>
                    <div class="cta-buttons">
                        <a href="#" class="btn btn-primary">Get Started for Free</a>
                        <a href="#features" class="btn btn-outline">See Features →</a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>© 2025 Physics Forge. All rights reserved.</p>
            <div class="socials">
                <a href="#">Twitter</a>
                <a href="#">LinkedIn</a>
                <a href="#">GitHub</a>
            </div>
        </div>
    </footer>

    <canvas id="bg-canvas"></canvas>
`;

// --- JAVASCRIPT LOGIC ---
// The three.js animation script, wrapped in a function.
const initThreeJS = (canvas) => {
    let scene, camera, renderer, particles, controls;
    let originalPositions, randomVectors;
    let isMouseDown = false;
    const noise = new SimplexNoise();
    const stretchFactor = { value: 0.0 };

    function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 4;

        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const particleCount = 15000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        originalPositions = new Float32Array(particleCount * 3);
        randomVectors = new Float32Array(particleCount * 3);

        const baseGeometry = new THREE.SphereGeometry(1.5, 128, 128);
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const vertexIndex = Math.floor(Math.random() * baseGeometry.attributes.position.count);
            const p = new THREE.Vector3().fromBufferAttribute(baseGeometry.attributes.position, vertexIndex);
            const displacement = noise.noise3d(p.x * 0.5, p.y * 0.5, p.z * 0.5) * 0.5;
            p.multiplyScalar(1 + displacement);
            positions[i3] = p.x;
            positions[i3 + 1] = p.y;
            positions[i3 + 2] = p.z;
            originalPositions[i3] = p.x;
            originalPositions[i3 + 1] = p.y;
            originalPositions[i3 + 2] = p.z;
            randomVectors[i3] = (Math.random() - 0.5) * 2;
            randomVectors[i3 + 1] = (Math.random() - 0.5) * 2;
            randomVectors[i3 + 2] = (Math.random() - 0.5) * 2;
            const color = new THREE.Color();
            const t = (p.y + 1.5) / 3.0;
            color.setHSL(0.8 - t * 0.2, 1.0, 0.5);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        const material = new THREE.PointsMaterial({
            size: 0.015,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });
        particles = new THREE.Points(geometry, material);
        scene.add(particles);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.3;

        window.addEventListener('resize', onWindowResize, false);
        renderer.domElement.addEventListener('mousedown', () => isMouseDown = true, false);
        window.addEventListener('mouseup', () => isMouseDown = false, false);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);
        const time = performance.now() * 0.0005;
        stretchFactor.value += ((isMouseDown ? 1.0 : 0.0) - stretchFactor.value) * 0.1;
        controls.autoRotateSpeed = 0.3 + stretchFactor.value * 2;
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            const ox = originalPositions[i], oy = originalPositions[i + 1], oz = originalPositions[i + 2];
            const breath = Math.sin(time * 2 + oy) * 0.02;
            const stretch = stretchFactor.value * 0.5;
            const sx = randomVectors[i] * stretch, sy = randomVectors[i + 1] * stretch, sz = randomVectors[i + 2] * stretch;
            positions[i] = ox * (1 + breath) + sx;
            positions[i + 1] = oy * (1 + breath) + sy;
            positions[i + 2] = oz * (1 + breath) + sz;
        }
        particles.geometry.attributes.position.needsUpdate = true;
        controls.update();
        renderer.render(scene, camera);
    }

    init();
    animate();
};


/**
 * Renders the entire home page into a target container element.
 * @param {HTMLElement} container - The DOM element to render the page into.
 */
export function GetStarted(container) {
  // Clear any existing content in the container
  container.innerHTML = '';

  // Apply base styles and HTML structure
  document.head.innerHTML += `<style>${styles}</style>`;
  container.innerHTML = htmlContent;

  // Find the canvas element within the newly added HTML
  const canvas = container.querySelector('#bg-canvas');
  
  if (canvas) {
    // Initialize the three.js animation on that specific canvas
    initThreeJS(canvas);
  } else {
    console.error('Canvas element #bg-canvas not found.');
  }
}