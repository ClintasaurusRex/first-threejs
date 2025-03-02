import * as THREE from "three";

export function addStar(scene) {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);

  const material = new THREE.PointsMaterial({
    color: 0xffff00,
    size: 1,
    sizeAttenuation: true,
  });

  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(1700));

  star.position.set(x, y, z);

  scene.add(star);
}

export function createStars(scene, count = 4000) {
  Array(count)
    .fill()
    .forEach(() => addStar(scene));
}
