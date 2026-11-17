import * as THREE from 'three';

/**
 * Creates accurate geometries for a realistic 3D Stand-Up Pouch:
 * - Front face with natural belly curvature and crimped top
 * - Back face with matching volume
 * - Realistic side gusset depth (NOT razor thin) with authentic V-tuck crease
 * - Sealed bottom base
 * - Sealed top crimp cap
 */
export function createStandupPouchGeometries(
  width = 2.34,
  height = 3.86,
  depth = 0.62
) {
  const nx = 36;
  const ny = 48;

  // Gusset thickness function at vertical ratio v (0 bottom -> 1 top)
  const getGussetDepth = (v: number): number => {
    if (v >= 0.88) {
      // Top crimp seal zone - flattened foil
      return 0.04;
    }
    const tv = v / 0.88;
    // Smooth transition from flat crimp (tv = 1) down to full gusset expansion
    const expand = Math.sin(Math.PI * Math.min(1.0, Math.pow(tv, 0.62)));
    // Stand-up base is slightly wider for stability, belly peaks at tv ~ 0.35 - 0.45
    const baseWiden = (1.0 - tv) * 0.12;
    return depth * (0.82 * expand + 0.12 + baseWiden);
  };

  // Center belly bulge forward on front, backward on back
  const getPillowBulge = (u: number, v: number): number => {
    if (v >= 0.88) return 0;
    const tv = v / 0.88;
    const vFactor = Math.sin(Math.PI * Math.pow(tv, 0.72));
    const uFactor = Math.sin(Math.PI * u);
    return (depth * 0.22) * vFactor * Math.pow(uFactor, 0.75);
  };

  // Front Z position
  const getFrontZ = (u: number, v: number): number => {
    const halfG = getGussetDepth(v) * 0.5;
    if (v >= 0.88) {
      const crimpTeeth = Math.sin(u * 140) * 0.002;
      return halfG + crimpTeeth;
    }
    return halfG + getPillowBulge(u, v);
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
      const z = getFrontZ(u, v);
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
      const z = -getFrontZ(u, v);
      backPos.push(x, y, z);
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
  const gussetSegs = 8;

  for (let j = 0; j <= ny; j++) {
    const v = j / ny;
    const y = (v - 0.5) * height;
    const zFront = getFrontZ(0, v);
    const zBack = -zFront;
    const gDepth = zFront - zBack;

    for (let i = 0; i <= gussetSegs; i++) {
      const gu = i / gussetSegs; // 0 at back, 1 at front
      const curZ = zBack + gu * gDepth;
      // Inward V-crease fold typical of stand-up foil and kraft pouches
      let tuckX = -width * 0.5;
      if (v < 0.88) {
        const tv = v / 0.88;
        const tuckAmt = Math.sin(Math.PI * gu) * (gDepth * 0.16) * Math.sin(Math.PI * tv);
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
    const zFront = getFrontZ(1, v);
    const zBack = -zFront;
    const gDepth = zFront - zBack;

    for (let i = 0; i <= gussetSegs; i++) {
      const gu = i / gussetSegs; // 0 at front, 1 at back
      const curZ = zFront - gu * gDepth;
      let tuckX = width * 0.5;
      if (v < 0.88) {
        const tv = v / 0.88;
        const tuckAmt = Math.sin(Math.PI * gu) * (gDepth * 0.16) * Math.sin(Math.PI * tv);
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

  // 5. BOTTOM BASE GEOMETRY (Closing bottom gusset)
  const bottomGeom = new THREE.BufferGeometry();
  const bZ = getGussetDepth(0) * 0.5;
  const botPos: number[] = [
    -width * 0.5, -height * 0.5, bZ,
    width * 0.5, -height * 0.5, bZ,
    width * 0.5, -height * 0.5, -bZ,
    -width * 0.5, -height * 0.5, -bZ
  ];
  const botIdx = [0, 2, 1, 0, 3, 2];
  const botUvs = [0, 1, 1, 1, 1, 0, 0, 0];
  bottomGeom.setAttribute('position', new THREE.Float32BufferAttribute(botPos, 3));
  bottomGeom.setAttribute('uv', new THREE.Float32BufferAttribute(botUvs, 2));
  bottomGeom.setIndex(botIdx);
  bottomGeom.computeVertexNormals();

  // 6. TOP CRIMP SEAL CAP
  const topCapGeom = new THREE.BufferGeometry();
  const tZ = 0.02;
  const topPos: number[] = [
    -width * 0.5, height * 0.5, tZ,
    width * 0.5, height * 0.5, tZ,
    width * 0.5, height * 0.5, -tZ,
    -width * 0.5, height * 0.5, -tZ
  ];
  const topIdx = [0, 1, 2, 0, 2, 3];
  topCapGeom.setAttribute('position', new THREE.Float32BufferAttribute(topPos, 3));
  topCapGeom.setIndex(topIdx);
  topCapGeom.computeVertexNormals();

  return { frontGeom, backGeom, leftGeom, rightGeom, bottomGeom, topCapGeom };
}
