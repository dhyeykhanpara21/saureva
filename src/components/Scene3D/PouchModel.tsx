import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { createStandupPouchGeometries } from './PouchGeometry';

interface PouchModelProps {
  scale?: number;
  openFactor?: number;
}

export const PouchModel: React.FC<PouchModelProps> = ({ scale = 1, openFactor = 0 }) => {
  // Load official high-res cropped packaging textures
  const [frontTex, backTex, leftGussetTex, rightGussetTex] = useTexture([
    '/assets/pouch_front.png',
    '/assets/pouch_back.png',
    '/assets/pouch_left_gusset.png',
    '/assets/pouch_right_gusset.png'
  ]);

  useMemo(() => {
    [frontTex, backTex, leftGussetTex, rightGussetTex].forEach((tex) => {
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
      tex.needsUpdate = true;
    });
  }, [frontTex, backTex, leftGussetTex, rightGussetTex]);

  const { frontGeom, backGeom, leftGeom, rightGeom, bottomGeom, topCapGeom } = useMemo(() => {
    return createStandupPouchGeometries(2.36, 3.86, 0.64);
  }, []);

  // Material setup for premium laminated barrier film
  const frontMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: frontTex,
        roughness: 0.45,
        metalness: 0.05
      }),
    [frontTex]
  );

  const backMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: backTex,
        roughness: 0.45,
        metalness: 0.05
      }),
    [backTex]
  );

  const leftMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: leftGussetTex,
        roughness: 0.48,
        metalness: 0.04
      }),
    [leftGussetTex]
  );

  const rightMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: rightGussetTex,
        roughness: 0.48,
        metalness: 0.04
      }),
    [rightGussetTex]
  );

  const bottomMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#8A5D2E',
        roughness: 0.6,
        metalness: 0.08
      }),
    []
  );

  const sealCapMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#3B180E',
        roughness: 0.5,
        metalness: 0.15
      }),
    []
  );

  return (
    <group scale={scale} dispose={null}>
      {/* Front Foil Face */}
      <mesh geometry={frontGeom} material={frontMaterial} castShadow receiveShadow />

      {/* Back Information & Nutrition Face */}
      <mesh geometry={backGeom} material={backMaterial} castShadow receiveShadow />

      {/* Left Gusset with 4 Natural Claims */}
      <mesh geometry={leftGeom} material={leftMaterial} castShadow receiveShadow />

      {/* Right Gusset with "Proudly From Gujarat" */}
      <mesh geometry={rightGeom} material={rightMaterial} castShadow receiveShadow />

      {/* Sealed Bottom Base */}
      <mesh geometry={bottomGeom} material={bottomMaterial} receiveShadow />

      {/* Top Foil Crimp Sealing Band */}
      {openFactor < 0.8 && (
        <mesh geometry={topCapGeom} material={sealCapMaterial} castShadow />
      )}
    </group>
  );
};
