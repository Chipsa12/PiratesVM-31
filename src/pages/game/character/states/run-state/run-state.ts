import BaseState from '../base-state';
import CharacterStatesEnum from '../character-states-enum';

class RunState extends BaseState {
  get name() {
    return CharacterStatesEnum.run;
  }

  update(timeElapsed, input) {
    super.update(timeElapsed, input);
    if (input.keys.forward || input.keys.backward) {
      if (!input.keys.shift) {
        this.parent.setState(CharacterStatesEnum.walk);
      }
      return;
    }

    this.parent.setState(CharacterStatesEnum.idle);
  }
}

export default RunState;
