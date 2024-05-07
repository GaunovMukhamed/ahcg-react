
import { useState } from "react";
import { useAppSelector } from "../../../store/store";
import { Character } from "../../../store/slices/models";
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Scroller } from "../../../components/scroller";
import { Image } from 'primereact/image';
        
const CharacterSelector: React.FC<any> = () => {

  const [loading, setLoading] = useState<boolean>(true);

  const characters = useAppSelector((state) => state.general.allCharacters);

  return(
    <Dialog
      header="Выбор персонажа"
      draggable={false}
      visible={true}
      closable={false}
      style={{ width: '90vw', height: '90vh' }}
      onHide={()=>{}}>
      <Scroller>
        <div className="w-full flex flex-wrap gap-2">
          {characters.map((ch: Character, i: number) => {
            return <div key={i} className="shadow-6 surface-100 p-1 border-round cursor-pointer">
              <Image src={ch.miniImg} alt="Image" />
              <div className="w-full text-center my-1">{ch.name}</div>
            </div>
          })}
        </div>
      </Scroller>
    </Dialog>
  )
}

export { CharacterSelector }