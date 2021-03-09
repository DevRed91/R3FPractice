import * as THREE from 'three'
import React, { Suspense, useEffect, useState, useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import { PerspectiveCamera, Environment, MeshDistortMaterial, Sphere, ContactShadows } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'
import { Text } from '@react-three/drei'

import { useLayers } from './use-Layers'

const AnimatedMaterial = a(MeshDistortMaterial)
const AnimatedBox = a(Sphere)

//   fontSize: 5,
//   font: 'https://fonts.gstatic.com/s/monoton/v10/5h1aiZUrOngCibe4TkHLRA.woff'
// }

// function Title({ material, texture, map, layers, ...props }) {
//   const textRef = useLayers(layers)

//   return (
//     <group {...props}>
//       {/* <Text re
//       <meshPhysicalMaterial envMap = {texture} map = {map} roughness = {0} metalness = {1} color = '#FFFFFF' />
//       </Text> */}
//       <Text
//         ref={textRef}
//         color={'#EC2D2D'}
//         fontSize={12}
//         maxWidth={200}
//         lineHeight={1}
//         letterSpacing={0.02}
//         textAlign={'left'} // default
//       >
//         hello world!
//       </Text>
//     </group>
//   )
// }
// function
export default function Scene({ setBg }) {
  const ref = useRef()
  const light = useRef()
  const [mode, setMode] = useState(false)
  const [hovered, setHovered] = useState(false)
  // Change cursor on hevered state
  useEffect(() => {
    document.body.style.cursor = hovered
      ? 'none'
      : `url('data:image/svg+xml;base64,${btoa(
          '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="10" fill="#7F7F7F"/></svg>'
        )}'), auto`
  }, [hovered])

  // Make bubble float and follow the mouse
  useFrame((state) => {
    light.current.position.x = state.mouse.x * 100
    light.current.position.y = state.mouse.y * 100
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, hovered ? state.mouse.x / 2 : 0, 1)
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      Math.sin(state.clock.elapsedTime / 1.5) / 6 + (hovered ? state.mouse.y / 2 : 0),
      0.1
    )
  })

  // Springs for color and overall looks
  const [{ wobble, coat, color, ambient, env }] = useSpring(
    {
      wobble: hovered ? 1.05 : 1,
      coat: mode && !hovered ? 0.2 : 1,
      ambient: mode && !hovered ? 1.5 : 0.5,
      env: mode && !hovered ? 0.275 : 1,
      color: hovered ? '#E8B059' : mode ? '#ADD8E6' : 'blue',
      config: (n) => n === 'wobble' && hovered && { mass: 2, tension: 1000, friction: 10 }
    },
    [mode, hovered]
  )

  return (
    <>
      {/* <Canvas camera={{ fov: 75, position: [1, 1, 1] }}> */}
      <PerspectiveCamera position={[0, 0, 3.5]} fov={75} makeDefault>
        <a.ambientLight intensity={ambient} />
        <a.pointLight ref={light} position-z={-15} intensity={env} />
      </PerspectiveCamera>

      <Suspense fallback={null}>
        {/* <Title /> */}
        <AnimatedBox
          ref={ref}
          args={[1, 3, 1]}
          scale={wobble.to((w) => [w, w, w])}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => {
            // Toggle mode between dark and bright
            setMode(!mode)
            setBg({ background: !mode ? '#202020' : '#f0f0f0', fill: !mode ? '#f0f0f0' : '#202020' })
          }}>
          <AnimatedMaterial color={color} envMapIntensity={env} clearcoat={coat} clearcoatRoughness={0} metalness={0.1} />
        </AnimatedBox>

        <Environment files="royal_esplanade_1k.hdr" />
        <ContactShadows rotation={[Math.PI / 2, 0, 0]} position={[0, -1.6, 0]} opacity={0.4} width={15} height={15} blur={2.5} far={1.6} />
      </Suspense>
      {/* </Canvas> */}
    </>
  )
}
