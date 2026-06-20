'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

/* ─── Global mouse tracker (normalised -1..1) ─── */
const mouse = { x: 0, y: 0 }
if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1
        mouse.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }, { passive: true })
}

/* ─── Theme-aware color palettes ─── */
const DARK_SHARDS = [
    { color: '#3b9eff' },
    { color: '#11ff99' },
    { color: '#ffc53d' },
    { color: '#ff801f' },
    { color: '#3b9eff' },
    { color: '#c8d6f0' },
]
// In light mode: muted, semi-transparent tints that complement the canvas
const LIGHT_SHARDS = [
    { color: '#1a6fd4' },
    { color: '#0a9960' },
    { color: '#b87a00' },
    { color: '#c45a00' },
    { color: '#1a6fd4' },
    { color: '#4a5568' },
]

/* ─── Shape factory — 7 distinct geometries ─── */
const SHAPE_COUNT = 7
function makeGeometry(index: number): THREE.BufferGeometry {
    switch (index % SHAPE_COUNT) {
        case 0: return new THREE.SphereGeometry(1, 16, 12)
        case 1: return new THREE.TetrahedronGeometry(1.1, 0)
        case 2: return new THREE.BoxGeometry(1.4, 1.4, 1.4)
        case 3: return new THREE.OctahedronGeometry(1.1, 0)
        case 4: return new THREE.ConeGeometry(0.85, 1.7, 5, 1)
        case 5: return new THREE.TorusGeometry(0.75, 0.32, 8, 24)
        case 6: return new THREE.DodecahedronGeometry(1, 0)
        default: return new THREE.IcosahedronGeometry(1, 0)
    }
}

/* ─── Floating geometric shard with shape cycling ─── */
function Shard({
    position,
    rotation,
    scale,
    color,
    speed = 1,
    shapeOffset = 0,
    isLight = false,
}: {
    position: [number, number, number]
    rotation: [number, number, number]
    scale: number
    color: string
    speed?: number
    shapeOffset?: number
    isLight?: boolean
}) {
    const meshRef = useRef<THREE.Mesh>(null)
    const [shapeIndex, setShapeIndex] = useState(shapeOffset % SHAPE_COUNT)

    useEffect(() => {
        const delay = (shapeOffset * 367) % 1000
        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                setShapeIndex((prev) => (prev + 1) % SHAPE_COUNT)
            }, 2200)
            return () => clearInterval(interval)
        }, delay)
        return () => clearTimeout(timer)
    }, [shapeOffset])

    const geometry = useMemo(() => makeGeometry(shapeIndex), [shapeIndex])

    const material = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: new THREE.Color(color),
                emissive: new THREE.Color(color),
                emissiveIntensity: isLight ? 0.0 : 0.28,
                roughness: isLight ? 0.55 : 0.18,
                metalness: isLight ? 0.1 : 0.8,
                transparent: true,
                opacity: 0,
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [color, shapeIndex, isLight]
    )

    useEffect(() => () => { geometry.dispose(); material.dispose() }, [geometry, material])

    const targetOpacity = isLight ? 0.62 : 0.78

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.elapsedTime * speed
        meshRef.current.rotation.x = rotation[0] + t * 0.15
        meshRef.current.rotation.y = rotation[1] + t * 0.20
        meshRef.current.position.y = position[1] + Math.sin(t * 0.55) * 0.25
        const depth = Math.abs(position[2]) * 0.04
        meshRef.current.position.x = position[0] + mouse.x * depth

        const mat = meshRef.current.material as THREE.MeshStandardMaterial
        if (mat.opacity < targetOpacity) {
            mat.opacity = Math.min(targetOpacity, mat.opacity + 0.04)
        }
    })

    return (
        <mesh ref={meshRef} geometry={geometry} material={material} position={position} scale={scale} />
    )
}

