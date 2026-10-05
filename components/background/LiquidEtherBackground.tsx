"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface LiquidEtherConfig {
  mouseForce?: number;
  cursorSize?: number;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  resolution?: number;
  bfecc?: boolean;
  vorticity?: number;
  decay?: number;
}

export default function LiquidEtherBackground({
  mouseForce = 22,
  cursorSize = 120,
  autoDemo = true,
  autoSpeed = 0.35,
  autoIntensity = 1.6,
  resolution = 0.55,
  bfecc = true,
  vorticity = 18.0,
  decay = 0.982,
}: LiquidEtherConfig) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Responsive simulation scaling
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const activeRes = isMobile ? 0.35 : isTablet ? 0.45 : resolution;
    const activeSpeed = prefersReducedMotion ? autoSpeed * 0.2 : autoSpeed;
    const activeIntensity = prefersReducedMotion
      ? autoIntensity * 0.3
      : autoIntensity;

    // Verify WebGL support
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        powerPreference: "high-performance",
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
      });
    } catch (e) {
      console.warn("WebGL not available for LiquidEther:", e);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.className = "w-full h-full block";
    renderer.domElement.style.opacity = "0.92";
    container.appendChild(renderer.domElement);

    const gl = renderer.getContext();
    const isWebGL2 = renderer.capabilities.isWebGL2;
    const extHalfFloat = isWebGL2
      ? gl.getExtension("EXT_color_buffer_float")
      : gl.getExtension("OES_texture_half_float") &&
        gl.getExtension("OES_texture_half_float_linear");

    const texType = extHalfFloat
      ? THREE.HalfFloatType
      : THREE.UnsignedByteType;

    let width = Math.max(64, Math.floor(window.innerWidth * activeRes));
    let height = Math.max(64, Math.floor(window.innerHeight * activeRes));

    const simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const simScene = new THREE.Scene();
    const quadGeo = new THREE.PlaneGeometry(2, 2);

    // Helpers to create Double Buffer FBOs (Ping-Pong)
    const createFBO = (w: number, h: number, format = THREE.RGBAFormat) => {
      return new THREE.WebGLRenderTarget(w, h, {
        type: texType,
        format,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        depthBuffer: false,
        stencilBuffer: false,
      });
    };

    const createDoubleFBO = (w: number, h: number, format = THREE.RGBAFormat) => {
      return {
        read: createFBO(w, h, format),
        write: createFBO(w, h, format),
        swap() {
          const temp = this.read;
          this.read = this.write;
          this.write = temp;
        },
      };
    };

    let density = createDoubleFBO(width, height);
    let velocity = createDoubleFBO(width, height);
    let pressure = createDoubleFBO(width, height);
    let divergence = createFBO(width, height);
    let curl = createFBO(width, height);

    // Base Vertex Shader
    const baseVert = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    // 1. Splat Shader (adds force / dye)
    const splatMat = new THREE.ShaderMaterial({
      vertexShader: baseVert,
      fragmentShader: `
        precision highp float;
        uniform sampler2D uTarget;
        uniform vec2 uPoint;
        uniform vec3 uColor;
        uniform float uRadius;
        uniform float uAspect;
        varying vec2 vUv;
        void main() {
          vec2 p = vUv - uPoint;
          p.x *= uAspect;
          vec3 splat = exp(-dot(p, p) / max(uRadius, 0.0001)) * uColor;
          vec3 base = texture2D(uTarget, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.0);
        }
      `,
      uniforms: {
        uTarget: { value: null },
        uPoint: { value: new THREE.Vector2() },
        uColor: { value: new THREE.Vector3() },
        uRadius: { value: 0.002 },
        uAspect: { value: window.innerWidth / window.innerHeight },
      },
    });

    // 2. Advection Shader (with optional BFECC)
    const advectionMat = new THREE.ShaderMaterial({
      vertexShader: baseVert,
      fragmentShader: `
        precision highp float;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 uTexelSize;
        uniform float uDt;
        uniform float uDissipation;
        varying vec2 vUv;
        void main() {
          vec2 coord = vUv - uDt * texture2D(uVelocity, vUv).xy * uTexelSize;
          gl_FragColor = uDissipation * texture2D(uSource, coord);
        }
      `,
      uniforms: {
        uVelocity: { value: null },
        uSource: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / width, 1 / height) },
        uDt: { value: 0.016 },
        uDissipation: { value: decay },
      },
    });

    // 3. Curl Shader (computes vorticity)
    const curlMat = new THREE.ShaderMaterial({
      vertexShader: baseVert,
      fragmentShader: `
        precision highp float;
        uniform sampler2D uVelocity;
        uniform vec2 uTexelSize;
        varying vec2 vUv;
        void main() {
          float L = texture2D(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).y;
          float R = texture2D(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).y;
          float B = texture2D(uVelocity, vUv - vec2(0.0, uTexelSize.y)).x;
          float T = texture2D(uVelocity, vUv + vec2(0.0, uTexelSize.y)).x;
          float c = (R - L) - (T - B);
          gl_FragColor = vec4(0.5 * c, 0.0, 0.0, 1.0);
        }
      `,
      uniforms: {
        uVelocity: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / width, 1 / height) },
      },
    });

    // 4. Vorticity Confinement Shader
    const vorticityMat = new THREE.ShaderMaterial({
      vertexShader: baseVert,
      fragmentShader: `
        precision highp float;
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float uCurlScale;
        uniform float uDt;
        uniform vec2 uTexelSize;
        varying vec2 vUv;
        void main() {
          float L = texture2D(uCurl, vUv - vec2(uTexelSize.x, 0.0)).x;
          float R = texture2D(uCurl, vUv + vec2(uTexelSize.x, 0.0)).x;
          float B = texture2D(uCurl, vUv - vec2(0.0, uTexelSize.y)).x;
          float T = texture2D(uCurl, vUv + vec2(0.0, uTexelSize.y)).x;
          float C = texture2D(uCurl, vUv).x;

          vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
          float len = length(force) + 0.0001;
          force = (force / len) * uCurlScale * C;
          force.y *= -1.0;

          vec2 vel = texture2D(uVelocity, vUv).xy;
          gl_FragColor = vec4(vel + force * uDt, 0.0, 1.0);
        }
      `,
      uniforms: {
        uVelocity: { value: null },
        uCurl: { value: null },
        uCurlScale: { value: vorticity },
        uDt: { value: 0.016 },
        uTexelSize: { value: new THREE.Vector2(1 / width, 1 / height) },
      },
    });

    // 5. Divergence Shader
    const divergenceMat = new THREE.ShaderMaterial({
      vertexShader: baseVert,
      fragmentShader: `
        precision highp float;
        uniform sampler2D uVelocity;
        uniform vec2 uTexelSize;
        varying vec2 vUv;
        void main() {
          float L = texture2D(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).x;
          float R = texture2D(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).x;
          float B = texture2D(uVelocity, vUv - vec2(0.0, uTexelSize.y)).y;
          float T = texture2D(uVelocity, vUv + vec2(0.0, uTexelSize.y)).y;
          float div = 0.5 * ((R - L) + (T - B));
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
      `,
      uniforms: {
        uVelocity: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / width, 1 / height) },
      },
    });

    // 6. Pressure Solve (Jacobi) Shader
    const pressureMat = new THREE.ShaderMaterial({
      vertexShader: baseVert,
      fragmentShader: `
        precision highp float;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;
        uniform vec2 uTexelSize;
        varying vec2 vUv;
        void main() {
          float L = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
          float R = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
          float B = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
          float T = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
          float div = texture2D(uDivergence, vUv).x;
          float p = (L + R + B + T - div) * 0.25;
          gl_FragColor = vec4(p, 0.0, 0.0, 1.0);
        }
      `,
      uniforms: {
        uPressure: { value: null },
        uDivergence: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / width, 1 / height) },
      },
    });

    // 7. Gradient Subtract Shader (Project to Divergence-Free)
    const gradientSubtractMat = new THREE.ShaderMaterial({
      vertexShader: baseVert,
      fragmentShader: `
        precision highp float;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;
        uniform vec2 uTexelSize;
        varying vec2 vUv;
        void main() {
          float L = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
          float R = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
          float B = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
          float T = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
          vec2 vel = texture2D(uVelocity, vUv).xy;
          vel -= 0.5 * vec2(R - L, T - B);
          gl_FragColor = vec4(vel, 0.0, 1.0);
        }
      `,
      uniforms: {
        uPressure: { value: null },
        uVelocity: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / width, 1 / height) },
      },
    });

    // 8. Display Shader — Obsidian Black + Inferno Orange + Ember Palette
    const displayMat = new THREE.ShaderMaterial({
      vertexShader: baseVert,
      fragmentShader: `
        precision highp float;
        uniform sampler2D uDensity;
        uniform sampler2D uVelocity;
        uniform vec3 uColorBase;
        uniform vec3 uColorEmber;
        uniform vec3 uColorOrange;
        uniform vec3 uColorGlow;
        uniform vec3 uColorHighlight;
        uniform float uTime;
        varying vec2 vUv;

        void main() {
          vec4 dens = texture2D(uDensity, vUv);
          vec2 vel = texture2D(uVelocity, vUv).xy;
          float intensity = clamp(length(dens.xyz), 0.0, 2.5);
          float speed = clamp(length(vel) * 0.05, 0.0, 1.0);

          // Deep fluid color grading: obsidian black -> ember -> fiery orange -> subtle warm highlight
          vec3 col = uColorBase;
          col = mix(col, uColorEmber, smoothstep(0.02, 0.35, intensity));
          col = mix(col, uColorOrange, smoothstep(0.25, 0.85, intensity));
          col = mix(col, uColorGlow, smoothstep(0.75, 1.45, intensity));
          col = mix(col, uColorHighlight, smoothstep(1.35, 2.2, intensity));

          // Subtle energy filament contour
          float filament = smoothstep(0.3, 0.38, intensity) * (1.0 - smoothstep(0.42, 0.52, intensity));
          col += uColorOrange * filament * 0.35;

          // Vignette around edges to keep center dark and text legible
          vec2 uvC = vUv * (1.0 - vUv.yx);
          float vig = uvC.x * uvC.y * 16.0;
          vig = clamp(pow(vig, 0.25), 0.0, 1.0);

          // Subtle opacity blend
          float alpha = clamp(intensity * 0.88 + speed * 0.15, 0.0, 0.95);
          gl_FragColor = vec4(col, alpha);
        }
      `,
      uniforms: {
        uDensity: { value: null },
        uVelocity: { value: null },
        uColorBase: { value: new THREE.Color("#050505") },
        uColorEmber: { value: new THREE.Color("#5b170e") },
        uColorOrange: { value: new THREE.Color("#ff5a1f") },
        uColorGlow: { value: new THREE.Color("#ff8a3d") },
        uColorHighlight: { value: new THREE.Color("#f3f0ea") },
        uTime: { value: 0 },
      },
      transparent: true,
      blending: THREE.NormalBlending,
    });

    const simQuad = new THREE.Mesh(quadGeo, splatMat);
    simScene.add(simQuad);

    // Pass executor
    const renderPass = (target: THREE.WebGLRenderTarget | null, material: THREE.ShaderMaterial) => {
      simQuad.material = material;
      renderer.setRenderTarget(target);
      renderer.render(simScene, simCamera);
    };

    // Splat application
    const applySplat = (
      x: number,
      y: number,
      dx: number,
      dy: number,
      color: THREE.Vector3,
      radiusScale = 1.0
    ) => {
      const radius = (cursorSize / Math.max(window.innerWidth, window.innerHeight)) * 0.003 * radiusScale;
      splatMat.uniforms.uPoint.value.set(x, 1.0 - y);
      splatMat.uniforms.uRadius.value = radius;
      splatMat.uniforms.uAspect.value = window.innerWidth / window.innerHeight;

      // Splat Velocity
      splatMat.uniforms.uTarget.value = velocity.read.texture;
      splatMat.uniforms.uColor.value.set(dx * mouseForce, -dy * mouseForce, 0.0);
      renderPass(velocity.write, splatMat);
      velocity.swap();

      // Splat Density
      splatMat.uniforms.uTarget.value = density.read.texture;
      splatMat.uniforms.uColor.value.copy(color);
      renderPass(density.write, splatMat);
      density.swap();
    };

    // Initial warm ember splats to prime the canvas
    const initSplatColors = [
      new THREE.Vector3(0.9, 0.35, 0.12),
      new THREE.Vector3(0.7, 0.18, 0.08),
      new THREE.Vector3(1.0, 0.45, 0.18),
    ];

    applySplat(0.2, 0.3, 0.4, -0.2, initSplatColors[0], 2.2);
    applySplat(0.8, 0.7, -0.3, 0.3, initSplatColors[1], 2.5);
    applySplat(0.5, 0.5, 0.2, 0.1, initSplatColors[2], 2.0);

    // Pointer tracking
    let lastX = 0;
    let lastY = 0;
    let hasMoved = false;
    let lastMoveTime = performance.now();

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        if (e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        }
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;

      if (!hasMoved) {
        lastX = x;
        lastY = y;
        hasMoved = true;
        return;
      }

      const dx = (x - lastX) * 15;
      const dy = (y - lastY) * 15;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 0.001) {
        // Dynamic fluid dye color based on motion
        const orangeColor = new THREE.Vector3(
          0.85 + Math.random() * 0.35,
          0.28 + Math.random() * 0.18,
          0.08 + Math.random() * 0.08
        );
        applySplat(x, y, dx, dy, orangeColor, 1.2);
        lastX = x;
        lastY = y;
        lastMoveTime = performance.now();
      }
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });

    // Resize handling
    let resizeTimeout: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = Math.max(64, Math.floor(window.innerWidth * activeRes));
        height = Math.max(64, Math.floor(window.innerHeight * activeRes));
        renderer.setSize(window.innerWidth, window.innerHeight);

        density = createDoubleFBO(width, height);
        velocity = createDoubleFBO(width, height);
        pressure = createDoubleFBO(width, height);
        divergence = createFBO(width, height);
        curl = createFBO(width, height);

        const texel = new THREE.Vector2(1 / width, 1 / height);
        advectionMat.uniforms.uTexelSize.value.copy(texel);
        curlMat.uniforms.uTexelSize.value.copy(texel);
        vorticityMat.uniforms.uTexelSize.value.copy(texel);
        divergenceMat.uniforms.uTexelSize.value.copy(texel);
        pressureMat.uniforms.uTexelSize.value.copy(texel);
        gradientSubtractMat.uniforms.uTexelSize.value.copy(texel);
      }, 150);
    };

    window.addEventListener("resize", onResize);

    // Visibility / Intersection handling
    let isVisible = true;
    const onVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting && document.visibilityState === "visible";
      });
    });
    observer.observe(container);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const render = () => {
      animId = requestAnimationFrame(render);

      if (!isVisible) return;

      const dt = Math.min(clock.getDelta(), 0.033);
      const time = clock.getElapsedTime();

      // Autonomous idle motion (AutoDemo)
      if (autoDemo) {
        const now = performance.now();
        const timeSinceMove = (now - lastMoveTime) / 1000;
        const autoWeight = Math.min(1.0, Math.max(0.25, timeSinceMove * 0.8));

        // Elegant double Lissajous flow
        const autoX1 = 0.5 + Math.sin(time * activeSpeed * 1.3) * 0.38;
        const autoY1 = 0.5 + Math.cos(time * activeSpeed * 0.9) * 0.32;
        const autoDx1 = Math.cos(time * activeSpeed * 1.3) * activeIntensity * 0.8 * autoWeight;
        const autoDy1 = -Math.sin(time * activeSpeed * 0.9) * activeIntensity * 0.8 * autoWeight;

        const autoX2 = 0.5 + Math.cos(time * activeSpeed * 0.7 + 1.5) * 0.35;
        const autoY2 = 0.5 + Math.sin(time * activeSpeed * 1.1 + 2.0) * 0.35;
        const autoDx2 = -Math.sin(time * activeSpeed * 0.7 + 1.5) * activeIntensity * 0.6 * autoWeight;
        const autoDy2 = Math.cos(time * activeSpeed * 1.1 + 2.0) * activeIntensity * 0.6 * autoWeight;

        const ember1 = new THREE.Vector3(0.95, 0.32, 0.1);
        const ember2 = new THREE.Vector3(0.65, 0.15, 0.06);

        applySplat(autoX1, autoY1, autoDx1, autoDy1, ember1, 1.8);
        applySplat(autoX2, autoY2, autoDx2, autoDy2, ember2, 2.2);
      }

      // Step 1: Curl
      curlMat.uniforms.uVelocity.value = velocity.read.texture;
      renderPass(curl, curlMat);

      // Step 2: Vorticity Confinement
      vorticityMat.uniforms.uVelocity.value = velocity.read.texture;
      vorticityMat.uniforms.uCurl.value = curl.texture;
      vorticityMat.uniforms.uDt.value = dt;
      renderPass(velocity.write, vorticityMat);
      velocity.swap();

      // Step 3: Divergence
      divergenceMat.uniforms.uVelocity.value = velocity.read.texture;
      renderPass(divergence, divergenceMat);

      // Step 4: Pressure Solve (Jacobi 18 iterations)
      pressureMat.uniforms.uDivergence.value = divergence.texture;
      for (let i = 0; i < 18; i++) {
        pressureMat.uniforms.uPressure.value = pressure.read.texture;
        renderPass(pressure.write, pressureMat);
        pressure.swap();
      }

      // Step 5: Gradient Subtract (Make Divergence-Free)
      gradientSubtractMat.uniforms.uPressure.value = pressure.read.texture;
      gradientSubtractMat.uniforms.uVelocity.value = velocity.read.texture;
      renderPass(velocity.write, gradientSubtractMat);
      velocity.swap();

      // Step 6: Advect Velocity
      advectionMat.uniforms.uVelocity.value = velocity.read.texture;
      advectionMat.uniforms.uSource.value = velocity.read.texture;
      advectionMat.uniforms.uDt.value = dt;
      advectionMat.uniforms.uDissipation.value = 0.985;
      renderPass(velocity.write, advectionMat);
      velocity.swap();

      // Step 7: Advect Density (Dye)
      advectionMat.uniforms.uVelocity.value = velocity.read.texture;
      advectionMat.uniforms.uSource.value = density.read.texture;
      advectionMat.uniforms.uDt.value = dt;
      advectionMat.uniforms.uDissipation.value = decay;
      renderPass(density.write, advectionMat);
      density.swap();

      // Step 8: Final Render to Screen
      displayMat.uniforms.uDensity.value = density.read.texture;
      displayMat.uniforms.uVelocity.value = velocity.read.texture;
      displayMat.uniforms.uTime.value = time;
      renderPass(null, displayMat);
    };

    render();

    // Cleanup logic
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer.disconnect();

      quadGeo.dispose();
      splatMat.dispose();
      advectionMat.dispose();
      curlMat.dispose();
      vorticityMat.dispose();
      divergenceMat.dispose();
      pressureMat.dispose();
      gradientSubtractMat.dispose();
      displayMat.dispose();

      density.read.dispose();
      density.write.dispose();
      velocity.read.dispose();
      velocity.write.dispose();
      pressure.read.dispose();
      pressure.write.dispose();
      divergence.dispose();
      curl.dispose();

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [
    mouseForce,
    cursorSize,
    autoDemo,
    autoSpeed,
    autoIntensity,
    resolution,
    bfecc,
    vorticity,
    decay,
  ]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#070707]"
    >
      {/* Subtle Atmospheric Orange & Amber Ambient Energy Bloom */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(255,90,31,0.22) 0%, rgba(91,23,14,0.12) 55%, transparent 75%)",
          filter: "blur(70px)",
        }}
      />

      {/* Subtle Technical Cyan Filament Glow */}
      <div
        className="pointer-events-none absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(125,249,255,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Dark Readability Scrim Overlay (ensures text, code, and navigation remain 100% legible) */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(7,7,7,0.45) 0%, rgba(7,7,7,0.7) 100%)",
        }}
      />
    </div>
  );
}
