import * as THREE from 'three';

/**
 * Creates accurate geometries for a realistic 3D Stand-Up Pouch:
 * - Front curved face with belly bulge and crimp top
 * - Back curved face with reverse bulge and crimp top
 * - Left and right gusset panels
 * - Top crimped foil seal
 * - Bottom stand-up gusset base
 */
export function createStandupPouchGeometries(
  width = 2.38,
  height = 3.86,
  depth = 0.72
) {
  const nx = 36;
  const ny = 48;

  // Helper for pouch profile thickness at vertical ratio v (0 bottom -> 1 top)
  const getZProfile = (u: number, v: number): number => {
    // u: 0 (left) to 1 (right)
    // v: 0 (bottom) to 1 (top)
    if (v >= 0.87) {
      // Top crimp seal zone - thin and flat with micro crimp ridges
      const crimpTeeth = Math.sin(u * 140) * 0.003;
      return 0.035 + crimpTeeth;
    }

    // Belly bulge curve
    const tv = v / 0.87;
    // Belly peaks around tv = 0.38 - 0.45 where spices settle
    const vBulge = Math.sin(Math.PI * Math.pow(tv, 0.75)) * (1.0 - 0.22 * tv);
    // Horizontal pillowing curve
    const uBulge = Math.sin(Math.PI * u);

    // Bottom base flare
    let bottomFlare = 0;
    if (v < 0.12) {
      const tb = 1.0 - v / 0.12;
      bottomFlare = Math.sin(Math.PI * u) * 0.08 * tb;
    }

    return (depth * 0.5) * vBulge * Math.pow(uBulge, 0.78) + 0.035 + bottomFlare;
  };

  // 1. FRONT GEOMETRY
  const frontGeom = new THREE.BufferGeometry();
  const frontPos: number[] = [];
  const frontUvs: number[] = [];
  const frontIdx: number[] = [];

  for (let j = 0; j <= ny; j++) {
    const v = j / ny;
    const y = (v - 0.5) * height;
    for (let i = 0; i <= nx; i++) {
      const u = i / nx;
      const x = (u - 0.5) * width;
      const z = getZProfile(u, v);
      frontPos.push(x, y, z);
      frontUvs.push(u, v);
    }
  }

  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const a = j * (nx + 1) + i;
      const b = a + 1;
      const c = (j + 1) * (nx + 1) + i;
      const d = c + 1;
      frontIdx.push(a, b, c);
      frontIdx.push(b, d, c);
    }
  }

  frontGeom.setAttribute('position', new THREE.Float32BufferAttribute(frontPos, 3));
  frontGeom.setAttribute('uv', new THREE.Float32BufferAttribute(frontUvs, 2));
  frontGeom.setIndex(frontIdx);
  frontGeom.computeVertexNormals();

  // 2. BACK GEOMETRY (Mirrored on Z, UV flipped horizontally for correct text reading)
  const backGeom = new THREE.BufferGeometry();
  const backPos: number[] = [];
  const backUvs: number[] = [];
  const backIdx: number[] = [];

  for (let j = 0; j <= ny; j++) {
    const v = j / ny;
    const y = (v - 0.5) * height;
    for (let i = 0; i <= nx; i++) {
      const u = i / nx;
      const x = (u - 0.5) * width;
      const z = getZProfile(u, v);
      backPos.push(x, y, -z);
      // Invert U so text on the back reads properly from left to right
      backUvs.push(1 - u, v);
    }
  }

  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const a = j * (nx + 1) + i;
      const b = a + 1;
      const c = (j + 1) * (nx + 1) + i;
      const d = c + 1;
      backIdx.push(a, c, b);
      backIdx.push(b, c, d);
    }
  }

  backGeom.setAttribute('position', new THREE.Float32BufferAttribute(backPos, 3));
  backGeom.setAttribute('uv', new THREE.Float32BufferAttribute(backUvs, 2));
  backGeom.setIndex(backIdx);
  backGeom.computeVertexNormals();

  // 3. LEFT GUSSET (Connecting u = 0 from back to front)
  const leftGeom = new THREE.BufferGeometry();
  const leftPos: number[] = [];
  const leftUvs: number[] = [];
  const leftIdx: number[] = [];
  const gussetSegs = 6;

  for (let j = 0; j <= ny; j++) {
    const v = j / ny;
    const y = (v - 0.5) * height;
    const zFront = getZProfile(0, v);
    const zBack = -zFront;

    for (let i = 0; i <= gussetSegs; i++) {
      const gu = i / gussetSegs; // 0 at back, 1 at front
      const curZ = zBack + gu * (zFront - zBack);
      // Natural inward tuck of side gusset fold
      let tuckX = -width * 0.5;
      if (v < 0.87) {
        const tv = v / 0.87;
        const tuckAmt = Math.sin(Math.PI * gu) * (depth * 0.16) * Math.sin(Math.PI * tv);
        tuckX += tuckAmt;
      }
      leftPos.push(tuckX, y, curZ);
      leftUvs.push(gu, v);
    }
  }

  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < gussetSegs; i++) {
      const a = j * (gussetSegs + 1) + i;
      const b = a + 1;
      const c = (j + 1) * (gussetSegs + 1) + i;
      const d = c + 1;
      leftIdx.push(a, b, c);
      leftIdx.push(b, d, c);
    }
  }

  leftGeom.setAttribute('position', new THREE.Float32BufferAttribute(leftPos, 3));
  leftGeom.setAttribute('uv', new THREE.Float32BufferAttribute(leftUvs, 2));
  leftGeom.setIndex(leftIdx);
  leftGeom.computeVertexNormals();

  // 4. RIGHT GUSSET (Connecting u = 1 from front to back)
  const rightGeom = new THREE.BufferGeometry();
  const rightPos: number[] = [];
  const rightUvs: number[] = [];
  const rightIdx: number[] = [];

  for (let j = 0; j <= ny; j++) {
    const v = j / ny;
    const y = (v - 0.5) * height;
    const zFront = getZProfile(1, v);
    const zBack = -zFront;

    for (let i = 0; i <= gussetSegs; i++) {
      const gu = i / gussetSegs; // 0 at front, 1 at back
      const curZ = zFront - gu * (zFront - zBack);
      let tuckX = width * 0.5;
      if (v < 0.87) {
        const tv = v / 0.87;
        const tuckAmt = Math.sin(Math.PI * gu) * (depth * 0.16) * Math.sin(Math.PI * tv);
        tuckX -= tuckAmt;
      }
      rightPos.push(tuckX, y, curZ);
      rightUvs.push(gu, v);
    }
  }

  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < gussetSegs; i++) {
      const a = j * (gussetSegs + 1) + i;
      const b = a + 1;
      const c = (j + 1) * (gussetSegs + 1) + i;
      const d = c + 1;
      rightIdx.push(a, b, c);
      rightIdx.push(b, d, c);
    }
  }

  rightGeom.setAttribute('position', new THREE.Float32BufferAttribute(rightPos, 3));
  rightGeom.setAttribute('uv', new THREE.Float32BufferAttribute(rightUvs, 2));
  rightGeom.setIndex(rightIdx);
  rightGeom.computeVertexNormals();

  // 5. TOP CRIMP SEAL CAP
  const topCapGeom = new THREE.BufferGeometry();
  const topPos: number[] = [
    -width * 0.5, height * 0.5, 0.035,
    width * 0.5, height * 0.5, 0.035,
    width * 0.5, height * 0.5, -0.035,
    -width * 0.5, height * 0.5, -0.035
  ];
  const topIdx = [0, 1, 2, 0, 2, 3];
  topCapGeom.setAttribute('position', new THREE.Float32BufferAttribute(topPos, 3));
  topCapGeom.setIndex(topIdx);
  topCapGeom.computeVertexNormals();

  return { frontGeom, backGeom, leftGeom, rightGeom, topCapGeom };
}
