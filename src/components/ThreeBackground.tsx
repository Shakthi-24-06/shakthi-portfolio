import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.0015);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 70;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0x1e1b4b, 1.2);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 2.5, 120);
    cyanLight.position.set(40, 25, 30);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 2.5, 120);
    purpleLight.position.set(-40, -20, 20);
    scene.add(purpleLight);

    // 1. Starfield Particles (Dual layer for depth)
    const starCount = 900;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color(0x00f0ff), // Cyan
      new THREE.Color(0x38bdf8), // Sky blue
      new THREE.Color(0x818cf8), // Indigo
      new THREE.Color(0xc084fc), // Soft lavender
      new THREE.Color(0xffffff), // Bright white
    ];

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 240;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 160;

      const color = palette[Math.floor(Math.random() * palette.length)];
      starColors[i * 3] = color.r;
      starColors[i * 3 + 1] = color.g;
      starColors[i * 3 + 2] = color.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    // Canvas particle texture for smooth round glowing stars
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const ctx = particleCanvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(100, 220, 255, 0.8)');
      gradient.addColorStop(0.7, 'rgba(139, 92, 246, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const starTexture = new THREE.CanvasTexture(particleCanvas);

    const starMaterial = new THREE.PointsMaterial({
      size: 1.6,
      map: starTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 2. Floating 3D Geometric Crystal Polyhedra
    const crystals: THREE.Group[] = [];
    const crystalGeos = [
      new THREE.IcosahedronGeometry(2.4, 0),
      new THREE.OctahedronGeometry(2.0, 0),
      new THREE.DodecahedronGeometry(1.8, 0),
    ];

    const crystalConfigs = [
      { x: -35, y: 15, z: -10, color: 0x00f0ff, rotSpeed: 0.004 },
      { x: 38, y: -18, z: -15, color: 0xa855f7, rotSpeed: 0.005 },
      { x: -28, y: -25, z: 5, color: 0x38bdf8, rotSpeed: -0.003 },
      { x: 32, y: 22, z: -5, color: 0x818cf8, rotSpeed: -0.004 },
    ];

    crystalConfigs.forEach((cfg, idx) => {
      const group = new THREE.Group();
      const geo = crystalGeos[idx % crystalGeos.length];

      // Inner glowing core
      const coreMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0.35,
        roughness: 0.2,
        metalness: 0.8,
        transparent: true,
        opacity: 0.7,
      });
      const coreMesh = new THREE.Mesh(geo, coreMat);
      group.add(coreMesh);

      // Wireframe overlay
      const wireMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      });
      const wireMesh = new THREE.Mesh(geo, wireMat);
      wireMesh.scale.setScalar(1.05);
      group.add(wireMesh);

      group.position.set(cfg.x, cfg.y, cfg.z);
      group.userData = {
        origY: cfg.y,
        speed: cfg.rotSpeed,
        floatPhase: Math.random() * Math.PI * 2,
      };
      scene.add(group);
      crystals.push(group);
    });

    // 3. Glowing Celestial Ringed Planet (Distant)
    const planetGroup = new THREE.Group();
    const planetGeo = new THREE.SphereGeometry(7, 32, 32);
    const planetMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      roughness: 0.6,
      metalness: 0.3,
      emissive: 0x2e1065,
      emissiveIntensity: 0.4,
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    planetGroup.add(planetMesh);

    // Planetary Ring
    const ringGeo = new THREE.RingGeometry(9.5, 14, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    ringMesh.rotation.y = Math.PI / 7;
    planetGroup.add(ringMesh);

    planetGroup.position.set(55, 30, -50);
    scene.add(planetGroup);

    // Mouse movement parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.0006;
      mouseY = (e.clientY - windowHalfY) * 0.0006;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Scroll parallax
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY * 0.012;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (prefersReducedMotion) {
        renderer.render(scene, camera);
        return;
      }

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse camera interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX * 35;
      camera.position.y = -targetY * 30 - scrollY;
      camera.lookAt(0, -scrollY * 0.5, 0);

      // Starfield gentle rotation
      starField.rotation.y = elapsedTime * 0.02;
      starField.rotation.x = elapsedTime * 0.01;

      // Crystals floating and rotating
      crystals.forEach((crystal) => {
        crystal.rotation.x += crystal.userData.speed;
        crystal.rotation.y += crystal.userData.speed * 1.5;
        crystal.position.y =
          crystal.userData.origY + Math.sin(elapsedTime * 1.2 + crystal.userData.floatPhase) * 1.8;
      });

      // Planet rotation
      planetGroup.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      starTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
