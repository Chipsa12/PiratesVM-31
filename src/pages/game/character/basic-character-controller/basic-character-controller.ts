import * as THREE from 'three';
import CharacterFSM from '../character-fsm';
import BasicCharacterControllerInput, { ControlStates } from './basic-character-controller-input';
import FiniteStateMachine from '../finite-state-machine';
import { config } from '../../config';

import characterFrontImg from '../../../../assets/pirate/pirate_blue_top.png';
import characterBackImg from '../../../../assets/pirate/pirate_blue_back.png';
import characterLeftImg from '../../../../assets/pirate/pirate_blue_left.png';
import characterRightImg from '../../../../assets/pirate/pirate_blue_right.png';

type characterModels = {
  back: THREE.SpriteMaterial;
  front: THREE.SpriteMaterial;
  left: THREE.SpriteMaterial;
  right: THREE.SpriteMaterial;
};

type params = {
  gameScene: THREE.Group;
  camera: THREE.Camera;
};

class BasicCharacterController extends FiniteStateMachine {
  private params: params;
  private stateMachine: CharacterFSM;
  private deceleration = new THREE.Vector3(-5, 0, -5);
  private acceleration = new THREE.Vector3(100, 0, 100);
  private velocity = new THREE.Vector3(0, 0, 0);
  private readonly input: BasicCharacterControllerInput;
  private target?: THREE.Sprite;
  private characterModels: characterModels = {
    front: new THREE.SpriteMaterial(),
    back: new THREE.SpriteMaterial(),
    right: new THREE.SpriteMaterial(),
    left: new THREE.SpriteMaterial(),
  };
  private characterControllerProxy = {
    set: (obj: ControlStates, prop, value) => {
      if (value) {
        this.setCharacterMaterial(prop);
      } else {
        const activeKey = Object.keys(obj).find(key => key !== prop && obj[key]);

        if (activeKey) {
          this.setCharacterMaterial(activeKey);
        }
      }
      obj[prop] = value;
      return true;
    }
  };

  constructor(params: params) {
    super();
    this.params = params;
    this.input = new BasicCharacterControllerInput(this.characterControllerProxy);
    this.stateMachine = new CharacterFSM();
    this.loadModels();
  }

  private setCharacterMaterial(model: 'forward' | 'backward' | 'right' | 'left' | string) {
    if (this.target) {
      switch(model) {
        case 'forward':
          this.target.material = this.characterModels.back;
          break;
        case 'backward':
          this.target.material = this.characterModels.front;
          break;
        case 'right':
          this.target.material = this.characterModels.right;
          break;
        case 'left':
          this.target.material = this.characterModels.left;
          break;
      }
    }
  }

  private isAbleToMoveTo(x: number, y: number) {
    console.log(x, y);
    console.log(this.target?.position);
    return true;
  }

  public update(timeInSeconds: number) {
    if (this.target) {
      this.stateMachine.update(timeInSeconds, this.input);

      const frameDeceleration = new THREE.Vector3(
        this.velocity.x * this.deceleration.x,
        this.velocity.y * this.deceleration.y,
        this.velocity.z * this.deceleration.z
      );
      frameDeceleration.multiplyScalar(timeInSeconds);
      frameDeceleration.z = Math.sign(frameDeceleration.z) * Math.min(
        Math.abs(frameDeceleration.z), Math.abs(this.velocity.z));
      frameDeceleration.x = Math.sign(frameDeceleration.x) * Math.min(
        Math.abs(frameDeceleration.x), Math.abs(this.velocity.x));

      this.velocity.add(frameDeceleration);

      const acc = this.acceleration.clone();
      if (this.input.keys.shift) {
        acc.multiplyScalar(2);
      }

      if (this.input.keys.forward && this.isAbleToMoveTo(this.velocity.x, this.velocity.z - 1)) {
        this.velocity.z -= acc.z * timeInSeconds;
      }
      if (this.input.keys.backward) {
        this.velocity.z += acc.z * timeInSeconds;
      }
      if (this.input.keys.left) {
        this.velocity.x -= acc.x * timeInSeconds;
      }
      if (this.input.keys.right) {
        this.velocity.x += acc.x * timeInSeconds;
      }

      const forward = new THREE.Vector3(0, 0, 1);
      forward.applyQuaternion(this.target.quaternion);
      forward.normalize();

      const sideways = new THREE.Vector3(1, 0, 0);
      sideways.applyQuaternion(this.target.quaternion);
      sideways.normalize();

      sideways.multiplyScalar(this.velocity.x * timeInSeconds);
      forward.multiplyScalar(this.velocity.z * timeInSeconds);

      this.target.position.add(forward);
      this.target.position.add(sideways);
    }
  }

  private loadModels() {
    const loadManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadManager);

    const characterMaterialBack = new THREE.SpriteMaterial({ map: textureLoader.load(characterBackImg) });
    const characterMaterialRight = new THREE.SpriteMaterial({ map: textureLoader.load(characterRightImg) });
    const characterMaterialLeft = new THREE.SpriteMaterial({ map: textureLoader.load(characterLeftImg) });
    const characterMaterialFront = new THREE.SpriteMaterial();

    textureLoader.load(characterFrontImg, (map) => {
      characterMaterialFront.map = map;
      characterMaterialFront.needsUpdate = true;
      this.characterModels.front = characterMaterialFront;

      this.target = new THREE.Sprite(characterMaterialFront);
      this.target.scale.set(config.PLAYER.WIDTH, config.PLAYER.HEIGHT, 1);
      this.target.position.y = 1;
      this.target.name = config.PLAYER.NAME;
      this.target.receiveShadow = true;
      console.log(this.params.gameScene);
      this.params.gameScene.add(this.target);
    });

    loadManager.onLoad = () => {
      this.characterModels.front = characterMaterialFront;
      this.characterModels.back = characterMaterialBack;
      this.characterModels.right = characterMaterialRight;
      this.characterModels.left = characterMaterialLeft;
    };
  }
}

export default BasicCharacterController;
