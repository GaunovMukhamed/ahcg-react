import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { Spinner } from "../../components/spinner";
import { getInitialState } from "../../store/slices/general.slice";
import { CharacterSelector } from "./components/character-selector/character-selector";

const GamePage: React.FC<any> = () => {

  const dispatch = useAppDispatch();

  const gameStarted = useAppSelector((state) => state.general.gameStarted);

  useEffect(() => {
    dispatch(getInitialState())
  }, [])

  return(
    <div className="w-full h-full bg-gray-900 relative flex flex-column">
      {(!gameStarted)?<CharacterSelector />:''}
      {gameStarted === null?<Spinner />:''}
    </div>
  )
}

export { GamePage }