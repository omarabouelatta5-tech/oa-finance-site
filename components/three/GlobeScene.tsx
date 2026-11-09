"use client";

import * as THREE from "three";
import { useScene, canvasTexture, SANS } from "./useScene";
import { LAND } from "@/lib/landDots";
import { places as PLACES } from "@/lib/data";

const R = 2.2;
const ll = (lat: number, lon: number, r = R) => {
  const phi = ((90 - lat) * Math.PI) / 180;
  const th = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
};



export default function GlobeScene() {
  const ref = useScene(
    ({ scene, pointer, reduced, camera }) => {
      const globe = new THREE.Group();
      scene.add(globe);

      // body
      globe.add(new THREE.Mesh(new THREE.SphereGeometry(R * 0.995, 64, 64), new THREE.MeshBasicMaterial({ color: 0x1a1612 })));

      // atmosphere (fresnel)
      const atm = new THREE.Mesh(
        new THREE.SphereGeometry(R * 1.12, 64, 64),
        new THREE.ShaderMaterial({
          transparent: true,
          side: THREE.BackSide,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: { c: { value: new THREE.Color(0xc9a35b) } },
          vertexShader: `varying vec3 n; void main(){ n = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
          fragmentShader: `uniform vec3 c; varying vec3 n; void main(){ float i = pow(0.62 - dot(n, vec3(0.0,0.0,1.0)), 4.0); gl_FragColor = vec4(c, 1.0) * i * 0.9; }`,
        })
      );
      scene.add(atm);

      // land dots
      const pos = new Float32Array(LAND.length * 1.5);
      for (let i = 0; i < LAND.length; i += 2) {
        const v = ll(LAND[i], LAND[i + 1], R * 1.002);
        pos.set([v.x, v.y, v.z], (i / 2) * 3);
      }
      const dg = new THREE.BufferGeometry();
      dg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const dot = canvasTexture(32, 32, (g) => {
        g.beginPath();
        g.arc(16, 16, 13, 0, Math.PI * 2);
        g.fillStyle = "#fff";
        g.fill();
      });
      globe.add(new THREE.Points(dg, new THREE.PointsMaterial({ size: 0.05, map: dot, color: 0xcfc9bb, transparent: true, alphaTest: 0.3 })));

      // arcs between places (chronological)
      const glowTex = canvasTexture(64, 64, (g) => {
        const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
        gr.addColorStop(0, "rgba(255,236,196,1)");
        gr.addColorStop(0.4, "rgba(227,200,143,0.7)");
        gr.addColorStop(1, "rgba(227,200,143,0)");
        g.fillStyle = gr;
        g.fillRect(0, 0, 64, 64);
      });
      const arcs = PLACES.slice(0, -1).map((a, i) => {
        const b = PLACES[i + 1];
        const A = ll(a.lat, a.lon, R);
        const B = ll(b.lat, b.lon, R);
        const dist = A.distanceTo(B);
        const mid = A.clone().add(B).multiplyScalar(0.5).normalize().multiplyScalar(R + 0.25 + dist * 0.35);
        const curve = new THREE.QuadraticBezierCurve3(A, mid, B);
        const geo = new THREE.TubeGeometry(curve, 80, 0.012, 6, false);
        const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xe3c88f, transparent: true, opacity: 0.9 }));
        const full = geo.index ? geo.index.count : 0;
        geo.setDrawRange(0, 0);
        globe.add(mesh);
        const comet = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
        comet.scale.setScalar(0.16);
        globe.add(comet);
        return { curve, geo, full, comet };
      });

      // pins + labels
      PLACES.forEach((p, i) => {
        const v = ll(p.lat, p.lon, R * 1.01);
        const pin = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
        pin.position.copy(v);
        pin.scale.setScalar(i === PLACES.length - 1 || p.name === "Dubai" ? 0.22 : 0.15);
        globe.add(pin);
        if (["Dubai", "Sharm El Sheikh", "Chanthaburi", "Marsa Alam"].includes(p.name)) {
          const lab = canvasTexture(1024, 256, (g) => {
            g.font = `800 80px ${SANS}`;
            g.fillStyle = "#F4EFE3";
            g.fillText(p.name, 16, 110);
            g.font = `600 60px ${SANS}`;
            g.fillStyle = "#E3C88F";
            g.fillText(p.years, 16, 196);
          });
          const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: lab, transparent: true, depthTest: false }));
          s.scale.set(0.9, 0.225, 1);
          const off = p.name === "Marsa Alam" ? new THREE.Vector3(-0.5, -0.2, 0.3) : p.name === "Sharm El Sheikh" ? new THREE.Vector3(-0.55, 0.22, 0.3) : new THREE.Vector3(0.5, 0.16, 0.3);
          s.position.copy(ll(p.lat, p.lon, R * 1.08)).add(off);
          s.center.set(p.name === "Marsa Alam" || p.name === "Sharm El Sheikh" ? 1 : 0, 0.5);
          globe.add(s);
        }
      });

      // face the Middle East / Asia
      const focus = ll(22, 66, R);
      const baseY = -Math.atan2(focus.x, focus.z);
      globe.rotation.set(0.18, baseY, 0);

      return {
        resize: (w, h) => {
          camera.position.z = w / h < 1 ? 9.6 : 8.8;
        },
        tick: (t) => {
          const PER = 1.3;
          const total = arcs.length * PER;
          const tt = reduced ? total : t % (total + 3);
          arcs.forEach((a, i) => {
            const k = Math.min(1, Math.max(0, (tt - i * PER) / PER));
            a.geo.setDrawRange(0, Math.floor(a.full * k));
            a.comet.visible = k > 0 && k < 1;
            if (a.comet.visible) a.comet.position.copy(a.curve.getPoint(k));
          });
          const sway = reduced ? 0 : Math.sin(t * 0.25) * 0.22;
          globe.rotation.y += (baseY + sway + pointer.x * 0.25 - globe.rotation.y) * 0.03;
          globe.rotation.x += (0.18 - pointer.y * 0.1 - globe.rotation.x) * 0.03;
        },
      };
    },
    { fov: 32, z: 8 }
  );
  return <canvas ref={ref} className="globe-canvas" aria-hidden="true" />;
}
