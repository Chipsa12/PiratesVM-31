export interface Player {
  id: number;
  name: string;
  readyToStart: boolean;
}

export interface TeamListInterface {
  teamId: number;
  name: string;
  ownerName: Player['name'];
  players: Player['name'][];
  playersCount: number;
  maxPlayers?: number;
  isPrivate: boolean;
}

export interface JoinedTeamInterface {
  ownerId: Player['id'];
  name: string;
  password: string;
  players: Player[];
  maxPlayers?: number;
  options?: {
    speed?: number;
    messageDistance?: number;
    quests?: {
      easy: number;
      normal: number;
      hard: number;
    };
  };
}
