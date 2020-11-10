import BaseState from '../base-state';
import CharacterStatesEnum from '../character-states-enum';

class WalkState extends BaseState {
   get name() {
    return CharacterStatesEnum.walk;
  }

  enter(prevState) {
    super.enter(prevState);
  }

  update(timeElapsed, input) {
    if (input.keys.forward || input.keys.backward || input.keys.right || input.keys.left) {
      if (input.keys.shift) {
        this.parent.setState(CharacterStatesEnum.run);
      }
      return;
    }
    this.parent.setState(CharacterStatesEnum.idle);
  }
}

export default WalkState;
