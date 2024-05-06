import { Character } from "../models";
import { sendSocketMessage, sendSocketMessageWithCallback } from "./socket-wrapper";

export const saveLoginToStorage = (login: string): void => {
  if(login.length) localStorage.setItem('login', login);
}

export const getLoginFromStorage = (): string | null => {
  return localStorage.getItem('login');
}

export const saveCharacterToStorage = (name: string) => {
  localStorage.setItem('characterName', name);
}

export const getCharacterFromStorage = (): string | null => {
  return localStorage.getItem('characterName');
}

export const removeCharacterFromStorage = (): void => {
  localStorage.removeItem('characterName');
}
