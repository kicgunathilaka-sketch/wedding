'use client'

import { useRef, Suspense, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

/* ── Diamond gem: crown + pavilion + girdle faceted sections ── */
function DiamondGem({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Group>(null!)

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.38
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.55) * 0.035
  })

  return (
    <group ref={ref} position={position} scale={scale * 0.13}>
      {/* Table (flat octagonal top) */}
      <mesh rotation={[0, Math.PI / 8, 0]} position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.65, 0.95, 0.22, 8]} />
        <meshPhysicalMaterial
          color="#f0f8ff"
          transmission={0.97}
          thickness={0.4}
          roughness={0.0}
          metalness={0.0}
          ior={2.42}
          transparent
          opacity={0.93}
          clearcoat={1}
          clearcoatRoughness={0.0}
          envMapIntensity={6}
        />
      </mesh>
      {/* Crown top flat */}
      <mesh rotation={[0, Math.PI / 8, 0]} position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0, 0.65, 0.22, 8]} />
        <meshPhysicalMaterial
          color="#f0f8ff"
          transmission={0.97}
          thickness={0.3}
          roughness={0.0}
          metalness={0.0}
          ior={2.42}
          transparent
          opacity={0.93}
          clearcoat={1}
          envMapIntensity={6}
        />
      </mesh>
      {/* Girdle ring */}
      <mesh rotation={[0, Math.PI / 8, 0]} position={[0, 0.0, 0]}>
        <cylinderGeometry args={[0.95, 0.95, 0.07, 8]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.95}
          thickness={0.1}
          roughness={0.0}
          ior={2.42}
          transparent
          opacity={0.95}
          envMapIntensity={5}
        />
      </mesh>
      {/* Pavilion (pointed bottom) */}
      <mesh rotation={[Math.PI, Math.PI / 8, 0]} position={[0, -0.35, 0]}>
        <coneGeometry args={[0.95, 0.85, 8]} />
        <meshPhysicalMaterial
          color="#e8f4ff"
          transmission={0.97}
          thickness={0.6}
          roughness={0.0}
          metalness={0.0}
          ior={2.42}
          transparent
          opacity={0.92}
          clearcoat={1}
          envMapIntensity={6}
        />
      </mesh>
    </group>
  )
}

/* ── Prong mount for diamond ── */
function DiamondMount({ radius }: { radius: number }) {
  const prongs = [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2]
  return (
    <group>
      {/* Base cup */}
      <mesh position={[0, radius + 0.06, 0]}>
        <cylinderGeometry args={[0.18, 0.13, 0.16, 6]} />
        <meshPhysicalMaterial color="#c9936a" metalness={0.97} roughness={0.02} clearcoat={1} envMapIntensity={4.5} />
      </mesh>
      {/* 4 prongs */}
      {prongs.map((angle, j) => (
        <mesh
          key={j}
          position={[Math.sin(angle) * 0.16, radius + 0.2, Math.cos(angle) * 0.16]}
          rotation={[angle, 0, Math.PI * 0.07]}
        >
          <cylinderGeometry args={[0.016, 0.016, 0.18, 5]} />
          <meshPhysicalMaterial
            color="#c9936a"
            metalness={0.97}
            roughness={0.02}
            clearcoat={1}
            envMapIntensity={4.5}
          />
        </mesh>
      ))}
      <DiamondGem position={[0, radius + 0.28, 0]} />
    </group>
  )
}

