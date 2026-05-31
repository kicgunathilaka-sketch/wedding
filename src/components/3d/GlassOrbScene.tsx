'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ── Breathing glass orb — intentionally subtle so the photo bg shows ── */
function GlassOrb() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const s = 1 + Math.sin(t * 0.45) * 0.03
    meshRef.current.scale.setScalar(s)
    meshRef.current.rotation.y = t * 0.035
    meshRef.current.rotation.x = Math.sin(t * 0.25) * 0.03
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.9, 64, 64]} />
      <MeshTransmissionMaterial
        color="#c8a2c8"
        transmission={1}
        thickness={2.0}
        roughness={0.0}
        metalness={0.0}
        ior={1.45}
        chromaticAberration={0.025}
        distortion={0.08}
        distortionScale={0.15}
        temporalDistortion={0.03}
        attenuationColor="#c8a2c8"
        attenuationDistance={12}
        transparent
        opacity={0.45}
        envMapIntensity={1.8}
      />
    </mesh>
  )
}

/* ── Small floating crystals ── */
function Crystal({
  pos,
  spd,
  phase,
  sc,
  color = '#c8a2c8',
}: {
  pos: [number, number, number]
  spd: number
  phase: number
  sc: number
  color?: string
}) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * spd
    ref.current.rotation.x += delta * spd * 0.55
    ref.current.position.y = pos[1] + Math.sin(state.clock.elapsedTime * 0.52 + phase) * 0.18
  })

  return (
    <mesh ref={ref} position={pos} scale={sc}>
      <octahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color={color}
        transmission={0.88}
        thickness={1.0}
        roughness={0.04}
        ior={1.6}
        transparent
        opacity={0.7}
        clearcoat={1}
        clearcoatRoughness={0.02}
        envMapIntensity={3}
      />
    </mesh>
  )
}

const CRYSTALS: { pos: [number, number, number]; spd: number; phase: number; sc: number; color?: string }[] = [
  { pos: [-4.2, 1.8, -2.0], spd: 0.28, phase: 0,   sc: 0.20, color: '#c8a2c8' },
  { pos: [ 4.0, -1.5, -2.2], spd: 0.34, phase: 1.5, sc: 0.16, color: '#dcc6f0' },
  { pos: [-2.8, -2.5, -1.5], spd: 0.22, phase: 0.8, sc: 0.18, color: '#9b72aa' },
  { pos: [ 3.6,  2.2, -2.0], spd: 0.31, phase: 2.1, sc: 0.13, color: '#c8a2c8' },
  { pos: [-4.8,  0.2, -2.5], spd: 0.19, phase: 1.2, sc: 0.11, color: '#dcc6f0' },
]

function OrbScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5,  5, 5]} color="#dcc6f0" intensity={1.8} />
      <pointLight position={[-5,-5, 4]} color="#7c3aed" intensity={1.2} />

      <GlassOrb />
      {CRYSTALS.map((c, i) => (
        <Crystal key={i} {...c} />
      ))}

      <Environment preset="city" />
    </>
  )
}

/* ── Exported canvas — parent in Countdown wraps this with opacity ── */
export function GlassOrbScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9.5], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <OrbScene />
      </Suspense>
    </Canvas>
  )
}
