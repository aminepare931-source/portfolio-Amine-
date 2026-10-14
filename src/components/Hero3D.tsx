import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import type { Mesh } from 'three'

function GlowCore() {
  const core = useRef<Mesh>(null)
  const wire = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (core.current) {
      core.current.rotation.x += delta * 0.18
      core.current.rotation.y += delta * 0.26
    }
    if (wire.current) {
      wire.current.rotation.x -= delta * 0.08
      wire.current.rotation.y -= delta * 0.14
    }
  })

  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.3}>
      {/* Distorted glowing core */}
      <mesh ref={core}>
        <icosahedronGeometry args={[1.15, 5]} />
        <MeshDistortMaterial
          color="#3B82F6"
          emissive="#1d4ed8"
          emissiveIntensity={0.55}
          roughness={0.2}
          metalness={0.65}
          distort={0.32}
          speed={1.8}
        />
      </mesh>
      {/* Outer wireframe shell, slightly larger, counter-rotating */}
      <mesh ref={wire} scale={1.42}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color="#93C5FD" wireframe transparent opacity={0.25} />
      </mesh>
    </Float>
  )
}

export default function Hero3D() {
  return (
    <div className="w-full h-full min-h-[240px]">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.4], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.55} />
        <pointLight position={[3, 3, 3]} intensity={1.5} color="#60A5FA" />
        <pointLight position={[-3, -2, -2]} intensity={0.7} color="#93C5FD" />
        <GlowCore />
      </Canvas>
    </div>
  )
}
