'use client'

import { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/* ─── Floating geometric shard ─── */
function Shard({
  position,
  rotation,
  scale,
  color,
  speed = 1,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  color: string
  speed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => new THREE.OctahedronGeometry(1, 0), [])

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.15,
        metalness: 0.9,
        transparent: true,
        opacity: 0.75,
      }),
    [color]
  )

  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime * speed
    meshRef.current.rotation.x = rotation[0] + t * 0.18
    meshRef.current.rotation.y = rotation[1] + t * 0.22
    meshRef.current.position.y = position[1] + Math.sin(t * 0.6) * 0.3
  })

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={position}
      scale={scale}
    />
  )
}

/* ─── Particle field ─── */
function ParticleField({ count = 280 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    const palette = [
      new THREE.Color('#fcfdff'),
      new THREE.Color('#3b9eff'),
      new THREE.Color('#11ff99'),
      new THREE.Color('#ffc53d'),
    ]

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4

      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col }
  }, [count])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [positions, colors])

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      }),
    []
  )

  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.012
  })

  return <points ref={pointsRef} geometry={geometry} material={material} />
}

/* ─── Wireframe grid plane ─── */
function GridPlane() {
  const geometry = useMemo(() => new THREE.PlaneGeometry(20, 12, 24, 14), [])
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#ffffff'),
        wireframe: true,
        transparent: true,
        opacity: 0.06,
      }),
    []
  )

  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  return (
    <mesh
      geometry={geometry}
      material={material}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -3.5, -2]}
    />
  )
}

/* ─── Central torus ring ─── */
function TorusRing() {
  const meshRef = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => new THREE.TorusGeometry(2.2, 0.018, 3, 120), [])
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#3b9eff'),
        transparent: true,
        opacity: 0.35,
      }),
    []
  )

  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = t * 0.12
    meshRef.current.rotation.z = t * 0.07
  })

  return <mesh ref={meshRef} geometry={geometry} material={material} position={[3, 0.5, -1]} />
}

/* ─── Second ring ─── */
function TorusRing2() {
  const meshRef = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => new THREE.TorusGeometry(1.4, 0.014, 3, 90), [])
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#11ff99'),
        transparent: true,
        opacity: 0.25,
      }),
    []
  )

  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.y = t * 0.15
    meshRef.current.rotation.x = t * -0.09
  })

  return <mesh ref={meshRef} geometry={geometry} material={material} position={[-3.5, -0.5, 0]} />
}

/* ─── GSAP scroll camera rig ─── */
function CameraRig() {
  const { camera } = useThree()
  const proxyRef = useRef({ x: 0, y: 0, z: 5 })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const proxy = proxyRef.current
    camera.position.set(0, 0, 5)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '30% top',
        scrub: 1.4,
      },
    })

    tl.to(proxy, { x: -0.8, y: 0.4, z: 4.2, ease: 'none' })

    return () => {
      tl.kill()
    }
  }, [camera])

  useFrame(() => {
    const p = proxyRef.current
    camera.position.lerp(new THREE.Vector3(p.x, p.y, p.z), 0.05)
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ─── Shards config — one per stack pillar ─── */
const SHARDS = [
  // Development (blue)
  { position: [2.5, 1.2, -1.5] as [number, number, number], rotation: [0.4, 0.8, 0.2] as [number, number, number], scale: 0.55, color: '#3b9eff', speed: 0.7 },
  // Web Apps (green)
  { position: [-2.8, -0.8, -2] as [number, number, number], rotation: [1.2, 0.4, 0.6] as [number, number, number], scale: 0.38, color: '#11ff99', speed: 0.9 },
  // DevOps (amber)
  { position: [0.8, 2.2, -3] as [number, number, number], rotation: [0.6, 1.4, 0.1] as [number, number, number], scale: 0.28, color: '#ffc53d', speed: 1.1 },
  // AI / ML (orange)
  { position: [-1.5, 1.8, -1] as [number, number, number], rotation: [0.9, 0.2, 1.1] as [number, number, number], scale: 0.2, color: '#ff801f', speed: 1.3 },
  { position: [3.8, -1.5, -2.5] as [number, number, number], rotation: [0.3, 1.1, 0.8] as [number, number, number], scale: 0.32, color: '#3b9eff', speed: 0.8 },
  { position: [-3.2, 0.6, -3] as [number, number, number], rotation: [1.5, 0.7, 0.4] as [number, number, number], scale: 0.22, color: '#fcfdff', speed: 1.0 },
]

/* ─── Scene contents (must be inside Canvas) ─── */
function SceneContents() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#3b9eff" />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color="#11ff99" />
      <pointLight position={[0, 3, -2]} intensity={0.4} color="#ff801f" />

      <Suspense fallback={null}>
        <Environment preset="night" />
      </Suspense>

      {SHARDS.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={0.5} floatIntensity={0.4}>
          <Shard {...s} />
        </Float>
      ))}

      <ParticleField count={320} />
      <GridPlane />
      <TorusRing />
      <TorusRing2 />
    </>
  )
}

/* ─── Export: lazy-loaded canvas ─── */
export default function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <SceneContents />
      </Canvas>
    </div>
  )
}
