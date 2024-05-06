import { ScrollPanel } from 'primereact/scrollpanel';
import './inventory.scss';        
import { InventoryItemElement } from './inventory-item-element';

interface InventoryProps {
  className?: string;
  items: string[];
  size: number;
}

const Inventory: React.FC<InventoryProps> = ({ className, items, size }) => {

  const inventory: (string|undefined)[] = [...items, ...new Array(size-items.length).fill(undefined)];

  return(
    <div className={'w-full h-full p-2 border-1 border-round '+className}>
      <ScrollPanel style={{ width: '100%', height: '100%' }}>
        <div className='m-0 grid gap-2'>
          {inventory.map((item: string|undefined, i: number) => 
            <div key={i}>
              <InventoryItemElement
                item={item}
                onDragStart={(event: any) => {console.log(event)}}
                onDragEnd={(event: any) => {console.log(event)}} />
            </div>)}
        </div>
      </ScrollPanel>
    </div>
  )
}

export { Inventory }