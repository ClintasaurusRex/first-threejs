//----------------------------------------------
// IMPORTS
//----------------------------------------------
import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createSun } from "./solarSystem/sun.js";
import { createStars } from "./stars.js";
import { createEarth } from "./solarSystem/earth.js";

//----------------------------------------------
// SCENE & CAMERA SETUP
//----------------------------------------------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 5;
camera.position.set(-10, 50, 150); // Position the camera farther back to see the entire solar system

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
// LIGHTING/ SUN
//----------------------------------------------
// Comment out or remove the directional light
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// directionalLight.position.set(-50, 15, 150);
// scene.add(directionalLight);

// Possibly increase intensity (second parameter) if planets are too dim
const sunLight = new THREE.PointLight(0xffffcc, 3000, 2000);
// Make sure sunLight position matches the sun object position
sunLight.position.set(-50, 15, 15); // Same as where you're positioning the sun
scene.add(sunLight);

// Add ambient light for basic illumination
const ambientLight = new THREE.AmbientLight(0x404040, 0.9); // subtle ambient lighting
scene.add(ambientLight);

// Add light helper for debugging
// const helper = new THREE.DirectionalLightHelper(directionalLight, 15);
// scene.add(helper);
const helper2 = new THREE.PointLightHelper(sunLight, 15);
scene.add(helper2);

//----------------------------------------------
// CONTROLS
//----------------------------------------------
const controls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = 500; // Allow zooming out to see the entire system

//----------------------------------------------
// Earth SETUP
//----------------------------------------------
const earth = createEarth();
earth.position.set(15, 15, 15);
scene.add(earth);

//----------------------------------------------
// Sun SETUP
//----------------------------------------------
const sun = createSun();
sun.position.set(-50, 15, 15); // Position the sun at the same position as the directional light
scene.add(sun);

//----------------------------------------------
// STARS SETUP
//----------------------------------------------
// Add stars to the scene
createStars(scene, 4000);

//----------------------------------------------
// ANIMATION LOOP
//----------------------------------------------

// Add these variables before the animate function
let earthOrbitRadius = 65; // Distance from sun to earth
let earthOrbitSpeed = 0.005; // Speed of earth's orbit
let earthOrbitAngle = 0; // Current angle of earth's orbit

function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y += 0.01;

  // Earth orbit around the sun
  earthOrbitAngle += earthOrbitSpeed;
  earth.position.x = sun.position.x + earthOrbitRadius * Math.cos(earthOrbitAngle);
  earth.position.z = sun.position.z + earthOrbitRadius * Math.sin(earthOrbitAngle);

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
