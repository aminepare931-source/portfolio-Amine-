import { useRef, useMemo, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Icosahedron, Torus, Octahedron } from '@react-three/drei'
import * as THREE from 'three'

function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('scene3d')
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const raw = 1 - (rect.top + rect.height * 0.4) / (vh + rect.height * 0.4)
      setP(Math.min(1, Math.max(0, raw)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return p
}

function Shape({ position, geometry, color, speed = 1 }: {
  position: [number, number, number]; geometry: 'ico' | 'torus' | 'octa'; color: string; speed?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const scroll = useScrollProgress()

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.15 * speed
    ref.current.rotation.y += delta * 0.22 * speed
    ref.current.position.y = position[1] + Math.sin(scroll * Math.PI * 2 + position[0]) * 0.6
    ref.current.position.z = position[2] + scroll * 1.5
  })

  const Geo = geometry === 'ico' ? Icosahedron : geometry === 'torus' ? Torus : Octahedron
  const args: any = geometry === 'torus' ? [0.7, 0.25, 32, 64] : [0.9, 0]

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      {/* @ts-ignore */}
      <Geo ref={ref} args={args} position={position}>
        <MeshDistortMaterial color={color} roughness={0.15} metalness={0.4} distort={0.15} speed={1.5} />
      </Geo>
    </Float>
  )
}

function Rig() {
  const [target, setTarget] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setTarget({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  useFrame(({ camera }) => {
    camera.position.x += (target.x * 0.8 - camera.position.x) * 0.03
    camera.position.y += (-target.y * 0.5 - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })
  return null
}

const SHAPES: { position: [number, number, number]; geometry: 'ico' | 'torus' | 'octa'; color: string; speed?: number }[] = [
  { position: [-2.2, 0.8, 0], geometry: 'ico', color: '#FF5A1F', speed: 1 },
  { position: [2.4, -0.6, -1], geometry: 'torus', color: '#E8C97A', speed: 0.7 },
  { position: [0.2, 1.6, -2], geometry: 'octa', color: '#C9A24B', speed: 1.3 },
  { position: [-1.6, -1.4, -1.5], geometry: 'octa', color: '#FF5A1F', speed: 0.9 },
  { position: [3, 1.2, -2.5], geometry: 'ico', color: '#E8C97A', speed: 0.6 },
]

export default function Scene3D() {
  const shapes = useMemo(() => SHAPES, [])
  return (
    <section id="scene3d" className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden bg-bg">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <span className="text-xs text-muted uppercase tracking-[0.3em] mb-4">Vision</span>
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-3xl">
          Du concept<br /><span className="font-serif italic text-clay normal-case">à la production.</span>
        </h2>
      </div>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 4, 5]} intensity={1.4} />
          <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#FF5A1F" />
          {shapes.map((s, i) => <Shape key={i} {...s} />)}
          <Rig />
        </Suspense>
      </Canvas>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent z-10 pointer-events-none" />
    </section>
  )
}
