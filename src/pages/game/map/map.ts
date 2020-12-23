import * as THREE from 'three';
import { equipment, frame } from '../game';
import { config } from '../config';

export type gameMap = number[][];

export type sprites = {
  [key: string]: any;
};

export interface MapProps {
  map: gameMap;
  sprites: sprites;
  frames: frame[];
  equipments: equipment[];
}

class Map {
  private map: MapProps['map'];
  private readonly sprites: MapProps['sprites'];
  private readonly frames: MapProps['frames'];
  private readonly map_group: THREE.Group;
  private equipments: MapProps['equipments'];

  constructor({ map, sprites, frames, equipments }: MapProps) {
    this.map = map;
    this.sprites = sprites;
    this.map_group = new THREE.Group();
    this.map_group.receiveShadow = true;
    this.map_group.name = config.MAP.NAME;
    this.frames = frames;
    this.equipments = equipments;
  }

  setMap(map: gameMap): void {
    this.map = map;
  }

  getMap(): THREE.Group {
    return this.map_group;
  }

  private renderEquipments(): void {
    const loadManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadManager);

    this.equipments.forEach((equipment) => {
      textureLoader.load(equipment.image, (map) => {
        const material = new THREE.SpriteMaterial({ map });
        const mesh = new THREE.Sprite(material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(equipment.position.x * config.MAP.TILE_SIZE, 0.5, equipment.position.y * config.MAP.TILE_SIZE);
        mesh.scale.set(config.MAP.TILE_SIZE, config.MAP.TILE_SIZE, 1);
        this.map_group.add(mesh);
      });
    });
  }

  render(): THREE.Group {
    this.map_group.remove(...this.map_group.children);

    const loadManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadManager);

    const materials: { material: THREE.MeshStandardMaterial, position: THREE.Vector3 }[] = [];
    const planeGeometry = new THREE.PlaneBufferGeometry(config.MAP.TILE_SIZE, config.MAP.TILE_SIZE);

    this.map.forEach((row, i) => {
      const z = i * config.MAP.TILE_SIZE;

      row.forEach((column, j) => {
        materials.push({
          material: new THREE.MeshStandardMaterial({ map: textureLoader.load(this.sprites[`${column}`]),
            visible: (this.frames[column] && this.frames[column].visible) ?? true,
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
        this.map_group.add(mesh);
      });

      const materialsCountX = this.map.length ? materials.length / this.map.length : 1;
      const materialsCountZ = materialsCountX ? materials.length / materialsCountX : 1;
      this.map_group.position.x = -config.MAP.TILE_SIZE * (materialsCountX - 1) * 0.5;
      this.map_group.position.z = -config.MAP.TILE_SIZE * (materialsCountZ - 1) * 0.5;
    };

    this.renderEquipments();

    return this.map_group;
  }
}

export default Map;
