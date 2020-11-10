import * as THREE from 'three';
import CharacterFSM from '../character-fsm';
import BasicCharacterControllerInput from './basic-character-controller-input';
import FiniteStateMachine from '../finite-state-machine';

const characterImg = require('../../../../assets/error.png');

type params = {
  scene: THREE.Scene;
  camera: THREE.Camera;
};

class BasicCharacterController extends FiniteStateMachine {
  private params: params;
  private stateMachine: CharacterFSM;
  private deceleration = new THREE.Vector3(-5, 0, -5);
  private acceleration = new THREE.Vector3(100, 0, 100);
  private velocity = new THREE.Vector3(0, 0, 0);
  private input: BasicCharacterControllerInput;
  private target;

  constructor(params: params) {
    super();
    this.params = params;

    this.input = new BasicCharacterControllerInput();
    this.stateMachine = new CharacterFSM();
    this.loadModels();
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

      if (this.input.keys.forward) {
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
    const textureLoader = new THREE.TextureLoader();

    const characterMaterial = new THREE.MeshStandardMaterial();
    textureLoader.load(characterImg, (map) => {
      characterMaterial.map = map;
      characterMaterial.needsUpdate = true;

      const characterGeometry = new THREE.BoxGeometry(10, 2, 10);
      this.target = new THREE.Mesh(characterGeometry, characterMaterial);
      this.target.receiveShadow = true;
      this.params.scene.add(this.target);
    });
  }
}

export default BasicCharacterController;
