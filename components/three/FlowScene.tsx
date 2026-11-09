"use client";

import * as THREE from "three";
import { useScene, canvasTexture, roundRect, SANS } from "./useScene";

const NODES = [
  { t: "Intake", s: "Gmail · Excel · upload form", i: "IN", p: [-5.4, 0.3, 0] },
  { t: "Data tables", s: "English or Arabic headers", i: "DT", p: [-3.6, -0.8, 0.5] },
  { t: "Contract check", s: "Rate · promotion · extras", i: "✓", p: [-1.8, 0.85, -0.3] },
  { t: "Reconcile", s: "SOA · bank · POS batches", i: "≡", p: [0, -0.6, 0.5] },
  { t: "Aging & credit", s: "Reason for every 60+ day item", i: "60", p: [1.8, 0.85, -0.3] },
  { t: "Gemini draft", s: "Summary & customer e-mails", i: "AI", p: [3.6, -0.8, 0.5] },
  { t: "Manager approves", s: "Nothing is sent before this", i: "OK", p: [5.4, 0.3, 0], gold: true },
];

export default function FlowScene() {
  const ref = useScene(
    ({ scene, camera, pointer, reduced }) => {
      const root = new THREE.Group();
      scene.add(root);
      scene.add(new THREE.AmbientLight(0xffffff, 1));

      const nodeGeo = new THREE.PlaneGeometry(1.8, 0.74);
      const nodes = NODES.map((n) => {
        const tex = canvasTexture(760, 312, (g) => {
          roundRect(g, 4, 4, 752, 304, 36);
          g.fillStyle = n.gold ? "#C9A35B" : "rgba(34,29,25,0.94)";
          g.fill();
          g.lineWidth = 3;
          g.strokeStyle = n.gold ? "#E3C88F" : "rgba(201,163,91,0.55)";
          g.stroke();
          g.beginPath();
          g.arc(98, 156, 54, 0, Math.PI * 2);
          g.fillStyle = n.gold ? "#15120f" : "rgba(201,163,91,0.16)";
          g.fill();
          g.font = `800 38px ${SANS}`;
          g.fillStyle = n.gold ? "#E3C88F" : "#E3C88F";
          g.textAlign = "center";
          g.fillText(n.i, 98, 170);
          g.textAlign = "left";
          g.font = `800 44px ${SANS}`;
          g.fillStyle = n.gold ? "#15120f" : "#F4EFE3";
          g.fillText(n.t, 184, 140);
          g.font = `500 28px ${SANS}`;
          g.fillStyle = n.gold ? "#2b2622" : "#a79f94";
          g.fillText(n.s, 184, 196);
        });
        const m = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
        m.position.set(n.p[0], n.p[1], n.p[2]);
        root.add(m);
        return m;
      });

      // edges + pulses
      const dotTex = canvasTexture(64, 64, (g) => {
        const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
        gr.addColorStop(0, "rgba(255,235,190,1)");
        gr.addColorStop(0.35, "rgba(227,200,143,0.8)");
        gr.addColorStop(1, "rgba(227,200,143,0)");
        g.fillStyle = gr;
        g.fillRect(0, 0, 64, 64);
      });
      const edges = nodes.slice(0, -1).map((a, i) => {
        const b = nodes[i + 1];
        const A = a.position.clone().add(new THREE.Vector3(0.9, 0, 0));
        const B = b.position.clone().add(new THREE.Vector3(-0.9, 0, 0));
        const mid = A.clone().lerp(B, 0.5);
        const curve = new THREE.CubicBezierCurve3(A, new THREE.Vector3(mid.x, A.y, A.z + 0.4), new THREE.Vector3(mid.x, B.y, B.z + 0.4), B);
        const tube = new THREE.Mesh(
          new THREE.TubeGeometry(curve, 60, 0.014, 8, false),
          new THREE.MeshBasicMaterial({ color: 0xc9a35b, transparent: true, opacity: 0.55 })
        );
        root.add(tube);
        const pulse = new THREE.Sprite(new THREE.SpriteMaterial({ map: dotTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
        pulse.scale.setScalar(0.42);
        root.add(pulse);
        return { curve, pulse };
      });

      // backdrop dots grid
      const gpos: number[] = [];
      for (let x = -9; x <= 9; x += 0.6) for (let y = -4; y <= 4; y += 0.6) gpos.push(x, y, -2.5);
      const gg = new THREE.BufferGeometry();
      gg.setAttribute("position", new THREE.Float32BufferAttribute(gpos, 3));
      root.add(new THREE.Points(gg, new THREE.PointsMaterial({ size: 0.035, color: 0x4a4038, transparent: true, opacity: 0.8 })));

      let vertical = false;
      const CYCLE = 1.1; // seconds per edge

      return {
        resize: (w, h) => {
          vertical = w / h < 1;
          root.rotation.z = vertical ? -Math.PI / 2 : 0;
          nodes.forEach((n) => (n.rotation.z = vertical ? Math.PI / 2 : 0));
          // fit the 13-unit-wide graph (or 5.5-unit-tall when vertical) into view
          const fovRad = (camera.fov * Math.PI) / 180;
          const span = vertical ? 13.2 : 13.2 / camera.aspect;
          camera.position.z = span / 2 / Math.tan(fovRad / 2) + 0.8;
        },
        tick: (t) => {
          const total = edges.length * CYCLE;
          const tt = reduced ? total * 0.99 : t % (total + 1.2);
          edges.forEach((e, i) => {
            const local = (tt - i * CYCLE) / CYCLE;
            const visible = local >= 0 && local <= 1;
            e.pulse.visible = visible;
            if (visible) e.pulse.position.copy(e.curve.getPoint(local));
          });
          nodes.forEach((n, i) => {
            const arrive = i * CYCLE;
            const d = tt - arrive;
            const glow = d >= 0 && d < 0.6 ? 1 - d / 0.6 : 0;
            n.scale.setScalar(1 + glow * 0.08);
            n.position.y = NODES[i].p[1] + Math.sin(t * 0.8 + i) * 0.06;
          });
          const ry = vertical ? 0 : pointer.x * 0.18;
          const rx = vertical ? 0 : -pointer.y * 0.1;
          root.rotation.y += (ry - 0.06 * Math.sin(t * 0.2) * (reduced ? 0 : 1) - root.rotation.y) * 0.04;
          root.rotation.x += (rx - root.rotation.x) * 0.04;
        },
      };
    },
    { fov: 30, z: 9.6 }
  );
  return <canvas ref={ref} className="flow-canvas" aria-hidden="true" />;
}
