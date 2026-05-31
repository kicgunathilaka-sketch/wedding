'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PETAL_COUNT = 36

/* Custom rose petal shape */
function createPetalShape(): THREE.ShapeGeometry {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.bezierCurveTo(0.55, 0.3, 0.6, 1.2, 0, 1.9)
  shape.bezierCurveTo(-0.6, 1.2, -0.55, 0.3, 0, 0)
  return new THREE.ShapeGeometry(shape, 10)
}

/* Petal colors (lavender, rose, blush white) */
const PETAL_COLORS = ['#dcc6f0', '#c8a2c8', '#e8c8e0', '#f0d8f0', '#b76e79']

type ParticleState = {
  x: number; y: number; z: number
  vx: number; vy: number
  phase: number; speed: number
  rotX: number; rotY: number; rotZ: number
  size: number; colorIdx: number
}

function PetalMesh({ color, particles, indices }: {
  color: string
  particles: ParticleState[]
  indices: number[]
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const geo = useMemo(() => createPetalShape(), [])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime

    indices.forEach((pi, localIdx) => {
      const p = particles[pi]
      // Wind oscillation
      p.x += p.vx + Math.sin(t * 0.32 + p.phase) * 0.0025 + Math.cos(t * 0.18 + p.phase * 0.7) * 0.0015
      p.y += p.vy

      // Wrap vertically
      if (p.y < -8) {
        p.y = 9
        p.x = (Math.random() - 0.5) * 22
      }

      // Tumble rotation
      p.rotX += delta * p.speed * 0.42
      p.rotY += delta * p.speed * 0.28
      p.rotZ += delta * p.speed * 0.35

      dummy.position.set(p.x, p.y, p.z)
      dummy.rotation.set(p.rotX, p.rotY, p.rotZ)
      dummy.scale.setScalar(p.size)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(localIdx, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[geo, undefined, indices.length]}>
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.52}
        side={THREE.DoubleSide}
        roughness={0.35}
        metalness={0.0}
        clearcoat={0.3}
      />
    </instancedMesh>
  )
}

function PetalSystem() {
  const particles = useMemo<ParticleState[]>(() =>
    Array.from({ length: PETAL_COUNT }, (_, i) => ({
      x: (Math.random() - 0.5) * 22,
      y: (Math.random() - 0.5) * 18,
      z: -1 - Math.random() * 4,
      vx: (Math.random() - 0.5) * 0.003,
      vy: -(0.004 + Math.random() * 0.009),
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.9,
      rotX: Math.random() * Math.PI,
      rotY: Math.random() * Math.PI,
      rotZ: Math.random() * Math.PI,
      size: 0.09 + Math.random() * 0.13,
      colorIdx: i % PETAL_COLORS.length,
    })),
    [],
  )

  const byColor = useMemo(() => {
    const groups: Record<number, number[]> = {}
    PETAL_COLORS.forEach((_, ci) => { groups[ci] = [] })
    particles.forEach((p, i) => { groups[p.colorIdx].push(i) })
    return groups
  }, [particles])

  return (
    <>
      {PETAL_COLORS.map((color, ci) => (
        <PetalMesh key={ci} color={color} particles={particles} indices={byColor[ci]} />
      ))}
    </>
  )
}

export function FloatingPetals3D({ className = '' }: { className?: string }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 65 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'default' }}
      dpr={[1, 1]}
      className={className}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 5]} intensity={0.5} color="#ffe8f0" />
      <Suspense fallback={null}>
        <PetalSystem />
      </Suspense>
    </Canvas>
  )
}
