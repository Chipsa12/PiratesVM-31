import FiniteStateMachine from './finite-state-machine';
import CharacterStatesEnum from './states/character-states-enum';
import IdleState from './states/idle-state';
import WalkState from './states/walk-state';
import RunState from './states/run-state';

class CharacterFSM extends FiniteStateMachine {
  constructor() {
    super();
    this.addState(CharacterStatesEnum.idle, IdleState);
    this.addState(CharacterStatesEnum.walk, WalkState);
    this.addState(CharacterStatesEnum.run, RunState);

    this.setState(CharacterStatesEnum.idle);
  }
}

export default CharacterFSM;
