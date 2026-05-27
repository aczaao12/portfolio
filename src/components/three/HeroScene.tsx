"use client";

import { useEffect, useRef } from "react";

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      const THREE = await import("three");
      const { EffectComposer } = await import("three/addons/postprocessing/EffectComposer.js");
      const { RenderPass } = await import("three/addons/postprocessing/RenderPass.js");
      const { UnrealBloomPass } = await import("three/addons/postprocessing/UnrealBloomPass.js");

      const container = containerRef.current;
      if (!container) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(container.clientWidth, container.clientHeight),
        0.25, 0.3, 0.1
      );
      composer.addPass(bloom);

      const count = 600;
      const spread = 16;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * spread;

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const pMat = new THREE.PointsMaterial({
        color: "#6b9e7a",
        size: 0.025,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      const particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);

      const linePairs: number[] = [];
      const maxDist = 2.8;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        for (let j = i + 1; j < count; j++) {
          const j3 = j * 3;
          const dx = pos[i3] - pos[j3], dy = pos[i3 + 1] - pos[j3 + 1], dz = pos[i3 + 2] - pos[j3 + 2];
          if (dx * dx + dy * dy + dz * dz < maxDist * maxDist) {
            linePairs.push(pos[i3], pos[i3 + 1], pos[i3 + 2], pos[j3], pos[j3 + 1], pos[j3 + 2]);
          }
        }
      }
      const lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePairs), 3));
      const lMat = new THREE.LineBasicMaterial({ color: "#4a7c59", transparent: true, opacity: 0.08 });
      const lines = new THREE.LineSegments(lGeo, lMat);
      scene.add(lines);

      const glowCount = 150;
      const glowSet = new Set<number>();
      while (glowSet.size < glowCount) glowSet.add(Math.floor(Math.random() * count));
      const gPos: number[] = [];
      const gSize: number[] = [];
      const gPhase: number[] = [];
      const gSpeed: number[] = [];
      for (const idx of glowSet) {
        const i3 = idx * 3;
        gPos.push(pos[i3], pos[i3 + 1], pos[i3 + 2]);
        gSize.push(0.06 + Math.random() * 0.14);
        gPhase.push(Math.random() * Math.PI * 2);
        gSpeed.push(0.4 + Math.random() * 2.0);
      }
      const glowGeo = new THREE.BufferGeometry();
      glowGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(gPos), 3));
      glowGeo.setAttribute("aSize", new THREE.BufferAttribute(new Float32Array(gSize), 1));
      glowGeo.setAttribute("aPhase", new THREE.BufferAttribute(new Float32Array(gPhase), 1));
      glowGeo.setAttribute("aSpeed", new THREE.BufferAttribute(new Float32Array(gSpeed), 1));

      const glowMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color("#8bc99b") },
        },
        vertexShader: `
          attribute float aSize;
          attribute float aPhase;
          attribute float aSpeed;
          uniform float uTime;
          varying float vAlpha;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float pulse = 0.5 + 0.5 * sin(uTime * aSpeed + aPhase);
            gl_PointSize = aSize * (300.0 / -mvPosition.z) * (0.5 + 0.5 * pulse);
            gl_Position = projectionMatrix * mvPosition;
            vAlpha = 0.2 + 0.8 * pulse;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          varying float vAlpha;
          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
            gl_FragColor = vec4(uColor, alpha * 0.7);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const glows = new THREE.Points(glowGeo, glowMat);
      scene.add(glows);

      const pivot = new THREE.Group();
      pivot.add(particles);
      pivot.add(lines);
      pivot.add(glows);
      scene.add(pivot);

      const mouseTarget = { x: 0, y: 0 };
      const currentRot = { x: 0, y: 0 };
      const onMouse = (e: MouseEvent) => {
        mouseTarget.x = ((e.clientX / window.innerWidth) * 2 - 1) * 0.4;
        mouseTarget.y = (-(e.clientY / window.innerHeight) * 2 + 1) * 0.3;
      };
      window.addEventListener("mousemove", onMouse);

      function animate() {
        if (!mounted) return;
        requestAnimationFrame(animate);
        currentRot.x += (mouseTarget.y - currentRot.x) * 0.04;
        currentRot.y += (mouseTarget.x - currentRot.y) * 0.04;
        pivot.rotation.x = currentRot.x;
        pivot.rotation.y = currentRot.y;
        pivot.rotation.z += 0.0002;
        glowMat.uniforms.uTime.value += 0.02;
        composer.render();
      }
      animate();

      let resizeTimer: ReturnType<typeof setTimeout>;
      function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (!container || !mounted) return;
          const w = container.clientWidth, h = container.clientHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
          composer.setSize(w, h);
        }, 100);
      }
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
        pGeo.dispose(); pMat.dispose();
        lGeo.dispose(); lMat.dispose();
        glowGeo.dispose(); glowMat.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      };
    }

    const cleanupPromise = init();
    return () => {
      mounted = false;
      cleanupPromise.then((fn) => fn?.());
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
}
