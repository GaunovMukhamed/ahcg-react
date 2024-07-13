import { CharacterPanel } from "./components/character-panel";
import { ScenePanel } from "./components/scene-panel";
        
const GameScene: React.FC<any> = () => {
  return(
    <div className="relative w-full h-full flex flex-column justify-content-end overflow-hidden">
      <div className="w-full h-full mb-2 flex-1 flex flex-column">
        <ScenePanel />
        <div className="flex-1">scene</div>
      </div>
      <CharacterPanel />
    </div>
  )
}

export { GameScene };