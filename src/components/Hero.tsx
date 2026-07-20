import { useEffect, useState, Suspense, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Icosahedron, Torus, Octahedron } from '@react-three/drei'
import * as THREE from 'three'

const ROLES = ['Frontend', 'Fullstack', 'Autodidacte', 'Bâtisseur']

function Shape({ position, geometry, color, speed = 1 }: {
  position: [number, number, number]; geometry: 'ico' | 'torus' | 'octa'; color: string; speed?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.15 * speed
    ref.current.rotation.y += delta * 0.22 * speed
  })
  const Geo = geometry === 'ico' ? Icosahedron : geometry === 'torus' ? Torus : Octahedron
  const args: any = geometry === 'torus' ? [0.55, 0.2, 32, 64] : [0.7, 0]
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
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
    camera.position.x += (target.x * 0.6 - camera.position.x) * 0.03
    camera.position.y += (-target.y * 0.4 - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })
  return null
}

const SHAPES: { position: [number, number, number]; geometry: 'ico' | 'torus' | 'octa'; color: string; speed?: number }[] = [
  { position: [-0.8, 0.8, 0], geometry: 'ico', color: '#FF5A1F', speed: 1 },
  { position: [0.9, -0.5, -0.5], geometry: 'torus', color: '#E8C97A', speed: 0.7 },
  { position: [0.1, -1.4, -1], geometry: 'octa', color: '#C9A24B', speed: 1.3 },
  { position: [1.2, 1.3, -1.2], geometry: 'octa', color: '#FF5A1F', speed: 0.9 },
]

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        src="/assets/bg.mp4"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 min-h-screen grid md:grid-cols-2 items-center px-6 md:px-10 lg:px-16 pt-24 pb-16">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xs text-muted uppercase tracking-[0.3em] mb-8"
          >
            Disponible pour missions · Bobo-Dioulasso 🇧🇫
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-6"
          >
            AMINE PARÉ
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-sm md:text-base text-muted mb-4"
          >
            Développeur{' '}
            <span key={roleIdx} className="font-serif italic text-text animate-role-fade-in inline-block">
              {ROLES[roleIdx]}
            </span>{' '}
            — je construis pour l'Afrique.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-sm md:text-base text-muted max-w-md mb-10 leading-relaxed"
          >
            Expériences web premium, du pixel au déploiement — e-commerces, marketplaces, intégrations Mobile Money.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="inline-flex flex-col sm:flex-row gap-4"
          >
            <a href="#projects" className="rounded-full bg-text text-bg px-7 py-3.5 text-sm font-medium hover:scale-105 transition-transform text-center">
              Voir mes projets
            </a>
            <a href="#contact" className="rounded-full border-2 border-stroke px-7 py-3.5 text-sm font-medium hover:border-clay transition-colors text-center">
              Me contacter
            </a>
          </motion.div>
        </div>

        <div className="hidden md:block h-[60vh] relative">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[3, 4, 5]} intensity={1.4} />
              <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#FF5A1F" />
              {SHAPES.map((s, i) => <Shape key={i} {...s} />)}
              <Rig />
            </Suspense>
          </Canvas>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] text-muted uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-4 bg-clay animate-scroll-down" />
        </div>
      </div>
    </section>
  )
}
