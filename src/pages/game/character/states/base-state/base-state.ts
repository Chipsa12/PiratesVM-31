abstract class BaseState {
  protected parent;

  constructor (parent) {
    this.parent = parent;
  }

  enter(prevState) {
  }

  exit() {
  }

  update(timeElapsed, input) {
  }
}

export default BaseState;
