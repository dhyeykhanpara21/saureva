import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Float } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { PouchModel } from './PouchModel';
import { BoxModel } from './BoxModel';
import { KraftPouchModel } from './KraftPouchModel';

interface SceneInteractiveViewerProps {
  packagingType: 'pouch' | 'box' | 'kraft';
  autoRotate?: boolean;
}

export const SceneInteractiveViewer: React.FC<SceneInteractiveViewerProps> = ({
  packagingType,
  autoRotate = false
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [spinning, setSpinning] = useState(autoRotate);

  const resetCamera = (targetAzimuth: number, targetPolar: number) => {
    if (!controlsRef.current) return;
    setSpinning(false);
    controlsRef.current.setAzimuthalAngle(targetAzimuth);
    controlsRef.current.setPolarAngle(targetPolar);
    controlsRef.current.update();
  };

  return (
    <div
      data-lenis-prevent
      className="relative w-full h-[380px] sm:h-[480px] md:h-[620px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#FAF6EF] to-[#ECE3D4] border border-saurena-gold/25 shadow-2xl"
    >
      <Canvas
        camera={{ position: [0, 0, 7.6], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.85} color="#FFFBF5" />
        <directionalLight position={[3, 5, 4]} intensity={1.15} color="#FFF6E8" castShadow />
        <directionalLight position={[-3, 3, -3]} intensity={0.65} color="#BD8A26" />
        <directionalLight position={[0, -3, 2]} intensity={0.25} color="#ECE3D4" />

        <Environment preset="studio" environmentIntensity={0.25} />

        <Suspense fallback={null}>
          <Float speed={1.0} rotationIntensity={0.05} floatIntensity={0.06} floatingRange={[-0.03, 0.03]}>
            <group position={[0, -0.2, 0]}>
              {packagingType === 'pouch' && <PouchModel scale={0.9} openFactor={0} />}
              {packagingType === 'box' && <BoxModel scale={0.9} />}
              {packagingType === 'kraft' && <KraftPouchModel scale={0.9} />}
            </group>
          </Float>

          <ContactShadows
            position={[0, -2.25, 0]}
            opacity={0.65}
            scale={6.0}
            blur={2.0}
            far={4.0}
            color="#3E2214"
          />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          minDistance={3.8}
          maxDistance={7.5}
          enablePan={false}
          autoRotate={spinning}
          autoRotateSpeed={1.0}
          maxPolarAngle={Math.PI / 2 + 0.15}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>

      {/* Interactive preset angle controls overlay */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-panel border border-saurena-gold/30 shadow-lg text-[10px] sm:text-xs font-semibold text-saurena-forest tracking-wider uppercase z-10 max-w-[95vw] overflow-x-auto scrollbar-none">
        <span className="text-saurena-gold/80 text-[10px] hidden sm:inline mr-1">View:</span>
        <button
          onClick={() => resetCamera(0, Math.PI / 2)}
          className="px-2 sm:px-2.5 py-1 rounded-full hover:bg-saurena-forest hover:text-white transition-colors shrink-0"
        >
          Front
        </button>
        <button
          onClick={() => resetCamera(Math.PI, Math.PI / 2)}
          className="px-2 sm:px-2.5 py-1 rounded-full hover:bg-saurena-forest hover:text-white transition-colors shrink-0"
        >
          Back
        </button>
        <button
          onClick={() => resetCamera(Math.PI * 0.5, Math.PI / 2)}
          className="px-2 sm:px-2.5 py-1 rounded-full hover:bg-saurena-forest hover:text-white transition-colors shrink-0"
        >
          Side
        </button>
        <button
          onClick={() => resetCamera(0, Math.PI / 3.4)}
          className="px-2 sm:px-2.5 py-1 rounded-full hover:bg-saurena-forest hover:text-white transition-colors shrink-0"
        >
          Top
        </button>
        <button
          onClick={() => setSpinning(!spinning)}
          className={`px-2 sm:px-2.5 py-1 rounded-full transition-colors shrink-0 ${
            spinning ? 'bg-saurena-gold text-saurena-forest font-bold' : 'hover:bg-saurena-forest hover:text-white'
          }`}
        >
          {spinning ? 'Pause' : '360°'}
        </button>
      </div>

      {/* Drag instruction pill */}
      <div className="absolute top-3 left-3 sm:top-5 sm:left-5 pointer-events-none flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-saurena-gold/20 text-[10px] sm:text-[11px] font-medium text-saurena-brown">
        <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-saurena-gold animate-ping" />
        Drag 360° to inspect authentic packaging
      </div>
    </div>
  );
};
