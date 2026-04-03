'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

export default function HeroSection({onLoad}) {
  const canvasRef = useRef(null);

  const loadingManager = new THREE.LoadingManager()
  loadingManager.onLoad = () => {
      if(onLoad) onLoad()
  }


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let resizeTimer = null;
    let animationId = null;

    // ====================== Renderer ======================
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,        
      stencil: false,
      depth: true,
      powerPreference: 'high-performance',
    });

    const dpr = Math.min(window.devicePixelRatio, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = false; 
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;

    // ====================== Scene & Camera ======================
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 0, 5);

    // ====================== Post-processing ======================
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.8,   // strength (было 1)
      0.4,   // radius
      0.85   // threshold — выше = меньше объектов в bloom
    );

    // Сильно снижаем разрешение bloom — это главный пожиратель FPS
    bloomPass.resolution.set(
      Math.floor(window.innerWidth * dpr * 0.45),
      Math.floor(window.innerHeight * dpr * 0.45)
    );
    composer.addPass(bloomPass);

    // ====================== Loading Manager ======================
    const textureLoader = new THREE.TextureLoader(loadingManager);

    // ====================== Textures ======================
    const bgTexture = textureLoader.load('./space_bg.jpg');
    bgTexture.colorSpace = THREE.SRGBColorSpace;

    const starTexture = textureLoader.load('./star.png');

    const cloudTexture = textureLoader.load('./e_cloud.jpg');
    cloudTexture.colorSpace = THREE.SRGBColorSpace;

    const moonTexture = textureLoader.load('./moon.jpg');
    moonTexture.colorSpace = THREE.SRGBColorSpace;

    const dayTexture = textureLoader.load('./earth.jpg');
    dayTexture.colorSpace = THREE.SRGBColorSpace;

    const nightTexture = textureLoader.load('./e_night.jpg');
    nightTexture.colorSpace = THREE.SRGBColorSpace;

    const normalMap = textureLoader.load('./earth_normal_map.jpg');
    normalMap.colorSpace = THREE.NoColorSpace; // важно для normal map!

    // ====================== Geometries ======================
    const bgGeometry = new THREE.SphereGeometry(1000, 32, 32);
    const planetGeometry = new THREE.SphereGeometry(1, 64, 48);
    const atmoGeometry = new THREE.SphereGeometry(1.015, 48, 48);
    const cloudGeometry = new THREE.SphereGeometry(1.008, 48, 48);
    const moonGeometry = new THREE.SphereGeometry(0.27, 32, 32);

    // Stars
    const count = 1200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 28;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // ====================== Materials ======================
    const bgMaterial = new THREE.MeshBasicMaterial({
      map: bgTexture,
      side: THREE.BackSide,
    });

    const starMaterial = new THREE.PointsMaterial({
      size: 0.08,
      map: starTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const planetMaterial = new THREE.ShaderMaterial({
      uniforms: {
        dayTexture: { value: dayTexture },
        nightTexture: { value: nightTexture },
        normalMap: { value: normalMap },
        sunDirection: { value: new THREE.Vector3(-0.8, 0.6, 0.4).normalize() },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D dayTexture;
        uniform sampler2D nightTexture;
        uniform sampler2D normalMap;
        uniform vec3 sunDirection;

        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
          vec3 nMap = texture2D(normalMap, vUv).xyz * 2.0 - 1.0;
          vec3 normal = normalize(vNormal + nMap * 1.2);

          float intensity = max(0.0, dot(normal, sunDirection));
          float blend = smoothstep(-0.15, 0.25, intensity);

          vec4 day = texture2D(dayTexture, vUv);
          vec4 night = texture2D(nightTexture, vUv) * 3.2;

          float specular = pow(intensity, 28.0) * 0.7;

          gl_FragColor = mix(night, day, blend) + vec4(specular, specular * 0.9, specular * 0.6, 0.0);
        }
      `,
    });

    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x66aaff,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });

    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      shininess: 1,
    });

    const moonMaterial = new THREE.MeshStandardMaterial({
      map: moonTexture,
      roughness: 0.9,
      metalness: 0.0,
    });

    // ====================== Meshes ======================
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    const atmosphere = new THREE.Mesh(atmoGeometry, atmosphereMaterial);
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    const stars = new THREE.Points(starGeometry, starMaterial);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
    directionalLight.position.set(-60, 40, 10);

    scene.add(ambientLight, directionalLight, bgMesh, stars, planet, atmosphere, clouds, moon);

    // ====================== Controls ======================
    const mouse = { x: 0, y: 0 };
    let targetCameraZ = 5;

    const handleMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1.8);
      targetCameraZ = 5 - progress * 2.2;
    };

    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (disposed) return;

        const w = window.innerWidth;
        const h = window.innerHeight;

        camera.aspect = w / h;
        camera.updateProjectionMatrix();

        renderer.setSize(w, h);
        composer.setSize(w, h);

        bloomPass.resolution.set(
          Math.floor(w * dpr * 0.45),
          Math.floor(h * dpr * 0.45)
        );
      }, 120);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // ====================== Animation ======================
    let time = 0;

    planet.rotation.set(0.1, -1.8, -0.4);

    function animate() {
      if (disposed) return;
      animationId = requestAnimationFrame(animate);
      time += 0.0012;

      // Moon orbit
      moon.position.x = Math.sin(time * 0.6) * 2.4;
      moon.position.y = Math.sin(time * 0.3) * 0.9;
      moon.position.z = Math.cos(time * 0.6) * 2.4;
      moon.rotation.y += 0.0008;

      // Slow rotation
      planet.rotation.y += 0.00012;
      clouds.rotation.y += 0.00018;

      // Smooth camera follow
      camera.position.x += (mouse.x * 2.2 - camera.position.x) * 0.035;
      camera.position.y += (mouse.y * 1.8 - camera.position.y) * 0.035;
      camera.position.z += (targetCameraZ - camera.position.z) * 0.055;

      camera.lookAt(0, 0, 0);

      composer.render();
    }

    animate();

    // ====================== Cleanup ======================
    return () => {
      disposed = true;
      if (animationId) cancelAnimationFrame(animationId);
      if (resizeTimer) clearTimeout(resizeTimer);

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      // Dispose everything
      [bgGeometry, planetGeometry, atmoGeometry, cloudGeometry, moonGeometry, starGeometry].forEach(g => g.dispose());
      [bgTexture, starTexture, cloudTexture, moonTexture, dayTexture, nightTexture, normalMap].forEach(t => t.dispose());
      [bgMaterial, planetMaterial, atmosphereMaterial, cloudMaterial, moonMaterial, starMaterial].forEach(m => m.dispose());

      composer.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full fixed inset-0" />;
}