import * as THREE from 'three'
import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { ContactShadows, Environment, useGLTF, OrbitControls } from 'drei'
// import { HexColorPicker } from "react-colorful"
import { proxy, useProxy } from 'valtio'
import { HexColorPicker } from 'react-colorful'

export const State = proxy({
  current: null,
  items: {
    legs: '#ffffff',
    cushions: '#ffffff',
    back: '#ffffff',
    supports: '#ffffff',
    base: '#ffffff'
  }
})

export default function Chair(props) {
  const group = useRef()
  const snap = useProxy(State)
  const { nodes, materials } = useGLTF('chair.glb')
  const [hovered, set] = useState(null)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  })

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onPointerOver={(e) => {
        e.stopPropagation(), set(e.object.material.name)
      }}
      onPointerOut={(e) => {
        e.intersections.length === 0 && set(null)
      }}
      onPointerDown={(e) => {
        e.stopPropagation()
        State.current = e.object.material.name
      }}
      onPointerMissed={(e) => {
        State.current = null
      }}>
      <mesh material={materials.base} geometry={nodes.base.geometry} rotation={[-Math.PI / 2, 0, Math.PI]} scale={[0.1, 0.1, 0.1]} />
      <mesh
      castShadow
      receiveShadow
        material={materials.supports}
        geometry={nodes.supports.geometry}
        rotation={[-Math.PI / 2, 0, Math.PI]}
        scale={[0.1, 0.1, 0.1]}
      />
      <mesh 
      castShadow
      receiveShadow
      material={materials.back} geometry={nodes.back.geometry} rotation={[-Math.PI / 2, 0, Math.PI]} scale={[0.1, 0.1, 0.1]} />
      <mesh
      castShadow
      receiveShadow
        material={materials.cushions}
        geometry={nodes.cushions.geometry}
        rotation={[-Math.PI / 2, 0, Math.PI]}
        scale={[0.1, 0.1, 0.1]}
      />
      <mesh 
      castShadow
      receiveShadow
      material={materials.legs} geometry={nodes.legs.geometry} rotation={[-Math.PI / 2, 0, Math.PI]} scale={[0.1, 0.1, 0.1]} />
    </group>
  )
}
