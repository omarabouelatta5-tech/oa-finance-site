"use client";

import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { useScene, canvasTexture } from "./useScene";

/** Ambient 3D backdrop: glass shards, a gold torus knot and drifting particles. Tinted per section. */
export default function BgScene({ tint = "gold", density = 1 }: { tint?: "gold" | "teal" | "coral" | "sky"; density?: number }) {
  const ref = useScene(
    ({ scene, renderer, camera, pointer }) => {
      const col = { gold: 0xc9a35b, teal: 0x3fb8a5, coral: 0xe8714f, sky: 0xc9a35b }[tint];
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environmentIntensity = 0.7;
      scene.add(new THREE.AmbientLight(0xffffff, 0.3));
      const key = new THREE.PointLight(col, 60, 40);
      key.position.set(4, 3, 4);
      scene.add(key);
      const fill = new THREE.PointLight(0x3fb8a5, 14, 40);
      fill.position.set(-5, -3, 2);
      scene.add(fill);

      const root = new THREE.Group();
      scene.add(root);

      const glass = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 1,
        roughness: 0.1,
        thickness: 0.8,
        ior: 1.4,
        transparent: true,
        opacity: 0.85,
      });
      const metal = new THREE.MeshPhysicalMaterial({ color: col, metalness: 1, roughness: 0.28, clearcoat: 0.5 });

      const shards: THREE.Mesh[] = [];
      const geos = [new THREE.IcosahedronGeometry(0.7, 0), new THREE.OctahedronGeometry(0.6, 0), new THREE.TorusGeometry(0.55, 0.16, 24, 80), new THREE.CapsuleGeometry(0.25, 0.9, 8, 16)];
      const N = Math.round(9 * density);
      for (let i = 0; i < N; i++) {
        const g = geos[i % geos.length];
        const m = new THREE.Mesh(g, i % 3 === 0 ? metal : glass);
        // keep objects on the right half of the frame, away from the headline
        const a = (i / N) * Math.PI * 2;
        const r = 1.2 + (i % 3) * 0.9;
        m.position.set(3.8 + Math.cos(a) * r, Math.sin(a * 1.7) * 1.9, -3 - (i % 4) * 0.8);
        m.rotation.set(i, i * 0.7, i * 0.3);
        m.scale.setScalar(0.6 + (i % 3) * 0.3);
        root.add(m);
        shards.push(m);
      }
      const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.1, 0.3, 160, 24, 2, 3), metal);
      knot.position.set(5.2, 0.4, -4.5);
      root.add(knot);

      const P = 320;
      const pos = new Float32Array(P * 3);
      for (let i = 0; i < P; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 16;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
        pos[i * 3 + 2] = -6 + Math.random() * 6;
      }
      const pg = new THREE.BufferGeometry();
      pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const dot = canvasTexture(64, 64, (g) => {
        const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
        gr.addColorStop(0, "rgba(255,255,255,1)");
        gr.addColorStop(1, "rgba(255,255,255,0)");
        g.fillStyle = gr;
        g.fillRect(0, 0, 64, 64);
      });
      const dust = new THREE.Points(pg, new THREE.PointsMaterial({ size: 0.05, map: dot, color: col, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending }));
      root.add(dust);

      return {
        resize: (w, h) => {
          const mobile = w / h < 1;
          camera.position.z = mobile ? 13 : 10;
          root.position.x = mobile ? -3.2 : 0;
          root.position.y = mobile ? 2.2 : 0;
          root.scale.setScalar(mobile ? 0.7 : 1);
        },
        tick: (t) => {
          shards.forEach((m, i) => {
            m.rotation.x += 0.002 + i * 0.0003;
            m.rotation.y += 0.003;
            m.position.y += Math.sin(t * 0.6 + i) * 0.002;
          });
          knot.rotation.x = t * 0.15;
          knot.rotation.y = t * 0.2;
          dust.rotation.y = t * 0.015;
          root.rotation.y += (pointer.x * 0.08 - root.rotation.y) * 0.04;
          root.rotation.x += (-pointer.y * 0.05 - root.rotation.x) * 0.04;
        },
        dispose: () => pmrem.dispose(),
      };
    },
    { fov: 35, z: 10 }
  );
  return <canvas ref={ref} className="bg-canvas" aria-hidden="true" />;
}
