import React, { useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float } from '@react-three/drei';
import { PouchModel } from './PouchModel';
import { SpiceParticles } from './SpiceParticles';

interface SceneState {
  rotationY: number;
  rotationX: number;
  rotationZ: number;
  positionX: number;
  positionY: number;
  scale: number;
  burstProgress: number;
  openFactor: number;
}

interface SceneScrollControllerProps {
  scrollState: SceneState;
  mousePos: { x: number; y: number };
}

const ProductRig: React.FC<SceneScrollControllerProps> = ({ scrollState, mousePos }) => {
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current || !modelRef.current) return;

    // Smoothly interpolate group position with subtle mouse tilt
    const targetX = scrollState.positionX + mousePos.x * 0.25;
    const targetY = scrollState.positionY - mousePos.y * 0.25;
    const targetRotX = scrollState.rotationX - mousePos.y * 0.15;
    const targetRotY = scrollState.rotationY + mousePos.x * 0.2;
    const targetRotZ = scrollState.rotationZ;

    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      targetX,
      6,
      delta
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetY,
      6,
      delta
    );
    groupRef.current.scale.setScalar(
      THREE.MathUtils.damp(groupRef.current.scale.x, scrollState.scale, 6, delta)
    );

    // Apply rotation with dampening
    modelRef.current.rotation.x = THREE.MathUtils.damp(
      modelRef.current.rotation.x,
      targetRotX,
      5,
      delta
    );
    modelRef.current.rotation.y = THREE.MathUtils.damp(
      modelRef.current.rotation.y,
      targetRotY,
      5,
      delta
    );
    modelRef.current.rotation.z = THREE.MathUtils.damp(
      modelRef.current.rotation.z,
      targetRotZ,
      5,
      delta
    );
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float
        speed={1.5}
        rotationIntensity={0.15}
        floatIntensity={0.25}
        floatingRange={[-0.08, 0.08]}
      >
        <group ref={modelRef}>
          <PouchModel scale={1} openFactor={scrollState.openFactor} />
        </group>
      </Float>

      {/* Floating authentic spice particles around the product */}
      <SpiceParticles count={240} burstProgress={scrollState.burstProgress} />

      {/* Ground contact shadow */}
      <ContactShadows
        position={[0, -2.4, 0]}
        opacity={0.65}
        scale={6.5}
        blur={2.2}
        far={4.5}
        color="#3E2214"
      />
    </group>
  );
};

export const SceneScrollController: React.FC<SceneScrollControllerProps> = ({
  scrollState,
  mousePos
}) => {
  return (
    <div className="w-full h-full pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
      >
        {/* Soft warm cinematic studio lighting */}
        <ambientLight intensity={1.1} color="#FFFBF0" />

        {/* Key warm directional light */}
        <directionalLight
          position={[4, 5, 5]}
          intensity={1.8}
          color="#FFE9C2"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        {/* Soft rim / accent light for golden gleam */}
        <directionalLight
          position={[-4, 3, -3]}
          intensity={1.2}
          color="#BD8A26"
        />

        {/* Gentle fill from bottom */}
        <directionalLight
          position={[0, -4, 3]}
          intensity={0.6}
          color="#F5EFE4"
        />

        {/* Studio environment for rich reflections */}
        <Environment preset="city" environmentIntensity={0.35} />

        <Suspense fallback={null}>
          <ProductRig scrollState={scrollState} mousePos={mousePos} />
        </Suspense>
      </Canvas>
    </div>
  );
};

