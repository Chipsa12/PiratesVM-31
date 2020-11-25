import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';
import { eventTypes } from '../../constants/event-types';
import BasicCharacterController from './character/basic-character-controller';
import Map, { gameMap, sprites } from './map';
import { config } from './config';

import floorImg from '../../assets/floor_diffuse.png';
import waterImg from '../../assets/water.png';

const StyledGame = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export type frame = {
  visible?: boolean,
};

interface GameDataInterface {
  map: gameMap;
  sprites: sprites;
  frames: frame[];
}

const gameData: GameDataInterface = {
  map: [
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  ],
  sprites: {
    0: '',
    1: floorImg,
  },
  frames: [
    { visible: false },
    {},
  ],
};

const Game = () => {
  const mount = useRef<HTMLDivElement>(null);
  const game = useRef<THREE.Group>(new THREE.Group());
  const clock = useRef<THREE.Clock>(new THREE.Clock());
  const characterControls = useRef<BasicCharacterController | null>(null);
  const map = useRef<Map>(new Map(gameData.map, gameData.sprites, gameData.frames));

  useEffect(() => {
    let { clientWidth: width, clientHeight: height } = mount.current!;
    let frameId;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      config.CAMERA.FOV,
      width / height,
      config.CAMERA.NEAR,
      config.CAMERA.FAR,
    );
    const cameraHeight = (config.MAP.TILE_SIZE + config.MAP.TILES_GAP * 2) * gameData.map.length;
    camera.position.set(
      0,
      cameraHeight >= config.CAMERA.FAR ? config.CAMERA.FAR - config.CAMERA.ANGLE : cameraHeight,
      config.CAMERA.ANGLE,
    );
    camera.lookAt(scene.position);
    scene.add(camera);

    const material = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load(waterImg),
    });
    const geometry = new THREE.PlaneBufferGeometry(width, height < camera.position.y ? camera.position.y : height);
    const waterMesh = new THREE.Mesh(geometry, material);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = -0.1;
    game.current.add(waterMesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor('#2da0f3');
    renderer.setSize(width, height);
    renderer.outputEncoding = THREE.sRGBEncoding;

    game.current.add(map.current.render());
    scene.add(game.current);

    const pointLight = new THREE.PointLight(0xffffff, 0.9);
    pointLight.position.set(100, cameraHeight, 120);
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
    };

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

    characterControls.current = new BasicCharacterController({ gameScene: game.current, camera });

    return () => {
      stop();
      window.removeEventListener(eventTypes.resize, handleResize, false);
    };
  }, []);

  return <StyledGame ref={mount} />;
};

export default Game;
