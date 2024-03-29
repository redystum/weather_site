/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Thunder({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/weather_site/thunder.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Cube004.geometry} material={materials.white} position={[0.43, 3.22, -7.68]} rotation={[0, -0.53, 0]} />
      <mesh geometry={nodes.Cube016.geometry} material={materials.white} position={[9.39, 6.3, -1.76]} rotation={[0, 1.34, 0]} />
      <mesh geometry={nodes.Cube014.geometry} material={materials.white} position={[9.64, 0, 8.08]} rotation={[0, 0.52, 0]} />
      <mesh geometry={nodes.Cube023.geometry} material={materials.white} position={[5.33, 7.05, -0.89]} rotation={[0, -0.25, 0]} />
      <mesh geometry={nodes.Cube002.geometry} material={materials.white} position={[4.59, -0.03, -5.47]} rotation={[0, 0.63, 0]} />
      <mesh geometry={nodes.Cube028.geometry} material={materials.white} position={[-5.11, 4.11, 5.35]} rotation={[0, 0.21, 0]} />
      <mesh geometry={nodes.Cube033.geometry} material={materials.white} position={[1.34, 6.3, 5.76]} rotation={[0, -0.29, 0]} />
      <mesh geometry={nodes.Cube035.geometry} material={materials.white} position={[-9.07, 3.68, -5.78]} rotation={[0, 0.39, 0]} />
      <mesh geometry={nodes.Cube041.geometry} material={materials.white} position={[-6.28, 0.91, -0.56]} rotation={[0, -0.33, 0]} />
      <mesh geometry={nodes.Cube049.geometry} material={materials.white} position={[-13.28, 1.04, 2.94]} rotation={[0, -0.45, 0]} />
      <mesh geometry={nodes.Plane.geometry} material={materials.orange} position={[0.53, 2.22, 7.36]} rotation={[Math.PI / 2, 0, 0.35]} scale={[0.53, 2, 0.53]} />
      <mesh geometry={nodes.Plane001.geometry} material={materials.orange} position={[9.79, 2.49, -2.36]} rotation={[Math.PI / 2, 0, -0.95]} scale={[0.29, 1.3, 0.29]} />
      <mesh geometry={nodes.Plane002.geometry} material={materials.orange} position={[-1.14, -1.59, -7.21]} rotation={[Math.PI / 2, 0, -0.29]} scale={[0.27, 1.5, 0.27]} />
      <mesh geometry={nodes.Plane003.geometry} material={materials.orange} position={[-8.36, -0.64, -6.55]} rotation={[Math.PI / 2, 0, 0.25]} scale={[0.55, 2, 0.55]} />
    </group>
  )
}

useGLTF.preload('/thunder.glb')