/* ─── Particle field ─── */
function ParticleField({ isLight = false }: { isLight?: boolean }) {
    const count = 280
    const pointsRef = useRef<THREE.Points>(null)

    const { positions, colors } = useMemo(() => {
        const pos = new Float32Array(count * 3)
        const col = new Float32Array(count * 3)
        const darkPalette = [
            new THREE.Color('#c8d6f0'),
            new THREE.Color('#3b9eff'),
            new THREE.Color('#11ff99'),
            new THREE.Color('#ffc53d'),
        ]
        const lightPalette = [
            new THREE.Color('#1a3a7a'),
            new THREE.Color('#075c38'),
            new THREE.Color('#7a4a00'),
            new THREE.Color('#1e3d7a'),
        ]
        const palette = isLight ? lightPalette : darkPalette
        for (let i = 0; i < count; i++) {
            pos[i * 3]     = (Math.random() - 0.5) * 22
            pos[i * 3 + 1] = (Math.random() - 0.5) * 14
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4
            const c = palette[Math.floor(Math.random() * palette.length)]
            col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
        }
        return { positions: pos, colors: col }
    }, [isLight])

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        return geo
    }, [positions, colors])

    const material = useMemo(
        () => new THREE.PointsMaterial({
            size: isLight ? 0.072 : 0.072,
            vertexColors: true,
            transparent: true,
            opacity: isLight ? 0.65 : 0.65,
            sizeAttenuation: true,
        }),
        [isLight]
    )

    useEffect(() => () => { geometry.dispose(); material.dispose() }, [geometry, material])

    useFrame((state) => {
        if (!pointsRef.current) return
        pointsRef.current.rotation.y = state.clock.elapsedTime * 0.025 + mouse.x * 0.0004
        pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01 + mouse.y * 0.0004
    })

    return <points ref={pointsRef} geometry={geometry} material={material} />
}

/* ─── Wireframe grid plane ─── */
function GridPlane({ isLight = false }: { isLight?: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const geometry = useMemo(() => new THREE.PlaneGeometry(20, 12, 24, 14), [])
    const material = useMemo(
        () => new THREE.MeshBasicMaterial({
            color: new THREE.Color(isLight ? '#000000' : '#ffffff'),
            wireframe: true,
            transparent: true,
            opacity: 0.1,
        }),
        [isLight]
    )
    useEffect(() => () => { geometry.dispose(); material.dispose() }, [geometry, material])

    useFrame(() => {
        if (!meshRef.current) return
        meshRef.current.rotation.z = mouse.x * 0.02
    })

    return (
        <mesh ref={meshRef} geometry={geometry} material={material} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, -2]} />
    )
}

/* ─── Torus rings ─── */
function TorusRing({ isLight = false }: { isLight?: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null)
    // Same smaller radius in both modes for consistent composition
    const geometry = useMemo(() => new THREE.TorusGeometry(1.4, 0.018, 3, 120), [isLight])
    const material = useMemo(
        () => new THREE.MeshBasicMaterial({
            color: new THREE.Color(isLight ? '#1a6fd4' : '#3b9eff'),
            transparent: true,
            opacity: isLight ? 0.22 : 0.3,
        }),
        [isLight]
    )
    useEffect(() => () => { geometry.dispose(); material.dispose() }, [geometry, material])

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.elapsedTime
        meshRef.current.rotation.x = t * 0.12 + mouse.y * 0.15
        meshRef.current.rotation.z = t * 0.07 + mouse.x * 0.1
    })

    return <mesh ref={meshRef} geometry={geometry} material={material} position={[3, 0.5, -1]} />
}

function TorusRing2({ isLight = false }: { isLight?: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const geometry = useMemo(() => new THREE.TorusGeometry(0.9, 0.014, 3, 90), [isLight])
    const material = useMemo(
        () => new THREE.MeshBasicMaterial({
            color: new THREE.Color(isLight ? '#0a9960' : '#11ff99'),
            transparent: true,
            opacity: isLight ? 0.2 : 0.22,
        }),
        [isLight]
    )
    useEffect(() => () => { geometry.dispose(); material.dispose() }, [geometry, material])

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.elapsedTime
        meshRef.current.rotation.y = t * 0.15 + mouse.x * 0.12
        meshRef.current.rotation.x = t * -0.09 + mouse.y * 0.08
    })

    return <mesh ref={meshRef} geometry={geometry} material={material} position={[-3.5, -0.5, 0]} />
}

