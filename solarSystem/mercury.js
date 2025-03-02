import * as THREE from "three";

export function createMercury() {
  const geometry = new THREE.SphereGeometry(2, 64, 32);
  const material = new THREE.MeshStandardMaterial({
    roughness: 0.7,
    metalness: 0.8,
  });

  const sphere = new THREE.Mesh(geometry, material);

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load("https://threejs.org/examples/textures/planets/mercury.jpg", (texture) => {
    material.map = texture;
    material.needsUpdate = true;
  });

  return sphere;
}
