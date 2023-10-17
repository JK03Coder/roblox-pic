<script lang="ts">
  import type { PageData } from './$types';
  import { Title } from '$lib/components';
  import { Canvas, T, extend, useThrelte } from '@threlte/core';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

  extend({
    OrbitControls,
  });

  export let data: PageData;
  let { camera, aabb, mtl, obj } = data;

  const { renderer } = useThrelte();
</script>

<Title name="Editor" />

<Canvas>
  <T.PerspectiveCamera let:ref makeDefault>
    <T.OrbitControls args={[ref, renderer.domElement]} />
  </T.PerspectiveCamera>

  <T.Mesh>
    <T.BoxGeometry />
    <T.MeshBasicMaterial />
  </T.Mesh>
</Canvas>
