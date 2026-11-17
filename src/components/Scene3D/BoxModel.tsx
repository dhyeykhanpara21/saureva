import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

interface BoxModelProps {
  scale?: number;
}

export const BoxModel: React.FC<BoxModelProps> = ({ scale = 1 }) => {
  // Load 6 authentic face textures extracted from high-res package mockups
  const [frontTex, backTex, leftTex, rightTex, topTex, bottomTex] = useTexture([
    '/assets/box_front.png',
    '/assets/box_back.png',
    '/assets/box_left.png',
    '/assets/box_right.png',
    '/assets/box_top.png',
    '/assets/box_bottom.png'
  ]);

  useMemo(() => {
    [frontTex, backTex, leftTex, rightTex, topTex, bottomTex].forEach((tex) => {
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
      tex.needsUpdate = true;
    });
  }, [frontTex, backTex, leftTex, rightTex, topTex, bottomTex]);

  const materials = useMemo(() => {
    // Face 0: +X (Right Side: Try With: Sev Tameta, Ringan Oro, Kathiyawadi Sabzi, Rotla & Chaas)
    const rightMat = new THREE.MeshStandardMaterial({
      map: rightTex,
      roughness: 0.76,
      metalness: 0.02
    });

    // Face 1: -X (Left Side: 4 Quality Claims)
    const leftMat = new THREE.MeshStandardMaterial({
      map: leftTex,
      roughness: 0.76,
      metalness: 0.02
    });

    // Face 2: +Y (Top View: Kraft with maroon seal sticker)
    const topMat = new THREE.MeshStandardMaterial({
      map: topTex,
      roughness: 0.74,
      metalness: 0.02
    });

    // Face 3: -Y (Bottom View: Folded kraft flaps)
    const bottomMat = new THREE.MeshStandardMaterial({
      map: bottomTex,
      roughness: 0.82,
      metalness: 0.01
    });

    // Face 4: +Z (Front View)
    const frontMat = new THREE.MeshStandardMaterial({
      map: frontTex,
      roughness: 0.72,
      metalness: 0.02
    });

    // Face 5: -Z (Back View)
    const backMat = new THREE.MeshStandardMaterial({
      map: backTex,
      roughness: 0.72,
      metalness: 0.02
    });

    // Three.js BoxGeometry face material array order:
    // [0]: +X (right)
    // [1]: -X (left)
    // [2]: +Y (top)
    // [3]: -Y (bottom)
    // [4]: +Z (front)
    // [5]: -Z (back)
    return [
      rightMat,
      leftMat,
      topMat,
      bottomMat,
      frontMat,
      backMat
    ];
  }, [frontTex, backTex, leftTex, rightTex, topTex, bottomTex]);

  return (
    <group scale={scale} dispose={null}>
      <mesh material={materials} castShadow receiveShadow>
        <boxGeometry args={[2.34, 3.86, 0.94, 2, 2, 2]} />
      </mesh>
    </group>
  );
};
