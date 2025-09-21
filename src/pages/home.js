import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { SimplexNoise } from "three/addons/math/SimplexNoise.js";
function GetStarted() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- Three.js setup ---
    let scene, camera, renderer, particles, controls;
    let originalPositions, randomVectors;
    const noise = new SimplexNoise();
    const stretchFactor = { value: 0 };
    let isMouseDown = false;

    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 4;

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Particles
      const particleCount = 15000;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      originalPositions = new Float32Array(particleCount * 3);
      randomVectors = new Float32Array(particleCount * 3);

      const baseGeometry = new THREE.SphereGeometry(1.5, 128, 128);
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const vertexIndex = Math.floor(Math.random() * baseGeometry.attributes.position.count);
        const p = new THREE.Vector3().fromBufferAttribute(
          baseGeometry.attributes.position,
          vertexIndex
        );
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
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const material = new THREE.PointsMaterial({
        size: 0.015,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
      });
      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;

      window.addEventListener("resize", onWindowResize);
      renderer.domElement.addEventListener("mousedown", () => (isMouseDown = true));
      window.addEventListener("mouseup", () => (isMouseDown = false));
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      requestAnimationFrame(animate);
      const time = performance.now() * 0.0005;
      stretchFactor.value += (isMouseDown ? 1.0 : 0.0 - stretchFactor.value) * 0.1;
      controls.autoRotateSpeed = 0.3 + stretchFactor.value * 2;
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const ox = originalPositions[i],
          oy = originalPositions[i + 1],
          oz = originalPositions[i + 2];
        const breath = Math.sin(time * 2 + oy) * 0.02;
        const stretch = stretchFactor.value * 0.5;
        const sx = randomVectors[i] * stretch,
          sy = randomVectors[i + 1] * stretch,
          sz = randomVectors[i + 2] * stretch;
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
  }, []);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <canvas
        ref={canvasRef}
        id="bg-canvas"
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}
      />
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          padding: "1.5rem 2rem",
          zIndex: 100,
          background: "rgba(13,13,13,0.6)",
          backdropFilter: "blur(12px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: "1.5rem" }}>Physics Forge</div>
        <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <a href="#features" style={{ color: "#A0A0A0", textDecoration: "none" }}>
            Simulations
          </a>
          <a href="#features" style={{ color: "#A0A0A0", textDecoration: "none" }}>
            Docs
          </a>
          <a href="#" style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "999px",
              fontWeight: 600,
              background: "linear-gradient(90deg,#A020F0,#D946EF)",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Get Started
          </a>
        </nav>
      </header>

      <main>
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            paddingTop: "80px",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-2px",
              marginBottom: "1.5rem",
              background: "linear-gradient(90deg,#EAD637,#C651CD)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Master Physics Like Never Before
          </h1>
          <p style={{ maxWidth: "700px", margin: "0 auto 2.5rem auto", color: "#A0A0A0", fontSize: "1.25rem" }}>
            Visualize formulas, track subjects, manage exams and notes — all in one smart platform designed for students who want to learn faster and smarter.
          </p>
          <a
            href="#"
            style={{
              padding: "1rem 2.5rem",
              fontSize: "1.1rem",
              borderRadius: "999px",
              fontWeight: 600,
              background: "linear-gradient(90deg,#A020F0,#D946EF)",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Start Your Journey
          </a>
        </section>
      </main>
    </div>
  );
}


export default GetStarted;

//