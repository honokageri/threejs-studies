import * as THREE from "three";
import type { Demo } from "../../app/types";

export const demo01BasicScene: Demo = {
  id: "01-basic-scene",
  title: "01. Basic Scene",
  description: "Scene / Camera / Renderer の最小構成。回転する立方体。",
  start: ({ container }) => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1220);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0x00aaff, metalness: 0.2, roughness: 0.4 })
    );
    scene.add(cube);

    let raf = 0;

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // cleanup（超大事）
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);

      // dispose
      cube.geometry.dispose();
      (cube.material as THREE.Material).dispose();
      renderer.dispose();

      // canvas remove
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  },
};
