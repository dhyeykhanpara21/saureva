import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface SpiceParticlesProps {
  count?: number;
  burstProgress?: number; // 0 (ambient) to 1 (full explosion/stream)
}

export const SpiceParticles: React.FC<SpiceParticlesProps> = ({
  count = 220,
  burstProgress = 0
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Palette of authentic spice hues: turmeric gold, crimson chilli, coriander, black pepper, royal gold
  const palette = useMemo(
    () => [
      new THREE.Color('#E5A93C'), // Turmeric Gold
      new THREE.Color('#BD2A2E'), // Red Chilli
      new THREE.Color('#C99E5C'), // Coriander Seed
      new THREE.Color('#BD8A26'), // Royal Gold Fleck
      new THREE.Color('#5A301E')  // Clove / Black Pepper
    ],
    []
  );

  const { initialPositions, velocities, colors, sizes, angles } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const ang = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Ambient distribution in a cylinder around the product
      const radius = 1.2 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 6.5;

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius;

      // Gentle orbital drift velocity
      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = (Math.random() * 0.01) + 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.008;

      // Color from authentic spice palette
      const color = palette[i % palette.length];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      // Varied grain sizes
      sz[i] = Math.random() * 0.08 + 0.03;
      ang[i] = Math.random() * Math.PI * 2;
    }

    return {
      initialPositions: pos,
      velocities: vel,
      colors: col,
      sizes: sz,
      angles: ang
    };
  }, [count, palette]);

  const currentPos = useMemo(() => new Float32Array(initialPositions), [initialPositions]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.getAttribute('position') as THREE.BufferAttribute;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      if (burstProgress > 0.05) {
        // Stream / Fountain mode: particles erupt upwards and spiral out from pouch top (y ~ 2.2)
        const burstPhase = (time * 1.5 + i * 0.1) % 3.0;
        const spread = burstProgress * 3.8;
        const spiralAngle = burstPhase * 4.0 + angles[i];

        const burstX = Math.cos(spiralAngle) * (burstPhase * 0.9 * spread);
        const burstY = 2.0 + Math.sin(burstPhase * 1.2) * 2.8 - burstPhase * 0.4;
        const burstZ = Math.sin(spiralAngle) * (burstPhase * 0.9 * spread) + Math.sin(burstPhase) * 0.5;

        // Blend between ambient position and burst stream
        currentPos[idx] = THREE.MathUtils.lerp(initialPositions[idx], burstX, burstProgress);
        currentPos[idx + 1] = THREE.MathUtils.lerp(initialPositions[idx + 1], burstY, burstProgress);
        currentPos[idx + 2] = THREE.MathUtils.lerp(initialPositions[idx + 2], burstZ, burstProgress);
      } else {
        // Ambient gentle floating drift
        currentPos[idx] += Math.sin(time + angles[i]) * 0.004;
        currentPos[idx + 1] += velocities[idx + 1] * 0.6;
        currentPos[idx + 2] += Math.cos(time + angles[i]) * 0.004;

        // Wrap around vertically
        if (currentPos[idx + 1] > 3.6) {
          currentPos[idx + 1] = -3.2;
        }
      }
    }

    posAttr.needsUpdate = true;
  });

  // Circular soft particle texture
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.3, 'rgba(255,255,255,0.8)');
      gradient.addColorStop(0.7, 'rgba(255,255,255,0.25)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={currentPos}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        vertexColors
        map={particleTexture}
        transparent
        opacity={0.88}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

