import { ControlStates } from '../../basic-character-controller/basic-character-controller-input';

abstract class BaseState {
  protected parent;

  constructor (parent) {
    this.parent = parent;
  }

  enter(prevState) {
  }

  exit() {
  }

  update(timeElapsed: number, input: ControlStates) {
  }
}

export default BaseState;
