import * as THREE from "three";

export function createVenus() {
  // Create a sphere for Venus
  const geometry = new THREE.SphereGeometry(3.5, 64, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffa500, // Orange base color
    roughness: 0.9,
    metalness: 0.5,
  });

  const sphere = new THREE.Mesh(geometry, material);

  // Load Venus texture
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    "https://threejs.org/examples/textures/planets/venus_surface.jpg",
    (texture) => {
      material.map = texture;
      // This makes the texture blend with the orange color
      material.color.set(0xffa500);
      material.needsUpdate = true;
    }
  );

  return sphere;
}
