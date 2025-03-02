import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);

camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#app"),
  antialias: true,
});

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(50, 15, 15);
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.set(0, 10, 30);
renderer.setClearColor(0x000000);

// Load Earth textures
const textureLoader = new THREE.TextureLoader();

// Create a sphere for Earth
const geometry = new THREE.SphereGeometry(5, 64, 32);
const material = new THREE.MeshStandardMaterial({
  roughness: 0.5,
  metalness: 0.2,
});

// Load Earth texture
textureLoader.load(
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
  (texture) => {
    material.map = texture;
    material.needsUpdate = true;
  }
);

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.y += 0.01;

  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);

  const material = new THREE.PointsMaterial({
    color: 0xffff00,
    size: 1,
    sizeAttenuation: true,
  });

  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(700));

  star.position.set(x, y, z);

  scene.add(star);
}

Array(2000 * 2)
  .fill()
  .forEach(addStar);

const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(helper);
