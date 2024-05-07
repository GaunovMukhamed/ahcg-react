export interface GameState {
  allCharacters: Character[];
  state: boolean | null; // started - true
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