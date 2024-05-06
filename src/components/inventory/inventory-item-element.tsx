import { Image } from 'primereact/image';
import { InventoryItem } from './interfaces';
import { Tooltip } from 'primereact/tooltip';

interface InventoryItemProps {
  item: string|undefined;
  size?: number;
  onDragStart?: (event: any) => void;
  onDragEnd?: (event: any) => void;
}

const InventoryItemElement: React.FC<InventoryItemProps> = ({ item, size = 5, onDragStart, onDragEnd }) => {

  const address: string = process.env.REACT_APP_API_ADDRESS!+'/images/items/';

  const itemParsed: InventoryItem|undefined = item ? JSON.parse(item) : undefined;
  let rarityShadowClass: string = 'shadow';
  if(itemParsed && itemParsed.rarity) {
    rarityShadowClass = itemParsed.rarity+'-shadow';
  }
  return <div
    style={{ width: size+'rem', height: size+'rem' }}
    className={'col-2 surface-100 border-round cursor-pointer ' +
     'flex align-items-center justify-content-center '+rarityShadowClass}
    onDragStart={() => onDragStart ? onDragStart(item) : {}}
    onDragEnd={() => onDragEnd ? onDragEnd(item) : {}}>
    {itemParsed?
      <>
        <Image
          src={address+itemParsed.type+'.png'}
          alt="item"
          width={size*10+'rem'} height={size*10+'rem'}
          className='item-img'
          data-pr-tooltip={itemParsed.name}
        />
        <Tooltip target=".item-img" />
      </>
    :''}
  </div>
}

export { InventoryItemElement }