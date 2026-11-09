"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type SceneCtx = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  canvas: HTMLCanvasElement;
  reduced: boolean;
  pointer: { x: number; y: number };
};

type Setup = (ctx: SceneCtx) => { tick: (t: number, dt: number) => void; resize?: (w: number, h: number) => void; dispose?: () => void };

/** Mounts a Three.js scene into a canvas, pauses when off-screen, respects reduced motion. */
export function useScene(setup: Setup, opts: { fov?: number; z?: number } = {}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      canvas.parentElement?.classList.add("no-webgl");
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(opts.fov ?? 35, 1, 0.1, 200);
    camera.position.set(0, 0, opts.z ?? 10);
    const pointer = { x: 0, y: 0 };
    const ctx: SceneCtx = { renderer, scene, camera, canvas, reduced, pointer };
    const api = setup(ctx);

    const resize = () => {
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      api.resize?.(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting), { rootMargin: "120px" });
    io.observe(canvas);

    const clock = new THREE.Clock();
    let raf = 0;
    let t = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!visible) return;
      t += reduced ? 0 : dt;
      api.tick(t, dt);
      renderer.render(scene, camera);
    };
    loop();
    canvas.parentElement?.classList.add("webgl-ready");

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      api.dispose?.();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => {
          Object.values(x).forEach((v) => (v as THREE.Texture)?.isTexture && (v as THREE.Texture).dispose());
          x.dispose();
        });
      });
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/** Draws on a 2D canvas and returns it as a texture. */
export function canvasTexture(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;
  draw(g);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  // redraw once web fonts are ready so text on 3D surfaces uses the brand fonts
  document.fonts?.ready.then(() => {
    g.clearRect(0, 0, w, h);
    draw(g);
    tex.needsUpdate = true;
  });
  return tex;
}

export function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

export const SANS = "Manrope, 'Manrope Variable', system-ui, sans-serif";
export const SERIF = "'Instrument Serif', Georgia, serif";
