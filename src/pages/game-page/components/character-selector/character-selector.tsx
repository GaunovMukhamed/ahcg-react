
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
import { getLoginFromStorage } from "../../../../tools/general.tools";
import { Spinner } from "../../../../components/spinner";
        
const CharacterSelector: React.FC<any> = () => {
  const login: string = getLoginFromStorage()!;
  const dispatch = useAppDispatch();
  const characters = useAppSelector((state) => state.general.allCharacters);
  const players = useAppSelector((state) => state.general.players);
  const ready = useAppSelector((state) => state.general.players[getLoginFromStorage()!]?.ready??false);

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

  const toggleReady = (value: boolean): void => {
    sendSocketMessage('setReady', value);
  }

  const getLoginByCharacter = (chId: number): string => {
    return Object.keys(players).find((login: string) => players[login] && players[login].character && players[login].character!.id === chId)!;
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
          <div className="relative w-full flex flex-wrap gap-2">
            {characters.map((ch: Character, i: number) => {
              return <BlockUI key={i} blocked={characterBlocked(ch.id)} template={
                <div className="flex flex-column justify-content-center align-items-center">
                  <i className="pi pi-lock"/>
                  <span>{getLoginByCharacter(ch.id)}</span>
                </div>
              }>
                <div className="shadow-6 surface-100 p-1 border-round cursor-pointer" onClick={() => sendSocketMessage('selectCharacter', ch.id)}>
                  <Image src={ch.miniImg} alt="Image" width="140" height="220" className={'image ' + (characterBlocked(ch.id) ? 'colorless' : '')} />
                  <div className="w-full text-center my-1">{ch.name}</div>
                </div>
              </BlockUI>           
            })}
            {ready ? <Spinner /> : ''}
          </div>
        </Scroller>
        {ready ?
          <Button label="Отмена" className="w-full mt-2" severity="danger" onClick={() => toggleReady(false)} /> :
          <Button label="Готово" disabled={players[login] && !players[login].character} className="w-full mt-2" onClick={() => toggleReady(true)} />
        }
      </div>
    </Dialog>
  )
}

export { CharacterSelector }