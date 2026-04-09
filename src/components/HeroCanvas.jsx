import { useEffect, useRef } from "react";
import * as THREE from "three";

const DEV_COLOR  = new THREE.Color(0x0066ff);
const SEC_COLOR  = new THREE.Color(0xe53e3e);
const OPS_COLOR  = new THREE.Color(0x00e5c4);
const LINE_COLOR = new THREE.Color(0x00e5c4);

export default function HeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(0, 0, 2.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // ── Fibonacci sphere ─────────────────────────────────────────
    const N       = 260;
    const RADIUS  = 1.0;
    const golden  = Math.PI * (3 - Math.sqrt(5));
    const positions = [];
    const colors    = [];

    for (let i = 0; i < N; i++) {
      const y     = 1 - (i / (N - 1)) * 2;
      const r     = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      positions.push(new THREE.Vector3(
        Math.cos(theta) * r * RADIUS,
        y * RADIUS,
        Math.sin(theta) * r * RADIUS,
      ));
      const norm = i / N;
      const col  = norm < 0.33 ? DEV_COLOR : norm < 0.66 ? OPS_COLOR : SEC_COLOR;
      if (Math.random() < 0.06) colors.push(1, 1, 1);
      else colors.push(col.r, col.g, col.b);
    }

    // Points
    const ptGeo = new THREE.BufferGeometry().setFromPoints(positions);
    ptGeo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    const ptMat = new THREE.PointsMaterial({
      size: 0.018, vertexColors: true,
      transparent: true, opacity: 0.85, sizeAttenuation: true,
    });
    const pointsMesh = new THREE.Points(ptGeo, ptMat);

    // Lines
    const lineVerts = [];
    const THRESH = 0.38;
    for (let i = 0; i < N; i++)
      for (let j = i + 1; j < N; j++)
        if (positions[i].distanceTo(positions[j]) < THRESH)
          lineVerts.push(
            positions[i].x, positions[i].y, positions[i].z,
            positions[j].x, positions[j].y, positions[j].z,
          );
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(lineVerts, 3));
    const linesMesh = new THREE.LineSegments(lineGeo,
      new THREE.LineBasicMaterial({ color: LINE_COLOR, transparent: true, opacity: 0.10 }));

    // Rings
    const ringGeo = new THREE.TorusGeometry(1.0, 0.003, 4, 120);
    const mkRing  = (color, opacity, rx, ry, rz) => {
      const m = new THREE.Mesh(ringGeo.clone(),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity }));
      m.rotation.set(rx, ry, rz);
      return m;
    };
    const ring1 = mkRing(0x00e5c4, 0.50, Math.PI / 2, 0, 0);
    const ring2 = mkRing(0x0066ff, 0.35, Math.PI / 4, 0, Math.PI / 6);
    const ring3 = mkRing(0xe53e3e, 0.25, 0, Math.PI / 3, Math.PI / 2.5);

    // Globe group
    const globe = new THREE.Group();
    globe.add(pointsMesh, linesMesh, ring1, ring2, ring3);

    // Glow inner sphere
    globe.add(new THREE.Mesh(
      new THREE.SphereGeometry(0.96, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x00e5c4, transparent: true, opacity: 0.025, side: THREE.BackSide }),
    ));

    // ── Responsive position ──────────────────────────────────────
    // On wide screens shift right so globe sits beside text.
    // On tablet (< 1024px) center it and make it smaller.
    const isTablet = W < 1024;
    globe.position.x = isTablet ? 0 : 0.55;
    globe.scale.setScalar(isTablet ? 0.78 : 1.0);

    scene.add(globe);

    // Mouse parallax
    let tX = 0, tY = 0, cX = 0, cY = 0, autoRot = 0;
    const onMouse = (e) => {
      tX = (e.clientX / window.innerWidth  - 0.5) *  0.7;
      tY = (e.clientY / window.innerHeight - 0.5) * -0.4;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // Resize handler
    const onResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      // Re-adjust position on resize
      const tab = w < 1024;
      globe.position.x = tab ? 0 : 0.55;
      globe.scale.setScalar(tab ? 0.78 : 1.0);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Animation
    let frameId;
    const clock = new THREE.Clock();
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      autoRot += 0.0022;
      cX += (tX - cX) * 0.04;
      cY += (tY - cY) * 0.04;
      globe.rotation.y = autoRot + cX;
      globe.rotation.x = cY;
      ring1.rotation.z = t *  0.18;
      ring2.rotation.z = t * -0.12;
      ring3.rotation.x = t *  0.09;
      ptMat.opacity = 0.70 + Math.sin(t * 0.8) * 0.15;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      ptGeo.dispose(); lineGeo.dispose(); ringGeo.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />
  );
}
