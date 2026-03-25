'use client'


import {useEffect, useRef} from 'react'
import * as THREE from 'three'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import {CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer'




export default function HeroSection({flyToBerlin}){
    const canvasRef = useRef(null)
    const flyRef = useRef(null)
    


    
    useEffect(() => {
        flyRef.current = flyToBerlin
    }, [flyToBerlin])

    useEffect(() => {       
        
        if(!canvasRef.current) return  
        
        // Scene 
        const scene = new THREE.Scene()
        
        
        
        // Camera
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000)
        
        camera.position.z = 5
        camera.aspect = window.innerWidth/window.innerHeight
        camera.updateProjectionMatrix()

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current, 
            antialias: true
        })

        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(window.devicePixelRatio)




        // CSS2D Renderer für Berlin Label
        const labelRenderer = new CSS2DRenderer()
        labelRenderer.setSize(window.innerWidth, window.innerHeight)
        labelRenderer.domElement.style.position = 'absolute'
        labelRenderer.domElement.style.top = '0'
        labelRenderer.domElement.style.pointerEvents = 'none'
        
        canvasRef.current.parentElement.appendChild(labelRenderer.domElement)
        
        const berlinDiv = document.createElement('div')
        berlinDiv.className = 'berlin-label'
        berlinDiv.innerHTML = `
            <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); 
            border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; 
            padding: 12px 16px; color: white; font-size: 12px; display: none;">
                <p>📍 Berlin, Deutschland</p>
                <p>✉️ evgenykvest@gmail.com</p>
                <a href="https://github.com/SkoofyDoo" style="color: #60a5fa;">GitHub</a>
            </div>
        `
        berlinDiv.style.pointerEvents = 'none'

        // Berlin Koordinaten
        const lat = 52.52 * (Math.PI / 180)
        const lon = 13.40 * (Math.PI / 180)

        const berlinX = 1.05 * Math.cos(lat) * Math.sin(lon)
        const berlinY = 1.05 * Math.sin(lat)
        const berlinZ = 1.05 * Math.cos(lat) * Math.cos(lon)

        const berlinLabel = new CSS2DObject(berlinDiv)
        berlinLabel.position.set(0.1, -0.1, -0.1)
        

        // Berlin Koordinaten   
        const normalQuaternion = new THREE.Quaternion()
        const berlinQuaternion = new THREE.Quaternion()
        const normalEuler = new THREE.Euler(0,-1.8, -0.41)
        normalQuaternion.setFromEuler(normalEuler)
        
        const berlinEuler = new THREE.Euler(0.1, -1.65, -0.85)
        berlinQuaternion.setFromEuler(berlinEuler)

        // Composer
        const composer = new EffectComposer(renderer)
        const renderPass = new RenderPass(scene, camera)
        composer.addPass(renderPass)

        // // Bloom
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1, 0.3, 0.6)


        composer.addPass(bloomPass)
        
        // PartikelAnzhal (Stere)
        const count = 1000;
        const positions = new Float32Array(count * 3)
        
        for(let i = 0; i < count * 3; i++){
            positions[i] = (Math.random() - 0.5) * 20
        }
        
        //---------- Geometrie -----------------
        const geometry = new THREE.BufferGeometry()
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        // Space
        const bgGeometry = new THREE.SphereGeometry(1000, 64, 64)
        // Erde
        const planetGeometry = new THREE.SphereGeometry(1, 92, 92)
        // Atmo
        const atmoGeometry = new THREE.SphereGeometry(1.01, 92, 92)
        // Wolken
        const cloudGeometry = new THREE.SphereGeometry(1.001, 92, 92)
        // Mond
        const moonGeometry = new THREE.SphereGeometry(0.25, 195, 195)
        
        //-----------TexturLoader --------------------
        const textureLoader = new THREE.TextureLoader()
        
        // Space
        const bgTexture = textureLoader.load('space_bg.jpg')
        bgTexture.minFilter = THREE.LinearFilter
        bgTexture.magFilter = THREE.LinearFilter
        bgTexture.colorSpace = THREE.SRGBColorSpace

        // SterneTextur
        const starTexture = textureLoader.load('star.png')
        
        // Wolken
        const cloudTexture = textureLoader.load('e_cloud.jpg')

        // Mond 
        const moonTexture = textureLoader.load('moon.jpg')
        
        
        // ------------- Material ------------------
        // Material für Partikel
        const material = new THREE.PointsMaterial({
            size: 0.1, 
            map: starTexture, 
            transparent: true, 
            alphaTest: 0.01
        })


        // Space
        const bgMaterial = new THREE.MeshBasicMaterial({
            map: bgTexture,
            side: THREE.BackSide
        })


        // Material für Erde
        const planetMaterial = new THREE.ShaderMaterial({
            uniforms: {
                dayTexture: { value: textureLoader.load('earth.jpg') },
                nightTexture: { value: textureLoader.load('e_night.jpg') },
                normalMap: { value: textureLoader.load('earth_normal_map.jpg') },
                sunDirection: { value: new THREE.Vector3(-60, 10, 10).normalize() }
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
            `
        })

        // Material für Atmosphere
        const amtoMaterial = new THREE.MeshPhongMaterial({
            color: 0x4488ff,
            transparent: true,
            opacity: 0.1,
            side: THREE.BackSide
        })

        // Material für Wolken
        const cloudMaterial = new THREE.MeshPhongMaterial({
            map: cloudTexture,
            opacity: 0.93,
            transparent: true,
            alphaTest: 0.01,
            fog: true,
        })

        const moonMaterial = new THREE.MeshStandardMaterial({
            map: moonTexture,
            roughness: 0.8,
            metalness: 0,
            
        })

        // Space 
        const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial)

        // Erde
        const planet = new THREE.Mesh(planetGeometry, planetMaterial)
        planet.add(berlinLabel)
        
        // Sonnenlicht
        const ambientLight = new THREE.AmbientLight( 0xffffff, 0.1)
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 2)
        
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFShadowMap

        directionalLight.castShadow = true

    
        // Sonnenlicht positionierung
        directionalLight.position.set(-60, 40, 10)

        // Atmo
        const atmospehere = new THREE.Mesh(atmoGeometry, amtoMaterial)

        // Sterne
        const partickles = new THREE.Points(geometry, material)

        // Wolken
        const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial)

        // Mond
        const moon = new THREE.Mesh(moonGeometry, moonMaterial)


        scene.add(camera)
        scene.add(ambientLight)
        scene.add(directionalLight)
        scene.add(bgMesh)
        scene.add(moon)
        scene.add(partickles)
        scene.add(planet)
        scene.add(atmospehere)
        scene.add(clouds)
        

        // Animations ID 
        let animationId = null
        let time = 0

        // Maus koordinaten
        const mouse = {x: 0, y: 0}
        
        // Mausbewegung
        const handleMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
        }
        window.addEventListener('mousemove', handleMouseMove)

        let targetCameraZ = 5
        const handleMouseScroll = () => {
            const scrollProgress = window.scrollY / window.innerHeight
            targetCameraZ = 5 - scrollProgress * 2.5
            
        }
        window.addEventListener('scroll', handleMouseScroll)        

        // Resize
        const handleResize = () => {
            camera.aspect = window.innerWidth/window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
            composer.setSize(window.innerWidth, window.innerHeight)
            labelRenderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener('resize', handleResize)

        planet.rotation.y = -1.8
        planet.rotation.z = -0.4
        planet.rotation.x = 0.1

        planet.castShadow = true
        planet.receiveShadow = true
        moon.castShadow = true
        moon.receiveShadow = true
         
        // Animation
        function animate(){
            // Speichern der Animations-ID
            animationId = requestAnimationFrame(animate)

            camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05 
            camera.position.y += (mouse.y * 2 - camera.position.y) * 0.05        
          
            moon.position.z = Math.cos(time) * 2
            moon.position.x = Math.sin(time) * 2
            moon.position.y = Math.sin(time) * 0.8 

            moon.rotation.y += 0.0005

            clouds.rotation.y  += -0.00006
            
            
            
            time += 0.001
            // camera.position.z += (targetCameraZ - camera.position.z) * 0.05
            if (flyRef.current) {
                planet.quaternion.slerp(berlinQuaternion, 0.02)
                camera.position.z += (1.5 - camera.position.z) * 0.02
            } else {
                planet.rotateY(0.00015)                
                camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05
                camera.position.y += (mouse.y * 2 - camera.position.y) * 0.05
                camera.position.z += (targetCameraZ - camera.position.z) * 0.05
            }
            const div = berlinDiv.querySelector('div')
            div.style.display = flyRef.current ? 'block' : 'none'

            labelRenderer.render(scene, camera)

            camera.lookAt(0,0,0)
            
            composer.render()


        }
        animate();
        return() => {
            // CLEAN-UP
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('scroll', handleMouseScroll)

            canvasRef.current?.parentElement?.removeChild(labelRenderer.domElement)

            // Abbruch der Animation mit der ID um Memory Leaks zu vehindern
            cancelAnimationFrame(animationId)
        }
        
    },[])

    return <canvas ref={canvasRef} className='w-full h-full fixed inset-0'/>
}