import BaseState from '../base-state';
import CharacterStatesEnum from '../character-states-enum';

class IdleState extends BaseState {
  get name() {
    return CharacterStatesEnum.idle;
  }

  enter(prevState) {
    super.enter(prevState);
  }

  update(timeElapsed, input) {
    super.update(timeElapsed, input);
    if (input.keys.forward || input.keys.backward || input.keys.right || input.keys.left) {
      this.parent.setState(CharacterStatesEnum.walk);
    }
  }
}

export default IdleState;
