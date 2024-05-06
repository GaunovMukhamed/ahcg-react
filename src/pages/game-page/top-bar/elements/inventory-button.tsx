
import { Button } from 'primereact/button';
import { ReactNode, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Inventory } from '../../../../components/inventory/inventory';        
import { useAppSelector } from '../../../../store/store';
import { InventoryItemElement } from '../../../../components/inventory/inventory-item-element';
import { ProgBar } from '../../../../components/progress-bar';
import { getCharacterFromStorage } from '../../../../tools/general.tools';
import { Image } from 'primereact/image';

interface InverntoryButtonProps {
  className?: string;
}

const InventoryButton: React.FC<InverntoryButtonProps> = ({ className }) => {

  const address: string = process.env.REACT_APP_API_ADDRESS!+'/images/items/';

  const items = useAppSelector((state) => state.character.items);
  const size = useAppSelector((state) => state.character.inventorySize);

  const hp = useAppSelector((state) => state.character.hp);
  const maxHp = useAppSelector((state) => state.character.maxHp);
  const mana = useAppSelector((state) => state.character.mana);
  const maxMana = useAppSelector((state) => state.character.maxMana);
  const characterName: string = getCharacterFromStorage()!;

  const [showInventory, setShowInventory] = useState<boolean>(false);

  const partTemplate = (name: string, item: any = undefined, size: number = 5): ReactNode => {
    return(
      <div className='relative flex flex-column align-items-center justify-content-center m-1 relative w-5rem h-5rem'>
        <InventoryItemElement item={item} size={size} />
        <div className='absolute w-full h-full top-0 left-0 flex align-items-center justify-content-center opacity-10'>
          {name === 'hand-right' ? 
            <>
              <div style={{ marginLeft: size/5+'rem', marginTop: size/5+'rem' }} className='absolute left-0 top-0'><Image src={address+'/sword.png'} alt="inv_item" width={size*10+'rem'} height={size*10+'rem'} /></div>
              <div style={{ marginLeft: size/5+'rem', marginTop: size/5+'rem' }} className='absolute left-0 top-0'><Image src={address+'/shield.png'} alt="inv_item" width={size*10+'rem'} height={size*10+'rem'} /></div>
            </>
            :
            <Image src={address+'/'+name+'.png'} alt="inv_item" width={size*10+'rem'} height={size*10+'rem'} />
          }
        </div>
      </div>
    )
  }

  return(
    <>
      <Button className={'h-full '+className} icon='pi pi-user' onClick={() => setShowInventory(true)} />
      <Dialog header="Инвентарь" dismissableMask={true} draggable={false} style={{ width: '95vw', height: '90vh' }} visible={showInventory} onHide={() => setShowInventory(false)}>
        <div className='w-full h-full flex justify-content-between'>
          <div className='flex flex-column w-20rem mr-2 border-1 border-round p-2'>
            <div className='flex relative'>
              <div className='w-full flex flex-column justify-content-between'>
                {partTemplate('helm')}
                {partTemplate('chest')}
                {partTemplate('bracers')}
                {partTemplate('boots')}
              </div>
              <div className='flex flex-column flex-1'>
                {partTemplate('sword')}
                {partTemplate('hand-right')}
                {partTemplate('ring', undefined, 3.5)}
                {partTemplate('ring', undefined, 3.5)}
                {/* {partTemplate('relic', undefined, 3.5)} */}
                {partTemplate('ring', undefined, 3.5)}
              </div>
            </div>
            <div className='flex-1 flex flex-column justify-content-end'>
              <div className='w-full text-center mb-2'>{characterName}</div>
              <ProgBar showValue={true} value={hp} maxValue={maxHp} color='var(--red-500)' className='mb-2' style={{ height: '2rem' }} />
              <ProgBar showValue={true} value={mana} maxValue={maxMana} color='var(--blue-500)' style={{ height: '2rem' }} />
            </div>
          </div>
          <Inventory items={items} size={size} className='flex-1' />
        </div>
      </Dialog>
    </>
  )
}

export { InventoryButton };