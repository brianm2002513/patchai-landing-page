import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const COLOR = '#5e452b'
const PARTICLE_COUNT = 20

// Pre-compute particle data at module scope to keep render pure
const PARTICLE_DATA = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const angle = (i / PARTICLE_COUNT) * Math.PI * 2
  return {
    angle,
    radius: 0.9 + Math.random() * 0.5,
    speed: 0.15 + Math.random() * 0.2,
    size: 0.012 + Math.random() * 0.018,
    phase: Math.random() * Math.PI * 2,
    ySpread: 0.3 + Math.random() * 0.2,
  }
})

function Particles() {
  const group = useRef()

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.children.forEach((child, i) => {
      const p = PARTICLE_DATA[i]
      const a = p.angle + t * p.speed
      child.position.x = Math.cos(a) * p.radius
      child.position.y = Math.sin(a) * p.radius * p.ySpread + Math.sin(t * 0.8 + p.phase) * 0.1
      child.position.z = Math.sin(a + t * 0.5) * 0.15
      const s = p.size * (0.4 + Math.sin(t * 2.5 + p.phase) * 0.6)
      child.scale.setScalar(s)
      child.material.opacity = 0.15 + Math.sin(t * 2 + p.phase) * 0.2
    })
  })

  return (
    <group ref={group}>
      {PARTICLE_DATA.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshBasicMaterial color={COLOR} transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  )
}

export default function PatchAI3DText({ className = '', style = {} }) {
  return (
    <span
      className={`logo ${className}`}
      style={{
        position: 'relative',
        color: '#5e452b',
        display: 'inline-block',
        ...style,
      }}
    >
      PatchAI
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, #5e452b 0%, #8b6914 20%, #c49a3c 40%, #5e452b 60%, #8b6914 80%, #c49a3c 100%)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'patchai-shimmer 3s linear infinite',
          pointerEvents: 'none',
        }}
      >
        PatchAI
      </span>
      <span
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 3], fov: 45 }}
          dpr={2}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent', width: '100%', height: '100%' }}
        >
          <Particles />
        </Canvas>
      </span>
    </span>
  )
}
