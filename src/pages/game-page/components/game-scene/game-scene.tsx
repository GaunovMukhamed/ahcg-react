import { CharacterPanel } from "./components/character-panel";
        
const GameScene: React.FC<any> = () => {
  return(
    <div className="w-full h-full flex flex-column justify-content-end">
      <CharacterPanel />
    </div>
  )
}

export { GameScene };