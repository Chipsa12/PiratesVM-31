import { RootState } from '../store';
import { GameReducerInterface } from '../reducers/game.reducer';

export const selectGame = ({ game }: RootState): GameReducerInterface => game;
export const selectMap = ({ game }: RootState): GameReducerInterface['map'] => game.map;
