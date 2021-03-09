import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/web'

import Scene from './Scene'

export default function App() {
  // This spring controls the background and the svg fill (text color)
  const [{ background, fill }, set] = useSpring({ background: '#f0f0f0', fill: '#202020' }, [])
  return (
    <a.main style={{ background }}>
      {/* <Picker /> */}
      <Canvas className="canvas" pixelRatio={[1, 2]} camera={{ fov: 75, position: [3, 1, 1] }}>
        <Scene setBg={set} />
        <ambientLight intensity={0.5} />

        {/* <Suspense fallback={null}>
          <Chair />
        </Suspense> */}
        <ContactShadows rotation={[Math.PI / 2, 0, 0]} position={[0, 1, 0]} opacity={0.4} width={15} height={15} blur={2.5} far={1.6} />
        <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      </Canvas>
      {/* <Overlay fill={fill} /> */}
    </a.main>
  )
}
