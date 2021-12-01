import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.IcosahedronGeometry(0.7, 0);
const geometry1 = new THREE.IcosahedronGeometry(0.69, 0);

// Materials

const material = new THREE.MeshBasicMaterial();
material.wireframe = true;
material.wireframeLinewidth = 6;
material.color = new THREE.Color(0xffffff);

const material1 = new THREE.MeshStandardMaterial();
material1.roughness = 0.5;
material.metalness = 0.5;
material1.color = new THREE.Color(0x050505);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
const sphere1 = new THREE.Mesh(geometry1, material1);
scene.add(sphere1);

// Lights

// const pointLight = new THREE.PointLight(0xffffff, 0.1);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

const light = new THREE.AmbientLight(0xffffff, 6); // soft white light
light.position.x = 2;
light.position.y = 3;
light.position.z = 4;
scene.add(light);

// const pointLight2 = new THREE.PointLight(0x00ffff, 3);
// pointLight2.position.set(-5.49, -4.84, 1.23);
// scene.add(pointLight2);
// gui.add(pointLight2.position, "x").min(-10).max(10).step(0.01);
// gui.add(pointLight2.position, "y").min(-10).max(10).step(0.01);
// gui.add(pointLight2.position, "z").min(-10).max(10).step(0.01);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  sphere1.rotation.y = 0.1 * elapsedTime;
  sphere.rotation.x = -0.1 * elapsedTime;
  sphere1.rotation.x = -0.1 * elapsedTime;
  sphere.rotation.z = 0.1 * elapsedTime;
  sphere1.rotation.z = 0.1 * elapsedTime;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
