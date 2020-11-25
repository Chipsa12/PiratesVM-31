import * as THREE from 'three';
import { frame } from '../game';
import { config } from '../config';

export type gameMap = number[][];

export type sprites = {
  [key: string]: any;
};

class Map {
  private MAP: gameMap;
  private readonly SPRITES: sprites;
  private readonly FRAMES: frame[];
  private readonly MAP_GROUP: THREE.Group;

  constructor(map: gameMap, sprites: sprites, frames: frame[]) {
    this.MAP = map;
    this.SPRITES = sprites;
    this.MAP_GROUP = new THREE.Group();
    this.MAP_GROUP.receiveShadow = true;
    this.MAP_GROUP.name = config.MAP.NAME;
    this.FRAMES = frames;
  }

  setMap(map: gameMap) {
    this.MAP = map;
  }

  getMap(): THREE.Group {
    return this.MAP_GROUP;
  }

  render(): THREE.Group {
    this.MAP_GROUP.remove(...this.MAP_GROUP.children);

    const loadManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadManager);

    const materials: { material: THREE.MeshStandardMaterial, position: THREE.Vector3 }[] = [];
    const planeGeometry = new THREE.PlaneBufferGeometry(config.MAP.TILE_SIZE, config.MAP.TILE_SIZE);

    this.MAP.forEach((row, i) => {
      const z = i * config.MAP.TILE_SIZE;

      row.forEach((column, j) => {
        materials.push({
          material: new THREE.MeshStandardMaterial({ map: textureLoader.load(this.SPRITES[`${column}`]),
            visible: (this.FRAMES[column] && this.FRAMES[column].visible) ?? true,
          }),
          position: new THREE.Vector3(config.MAP.TILE_SIZE * j, 0, z),
        });
      });
    });

    loadManager.onLoad = () => {
      materials.forEach(({ material, position }) => {
        const mesh = new THREE.Mesh(planeGeometry, material);
        mesh.position.set(position.x, position.y, position.z);
        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;
        this.MAP_GROUP.add(mesh);
      });

      const materialsCountX = this.MAP.length ? materials.length / this.MAP.length : 1;
      const materialsCountZ = materialsCountX ? materials.length / materialsCountX : 1;
      this.MAP_GROUP.position.x = -config.MAP.TILE_SIZE * (materialsCountX - 1) * 0.5;
      this.MAP_GROUP.position.z = -config.MAP.TILE_SIZE * (materialsCountZ - 1) * 0.5;
    };
    return this.MAP_GROUP;
  }
}

export default Map;
