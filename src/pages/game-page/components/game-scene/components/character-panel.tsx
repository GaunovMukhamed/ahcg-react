
import { useAppSelector } from '../../../../../store/store';
import { getLoginFromStorage } from '../../../../../tools/general.tools';
import { Card } from '../../../../../components/card/card';

const CharacterPanel: React.FC<any> = () => {

  const login: string = getLoginFromStorage()!;
  const characterInfo = useAppSelector((state) => state.general.players[login]);

  return(
    <div>
      <Card
        className='w-20rem h-14rem'
        frontImg={characterInfo.character?.frontImg??''}
        backImg={characterInfo.character?.backImg??''} />     
    </div>
  )
}

export { CharacterPanel };