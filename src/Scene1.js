import * as THREE from 'three'
import React, { Suspense, useEffect, useState, useRef } from 'react'
import { useFrame } from 'react-three-fiber'

import { Text, useMatcapTexture, Octahedron, useGLTFLoader } from '@react-three/drei'

export default function Title({ material, texture, map, layers, ...props }) {
  const textRef = useLayers(layers)

  return (
    <group {...props}>
      <Text ref={textRef} name="text-olga" depthTest={false} position={[0, -1, 0]} {...TEXT_PROPS}>
        OLGA
        <meshPhysicalMaterial envMap={texture} map={map} roughness={0} metalness={1} color="#FFFFFF" />
      </Text>
    </group>
  )
}
