import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { createStandupPouchGeometries } from './PouchGeometry';

interface KraftPouchModelProps {
  scale?: number;
}

export const KraftPouchModel: React.FC<KraftPouchModelProps> = ({ scale = 1 }) => {
  // Load official high-res kraft packaging textures
  const [frontTex, backTex, gussetTex] = useTexture([
    '/assets/kraft_pouch_front.png',
    '/assets/kraft_pouch_back.png',
    '/assets/kraft_gusset.png'
  ]);

  useMemo(() => {
    [frontTex, backTex, gussetTex].forEach((tex) => {
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
      tex.needsUpdate = true;
    });
  }, [frontTex, backTex, gussetTex]);

  const { frontGeom, backGeom, leftGeom, rightGeom, topCapGeom } = useMemo(() => {
    return createStandupPouchGeometries(2.38, 3.86, 0.72);
  }, []);

  // Material setup for natural artisan kraft paper texture (matte, tactile)
  const frontMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: frontTex,
        roughness: 0.76,
        metalness: 0.02
      }),
    [frontTex]
  );

  const backMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: backTex,
        roughness: 0.76,
        metalness: 0.02
      }),
    [backTex]
  );

  const gussetMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: gussetTex,
        roughness: 0.78,
        metalness: 0.02
      }),
    [gussetTex]
  );

  const sealCapMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#9E7448',
        roughness: 0.8,
        metalness: 0.05
      }),
    []
  );

  return (
    <group scale={scale} dispose={null}>
      {/* Front Kraft Face */}
      <mesh geometry={frontGeom} material={frontMaterial} castShadow receiveShadow />

      {/* Back Kraft Information Face */}
      <mesh geometry={backGeom} material={backMaterial} castShadow receiveShadow />

      {/* Left Gusset */}
      <mesh geometry={leftGeom} material={gussetMaterial} castShadow receiveShadow />

      {/* Right Gusset */}
      <mesh geometry={rightGeom} material={gussetMaterial} castShadow receiveShadow />

      {/* Top Kraft Crimp Seal */}
      <mesh geometry={topCapGeom} material={sealCapMaterial} castShadow />
    </group>
  );
};