/* ── Rose-gold wedding ring band ── */
function Ring({
  position,
  initialRotation,
  floatSpeed,
  scale = 1,
  hasDiamond = false,
}: {
  position: [number, number, number]
  initialRotation: [number, number, number]
  floatSpeed: number
  scale?: number
  hasDiamond?: boolean
}) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.16
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.38) * 0.055
  })

  return (
    <Float speed={floatSpeed} rotationIntensity={0.06} floatIntensity={0.32}>
      <group ref={groupRef} position={position} rotation={initialRotation} scale={scale}>
        {/* Main rose-gold band */}
        <mesh>
          <torusGeometry args={[1, 0.118, 72, 256]} />
          <meshPhysicalMaterial
            color="#c9936a"
            metalness={0.97}
            roughness={0.022}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
            envMapIntensity={4.8}
            reflectivity={1}
          />
        </mesh>

        {/* Subtle inner warm glow ring */}
        <mesh>
          <torusGeometry args={[1, 0.07, 36, 256]} />
          <meshPhysicalMaterial
            color="#f0b882"
            metalness={0.45}
            roughness={0.14}
            emissive="#c07b52"
            emissiveIntensity={0.11}
            transparent
            opacity={0.38}
          />
        </mesh>

        {/* Thin engraved edge detail */}
        <mesh>
          <torusGeometry args={[0.963, 0.012, 12, 256]} />
          <meshPhysicalMaterial
            color="#7a5030"
            metalness={0.94}
            roughness={0.09}
            envMapIntensity={2}
          />
        </mesh>

        {hasDiamond && <DiamondMount radius={1} />}
      </group>
    </Float>
  )
}

/* ── GSAP scroll-driven camera inside R3F ── */
function ScrollCamera() {
  const { camera } = useThree()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let triggers: any[] = []

    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const heroEl = document.getElementById('hero')
      if (!heroEl) return

      const t = ScrollTrigger.create({
        trigger: heroEl,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          const p = self.progress
          camera.position.z = 8 - p * 1.8
          camera.position.y = p * 0.9
          camera.rotation.x = p * 0.06
        },
      })
      triggers = [t]
    }

    init()

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [camera])

  return null
}

/* ── Full scene — adapts ring positions for portrait/mobile viewports ── */
function RingsScene() {
  const { size } = useThree()
  /* Portrait = mobile. With fov:40 (vertical), the horizontal visible range
     at z=0, distance=8 is ±(8·tan20°·aspect). On a 375×812 phone (aspect≈0.46)
     that's only ±1.34 units, so the desktop positions x=±2.5 are off-screen.
     On mobile we stack the rings vertically near the centre instead. */
  const isMobile = size.height > size.width

  const bridePos: [number, number, number] = isMobile ? [0.15, 1.55, -0.4]  : [-2.5,  1.2,  -0.4]
  const groomPos: [number, number, number] = isMobile ? [0.4,  -1.1,  -0.5] : [ 2.2, -1.45, -0.7]
  const brideScale = isMobile ? 0.76 : 0.92
  const groomScale = isMobile ? 0.62 : 0.78

  return (
    <>
      <ambientLight intensity={0.28} />
      <directionalLight position={[8, 8, 5]} intensity={1.1} color="#fff5ee" castShadow />
      <pointLight position={[-6, 4, -2]} intensity={2.4} color="#b76e79" />
      <pointLight position={[5, -4, 4]} intensity={1.6} color="#dcc6f0" />
      <pointLight position={[0, 2, 7]} intensity={0.9} color="#ffe8d6" />

      <Sparkles
        count={isMobile ? 35 : 55}
        scale={isMobile ? 5 : 9}
        size={1.2}
        speed={0.28}
        opacity={0.45}
        color="#dcc6f0"
        noise={0.6}
      />

      <Ring
        position={bridePos}
        initialRotation={[0.32, 0.12, 0.24]}
        floatSpeed={1.25}
        scale={brideScale}
        hasDiamond
      />

      <Ring
        position={groomPos}
        initialRotation={[-0.18, 0.4, -0.14]}
        floatSpeed={1.05}
        scale={groomScale}
      />

      <ScrollCamera />
      <Environment preset="sunset" />
    </>
  )
}

/* ── Exported canvas — always dynamically imported (ssr:false) from parent ── */
export function WeddingRingsScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}
    >
      <Suspense fallback={null}>
        <RingsScene />
      </Suspense>
    </Canvas>
  )
}
