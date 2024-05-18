import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { Spinner } from "../../components/spinner";
import { getInitialState } from "../../store/slices/general.slice";
import { CharacterSelector } from "./components/character-selector/character-selector";
import { ScenarioSelector } from "./components/scenario-selector/scenario-selector";
import { GameScene } from "./components/game-scene/game-scene";
import { DeckBuilder } from "./components/deck-builder/deck-builder";

const GamePage: React.FC<any> = () => {

  const dispatch = useAppDispatch();

  const gameState = useAppSelector((state) => state.general.gameState);

  useEffect(() => {
    dispatch(getInitialState())
  }, [])

  return(
    <div className="w-full h-full bg-gray-900 relative flex flex-column p-2">
      {gameState === null?<Spinner />:''}
      {gameState === 0?<CharacterSelector />:''}
      {gameState === 1?<ScenarioSelector />: ''}
      {gameState === 2?<DeckBuilder />:''}
      {gameState === 3?<GameScene />:''}
    </div>
  )
}

export { GamePage }