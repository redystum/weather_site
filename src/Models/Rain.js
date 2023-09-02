/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/weather_site/rain.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Cube004.geometry} material={materials['white.001']} position={[0.43, 3.22, -7.68]} rotation={[0, -0.53, 0]} />
      <mesh geometry={nodes.Cube016.geometry} material={materials['white.001']} position={[9.39, 6.3, -1.76]} rotation={[0, 1.34, 0]} />
      <mesh geometry={nodes.Cube014.geometry} material={materials['white.001']} position={[9.64, 0, 8.08]} rotation={[0, 0.52, 0]} />
      <mesh geometry={nodes.Cube023.geometry} material={materials['white.001']} position={[5.33, 7.05, -0.89]} rotation={[0, -0.25, 0]} />
      <mesh geometry={nodes.Cube002.geometry} material={materials['white.001']} position={[4.59, -0.03, -5.47]} rotation={[0, 0.63, 0]} />
      <mesh geometry={nodes.Cube028.geometry} material={materials['white.001']} position={[-5.11, 4.11, 5.35]} rotation={[0, 0.21, 0]} />
      <mesh geometry={nodes.Cube033.geometry} material={materials['white.001']} position={[1.34, 6.3, 5.76]} rotation={[0, -0.29, 0]} />
      <mesh geometry={nodes.Cube035.geometry} material={materials['white.001']} position={[-9.07, 3.68, -5.78]} rotation={[0, 0.39, 0]} />
      <mesh geometry={nodes.Cube041.geometry} material={materials['white.001']} position={[-6.28, 0.91, -0.56]} rotation={[0, -0.33, 0]} />
      <mesh geometry={nodes.Cube049.geometry} material={materials['white.001']} position={[-13.28, 1.04, 2.94]} rotation={[0, -0.45, 0]} />
      <mesh geometry={nodes.Cube.geometry} material={materials.blue} position={[0, -3.35, 7.49]} scale={[0.1, 0.82, 0.1]} />
      <mesh geometry={nodes.Cube001.geometry} material={materials.blue} position={[3.53, 2.6, 5.94]} scale={[0.1, 0.82, 0.1]} />
      <mesh geometry={nodes.Cube003.geometry} material={materials.blue} position={[9.79, -3.38, 7.25]} scale={[0.1, 0.82, 0.1]} />
      <mesh geometry={nodes.Cube005.geometry} material={materials.blue} position={[6.98, -3.06, 3.02]} scale={[0.1, 0.82, 0.1]} />
      <mesh geometry={nodes.Cube006.geometry} material={materials.blue} position={[12.34, 2.31, -0.06]} scale={[0.1, 0.82, 0.1]} />
      <mesh geometry={nodes.Cube007.geometry} material={materials.blue} position={[9.99, -2.21, 8.55]} scale={[0.1, 0.82, 0.1]} />
      <mesh geometry={nodes.Cube008.geometry} material={materials.blue} position={[4.91, -0.07, -1.05]} scale={[0.1, 0.82, 0.1]} />
      <mesh geometry={nodes.Cube009.geometry} material={materials.blue} position={[4.11, -3.36, -5.57]} scale={[0.1, 0.82, 0.1]} />
      <mesh geometry={nodes.Cube010.geometry} material={materials.blue} position={[0.45, -0.34, -5.57]} scale={[0.1, 0.82, 0.1]} />
      <mesh geometry={nodes.Cube011.geometry} material={materials.blue} position={[1.74, -1.12, -7.8]} scale={[0.1, 0.82, 0.1]} />
      <mesh geometry={nodes.Cube012.geometry} material={materials.blue} position={[-7.86, -2.6, -7.8]} scale={[0.1, 0.82, 0.1]} />
      <mesh geometry={nodes.Cube013.geometry} material={materials.blue} position={[-9.32, -3.25, -3.34]} scale={[0.1, 0.82, 0.1]} />
      <mesh geometry={nodes.Cube015.geometry} material={materials.blue} position={[-7.23, -3.8, -1.17]} scale={[0.1, 0.82, 0.1]} />
      <mesh geometry={nodes.Cube017.geometry} material={materials.blue} position={[-11.55, -2.1, 1.92]} scale={[0.1, 0.82, 0.1]} />
      <mesh geometry={nodes.Cube018.geometry} material={materials.blue} position={[-9.96, -0.69, 3.95]} scale={[0.1, 0.82, 0.1]} />
      <mesh geometry={nodes.Cube019.geometry} material={materials.blue} position={[-3.91, -1.63, 2.72]} scale={[0.1, 0.82, 0.1]} />
      <mesh geometry={nodes.Cube020.geometry} material={materials.blue} position={[-5.27, -2.6, 6.5]} scale={[0.1, 0.82, 0.1]} />
      <mesh geometry={nodes.Cube021.geometry} material={materials.blue} position={[-1.81, -1.94, 5.07]} scale={[0.1, 0.82, 0.1]} />
      <mesh geometry={nodes.Cube022.geometry} material={materials.blue} position={[12.34, 0.31, -2.8]} scale={[0.1, 0.82, 0.1]} />
    </group>
  )
}

useGLTF.preload('/rain.glb')
