/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Moon({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/moon.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Sphere.geometry} material={materials['white.001']} position={[0, 2.35, 0]} scale={0.82} />
    </group>
  )
}

useGLTF.preload('/moon.glb')
