import * as THREE from "three";

export function createSun() {
  const geometry = new THREE.SphereGeometry(70, 64, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    emissive: 0xffff00,
    emissiveIntensity: 1,
    roughness: 0.1,
  });

  const sun = new THREE.Mesh(geometry, material);

  return sun;
}
