
import { useEffect, useRef, useState } from 'react';
import { XpBar } from './elements/xp.bar';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { useAppSelector } from '../../../store/store';
import { removeCharacterFromStorage } from '../../../tools/general.tools';
import { ProgBar } from '../../../components/progress-bar';
import { Tooltip } from 'primereact/tooltip';
import { InventoryButton } from './elements/inventory-button';
        
const address: string = process.env.REACT_APP_API_ADDRESS!;
        
interface TopBarInterface {
  className?: string;
}

const TopBar: React.FC<TopBarInterface> = ({ className }) => {

  const navigate = useNavigate();

  const [knobHeight, setKnobHeight] = useState<number>(0);
  const [showExitPopup, setShowExitPopup] = useState<boolean>(false);

  const hp = useAppSelector((state) => state.character.hp);
  const maxHp = useAppSelector((state) => state.character.maxHp);
  const mana = useAppSelector((state) => state.character.mana);
  const maxMana = useAppSelector((state) => state.character.maxMana);
  const gold = useAppSelector((state) => state.character.gold);

  const containerRef = useRef<HTMLDivElement>(null);
  const mainMenu = useRef<Menu>(null);

  const mainMenuItems: MenuItem[] = [
    {
      label: 'Меню',
      items: [
        {
          label: 'Сменить персонажа',
          icon: 'pi pi-refresh',
          command: () => {
            removeCharacterFromStorage();
            navigate('/game/characters');
          }
        },
        {
          label: 'Выйти',
          icon: 'pi pi-sign-out',
          command: () => {
            setShowExitPopup(true);      
          }
        }
      ]
    }
  ];

  useEffect(() => {
    setKnobHeight(containerRef.current!['offsetHeight']-15);
  }, [])

  const processGold = (value: number): string => {
    const size: number = value.toString().length;
    if(size >= 4 && size < 5) { // >=1.000 & <10.000
      return `${value.toString().slice(0,1)}т`;
    } else if(size >= 5 && size < 6) { // >=1.000 & <100.000
      return `${value.toString().slice(0,2)}т`;
    } else if(size >= 6 && size < 7) { // >=100.000 & <1.000.000 
      return `${value.toString().slice(0,3)}т`;
    } else if(size >= 7) { // >=1.000.000
      return `${value.toString()[0]}м`;
    } else { // <1000
      return value.toString();
    }
  }

  return(
    <>
      <div ref={containerRef} className={'w-full flex justify-content-between select-none h-3rem surface-50 p-2 ' + className}>
        <div className='flex align-items-center'>
          <XpBar knobHeight={knobHeight} />
          <div className='w-5rem h-full flex flex-column justify-content-around ml-2'>
            <ProgBar value={hp} maxValue={maxHp} color='var(--red-500)' className='mb-2' style={{ height: '70%' }} />
            <ProgBar value={mana} maxValue={maxMana} color='var(--blue-500)' style={{ height: '30%', fontSize: '8px' }} />
          </div>
          {/* @ts-ignore */}
          <div
            data-pr-tooltip={gold}
            data-pr-position="bottom"
            className='coins ml-2 sm:ml-4 h-full flex align-items-center'>
            <span className='line-height-1'>{processGold(gold)}</span>
            <img alt="coin" src={address+'/images/items/common/coin.png'} className='ml-2' style={{ height: '1rem', width: '1rem' }} />
          </div>
          <InventoryButton className='ml-4' />
          <Tooltip target=".coins" />
        </div>
        <div>
          <Menu id="main-menu" model={mainMenuItems} popup ref={mainMenu} />
          <Button icon="pi pi-bars" className="h-full" onClick={(event) => mainMenu.current!.toggle(event)} aria-controls="main-menu" aria-haspopup />
        </div>
      </div>
      <Dialog
        header="Вы точно хотите выйти?"
        visible={showExitPopup}
        draggable={false}
        onHide={() => setShowExitPopup(false)}>
        <div className='w-full flex justify-content-end'>
          <Button label="Нет" outlined={true} onClick={() => setShowExitPopup(false)} />
          <Button label="Да" className='ml-2' onClick={() => {
            localStorage.clear();
            navigate('/login');
          }} />
        </div>        
      </Dialog>
    </>
  )
}

export { TopBar };