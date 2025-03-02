//----------------------------------------------
// IMPORTS
//----------------------------------------------
import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createSun } from "./solarSystem/sun.js";
import { createStars } from "./stars.js";
import { createEarth, moon } from "./solarSystem/earth.js";
import { createMercury } from "./solarSystem/mercury.js";

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

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// directionalLight.position.set(-50, 15, 150);
// scene.add(directionalLight);

// Possibly increase intensity (second parameter) if planets are too dim
// Third parameter controls how far out the light source reaches
const sunLight = new THREE.PointLight(0xffffcc, 10000, 200000);
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
// Moon SETUP
//----------------------------------------------
const moonObj = moon();
// Start the moon at some position relative to Earth
moonObj.position.set(earth.position.x + 10, earth.position.y, earth.position.z);
scene.add(moonObj);

//----------------------------------------------
// Mercury SETUP
//----------------------------------------------
const mercury = createMercury();
mercury.position.set(-20, 15, 15); // Initial position, will be overridden by orbit
scene.add(mercury);

// Add these variables with your other orbit parameters
let mercuryOrbitRadius = 30; // Closer to the sun than Earth
let mercuryOrbitSpeed = 0.02; // Faster orbit than Earth
let mercuryOrbitAngle = 0; // Current angle of Mercury's orbit

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
let earthOrbitRadius = 70; // Distance from sun to earth
let earthOrbitSpeed = 0.005; // Speed of earth's orbit
let earthOrbitAngle = 0; // Current angle of earth's orbit

// Moon orbit parameters
let moonOrbitRadius = 15; // Distance from earth to moon
let moonOrbitSpeed = 0.021; // Speed of moon's orbit (faster than Earth)
let moonOrbitAngle = 0; // Current angle of moon's orbit

function animate() {
  requestAnimationFrame(animate);

  // Earth rotation on its axis
  earth.rotation.y += 0.01;

  // Earth orbit around the sun
  earthOrbitAngle += earthOrbitSpeed;
  earth.position.x = sun.position.x + earthOrbitRadius * Math.cos(earthOrbitAngle);
  earth.position.z = sun.position.z + earthOrbitRadius * Math.sin(earthOrbitAngle);

  // Moon rotation on its axis
  moonObj.rotation.y += 0.005;

  // Moon orbit around the earth
  moonOrbitAngle += moonOrbitSpeed;
  moonObj.position.x = earth.position.x + moonOrbitRadius * Math.cos(moonOrbitAngle);
  moonObj.position.z = earth.position.z + moonOrbitRadius * Math.sin(moonOrbitAngle);

  mercury.rotation.y += 0.005;
  mercuryOrbitAngle += mercuryOrbitSpeed;
  mercury.position.x = sun.position.x + mercuryOrbitRadius * Math.cos(mercuryOrbitAngle);
  mercury.position.z = sun.position.z + mercuryOrbitRadius * Math.sin(mercuryOrbitAngle);

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
