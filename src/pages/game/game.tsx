import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';
import { eventTypes } from '../../constants/event-types';
import BasicCharacterController from './character/basic-character-controller';

const floorImg = require('../../assets/floor_diffuse.png');

const StyledGame = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Game = () => {
  const mount = useRef<HTMLDivElement>(null);
  const clock = useRef<THREE.Clock>(new THREE.Clock());
  const characterControls = useRef<BasicCharacterController | null>(null);

  useEffect(() => {
    let { clientWidth: width, clientHeight: height } = mount.current!;
    let frameId;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.set(0, 300, 20);
    camera.lookAt(scene.position);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor('#2da0f3');
    renderer.setSize(width, height);
    renderer.outputEncoding = THREE.sRGBEncoding;

    const textureLoader = new THREE.TextureLoader();

    const floorMaterial = new THREE.MeshStandardMaterial({
      roughness: 0.8,
      color: 0xffffff,
      metalness: 0.2,
    });
    textureLoader.load(floorImg, (map) => {
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.repeat.set(1, 2).multiplyScalar(10);
      floorMaterial.map = map;
      floorMaterial.needsUpdate = true;
    }, (e) => console.log(`Progress: ${e}`), (e) => console.error(e))

    const floorGeometry = new THREE.PlaneBufferGeometry(270, 430);
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.receiveShadow = true;
    floorMesh.rotation.x = -Math.PI / 2.0;
    floorMesh.position.set(0, 0, 0);
    scene.add(floorMesh);

    const pointLight = new THREE.PointLight(0xffffff, 0.9);
    pointLight.position.set(100, 250, 120);
    camera.add(pointLight);

    const renderScene = () => {
      characterControls.current?.update(clock.current.getDelta());
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      width = mount.current!.clientWidth;
      height = mount.current!.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    }

    const animate = (_time: number) => {
      renderScene();
      frameId = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const stop = () => {
      window.cancelAnimationFrame(frameId);
      frameId = null;
    };

    mount.current?.append(renderer.domElement);
    window.addEventListener(eventTypes.resize, handleResize, false);
    start();

    characterControls.current = new BasicCharacterController({ scene, camera });

    return () => {
      stop();
      window.removeEventListener(eventTypes.resize, handleResize, false);

      floorGeometry.dispose();
      floorMaterial.dispose();
    }
  }, []);

  return <StyledGame ref={mount} />
};

export default Game;
