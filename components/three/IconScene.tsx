"use client";

import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { useScene } from "./useScene";

export type IconKind = "hotel" | "business" | "team";

/** Small 3D object for a card: a resort tower, an open ledger, or a linked team graph. */
export default function IconScene({ kind, color = 0xc9a35b }: { kind: IconKind; color?: number }) {
  const ref = useScene(
    ({ scene, renderer, camera }) => {
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environmentIntensity = 0.9;
      scene.add(new THREE.AmbientLight(0xffffff, 0.4));
      const l = new THREE.DirectionalLight(0xffffff, 2);
      l.position.set(2, 4, 3);
      scene.add(l);
      const root = new THREE.Group();
      scene.add(root);

      const gold = new THREE.MeshPhysicalMaterial({ color, metalness: 1, roughness: 0.3, clearcoat: 0.5 });
      const ivory = new THREE.MeshPhysicalMaterial({ color: 0xf5f2eb, roughness: 0.5, clearcoat: 0.3 });
      const navy = new THREE.MeshPhysicalMaterial({ color: 0x2a2520, roughness: 0.35, clearcoat: 0.6 });

      if (kind === "hotel") {
        const base = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.18, 1.6), navy);
        base.position.y = -0.9;
        root.add(base);
        [
          [0, 1.6, -0.6],
          [0.7, 1.1, 0.15],
          [-0.7, 0.8, 0.15],
        ].forEach(([x, h, z], i) => {
          const b = new THREE.Mesh(new THREE.BoxGeometry(0.6, h, 0.6), i === 0 ? ivory : navy);
          b.position.set(x, -0.8 + h / 2, z);
          root.add(b);
          for (let f = 0; f < Math.floor(h / 0.3); f++) {
            const w = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.05, 0.62), gold);
            w.position.set(x, -0.7 + f * 0.3, z);
            root.add(w);
          }
        });
        const pool = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.06, 40), new THREE.MeshPhysicalMaterial({ color: 0x3fb8a5, roughness: 0.1, transmission: 0.6, thickness: 0.3 }));
        pool.position.set(0.7, -0.78, -0.55);
        root.add(pool);
      }
      if (kind === "business") {
        const spine = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.3, 1.7), gold);
        root.add(spine);
        [-1, 1].forEach((s) => {
          const cover = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.1, 1.7), navy);
          cover.position.set(s * 0.68, -0.08, 0);
          cover.rotation.z = s * 0.18;
          root.add(cover);
          for (let p = 0; p < 4; p++) {
            const page = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.02, 1.6), ivory);
            page.position.set(s * (0.66 - p * 0.01), p * 0.045, 0);
            page.rotation.z = s * (0.18 - p * 0.05);
            root.add(page);
          }
        });
        for (let i = 0; i < 4; i++) {
          const line = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.012, 0.06), gold);
          line.position.set(0.62, 0.22 - i * 0.002, -0.5 + i * 0.3);
          line.rotation.z = 0.02;
          root.add(line);
        }
        const coin = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.06, 48), gold);
        coin.position.set(-0.6, 0.6, 0.2);
        coin.rotation.x = 0.4;
        root.add(coin);
        (root as THREE.Group & { coin?: THREE.Mesh }).coin = coin;
      }
      if (kind === "team") {
        const pts = [new THREE.Vector3(0, 0.9, 0), new THREE.Vector3(-1.1, -0.3, 0.3), new THREE.Vector3(1.1, -0.3, 0.3), new THREE.Vector3(0, -0.5, -0.9), new THREE.Vector3(0, 0.1, 0.1)];
        pts.forEach((p, i) => {
          const s = new THREE.Mesh(new THREE.SphereGeometry(i === 4 ? 0.34 : 0.26, 32, 32), i === 4 ? gold : i === 0 ? ivory : navy);
          s.position.copy(p);
          root.add(s);
        });
        [
          [0, 4],
          [1, 4],
          [2, 4],
          [3, 4],
          [0, 1],
          [0, 2],
        ].forEach(([a, b]) => {
          const A = pts[a];
          const B = pts[b];
          const d = B.clone().sub(A);
          const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, d.length(), 10), gold);
          cyl.position.copy(A).add(d.clone().multiplyScalar(0.5));
          cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
          root.add(cyl);
        });
      }
      root.rotation.x = 0.35;
      return {
        resize: () => {
          camera.position.z = 5.2;
        },
        tick: (t) => {
          root.rotation.y = t * 0.45;
          root.position.y = Math.sin(t * 1.2) * 0.06;
          const c = (root as THREE.Group & { coin?: THREE.Mesh }).coin;
          if (c) c.rotation.y = t * 1.5;
        },
        dispose: () => pmrem.dispose(),
      };
    },
    { fov: 30, z: 5.2 }
  );
  return <canvas ref={ref} className="icon-canvas" aria-hidden="true" />;
}
