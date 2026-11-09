"use client";

import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { useScene, canvasTexture, roundRect, SANS, SERIF } from "./useScene";

const W = 2.5;
const H = 1.56;
const GOLD = "#C9A35B";
const NAVY = "#221D19";
const IVORY = "#FBFAF6";
const TEAL = "#5FB3A1";

type Draw = (g: CanvasRenderingContext2D, w: number, h: number) => void;

const cardFace = (bg: string, draw: Draw) =>
  canvasTexture(1000, 624, (g) => {
    roundRect(g, 0, 0, 1000, 624, 42);
    g.fillStyle = bg;
    g.fill();
    g.save();
    g.clip();
    draw(g, 1000, 624);
    g.restore();
  });

const label = (g: CanvasRenderingContext2D, txt: string, x: number, y: number, color: string) => {
  g.font = `700 22px ${SANS}`;
  g.fillStyle = color;
  g.letterSpacing = "4px";
  g.fillText(txt, x, y);
  g.letterSpacing = "0px";
};

const invoice: Draw = (g) => {
  label(g, "INVOICE · DEMO-20481", 56, 74, "#8B8678");
  g.font = `56px ${SERIF}`;
  g.fillStyle = "#15120f";
  g.fillText("Corporate account · 3 nights", 56, 150);
  const rows = [
    ["Room · Deluxe King × 3", "360.00"],
    ["Extra adult × 3", "60.00"],
    ["Breakfast package", "45.00"],
  ];
  g.font = `500 28px ${SANS}`;
  rows.forEach(([a, b], i) => {
    const y = 236 + i * 70;
    g.fillStyle = "#E8E2D4";
    g.fillRect(56, y - 44, 888, 2);
    g.fillStyle = "#3A3F4A";
    g.fillText(a, 56, y);
    g.textAlign = "right";
    g.fillText(b, 944, y);
    g.textAlign = "left";
  });
  g.fillStyle = "#15120f";
  g.fillRect(56, 432, 888, 3);
  g.font = `800 32px ${SANS}`;
  g.fillText("Total", 56, 486);
  g.textAlign = "right";
  g.fillText("465.00", 944, 486);
  g.textAlign = "left";
  roundRect(g, 56, 530, 290, 56, 28);
  g.fillStyle = "rgba(95,179,161,0.16)";
  g.fill();
  g.font = `700 24px ${SANS}`;
  g.fillStyle = "#2F8270";
  g.fillText("✓  MATCHED TO CONTRACT", 76, 566);
};

const bank: Draw = (g) => {
  label(g, "BANK RECONCILIATION", 56, 74, GOLD);
  g.font = `56px ${SERIF}`;
  g.fillStyle = "#F4EFE3";
  g.fillText("3 accounts · month-end", 56, 150);
  const rows = [
    ["Bank receipts", "128,450.00"],
    ["Card settlements", "41,230.00"],
    ["Allocated to invoices", "169,680.00"],
  ];
  g.font = `500 28px ${SANS}`;
  rows.forEach(([a, b], i) => {
    const y = 240 + i * 72;
    g.fillStyle = "rgba(255,255,255,0.08)";
    g.fillRect(56, y - 46, 888, 2);
    g.fillStyle = TEAL;
    g.fillText("✓", 56, y);
    g.fillStyle = "#e3ddd3";
    g.fillText(a, 100, y);
    g.textAlign = "right";
    g.fillText(b, 944, y);
    g.textAlign = "left";
  });
  g.fillStyle = GOLD;
  g.fillRect(56, 450, 888, 2);
  g.font = `800 34px ${SANS}`;
  g.fillStyle = "#F4EFE3";
  g.fillText("Variance", 56, 510);
  g.textAlign = "right";
  g.fillStyle = TEAL;
  g.fillText("0.00", 944, 510);
  g.textAlign = "left";
  g.font = `italic 34px ${SERIF}`;
  g.fillStyle = GOLD;
  g.fillText("Reconciled before close", 56, 576);
};

const payroll: Draw = (g) => {
  label(g, "PAYROLL RUN · PAYMASTER", 56, 74, "#8B8678");
  g.font = `56px ${SERIF}`;
  g.fillStyle = "#15120f";
  g.fillText("300–500 employees", 56, 150);
  g.font = `500 28px ${SANS}`;
  g.fillStyle = "#3A3F4A";
  g.fillText("Inputs verified with HR against authorization forms", 56, 214);
  g.font = `800 120px ${SANS}`;
  g.fillStyle = "#15120f";
  g.fillText("<0.5%", 56, 380);
  g.font = `600 28px ${SANS}`;
  g.fillStyle = "#8B8678";
  g.fillText("error rate", 440, 380);
  roundRect(g, 56, 440, 888, 26, 13);
  g.fillStyle = "#ECE6D8";
  g.fill();
  roundRect(g, 56, 440, 884, 26, 13);
  const grad = g.createLinearGradient(56, 0, 944, 0);
  grad.addColorStop(0, "#5FB3A1");
  grad.addColorStop(1, "#C9A35B");
  g.fillStyle = grad;
  g.fill();
  g.font = `600 26px ${SANS}`;
  g.fillStyle = "#5D6675";
  g.fillText("Weekly variance · overtime · payroll reports", 56, 540);
};

