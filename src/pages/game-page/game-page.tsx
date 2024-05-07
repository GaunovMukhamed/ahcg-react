import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect, useState } from "react";
import { Spinner } from "../../components/spinner";
import { getInitialState } from "../../store/slices/general.slice";
import { CharacterSelector } from "./components/character-selector";

const GamePage: React.FC<any> = () => {

  const dispatch = useAppDispatch();

  const gameState = useAppSelector((state) => state.general.state);

  useEffect(() => {
    dispatch(getInitialState())
  }, [])

  return(
    <div className="w-full h-full bg-gray-900 relative flex flex-column">
      {(!gameState)?<CharacterSelector />:''}
      {gameState === null?<Spinner />:''}
    </div>
  )
}

export { GamePage }