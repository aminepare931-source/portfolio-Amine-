import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react'
import { useState } from 'react'

export default function HeroShader() {
  const [available, setAvailable] = useState(true)

  if (!available) {
    // Fallback statique si le GPU/navigateur ne supporte pas le shader
    return (
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 30% 20%, #ffffff 0%, #efefef 60%, #e8e8e8 100%)' }}
      />
    )
  }

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Shader
        style={{ width: '100%', height: '100%' }}
        onUnavailable={() => setAvailable(false)}
      >
        <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
        <ChromaFlow
          baseColor="#ffffff"
          downColor="#2563eb"
          leftColor="#2563eb"
          rightColor="#2563eb"
          upColor="#2563eb"
          momentum={13}
          radius={3.5}
        />
        <FlutedGlass
          aberration={0.61}
          angle={31}
          frequency={8}
          highlight={0.12}
          highlightSoftness={0}
          lightAngle={-90}
          refraction={4}
          shape="rounded"
          softness={1}
          speed={0.15}
        />
        <FilmGrain strength={0.05} />
      </Shader>
    </div>
  )
}
