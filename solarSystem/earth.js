import * as THREE from "three";

export function createEarth() {
  // Create a sphere for Earth
  const geometry = new THREE.SphereGeometry(5, 64, 32);
  const material = new THREE.MeshStandardMaterial({
    roughness: 0.9,
    metalness: 0.5,
  });

  const sphere = new THREE.Mesh(geometry, material);

  // Load Earth texture
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
    (texture) => {
      material.map = texture;
      material.needsUpdate = true;
    }
  );

  return sphere;
}

export function animateEarth(earth, speed = 0.01) {
  earth.rotation.y += speed;
}

export function moon() {
  const geometry = new THREE.SphereGeometry(1, 64, 32);
  const material = new THREE.MeshStandardMaterial({
    roughness: 0.9,
    metalness: 0.5,
  });

  const sphere = new THREE.Mesh(geometry, material);

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load("https://threejs.org/examples/textures/planets/moon_1024.jpg", (texture) => {
    material.map = texture;
    material.needsUpdate = true;
  });
  return sphere;
}
