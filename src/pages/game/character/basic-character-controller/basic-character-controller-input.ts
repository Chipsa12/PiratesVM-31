import { eventTypes } from '../../../../constants/event-types';

type ControlStates = {
  forward: boolean,
  backward: boolean,
  left: boolean,
  right: boolean,
  space: boolean,
  shift: boolean,
}

class BasicCharacterControllerInput {
  keys: ControlStates;

  constructor () {
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      space: false,
      shift: false,
    };
    document.addEventListener(eventTypes.keydown, (e) => this.onKeyDown(e), false);
    document.addEventListener(eventTypes.keyup, (e) => this.onKeyUp(e), false);
  }

  destruct() {
    document.removeEventListener(eventTypes.keydown, (e) => this.onKeyDown(e), false);
    document.removeEventListener(eventTypes.keyup, (e) => this.onKeyUp(e), false);
  }

  private onKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case eventTypes.w:
      case eventTypes.arrowUp:
        this.keys.forward = true;
        break;
      case eventTypes.d:
      case eventTypes.arrowRight:
        this.keys.right = true;
        break;
      case eventTypes.s:
      case eventTypes.arrowDown:
        this.keys.backward = true;
        break;
      case eventTypes.a:
      case eventTypes.arrowLeft:
        this.keys.left = true;
        break;
      case eventTypes.shiftLeft:
      case eventTypes.shiftRight:
        this.keys.shift = true;
        break;
    }
  }

  private onKeyUp(event: KeyboardEvent) {
    switch (event.code) {
      case eventTypes.w:
      case eventTypes.arrowUp:
        this.keys.forward = false;
        break;
      case eventTypes.d:
      case eventTypes.arrowRight:
        this.keys.right = false;
        break;
      case eventTypes.s:
      case eventTypes.arrowDown:
        this.keys.backward = false;
        break;
      case eventTypes.a:
      case eventTypes.arrowLeft:
        this.keys.left = false;
        break;
      case eventTypes.shiftLeft:
      case eventTypes.shiftRight:
        this.keys.shift = false;
        break;
    }
  }
}

export default BasicCharacterControllerInput;
