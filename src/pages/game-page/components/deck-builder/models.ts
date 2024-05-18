import { GameCard } from "../../models";

export interface DeckBuilderInfo {
  selectedCards: GameCard[];
  decks: Decks
};

export interface Decks {
  [key: string]: GameCard[]
}