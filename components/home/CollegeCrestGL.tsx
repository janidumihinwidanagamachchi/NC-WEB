'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function CrestMesh() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.25
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.4) * 0.05
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.6) * 0.08
    }
  })

  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow>
        <torusGeometry args={[1.2, 0.08, 16, 100]} />
        <meshStandardMaterial color="#6b0f1a" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.85, 0.06, 16, 100]} />
        <meshStandardMaterial color="#b8b8cc" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh castShadow receiveShadow>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#8b1525" metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  )
}

export function CollegeCrestGL() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 5]} intensity={2} castShadow />
      <pointLight position={[-3, 2, -2]} color="#f59e0b" intensity={0.8} />

      <Suspense fallback={null}>
        <CrestMesh />
        <Environment preset="city" />
        <ContactShadows position={[0, -1.8, 0]} opacity={0.35} scale={8} blur={2} />
      </Suspense>
    </Canvas>
  )
}
