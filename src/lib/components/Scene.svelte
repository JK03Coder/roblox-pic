<script lang="ts">
  import type { Camera, AABB, CameraSettings } from '$lib/types';
  import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
  import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
  import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import * as THREE from 'three';
  import { cameraSettings, orbitControlsRef } from '$lib/stores';
  import { onMount } from 'svelte';

  export let camera: Camera;
  export let aabb: AABB;
  const initCamSettings: CameraSettings = { camera, aabb };
  $cameraSettings = initCamSettings;
  export let mtl: string;
  export let obj: string;

  let canvReference: HTMLCanvasElement;
  let parent: HTMLElement;

  onMount(() => {
    parent = canvReference.parentElement!;

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvReference,
      alpha: true,
    });
    renderer.setSize(canvReference.offsetWidth, canvReference.offsetHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const sceneCamera = new THREE.PerspectiveCamera(camera.fov, 1 / 1, 1, 120);
    sceneCamera.position.set(
      camera.position.x,
      camera.position.y,
      camera.position.z
    );
    sceneCamera.lookAt(
      (aabb.min.x + aabb.max.x) / 2,
      (aabb.max.y + aabb.min.y) / 2,
      (aabb.max.z + aabb.min.z) / 2
    );

    const controls = new OrbitControls(sceneCamera, renderer.domElement);
    orbitControlsRef.set(controls);
    controls.target.set(
      (aabb.min.x + aabb.max.x) / 2,
      (aabb.max.y + aabb.min.y) / 2,
      (aabb.max.z + aabb.min.z) / 2
    );
    controls.update();
    controls.enablePan = true;
    controls.enableDamping = true;
    controls.dampingFactor = 0.3;
    controls.minDistance = 1;
    controls.maxDistance = 110;

    cameraSettings.subscribe((newSettings) => {
      sceneCamera.position.set(
        newSettings.camera.position.x,
        newSettings.camera.position.y,
        newSettings.camera.position.z
      );
      sceneCamera.lookAt(
        (newSettings.aabb.min.x + newSettings.aabb.max.x) / 2,
        (newSettings.aabb.max.y + newSettings.aabb.min.y) / 2,
        (newSettings.aabb.max.z + newSettings.aabb.min.z) / 2
      );
      $orbitControlsRef.target.set(
        (newSettings.aabb.min.x + newSettings.aabb.max.x) / 2,
        (newSettings.aabb.max.y + newSettings.aabb.min.y) / 2,
        (newSettings.aabb.max.z + newSettings.aabb.min.z) / 2
      );
    });

    const manager = new THREE.LoadingManager();
    manager.setURLModifier((url) => {
      const id = url.split('com/')[1];
      return getHashUrl(id);
    });

    const materialLoader = new MTLLoader(manager);
    materialLoader.load(
      getHashUrl(mtl),
      (material) => {
        material.preload();
        for (const key in material.materials) {
          material.materials[key].transparent = false;
        }

        const objectLoader = new OBJLoader();
        objectLoader.setMaterials(material);

        objectLoader.load(
          getHashUrl(obj),
          (avatar) => {
            avatar.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                const shinyMaterial = new THREE.MeshStandardMaterial({
                  map: child.material.map,
                  color: 0xffffff,
                  roughness: 0.0,
                  metalness: 0.2,
                });
                child.material = shinyMaterial;
              }
            });
            scene.add(avatar);
          },
          undefined,
          (error) => {
            console.log(
              'An error happened loading the object resource: ',
              error
            );
          }
        );
      },
      undefined,
      (error) => {
        console.log('An error happened loading the material resource: ', error);
      }
    );

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    new EXRLoader()
      .setDataType(THREE.FloatType)
      .load('/studio.exr', function (texture) {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        // scene.background = envMap;
        scene.environment = envMap;
        texture.dispose();
        pmremGenerator.dispose();
      });

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, sceneCamera);
    }
    animate();

    window.addEventListener('resize', () => {
      renderer.setSize(parent.offsetWidth, parent.offsetHeight);
    });
  });

  function getHashUrl(hash: string) {
    let st = 31;
    for (let i = 0; i < hash.length; i++) {
      st ^= hash[i].charCodeAt(0);
    }
    return `https://t${(st % 8).toString()}.rbxcdn.com/${hash}`;
  }
</script>

<canvas bind:this={canvReference} class="relative w-full h-full z-20">
  Your browser does not support HTML5 Canvas
</canvas>
