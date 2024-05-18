import { Dialog } from 'primereact/dialog';
import { useAppSelector } from '../../../../store/store';
import { getLoginFromStorage } from '../../../../tools/general.tools';
import { useEffect, useState } from 'react';
import { Scenario } from '../../models';
import { sendSocketMessage, sendSocketMessageWithCallback } from '../../../../tools/socket-wrapper';
import { Spinner } from '../../../../components/spinner';
import { Scroller } from '../../../../components/scroller';
import { Button } from 'primereact/button';

const ScenarioSelector: React.FC<any> = () => {

  const login: string = getLoginFromStorage()!;
  const players = useAppSelector((state) => state.general.players);

  const [hostLogin, setHost] = useState<string>('');
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [scenario, setScenario] = useState<number>();

  useEffect(() => {
    getScenarios();
  }, [])

  useEffect(() => {
    updateHost();
  }, [players])

  const updateHost = (): void => {
    setHost(Object.keys(players).find((lgn: string) => players[lgn].isHost)!);
  }

  const getScenarios = async(): Promise<void> => {
    setScenarios(await sendSocketMessageWithCallback('getScenarios', ''));
  }

  const applyScenario = (): void => {
    if(hostLogin === login) sendSocketMessage('applyScenario', scenario);
  }

  return(
    <Dialog
      header={hostLogin === login ? 'Выберите сценарий' : hostLogin+" выбирает сценарий"}
      draggable={false}
      visible={true}
      closable={false}
      style={{ width: '95vw', height: '90vh' }}
      onHide={()=>{}}>
      <div className='w-full h-full flex flex-column justify-content-between'>
        <Scroller style={{ height: hostLogin === login?'calc(100% - 4rem)':'100%' }}>
          {scenarios.map((sc: Scenario, i: number) => {
            return <div
              key={i}
              className={'shadow-6 p-2 cursor-pointer surface-100 border-round '+(scenario===sc.id?'bg-primary':'')}
              onClick={() => setScenario(sc.id)}>{sc.name}</div>
          })}
        </Scroller>
        {hostLogin===login ? <Button label="Начать" className="w-full mt-2" onClick={() => applyScenario()} /> : ''}
      </div>
      {scenarios.length === 0 ? <Spinner /> : ''}
    </Dialog>
  )
}

export { ScenarioSelector };