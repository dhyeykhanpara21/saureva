import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

interface BoxModelProps {
  scale?: number;
}

export const BoxModel: React.FC<BoxModelProps> = ({ scale = 1 }) => {
  const [frontTex, backTex, sideTex, topTex] = useTexture([
    '/assets/box_front.png',
    '/assets/box_back.png',
    '/assets/box_side.png',
    '/assets/box_top.png'
  ]);

  useMemo(() => {
    [frontTex, backTex, sideTex, topTex].forEach((tex) => {
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
      tex.needsUpdate = true;
    });
  }, [frontTex, backTex, sideTex, topTex]);

  const materials = useMemo(() => {
    const kraftSideMat = new THREE.MeshStandardMaterial({
      map: sideTex,
      roughness: 0.75,
      metalness: 0.02
    });

    const kraftTopMat = new THREE.MeshStandardMaterial({
      map: topTex,
      roughness: 0.75,
      metalness: 0.02
    });

    const kraftBottomMat = new THREE.MeshStandardMaterial({
      color: '#B88E63',
      roughness: 0.85,
      metalness: 0.0
    });

    const frontMat = new THREE.MeshStandardMaterial({
      map: frontTex,
      roughness: 0.7,
      metalness: 0.02
    });

    const backMat = new THREE.MeshStandardMaterial({
      map: backTex,
      roughness: 0.7,
      metalness: 0.02
    });

    // Box face material array order in Three.js:
    // [0]: +X (right)
    // [1]: -X (left)
    // [2]: +Y (top)
    // [3]: -Y (bottom)
    // [4]: +Z (front)
    // [5]: -Z (back)
    return [
      kraftSideMat,
      kraftSideMat,
      kraftTopMat,
      kraftBottomMat,
      frontMat,
      backMat
    ];
  }, [frontTex, backTex, sideTex, topTex]);

  return (
    <group scale={scale} dispose={null}>
      <mesh material={materials} castShadow receiveShadow>
        <boxGeometry args={[2.45, 3.86, 1.15, 4, 4, 4]} />
      </mesh>
    </group>
  );
};
