'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'

export default function HeroScene({ flyToBerlin, onLoad, onProgress }) {
  const canvasRef = useRef(null)
  const flyRef = useRef(false)
  const visibleRef = useRef(true)
  const reduceMotionRef = useRef(false)
  const onLoadRef = useRef(onLoad)
  const onProgressRef = useRef(onProgress)

  useEffect(() => {
    flyRef.current = flyToBerlin
  }, [flyToBerlin])

  useEffect(() => {
    onLoadRef.current = onLoad
    onProgressRef.current = onProgress
  }, [onLoad, onProgress])

  useEffect(() => {
    if (!canvasRef.current) return

    reduceMotionRef.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const loadingManager = new THREE.LoadingManager()
    loadingManager.onLoad = () => {
      onLoadRef.current?.()
    }
    loadingManager.onProgress = (_url, loaded, total) => {
      if (total > 0) {
        onProgressRef.current?.(Math.round((loaded / total) * 100))
      }
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000)
    camera.position.z = 5
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance',
    })
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(pixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap

    const labelRenderer = new CSS2DRenderer()
    labelRenderer.setSize(window.innerWidth, window.innerHeight)
    labelRenderer.domElement.style.position = 'absolute'
    labelRenderer.domElement.style.top = '0'
    labelRenderer.domElement.style.left = '0'
    labelRenderer.domElement.style.pointerEvents = 'none'
    labelRenderer.domElement.style.zIndex = '5'
    canvasRef.current.parentElement.appendChild(labelRenderer.domElement)

    const berlinDiv = document.createElement('div')
    berlinDiv.innerHTML = `
      <div style="background: rgba(9,9,11,0.75); backdrop-filter: blur(12px);
        border: 1px solid rgba(255,255,255,0.18); border-radius: 14px;
        padding: 14px 18px; color: white; font-size: 13px; font-family: system-ui, sans-serif;
        box-shadow: 0 12px 40px rgba(0,0,0,0.45); display: none; min-width: 200px;">
        <p style="margin:0 0 6px; font-weight:600; letter-spacing:0.02em;">📍 Berlin, Deutschland</p>
        <p style="margin:0 0 8px; color:#a1a1aa;">evgenykvest@gmail.com</p>
        <a href="https://github.com/SkoofyDoo" target="_blank" rel="noopener noreferrer"
           style="color:#60a5fa; text-decoration:none; pointer-events:auto;">GitHub →</a>
      </div>
    `
    berlinDiv.style.pointerEvents = 'none'

    // Berlin geo → sphere coords (radius slightly above surface)
    const lat = 52.52 * (Math.PI / 180)
    const lon = 13.4 * (Math.PI / 180)
    const r = 1.06
    const berlinX = r * Math.cos(lat) * Math.sin(lon)
    const berlinY = r * Math.sin(lat)
    const berlinZ = r * Math.cos(lat) * Math.cos(lon)

    const berlinLabel = new CSS2DObject(berlinDiv)
    berlinLabel.position.set(berlinX, berlinY, berlinZ)

    // Marker pin
    const markerGeo = new THREE.SphereGeometry(0.018, 16, 16)
    const markerMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa })
    const marker = new THREE.Mesh(markerGeo, markerMat)
    marker.position.set(berlinX, berlinY, berlinZ)

    const normalQuaternion = new THREE.Quaternion()
    const berlinQuaternion = new THREE.Quaternion()
    normalQuaternion.setFromEuler(new THREE.Euler(0, -1.8, -0.41))
    berlinQuaternion.setFromEuler(new THREE.Euler(0.1, -1.65, -0.85))

    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.85,
      0.35,
      0.65
    )
    composer.addPass(bloomPass)

    const count = 800
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20
    }

    const starGeometry = new THREE.BufferGeometry()
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const bgGeometry = new THREE.SphereGeometry(1000, 48, 48)
    const planetGeometry = new THREE.SphereGeometry(1, 64, 64)
    const atmoGeometry = new THREE.SphereGeometry(1.02, 64, 64)
    const cloudGeometry = new THREE.SphereGeometry(1.008, 64, 64)
    const moonGeometry = new THREE.SphereGeometry(0.25, 48, 48)

    const textureLoader = new THREE.TextureLoader(loadingManager)
    const textures = []

    const loadTex = (url, colorSpace) => {
      const t = textureLoader.load(url)
      if (colorSpace) t.colorSpace = colorSpace
      textures.push(t)
      return t
    }

    const bgTexture = loadTex('space_bg.jpg', THREE.SRGBColorSpace)
    bgTexture.minFilter = THREE.LinearFilter
    bgTexture.magFilter = THREE.LinearFilter
    const starTexture = loadTex('star.png')
    const cloudTexture = loadTex('e_cloud.jpg')
    const moonTexture = loadTex('moon.jpg', THREE.SRGBColorSpace)
    const dayTexture = loadTex('earth.jpg', THREE.SRGBColorSpace)
    const nightTexture = loadTex('e_night.jpg', THREE.SRGBColorSpace)
    const normalMap = loadTex('earth_normal_map.jpg')

    const starMaterial = new THREE.PointsMaterial({
      size: 0.1,
      map: starTexture,
      transparent: true,
      alphaTest: 0.01,
      depthWrite: false,
    })

    const bgMaterial = new THREE.MeshBasicMaterial({
      map: bgTexture,
      side: THREE.BackSide,
    })

    const planetMaterial = new THREE.ShaderMaterial({
      uniforms: {
        dayTexture: { value: dayTexture },
        nightTexture: { value: nightTexture },
        normalMap: { value: normalMap },
        sunDirection: { value: new THREE.Vector3(-60, 10, 10).normalize() },
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
          vec3 normalMapValue = texture2D(normalMap, vUv).xyz * 2.0 - 1.0;
          vec3 perturbedNormal = normalize(vNormal + normalMapValue * 1.5);
          float intensity = dot(perturbedNormal, sunDirection);
          float blend = smoothstep(-0.1, 0.1, intensity);
          vec4 day = texture2D(dayTexture, vUv);
          vec4 night = texture2D(nightTexture, vUv);
          float specular = pow(max(0.0, intensity), 32.0) * 0.6;
          vec4 nightBoosted = night * 3.5;
          gl_FragColor = mix(nightBoosted, day, blend) + vec4(specular, specular, specular, 0.0);
        }
      `,
    })

    // Soft Fresnel-like atmosphere
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0x4a90ff) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPositionNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        varying vec3 vPositionNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vPositionNormal), 2.2);
          gl_FragColor = vec4(glowColor, 1.0) * intensity * 0.55;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    })

    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      opacity: 0.9,
      transparent: true,
      alphaTest: 0.01,
      depthWrite: false,
    })

    const moonMaterial = new THREE.MeshStandardMaterial({
      map: moonTexture,
      roughness: 0.85,
      metalness: 0,
    })

    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial)
    const planet = new THREE.Mesh(planetGeometry, planetMaterial)
    planet.add(berlinLabel)
    planet.add(marker)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.12)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight.position.set(-60, 40, 10)
    directionalLight.castShadow = true

    const atmosphere = new THREE.Mesh(atmoGeometry, atmosphereMaterial)
    const particles = new THREE.Points(starGeometry, starMaterial)
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial)
    const moon = new THREE.Mesh(moonGeometry, moonMaterial)

    planet.castShadow = true
    planet.receiveShadow = true
    moon.castShadow = true
    moon.receiveShadow = true

    scene.add(ambientLight, directionalLight, bgMesh, moon, particles, planet, atmosphere, clouds)

    planet.rotation.y = -1.8
    planet.rotation.z = -0.4
    planet.rotation.x = 0.1

    let animationId = null
    let time = 0
    const mouse = { x: 0, y: 0 }
    let targetCameraZ = 5

    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    const handleScroll = () => {
      const scrollProgress = window.scrollY / window.innerHeight
      targetCameraZ = 5 - Math.min(scrollProgress, 1.2) * 1.8
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      const pr = Math.min(window.devicePixelRatio || 1, 1.75)
      renderer.setPixelRatio(pr)
      renderer.setSize(window.innerWidth, window.innerHeight)
      composer.setSize(window.innerWidth, window.innerHeight)
      labelRenderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    // Pause render loop when hero leaves viewport
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    if (canvasRef.current.parentElement) {
      io.observe(canvasRef.current.parentElement)
    }

    const disposables = [
      starGeometry,
      bgGeometry,
      planetGeometry,
      atmoGeometry,
      cloudGeometry,
      moonGeometry,
      markerGeo,
      starMaterial,
      bgMaterial,
      planetMaterial,
      atmosphereMaterial,
      cloudMaterial,
      moonMaterial,
      markerMat,
    ]

    function animate() {
      animationId = requestAnimationFrame(animate)

      if (!visibleRef.current) return

      const reduced = reduceMotionRef.current
      const speed = reduced ? 0.15 : 1

      if (!reduced) {
        moon.position.z = Math.cos(time) * 2
        moon.position.x = Math.sin(time) * 2
        moon.position.y = Math.sin(time) * 0.8
        moon.rotation.y += 0.0005 * speed
        clouds.rotation.y += -0.00006 * speed
        time += 0.001 * speed
      } else {
        moon.position.set(1.6, 0.5, 1.2)
      }

      if (flyRef.current) {
        planet.quaternion.slerp(berlinQuaternion, reduced ? 0.08 : 0.02)
        camera.position.z += (1.55 - camera.position.z) * (reduced ? 0.08 : 0.02)
        camera.position.x += (0 - camera.position.x) * 0.04
        camera.position.y += (0.15 - camera.position.y) * 0.04
      } else {
        if (!reduced) planet.rotateY(0.00015)
        camera.position.x += (mouse.x * 1.6 - camera.position.x) * 0.05
        camera.position.y += (mouse.y * 1.2 - camera.position.y) * 0.05
        camera.position.z += (targetCameraZ - camera.position.z) * 0.05
      }

      const labelEl = berlinDiv.querySelector('div')
      if (labelEl) labelEl.style.display = flyRef.current ? 'block' : 'none'
      marker.visible = flyRef.current

      camera.lookAt(0, 0, 0)
      labelRenderer.render(scene, camera)
      composer.render()
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      io.disconnect()
      cancelAnimationFrame(animationId)

      labelRenderer.domElement?.parentElement?.removeChild(labelRenderer.domElement)

      disposables.forEach((d) => d.dispose?.())
      textures.forEach((t) => t.dispose?.())
      composer.dispose?.()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full fixed inset-0" aria-hidden="true" />
}
