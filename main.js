//----------------------------------------------
// IMPORTS
//----------------------------------------------
import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createStars } from "./stars.js";
import { createEarth, animateEarth } from "./earth.js";

//----------------------------------------------
// SCENE & CAMERA SETUP
//----------------------------------------------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 5;
camera.position.set(0, 10, 30);

//----------------------------------------------
// RENDERER SETUP
//----------------------------------------------
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#app"),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);

//----------------------------------------------
// LIGHTING
//----------------------------------------------
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(50, 15, 15);
scene.add(directionalLight);

// Add light helper for debugging
const helper = new THREE.DirectionalLightHelper(directionalLight, 15);
// scene.add(helper);

//----------------------------------------------
// CONTROLS
//----------------------------------------------
const controls = new OrbitControls(camera, renderer.domElement);

//----------------------------------------------
// EARTH SETUP
//----------------------------------------------
// Create and add Earth to the scene
const earth = createEarth();
scene.add(earth);

//----------------------------------------------
// STARS SETUP
//----------------------------------------------
// Add stars to the scene
createStars(scene, 4000);

//----------------------------------------------
// ANIMATION LOOP
//----------------------------------------------
function animate() {
  requestAnimationFrame(animate);

  // Animate the Earth
  animateEarth(earth);

  renderer.render(scene, camera);
}

//----------------------------------------------
// EVENT LISTENERS
//----------------------------------------------
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//----------------------------------------------
// START ANIMATION
//----------------------------------------------
animate();
