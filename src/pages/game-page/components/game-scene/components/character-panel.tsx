
import { useAppSelector } from '../../../../../store/store';
import { getLoginFromStorage } from '../../../../../tools/general.tools';
import { Card } from '../../../../../components/card/card';
import { CardLine } from '../../../../../components/card-line/card-line';
        
const CharacterPanel: React.FC<any> = () => {

  const login: string = getLoginFromStorage()!;
  const characterInfo = useAppSelector((state) => state.general.players[login]);

  return(
    <div className='relative pt-2 border-top-1 border-primary flex overflow-visible z-1'>
      <Card
        className='w-14rem h-10rem'
        frontImg={characterInfo.character?.frontImg??''}
        backImg={characterInfo.character?.backImg??''} />  
      <div
        style={{ width: 'calc(100% - 14rem - 1rem)', top: '-2.2rem', right: '0.5rem' }}
        className='absolute flex flex-column'>
        <CardLine className='mb-2 h-6rem' /> 
        <CardLine className='h-6rem' /> 
      </div>
    </div>
  )
}

export { CharacterPanel };