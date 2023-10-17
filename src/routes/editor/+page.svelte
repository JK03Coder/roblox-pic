<script lang="ts">
  import type { PageData } from './$types';
  import * as THREE from 'three';
  import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
  import { onMount } from 'svelte';
  import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

  export let data: PageData;

  let { camera: cameraDetails, aabb, mtl, obj } = data;

  let canvReference: HTMLElement;

  onMount(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      cameraDetails!.fov,
      canvReference.offsetWidth / canvReference.offsetHeight,
      1,
      100
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvReference,
    });
    renderer.setSize(canvReference.offsetWidth, canvReference.offsetHeight);
    canvReference = renderer.domElement;

    camera.position.set(
      cameraDetails!.position.x,
      cameraDetails!.position.y,
      cameraDetails!.position.z
    );
    camera.lookAt(
      (aabb!.min.x + aabb!.max.x) / 2,
      (aabb!.max.y + aabb!.min.y) / 2,
      (aabb!.max.z + aabb!.min.z) / 2
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(
      (aabb!.min.x + aabb!.max.x) / 2,
      (aabb!.max.y + aabb!.min.y) / 2,
      (aabb!.max.z + aabb!.min.z) / 2
    );
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;

    const manager = new THREE.LoadingManager();
    manager.setURLModifier((url) => {
      const id = url.split('com/')[1];
      // if (url === getHashUrl(mtl!)) return getHashUrl(id);
      // return getHashUrl(id.split('-')[1]);
      return getHashUrl(id);
    });

    const materialLoader = new MTLLoader(manager);
    materialLoader.load(
      getHashUrl(mtl!),
      (material) => {
        material.preload();
        for (const key in material.materials) {
          material.materials[key].transparent = false;
        }

        const objectLoader = new OBJLoader();
        objectLoader.setMaterials(material);

        objectLoader.load(
          // getHashUrl(obj!.split('-')[1]),
          getHashUrl(obj!),
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
          (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
          },
          (error) => {
            console.log('An error happened: ', error);
          }
        );
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.log('An error happened: ', error);
      }
    );

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    new EXRLoader().load('/background.exr', function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      scene.environment = envMap;
      scene.background = envMap;
      pmremGenerator.dispose();
    });

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  });

  function getHashUrl(hash: string) {
    let st = 31;
    for (let ii = 0; ii < hash.length; ii++) {
      st ^= hash[ii].charCodeAt(0);
    }
    return `https://t${(st % 8).toString()}.rbxcdn.com/${hash}`;
  }
</script>

<canvas bind:this={canvReference} class="mx-auto mt-10"
  >Your browser does not support HTML5 Canvas</canvas
>

<style>
  canvas {
    width: 800px;
    height: 800px;
  }
</style>
