import { CharacterPanel } from "./components/character-panel";
import { DecksPanel } from "./components/decks-panel";
        
const GameScene: React.FC<any> = () => {
  return(
    <div className="w-full h-full flex flex-column justify-content-end">
      <div className="w-full h-full mb-2 flex">
        <div id="scene" className="flex-1 mr-2">scene</div>
        <DecksPanel />
      </div>
      <CharacterPanel />
    </div>
  )
}

export { GameScene };