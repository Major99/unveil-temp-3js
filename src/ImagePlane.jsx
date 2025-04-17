import React from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function ImagePlane({ textureUrl, position, rotation = [0, 0, 0], args = [4, 3] }) {
  const texture = useTexture(textureUrl);
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={args} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} transparent={true} />
    </mesh>
  );
}