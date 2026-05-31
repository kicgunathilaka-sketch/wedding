'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

type CrystalDef = {
  pos: [number, number, number]
  spd: number
  phase: number
  sc: number
  color: string
  shape: 'oct' | 'ico'
}

const CRYSTALS: CrystalDef[] = [
  /* Corners */
  { pos: [-7.5,  3.8, -3.0], spd: 0.22, phase: 0.0, sc: 0.28, color: '#dcc6f0', shape: 'oct' },
  { pos: [ 7.5,  3.8, -3.0], spd: 0.18, phase: 1.2, sc: 0.24, color: '#c8a2c8', shape: 'ico' },
  { pos: [-7.5, -3.8, -3.0], spd: 0.26, phase: 0.6, sc: 0.22, color: '#9b72aa', shape: 'oct' },
  { pos: [ 7.5, -3.8, -3.0], spd: 0.20, phase: 2.1, sc: 0.20, color: '#dcc6f0', shape: 'ico' },
  /* Edges */
  { pos: [-9.0,  0.5, -4.0], spd: 0.16, phase: 0.4, sc: 0.18, color: '#c8a2c8', shape: 'oct' },
  { pos: [ 9.0, -0.5, -4.0], spd: 0.24, phase: 1.8, sc: 0.16, color: '#dcc6f0', shape: 'ico' },
  { pos: [ 0.0,  5.5, -4.5], spd: 0.19, phase: 3.0, sc: 0.15, color: '#9b72aa', shape: 'oct' },
  { pos: [ 2.5, -5.0, -3.5], spd: 0.21, phase: 1.5, sc: 0.13, color: '#dcc6f0', shape: 'ico' },
]

function Crystal({ pos, spd, phase, sc, color, shape }: CrystalDef) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * spd
    ref.current.rotation.x += delta * spd * 0.6
    ref.current.position.y = pos[1] + Math.sin(state.clock.elapsedTime * 0.5 + phase) * 0.25
  })

  return (
    <mesh ref={ref} position={pos} scale={sc}>
      {shape === 'oct'
        ? <octahedronGeometry args={[1, 0]} />
        : <icosahedronGeometry args={[1, 0]} />
      }
      <meshPhysicalMaterial
        color={color}
        transmission={0.9}
        thickness={1.0}
        roughness={0.02}
        ior={1.65}
        transparent
        opacity={0.78}
        clearcoat={1}
        clearcoatRoughness={0.0}
        envMapIntensity={3.8}
      />
    </mesh>
  )
}

function CrystalSceneInner() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[5,  6, 5]}  color="#dcc6f0" intensity={2.2} />
      <pointLight position={[-5, -6, 4]} color="#7c3aed" intensity={1.5} />
      {CRYSTALS.map((c, i) => <Crystal key={i} {...c} />)}
      <Environment preset="city" />
    </>
  )
}

export function RsvpCrystalScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}
    >
      <Suspense fallback={null}>
        <CrystalSceneInner />
      </Suspense>
    </Canvas>
  )
}
