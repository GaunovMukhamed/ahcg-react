import { Dialog } from 'primereact/dialog';
import { useAppSelector } from '../../../../store/store';
import { getLoginFromStorage } from '../../../../tools/general.tools';
import { useEffect, useState } from 'react';

const ScenarioSelector: React.FC<any> = () => {

  const login: string = getLoginFromStorage()!;
  const players = useAppSelector((state) => state.general.players);

  const [host, setHost] = useState<string>('');

  useEffect(() => {
    updateHost();
  }, [players])

  const updateHost = (): void => {
    setHost(Object.keys(players).find((lgn: string) => players[lgn].isHost)!);
  }

  return(
    <Dialog
      header={host === login ? 'Выберите сценарий' : host+" выбирает сценарий"}
      draggable={false}
      visible={true}
      closable={false}
      style={{ width: '90vw', height: '90vh' }}
      onHide={()=>{}}>
      <div>ScenarioSelector</div>
    </Dialog>
  )
}

export { ScenarioSelector };