import BasicCharacterControllerInput from './basic-character-controller/basic-character-controller-input';
import CharacterStatesEnum from './states/character-states-enum';

class FiniteStateMachine {
  private readonly states;
  private currentState;

  constructor() {
    this.states = {};
    this.currentState = null;
  }

  public update(timeElapsed: number, input: BasicCharacterControllerInput) {
    if (this.currentState) {
      this.currentState.update(timeElapsed, input);
    }
  }

  public setState(name: CharacterStatesEnum) {
    const prevState = this.currentState;

    if (prevState) {
      if (prevState.name === name) {
        return;
      }
      prevState.exit();
    }

    const state = new this.states[name](this);
    this.currentState = state;
    state.enter(prevState);
  }

  protected addState<T>(name: CharacterStatesEnum, type: T) {
    this.states[name] = type;
  }
}

export default FiniteStateMachine;
