import { Navigate, useLocation } from "react-router-dom";
import { getCharacterFromStorage } from "./general.tools";
import { useEffect, useState } from "react";

//@ts-ignore
const CharacterGuard = ({ children }) => {

  const [characterExists, setCharacterExists] = useState<boolean>();

  const location = useLocation();

  useEffect(() => checkCharacter(), [])

  const checkCharacter = () => {
    const characterName: string | null = getCharacterFromStorage();
    if(characterName) {
      // getCharacter(characterName)
      //   .then(() => {setCharacterExists(true)})
      //   .catch(() => {setCharacterExists(false)})
    }
  }

  if (characterExists === undefined) {
    return null;
  }
  
  return characterExists ? children : <Navigate to="/game/characters" replace state={{ from: location }} />;
}

export default CharacterGuard;