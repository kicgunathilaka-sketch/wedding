'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

/* ── Glass orb — meshPhysical (single-pass, much cheaper than MeshTransmission) ── */
function GlassOrb() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.scale.setScalar(1 + Math.sin(t * 0.45) * 0.028)
    ref.current.rotation.y = t * 0.032
    ref.current.rotation.x = Math.sin(t * 0.22) * 0.025
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.9, 48, 48]} />
      <meshPhysicalMaterial
        color="#c0a0d0"
        transmission={0.88}
        thickness={2.2}
        roughness={0.02}
        metalness={0.0}
        ior={1.42}
        transparent
        opacity={0.52}
        envMapIntensity={1.6}
        attenuationColor="#9b72aa"
        attenuationDistance={10}
      />
    </mesh>
  )
}

/* ── Three lightweight crystals (reduced from 5) ── */
const CRYSTALS: { pos: [number, number, number]; spd: number; phase: number; sc: number }[] = [
  { pos: [-3.8, 1.8, -2.0], spd: 0.26, phase: 0,   sc: 0.18 },
  { pos: [ 3.6, -1.5, -2.2], spd: 0.32, phase: 1.5, sc: 0.15 },
  { pos: [-2.4, -2.5, -1.5], spd: 0.20, phase: 0.8, sc: 0.16 },
]

function Crystal({ pos, spd, phase, sc }: typeof CRYSTALS[0]) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * spd
    ref.current.rotation.x += delta * spd * 0.5
    ref.current.position.y = pos[1] + Math.sin(state.clock.elapsedTime * 0.5 + phase) * 0.18
  })
  return (
    <mesh ref={ref} position={pos} scale={sc}>
      <octahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color="#c8a2c8"
        transmission={0.82}
        thickness={0.9}
        roughness={0.04}
        ior={1.58}
        transparent
        opacity={0.72}
        clearcoat={0.8}
        envMapIntensity={2.5}
      />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} color="#dcc6f0" intensity={1.8} />
      <pointLight position={[-4, -4, 4]} color="#7c3aed" intensity={1.2} />
      <GlassOrb />
      {CRYSTALS.map((c, i) => <Crystal key={i} {...c} />)}
      <Environment preset="city" />
    </>
  )
}

export function GlassOrbScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9.5], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1]}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
