import * as THREE from 'three';
import * as actions from '../../constants/action-types.constants';

import { gameMap, sprites } from '../../pages/game/map';
import { equipment, frame } from '../../pages/game/game';

import floorImg from '../../assets/floor_diffuse.png';
import twistlockImg from '../../assets/twistlock.png';
import cannonImg from '../../assets/cannon.png';

export interface GameReducerInterface {
  map: gameMap;
  sprites: sprites;
  frames: frame[];
  equipments: equipment[];
}

const INITIAL_GAME_STORE: GameReducerInterface = {
  map: [
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  ],
  sprites: {
    0: '',
    1: floorImg,
  },
  frames: [
    { visible: false },
    {},
  ],
  equipments: [
    {
      type: 'twistlock',
      position: new THREE.Vector2(5, 8),
      image: twistlockImg,
      entries: [
        new THREE.Vector2(1, 0),
      ],
    },
    {
      type: 'cannon',
      position: new THREE.Vector2(5, 15),
      image: cannonImg,
      entries: [
        new THREE.Vector2(1, 0),
      ],
    },
  ],
};

export default (state = INITIAL_GAME_STORE, action) => {
  switch (action.type) {
    case actions.UPDATE_GAME:
      return {
        ...state,
        ...action.payload,
        map: action.payload.mapGame,
      };
    default:
      return state;
  }
};
