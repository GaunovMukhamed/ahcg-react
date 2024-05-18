export interface Scenario {
  id: number;
  name: string;
}

export interface GameCard {
  id: number;
  type: string;
  frontImg: string;
  backImg: string;
  cost?: number;
  level?: number;
  enabled?: boolean;
}