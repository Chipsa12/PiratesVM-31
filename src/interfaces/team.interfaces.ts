export interface Player {
  name: string;
  id: string | number;
  readyToStart: boolean;
}

export interface TeamListInterface {
  teamId: string;
  name: string;
  ownerName: Player['name'];
  players: number;
  minPlayers: number;
  isPlaying: boolean;
  isPrivate: boolean;
}

export interface JoinedTeamInterface {
  ownerId: Player['id'];
  name: string;
  password: string;
  players: Player[];
  options?: {
    minPlayers?: number;
    speed?: number;
    messageDistance?: number;
    quests?: {
      easy: number;
      normal: number;
      hard: number;
    };
  };
}