/* ─── Camera rig: scroll + mouse ─── */
function CameraRig() {
    const { camera } = useThree()
    const proxyRef = useRef({ scrollX: 0, scrollY: 0, z: 5 })

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
                onUpdate: (self) => {
                    proxy.scrollX = -0.8 * self.progress
                    proxy.scrollY = 0.4 * self.progress
                    proxy.z = 5 - 0.8 * self.progress
                },
            },
        })

        return () => { tl.kill() }
    }, [camera])

    useFrame(() => {
        const p = proxyRef.current
        const targetX = p.scrollX + mouse.x * 0.25
        const targetY = p.scrollY + mouse.y * 0.15
        camera.position.lerp(new THREE.Vector3(targetX, targetY, p.z), 0.04)
        camera.lookAt(0, 0, 0)
    })

    return null
}

/* ─── Shards base config ─── */
const SHARD_BASE = [
    { position: [2.5, 1.2, -1.5]  as [number,number,number], rotation: [0.4, 0.8, 0.2] as [number,number,number], scale: 0.52, speed: 0.7, shapeOffset: 0 },
    { position: [-2.8, -0.8, -2]  as [number,number,number], rotation: [1.2, 0.4, 0.6] as [number,number,number], scale: 0.36, speed: 0.9, shapeOffset: 1 },
    { position: [0.8, 2.2, -3]    as [number,number,number], rotation: [0.6, 1.4, 0.1] as [number,number,number], scale: 0.26, speed: 1.1, shapeOffset: 2 },
    { position: [-1.5, 1.8, -1]   as [number,number,number], rotation: [0.9, 0.2, 1.1] as [number,number,number], scale: 0.19, speed: 1.3, shapeOffset: 3 },
    { position: [3.8, -1.5, -2.5] as [number,number,number], rotation: [0.3, 1.1, 0.8] as [number,number,number], scale: 0.30, speed: 0.8, shapeOffset: 4 },
    { position: [-3.2, 0.6, -3]   as [number,number,number], rotation: [1.5, 0.7, 0.4] as [number,number,number], scale: 0.21, speed: 1.0, shapeOffset: 5 },
]

/* ─── Scene contents ─── */
function SceneContents({ isLight }: { isLight: boolean }) {
    const shardColors = isLight ? LIGHT_SHARDS : DARK_SHARDS

    return (
        <>
            <CameraRig />
            <ambientLight intensity={isLight ? 1.8 : 0.65} />
            <pointLight position={[5, 5, 5]}   intensity={isLight ? 0.8 : 1.6} color={isLight ? '#1a6fd4' : '#3b9eff'} />
            <pointLight position={[-5, -3, 3]}  intensity={isLight ? 0.6 : 1.2} color={isLight ? '#0a9960' : '#11ff99'} />
            <pointLight position={[0, 3, -2]}   intensity={isLight ? 0.4 : 0.9} color={isLight ? '#c45a00' : '#ff801f'} />
            <pointLight position={[0, -5, 0]}   intensity={isLight ? 0.3 : 0.5} color="#ffffff" />

            {SHARD_BASE.map((s, i) => (
                <Float key={i} speed={s.speed} rotationIntensity={0.4} floatIntensity={0.35}>
                    <Shard {...s} color={shardColors[i].color} isLight={isLight} />
                </Float>
            ))}

            <ParticleField isLight={isLight} />
            <GridPlane isLight={isLight} />
            <TorusRing isLight={isLight} />
            <TorusRing2 isLight={isLight} />
        </>
    )
}

/* ─── Export ─── */
export default function Scene3D({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
    const isLight = theme === 'light'
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 100 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                style={{ background: 'transparent' }}
                dpr={[1, 1.5]}
            >
                <SceneContents isLight={isLight} />
            </Canvas>
        </div>
    )
}
