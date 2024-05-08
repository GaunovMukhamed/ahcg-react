export interface GameState {
  allCharacters: Character[];
  gameStarted: boolean | null;
  players: Players;
}

export interface Character {
  id: number;
  name: string;
  health: number;
  mind: number;
  agility: number;
  intelligence: number;
  strength: number;
  will: number;
  backImg: string;
  frontImg: string;
  miniImg: string;
}

export interface Players {
  [key: string]: Player;
}

export class Player {
  character: Character | null = null;
}

export interface CharacterSelectionInfo {
  newChId: number;
  login: string;
}