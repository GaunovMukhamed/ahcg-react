
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { Character, CharacterSelectionInfo, Player } from "../../../../store/slices/models";
import { Dialog } from 'primereact/dialog';
import { Scroller } from "../../../../components/scroller";
import { Image } from 'primereact/image';
import { sendSocketMessage, socket } from "../../../../tools/socket-wrapper";
import { useEffect } from "react";
import { selectCharacter } from "../../../../store/slices/general.slice";
import { BlockUI } from 'primereact/blockui';
import './character-selector.scss';
import { Button } from 'primereact/button';
        
const CharacterSelector: React.FC<any> = () => {

  const dispatch = useAppDispatch();
  const characters = useAppSelector((state) => state.general.allCharacters);
  const players = useAppSelector((state) => state.general.players);

  useEffect(() => {
    if(socket) {
      socket.on('characterSelection', (msg: CharacterSelectionInfo) => {
        dispatch(selectCharacter(msg));
      });
    }
  }, []);

  const characterBlocked = (chId: number): boolean => {
    if(players) return !!(Object.values(players).find((player: Player) => player.character?.id === chId));
    return false;
  }

  return(
    <Dialog
      header="Выбор персонажа"
      draggable={false}
      visible={true}
      closable={false}
      style={{ width: '90vw', height: '90vh' }}
      onHide={()=>{}}>
      <div className="w-full h-full flex flex-column justify-content-between">
        <Scroller style={{ height: 'calc(100% - 4rem)' }}>
          <div className="w-full flex flex-wrap gap-2">
            {characters.map((ch: Character, i: number) => {
              return <BlockUI key={i} blocked={characterBlocked(ch.id)} template={<i className="pi pi-lock"/>}>
                <div className="shadow-6 surface-100 p-1 border-round cursor-pointer" onClick={() => sendSocketMessage('selectCharacter', ch.id)}>
                  <Image src={ch.miniImg} alt="Image" className={'image ' + (characterBlocked(ch.id) ? 'colorless' : '')} />
                  <div className="w-full text-center my-1">{ch.name}</div>
                </div>
              </BlockUI>           
            })}
          </div>
        </Scroller>
        <Button label="Готово" className="w-full mt-2" />
      </div>
    </Dialog>
  )
}

export { CharacterSelector }