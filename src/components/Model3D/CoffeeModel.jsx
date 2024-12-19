import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function CoffeeModel3D(props) {
  const { nodes, materials } = useGLTF('/Models3D/coFelice.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_2.geometry} material={materials.wire_224198087} rotation={[-Math.PI, 0, 0]} scale={0.112} />
    </group>
  )
}

useGLTF.preload('/Models3D/coFelice.gltf')