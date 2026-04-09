import { useEffect, useRef } from "react";
import * as THREE from "three";

// ─── Config ───────────────────────────────────────────────────────
const CFG = {
  nodeCount:      120,
  connectDist:    28,       // units — max distance to draw a line
  nodeColor:      0x00e5c4,
  lineColor:      0x0066ff,
  accentColor:    0x00e5c4,
  bgColor:        0x06090f,
  mouseStrength:  18,       // repulsion radius in units
  scanSpeed:      0.004,
  particleSpeed:  0.012,
};

export default function NetworkCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // ── Scene setup ─────────────────────────────────────────────
    const W = el.clientWidth;
    const H = el.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 90;

    // ── Nodes ───────────────────────────────────────────────────
    // Each node: position, velocity, type (0=normal,1=hub,2=secure)
    const nodes = Array.from({ length: CFG.nodeCount }, (_, i) => ({
      x:  (Math.random() - 0.5) * 160,
      y:  (Math.random() - 0.5) * 100,
      z:  (Math.random() - 0.5) * 40,
      vx: (Math.random() - 0.5) * CFG.particleSpeed,
      vy: (Math.random() - 0.5) * CFG.particleSpeed,
      vz: (Math.random() - 0.5) * CFG.particleSpeed * 0.3,
      type: i < 8 ? 2 : i < 20 ? 1 : 0,  // 8 hubs, 12 secure nodes, rest normal
      pulse: Math.random() * Math.PI * 2,
    }));

    // ── Node geometry (instanced spheres) ────────────────────────
    const nodeMesh = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.55, 8, 8),
      new THREE.MeshBasicMaterial({ color: CFG.nodeColor }),
      CFG.nodeCount
    );
    scene.add(nodeMesh);

    // Hub nodes — larger
    const hubMesh = new THREE.InstancedMesh(
      new THREE.SphereGeometry(1.1, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0x0066ff }),
      nodes.filter(n => n.type === 1).length
    );
    scene.add(hubMesh);

    // Secure nodes — diamond shape (octahedron)
    const secureMesh = new THREE.InstancedMesh(
      new THREE.OctahedronGeometry(1.0),
      new THREE.MeshBasicMaterial({ color: 0xe53e3e }),
      nodes.filter(n => n.type === 2).length
    );
    scene.add(secureMesh);

    // ── Ring on hubs ─────────────────────────────────────────────
    const ringGeo = new THREE.RingGeometry(1.5, 1.8, 16);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x0066ff, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });

    // ── Lines (updated each frame) ───────────────────────────────
    const MAX_LINES = 600;
    const linePositions = new Float32Array(MAX_LINES * 2 * 3);
    const lineColors    = new Float32Array(MAX_LINES * 2 * 3);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute("color",    new THREE.BufferAttribute(lineColors,    3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.35,
    });
    const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineMesh);

    // ── Scan ring (horizontal plane that sweeps) ─────────────────
    const scanRingGeo = new THREE.RingGeometry(0, 200, 64);
    const scanMat = new THREE.ShaderMaterial({
      uniforms: {
        uProgress: { value: 0 },
        uColor: { value: new THREE.Color(0x00e5c4) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `,
      fragmentShader: `
        uniform float uProgress;
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          float dist = length(vUv - 0.5) * 2.0;
          float edge = abs(dist - uProgress) * 8.0;
          float alpha = (1.0 - clamp(edge, 0.0, 1.0)) * 0.18 * (1.0 - uProgress);
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const scanMesh = new THREE.Mesh(scanRingGeo, scanMat);
    scanMesh.rotation.x = -Math.PI / 2;
    scanMesh.position.y = -10;
    scene.add(scanMesh);

    // ── Floating label sprites (node labels) ─────────────────────
    // Skipping canvas-based sprites to keep perf clean.

    // ── Mouse tracking ───────────────────────────────────────────
    const mouse = { x: 9999, y: 9999 };   // screen NDC → world approx
    const mouseWorld = { x: 9999, y: 9999 };

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      // Approximate world coords at z=0
      mouseWorld.x = mouse.x * (camera.fov * camera.aspect / 2);  // rough
      mouseWorld.y = mouse.y * (camera.fov / 2);
      mouseWorld.x = mouse.x * 80;
      mouseWorld.y = mouse.y * 50;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Resize ───────────────────────────────────────────────────
    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Helpers ──────────────────────────────────────────────────
    const dummy = new THREE.Object3D();
    const c1 = new THREE.Color();
    const c2 = new THREE.Color();
    let scanProgress = 0;
    let frameId;

    // ── Animation loop ────────────────────────────────────────────
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Move nodes
      let hi = 0, si = 0;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.pulse += 0.03;

        // Mouse repulsion
        const dx = n.x - mouseWorld.x;
        const dy = n.y - mouseWorld.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < CFG.mouseStrength && d > 0.01) {
          const force = (CFG.mouseStrength - d) / CFG.mouseStrength * 0.06;
          n.vx += (dx / d) * force;
          n.vy += (dy / d) * force;
        }

        // Friction + drift
        n.vx *= 0.98;
        n.vy *= 0.98;
        n.vz *= 0.98;
        n.x += n.vx;
        n.y += n.vy;
        n.z += n.vz;

        // Boundary bounce
        if (Math.abs(n.x) > 85) { n.vx *= -1; n.x = Math.sign(n.x) * 85; }
        if (Math.abs(n.y) > 52) { n.vy *= -1; n.y = Math.sign(n.y) * 52; }
        if (Math.abs(n.z) > 22) { n.vz *= -1; n.z = Math.sign(n.z) * 22; }

        // Tiny random drift
        n.vx += (Math.random() - 0.5) * 0.002;
        n.vy += (Math.random() - 0.5) * 0.002;

        // Place instanced mesh
        const scale = 1 + Math.sin(n.pulse) * 0.12;
        if (n.type === 0) {
          dummy.position.set(n.x, n.y, n.z);
          dummy.scale.setScalar(scale);
          dummy.updateMatrix();
          nodeMesh.setMatrixAt(i - hi - si, dummy.matrix);
        } else if (n.type === 1) {
          dummy.position.set(n.x, n.y, n.z);
          dummy.scale.setScalar(scale * 1.1);
          dummy.rotation.y += 0.01;
          dummy.updateMatrix();
          hubMesh.setMatrixAt(hi, dummy.matrix);
          hi++;
        } else {
          dummy.position.set(n.x, n.y, n.z);
          dummy.scale.setScalar(scale);
          dummy.rotation.y += 0.015;
          dummy.rotation.z += 0.01;
          dummy.updateMatrix();
          secureMesh.setMatrixAt(si, dummy.matrix);
          si++;
        }
      }
      nodeMesh.instanceMatrix.needsUpdate   = true;
      hubMesh.instanceMatrix.needsUpdate    = true;
      secureMesh.instanceMatrix.needsUpdate = true;

      // Draw lines between close nodes
      let lineIdx = 0;
      for (let i = 0; i < nodes.length && lineIdx < MAX_LINES - 1; i++) {
        for (let j = i + 1; j < nodes.length && lineIdx < MAX_LINES - 1; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dz = nodes[i].z - nodes[j].z;
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
          if (dist < CFG.connectDist) {
            const alpha = 1 - dist / CFG.connectDist;

            // Start
            linePositions[lineIdx * 6 + 0] = nodes[i].x;
            linePositions[lineIdx * 6 + 1] = nodes[i].y;
            linePositions[lineIdx * 6 + 2] = nodes[i].z;
            // End
            linePositions[lineIdx * 6 + 3] = nodes[j].x;
            linePositions[lineIdx * 6 + 4] = nodes[j].y;
            linePositions[lineIdx * 6 + 5] = nodes[j].z;

            // Color: cyan if both normal, blue if hub involved, red if secure
            const hasSecure = nodes[i].type === 2 || nodes[j].type === 2;
            const hasHub    = nodes[i].type === 1 || nodes[j].type === 1;
            const lc = hasSecure ? c1.set(0xe53e3e) : hasHub ? c1.set(0x0066ff) : c1.set(0x00e5c4);

            lineColors[lineIdx * 6 + 0] = lc.r * alpha;
            lineColors[lineIdx * 6 + 1] = lc.g * alpha;
            lineColors[lineIdx * 6 + 2] = lc.b * alpha;
            lineColors[lineIdx * 6 + 3] = lc.r * alpha;
            lineColors[lineIdx * 6 + 4] = lc.g * alpha;
            lineColors[lineIdx * 6 + 5] = lc.b * alpha;

            lineIdx++;
          }
        }
      }
      lineGeo.setDrawRange(0, lineIdx * 2);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate    = true;

      // Scan pulse
      scanProgress += CFG.scanSpeed;
      if (scanProgress > 1) scanProgress = 0;
      scanMat.uniforms.uProgress.value = scanProgress;

      // Gentle camera drift
      camera.position.x += (mouse.x * 8 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 4 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute", inset: 0,
        zIndex: 0, pointerEvents: "none",
      }}
    />
  );
}
