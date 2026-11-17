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

  const { frontGeom, backGeom, leftGeom, rightGeom, bottomGeom, topCapGeom } = useMemo(() => {
    return createStandupPouchGeometries(2.36, 3.86, 0.64);
  }, []);

  // Material setup for natural artisan kraft paper texture (matte, tactile)
  const frontMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: frontTex,
        roughness: 0.78,
        metalness: 0.01
      }),
    [frontTex]
  );

  const backMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: backTex,
        roughness: 0.78,
        metalness: 0.01
      }),
    [backTex]
  );

  const gussetMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: gussetTex,
        roughness: 0.80,
        metalness: 0.01
      }),
    [gussetTex]
  );

  const bottomMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#A67746',
        roughness: 0.85,
        metalness: 0.01
      }),
    []
  );

  const sealCapMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#A67746',
        roughness: 0.82,
        metalness: 0.02
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

      {/* Sealed Bottom Base */}
      <mesh geometry={bottomGeom} material={bottomMaterial} receiveShadow />

      {/* Top Kraft Crimp Seal */}
      <mesh geometry={topCapGeom} material={sealCapMaterial} castShadow />
    </group>
  );
};
