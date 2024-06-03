
import { useAppSelector } from '../../../../../store/store';
import { getLoginFromStorage } from '../../../../../tools/general.tools';
import { Card } from '../../../../../components/card/card';

const CharacterPanel: React.FC<any> = () => {

  const login: string = getLoginFromStorage()!;
  const characterInfo = useAppSelector((state) => state.general.players[login]);

  return(
    <div className='pt-2 border-top-1 border-primary'>
      <Card
        className='w-14rem h-10rem'
        frontImg={characterInfo.character?.frontImg??''}
        backImg={characterInfo.character?.backImg??''} />     
    </div>
  )
}

export { CharacterPanel };