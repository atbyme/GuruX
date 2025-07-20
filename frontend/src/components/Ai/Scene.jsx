import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function Scene({ thinking }) {
  const containerRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current?.appendChild(renderer.domElement);

    const headGroup = new THREE.Group();
    headGroup.scale.set(0.85, 0.85, 0.85);
    headGroup.position.y = -5;
    scene.add(headGroup);

    const bgPositions = [];
    for (let i = 0; i < 3500; i++) {
      bgPositions.push(
        (Math.random() - 0.5) * 800,
        (Math.random() - 0.5) * 800,
        (Math.random() - 0.5) * 800
      );
    }

    const bgGeometry = new THREE.BufferGeometry();
    bgGeometry.setAttribute('position', new THREE.Float32BufferAttribute(bgPositions, 3));
    const bgMaterial = new THREE.PointsMaterial({
      color: 0x3cfaff,
      size: 1.2,
      transparent: true,
      opacity: 0.15
    });
    const bgCloud = new THREE.Points(bgGeometry, bgMaterial);
    scene.add(bgCloud);

    const grid = new THREE.GridHelper(200, 50, 0x00ffff, 0x222244);
    grid.material.opacity = 0.05;
    grid.material.transparent = true;
    scene.add(grid);

    const particleCount = 10000;
    const headWidth = 40, headHeight = 55, headDepth = 35;
    const positions = [], velocities = [], targetPositions = [];

    function getPoint() {
      let x, y, z, nx, ny, nz;
      do {
        x = (Math.random() - 0.5) * headWidth * 2;
        y = (Math.random() - 0.5) * headHeight * 2;
        z = (Math.random() - 0.5) * headDepth * 2;
        nx = x / headWidth;
        ny = y / headHeight;
        nz = z / headDepth;
      } while (nx * nx + ny * ny + nz * nz >= 1);
      return new THREE.Vector3(x, y + 5, z);
    }

    for (let i = 0; i < particleCount; i++) {
      const p = getPoint();
      positions.push(p.x, p.y, p.z);
      velocities.push(0.05 + Math.random() * 0.15);
      const t = getPoint();
      targetPositions.push(t.x, t.y, t.z);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.55,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });

    const cloud = new THREE.Points(geometry, material);
    headGroup.add(cloud);

    // Glowing "X" forehead symbol
    const xGeom = new THREE.BufferGeometry();
    const pts = [];
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      pts.push(-5 + 10 * t, 5 - 10 * t, 0);
      pts.push(5 - 10 * t, 5 - 10 * t, 0);
    }
    xGeom.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));

    const xMat = new THREE.PointsMaterial({
      color: 0xff33ff,
      size: 1.2,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });

    const xCloud = new THREE.Points(xGeom, xMat);
    xCloud.position.set(0, 5, headDepth * 0.6);
    headGroup.add(xCloud);

    // Rotating energy ring
    const ringGeometry = new THREE.RingGeometry(20, 21, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -10;
    headGroup.add(ring);

    const posAttr = geometry.attributes.position;
    const tempVec = new THREE.Vector3();
    let animationId;

    function animate() {
      animationId = requestAnimationFrame(animate);
      headGroup.rotation.y += 0.003;
      ring.rotation.z += 0.002;

      if (thinking) {
        headGroup.rotation.x += 0.002;
        headGroup.rotation.z += 0.0015;
        xMat.size = 1.5 + Math.sin(Date.now() * 0.005) * 0.2;
      }

      const arr = posAttr.array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        tempVec.set(arr[idx], arr[idx + 1], arr[idx + 2]);
        const tx = targetPositions[idx];
        const ty = targetPositions[idx + 1];
        const tz = targetPositions[idx + 2];
        const dist = tempVec.distanceTo(new THREE.Vector3(tx, ty, tz));

        if (dist < 1) {
          const nt = getPoint();
          targetPositions[idx] = nt.x;
          targetPositions[idx + 1] = nt.y;
          targetPositions[idx + 2] = nt.z;
        } else {
          const vel = velocities[i];
          tempVec.lerp(new THREE.Vector3(tx, ty, tz), vel / dist);
          arr[idx] = tempVec.x;
          arr[idx + 1] = tempVec.y;
          arr[idx + 2] = tempVec.z;
        }
      }

      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      xGeom.dispose();
      xMat.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
    };
  }, [thinking]);

  return (
    <div
      ref={containerRef}
      className="hologram-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        userSelect: 'none'
      }}
    />
  );
}
