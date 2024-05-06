export interface SuccessResponse {
  message: string;
}

export type SocketMessageType = 'map'|'character'|'location'|'notification';

export interface SocketMessage {
  type: SocketMessageType;
  message: any;
}

export type Gender = 'мужчина' | 'женщина';

export interface NotificationMessage {
  type: 'lose'|'gain';
  item: 'gold';
  amount: number;
}

export interface MainStats {
  strength: number;
  agility: number;
  intelligence: number;
  charisma: number;
}

export interface Creds {
  login: string;
  character: string;
}

export interface Race {
  name: string;
  description: string;
  initialStats: MainStats;
} 

export interface Character {
  login: string;
  name: string;
  level: number;
  tags: string[];
  stats: MainStats;
  location: string;
  hp: number;
  maxHp: number;
  mana: number;
  maxMana: number;
  xp: number;
  xpMax: number;
  gold: number;
  inventorySize: number;
  items: string[];
}