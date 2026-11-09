"use client";

import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { useScene, canvasTexture, SANS, SERIF } from "./useScene";
import { process } from "@/lib/data";

/** Scroll-driven journey: four floating platforms along a gold path, camera travels as the user scrolls. */
export default function ProcessScene() {
  const ref = useScene(
    ({ scene, renderer, camera, reduced, canvas }) => {
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environmentIntensity = 0.8;
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const l = new THREE.DirectionalLight(0xfff1d8, 2);
      l.position.set(-3, 6, 5);
      scene.add(l);
      const teal = new THREE.PointLight(0x3fb8a5, 40, 30);
      teal.position.set(6, -2, 2);
      scene.add(teal);

      const gold = new THREE.MeshPhysicalMaterial({ color: 0xc9a35b, metalness: 1, roughness: 0.28, clearcoat: 0.5 });
      const navy = new THREE.MeshPhysicalMaterial({ color: 0x2a2520, roughness: 0.35, clearcoat: 0.6 });
      const ivory = new THREE.MeshPhysicalMaterial({ color: 0xf5f2eb, roughness: 0.45, clearcoat: 0.4 });

      const stops = [new THREE.Vector3(-5.2, -0.6, 0), new THREE.Vector3(-1.8, 0.4, -1.2), new THREE.Vector3(1.8, -0.2, 0.6), new THREE.Vector3(5.2, 0.8, -0.8)];
      const curve = new THREE.CatmullRomCurve3(stops, false, "catmullrom", 0.6);
      const path = new THREE.Mesh(new THREE.TubeGeometry(curve, 120, 0.04, 10, false), gold);
      scene.add(path);

      const labels = stops.map((p, i) => {
        const grp = new THREE.Group();
        const plat = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.25, 0.22, 56), i % 2 ? ivory : navy);
        grp.add(plat);
        const ring = new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.03, 12, 80), gold);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = 0.11;
        grp.add(ring);
        const coin = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.09, 56), gold);
        coin.position.y = 0.55;
        grp.add(coin);
        const tex = canvasTexture(512, 512, (g) => {
          g.beginPath();
          g.arc(256, 256, 236, 0, Math.PI * 2);
          g.fillStyle = "#c9a35b";
          g.fill();
          g.font = `italic 260px ${SERIF}`;
          g.fillStyle = "#15120f";
          g.textAlign = "center";
          g.textBaseline = "middle";
          g.fillText(process[i].n, 256, 270);
        });
        const face = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
        face.scale.setScalar(0.8);
        face.position.set(0, 1.25, 0);
        grp.add(face);
        const lab = canvasTexture(1024, 256, (g) => {
          g.font = `800 92px ${SANS}`;
          g.fillStyle = "#f4efe3";
          g.textAlign = "center";
          g.fillText(process[i].title, 512, 120);
          g.font = `600 44px ${SANS}`;
          g.fillStyle = "#e3c88f";
          g.fillText(`Step ${process[i].n}`, 512, 196);
        });
        const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: lab, transparent: true, depthTest: false }));
        s.scale.set(3.2, 0.8, 1);
        s.position.y = 2.05;
        grp.add(s);
        grp.position.copy(p);
        scene.add(grp);
        return { grp, coin };
      });

      let prog = 0;
      let mobile = false;
      return {
        resize: (w, h) => {
          mobile = w / h < 1;
        },
        tick: (t) => {
          const sec = canvas.closest(".process-stage") as HTMLElement | null;
          let target = 0.5;
          if (sec) {
            const r = sec.getBoundingClientRect();
            const vh = window.innerHeight;
            target = THREE.MathUtils.clamp((vh - r.top) / (r.height + vh), 0, 1);
          }
          if (reduced) target = 0.5;
          prog += (target - prog) * 0.08;
          const camT = THREE.MathUtils.lerp(0.2, 0.8, prog);
          const look = curve.getPoint(camT);
          camera.position.set(look.x * 0.6, look.y + (mobile ? 3.8 : 3), look.z + (mobile ? 11 : 10));
          camera.lookAt(look.x * 0.6, look.y + 0.5, look.z);
          labels.forEach((o, i) => {
            o.coin.rotation.y = t * 0.8 + i;
            o.grp.position.y = stops[i].y + Math.sin(t * 0.9 + i) * 0.08;
          });
        },
        dispose: () => pmrem.dispose(),
      };
    },
    { fov: 34, z: 8 }
  );
  return <canvas ref={ref} className="process-canvas" aria-hidden="true" />;
}
