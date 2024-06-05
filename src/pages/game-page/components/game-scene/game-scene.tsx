import { CharacterPanel } from "./components/character-panel";
import { DecksPanel } from "./components/decks-panel";
        
const GameScene: React.FC<any> = () => {
  return(
    <div className="w-full h-full flex flex-column justify-content-end">
      <div className="w-full h-full mb-2 flex-1">
        scene
        {/* <DecksPanel />s */}
      </div>
      <CharacterPanel />
    </div>
  )
}

export { GameScene };