const aging: Draw = (g) => {
  label(g, "AGING · CITY LEDGER", 56, 74, GOLD);
  g.font = `56px ${SERIF}`;
  g.fillStyle = "#F4EFE3";
  g.fillText("DSO 45 → 30 days", 56, 150);
  const bars = [0.92, 0.66, 0.38, 0.2];
  const labels = ["0–30", "31–60", "61–90", "90+"];
  bars.forEach((b, i) => {
    const x = 86 + i * 220;
    const h = 300 * b;
    const grad = g.createLinearGradient(0, 520 - h, 0, 520);
    grad.addColorStop(0, i < 2 ? "#E3C88F" : i === 2 ? "#C9A35B" : "#D98B6C");
    grad.addColorStop(1, i < 2 ? "#9C7A3A" : i === 2 ? "#7E6230" : "#8C4B33");
    roundRect(g, x, 520 - h, 150, h, 14);
    g.fillStyle = grad;
    g.fill();
    g.font = `600 24px ${SANS}`;
    g.fillStyle = "#a79f94";
    g.fillText(labels[i], x + 30, 572);
  });
};

export default function HeroScene() {
  const ref = useScene(
    ({ scene, camera, renderer, reduced, pointer }) => {
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environmentIntensity = 0.9;

      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const key = new THREE.DirectionalLight(0xfff1d8, 2.4);
      key.position.set(-4, 6, 8);
      scene.add(key);
      const rim = new THREE.PointLight(0xc9a35b, 30, 30);
      rim.position.set(4, -2, -3);
      scene.add(rim);

      const root = new THREE.Group();
      scene.add(root);

      // ---- cards
      const shape = new THREE.Shape();
      const r = 0.1;
      shape.moveTo(-W / 2 + r, -H / 2);
      shape.lineTo(W / 2 - r, -H / 2);
      shape.quadraticCurveTo(W / 2, -H / 2, W / 2, -H / 2 + r);
      shape.lineTo(W / 2, H / 2 - r);
      shape.quadraticCurveTo(W / 2, H / 2, W / 2 - r, H / 2);
      shape.lineTo(-W / 2 + r, H / 2);
      shape.quadraticCurveTo(-W / 2, H / 2, -W / 2, H / 2 - r);
      shape.lineTo(-W / 2, -H / 2 + r);
      shape.quadraticCurveTo(-W / 2, -H / 2, -W / 2 + r, -H / 2);
      const body = new THREE.ExtrudeGeometry(shape, { depth: 0.035, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 3 });
      body.translate(0, 0, -0.035);
      const faceGeo = new THREE.PlaneGeometry(W, H);

      const defs = [
        { draw: invoice, bg: IVORY, edge: 0xf2eee4, from: [-1.9, 1.15, 0.6], rot: [0.12, 0.42, -0.1] },
        { draw: bank, bg: NAVY, edge: 0x2e2823, from: [1.35, 1.55, -0.6], rot: [0.2, -0.38, 0.12] },
        { draw: payroll, bg: IVORY, edge: 0xf2eee4, from: [1.55, -0.85, 0.9], rot: [-0.18, -0.3, 0.08] },
        { draw: aging, bg: NAVY, edge: 0x2e2823, from: [-1.35, -1.25, -0.4], rot: [-0.1, 0.5, -0.14] },
      ];
      const cards = defs.map((d, i) => {
        const grp = new THREE.Group();
        const m = new THREE.Mesh(body, new THREE.MeshPhysicalMaterial({ color: d.edge, roughness: 0.4, clearcoat: 0.6, clearcoatRoughness: 0.3 }));
        const tex = cardFace(d.bg, d.draw);
        const face = new THREE.Mesh(
          faceGeo,
          new THREE.MeshPhysicalMaterial({ map: tex, transparent: true, roughness: 0.42, clearcoat: 0.7, clearcoatRoughness: 0.25 })
        );
        face.position.z = 0.0135;
        grp.add(m, face);
        root.add(grp);
        return {
          grp,
          from: new THREE.Vector3(...(d.from as [number, number, number])),
          rot: new THREE.Euler(...(d.rot as [number, number, number])),
          to: new THREE.Vector3(0.15, -0.55 + i * 0.13, -0.2 + i * 0.02),
          toRot: new THREE.Euler(-1.15, 0, -0.32),
          phase: i * 1.7,
        };
      });

      // ---- gold coins
      const gold = new THREE.MeshPhysicalMaterial({ color: 0xd8b26a, metalness: 1, roughness: 0.24, clearcoat: 0.4 });
      const coinGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.075, 72);
      const rimGeo = new THREE.TorusGeometry(0.36, 0.014, 10, 72);
      const makeCoin = () => {
        const c = new THREE.Group();
        c.add(new THREE.Mesh(coinGeo, gold));
        const top = new THREE.Mesh(rimGeo, gold);
        top.rotation.x = Math.PI / 2;
        top.position.y = 0.04;
        c.add(top);
        return c;
      };
      const stack = new THREE.Group();
      for (let i = 0; i < 7; i++) {
        const c = makeCoin();
        c.position.set(Math.sin(i * 2.1) * 0.03, i * 0.08, Math.cos(i * 1.7) * 0.03);
        c.rotation.y = i * 0.6;
        stack.add(c);
      }
      stack.position.set(0.25, -1.95, 1.1);
      root.add(stack);
      const loose = [0, 1, 2].map((i) => {
        const c = makeCoin();
        c.position.set([-2.6, 2.7, 0.2][i], [-0.2, 0.35, 2.05][i], [1.4, 0.8, -1.2][i]);
        c.rotation.set(1.1 + i, 0.4 * i, 0.3);
        c.scale.setScalar([0.8, 0.65, 0.55][i]);
        root.add(c);
        return c;
      });

      // ---- glass ring
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.25, 0.12, 48, 160),
        new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 1, roughness: 0.08, thickness: 0.6, ior: 1.35, metalness: 0, transparent: true, opacity: 0.9 })
      );
      ring.position.set(0, 0.1, -1.6);
      ring.rotation.set(0.35, -0.5, 0);
      root.add(ring);

      // ---- dust
      const N = 260;
      const pos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 9;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
      }
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const dot = canvasTexture(64, 64, (g) => {
        const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
        gr.addColorStop(0, "rgba(255,230,180,1)");
        gr.addColorStop(1, "rgba(255,230,180,0)");
        g.fillStyle = gr;
        g.fillRect(0, 0, 64, 64);
      });
      const dust = new THREE.Points(
        dustGeo,
        new THREE.PointsMaterial({ size: 0.06, map: dot, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.8 })
      );
      root.add(dust);

      let p = 0;
      const ease = (x: number) => x * x * (3 - 2 * x);
      const tmpQ = new THREE.Quaternion();
      const qA = new THREE.Quaternion();
      const qB = new THREE.Quaternion();
      let mobile = false;

      return {
        resize: (w, h) => {
          mobile = window.innerWidth < 900;
          root.position.set(mobile ? 0.25 : 2.55, mobile ? 0.6 : 0, 0);
          root.scale.setScalar(mobile ? 0.9 : 1);
          camera.position.z = mobile ? 12.5 : 11;
        },
        tick: (t) => {
          const hero = document.querySelector(".hero") as HTMLElement | null;
          const hh = hero?.offsetHeight || window.innerHeight;
          const target = reduced ? 0 : Math.min(1, Math.max(0, window.scrollY / (hh * 0.7)));
          p += (target - p) * 0.08;
          const e = ease(p);

          cards.forEach((c, i) => {
            const fx = Math.sin(t * 0.7 + c.phase) * 0.08;
            const fy = Math.cos(t * 0.9 + c.phase) * 0.1;
            c.grp.position.set(
              THREE.MathUtils.lerp(c.from.x + fx, c.to.x, e),
              THREE.MathUtils.lerp(c.from.y + fy, c.to.y, e),
              THREE.MathUtils.lerp(c.from.z, c.to.z, e)
            );
            qA.setFromEuler(new THREE.Euler(c.rot.x + Math.sin(t * 0.5 + i) * 0.05, c.rot.y + Math.cos(t * 0.4 + i) * 0.06, c.rot.z));
            qB.setFromEuler(c.toRot);
            tmpQ.slerpQuaternions(qA, qB, e);
            c.grp.quaternion.copy(tmpQ);
          });
          stack.rotation.y = t * 0.25;
          stack.position.y = -1.95 + Math.sin(t * 0.8) * 0.05 - e * 0.25;
          loose.forEach((c, i) => {
            c.rotation.x += 0.004 * (i + 1);
            c.rotation.y += 0.006;
            c.position.y += Math.sin(t * 0.9 + i * 2) * 0.0015;
          });
          ring.rotation.z = t * 0.12;
          dust.rotation.y = t * 0.02;

          const tx = mobile ? 0 : pointer.x * 0.22;
          const ty = mobile ? 0 : -pointer.y * 0.12;
          root.rotation.y += (tx - root.rotation.y) * 0.05;
          root.rotation.x += (ty - root.rotation.x) * 0.05;
        },
        dispose: () => pmrem.dispose(),
      };
    },
    { fov: 32, z: 11 }
  );

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}
