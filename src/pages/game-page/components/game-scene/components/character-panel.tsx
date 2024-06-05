
import { useAppSelector } from '../../../../../store/store';
import { getLoginFromStorage } from '../../../../../tools/general.tools';
import { Card } from '../../../../../components/card/card';
import { CardLine } from '../../../../../components/card-line/card-line';
import { Deck } from '../../../../../components/deck/deck';
import { Token } from '../../../../../components/token/token';

const CharacterPanel: React.FC<any> = () => {

  const login: string = getLoginFromStorage()!;
  const characterInfo = useAppSelector((state) => state.general.players[login]);

  return(
    <div className='relative pt-2 border-top-1 border-primary flex overflow-visible z-1'>
      <Card
        className='w-14rem h-10rem'
        frontImg={characterInfo.character?.frontImg??''}
        backImg={characterInfo.character?.backImg??''} />  
      <div className='h-full ml-2 flex flex-column justify-content-between'>
        <Token style={{ width: '2rem', height: '1.9rem' }} imgUrl='https://drive.google.com/thumbnail?id=1an806GsJK7Dot6d2jOIL7N2OUyzLoT6w&sz=w1000' />
        <Token style={{ width: '2rem', height: '1.9rem' }} imgUrl='https://drive.google.com/thumbnail?id=1aXsOh4oKiugZn288lSAFrSPkK_0YQxeq&sz=w1000' />
        <Token className='w-2rem h-2rem' imgUrl='https://drive.google.com/thumbnail?id=1aSteZDhEqZj2jEOQtD6rhNtj6NhgujBI&sz=w1000' />
        <Token className='w-2rem h-2rem' imgUrl='https://drive.google.com/thumbnail?id=1aU8GwFcHLAAzekpKxc-YBPkxSJsM4AWZ&sz=w1000' />
      </div>
      <div
        style={{ width: 'calc(100% - 14rem - 3.5rem)', bottom: '0', right: '0.5rem' }}
        className='absolute flex align-items-center'>
        <div className='flex-1 flex flex-column mr-2'>
          <CardLine className='mb-2 h-6rem'/> 
          <CardLine className='h-6rem' /> 
        </div>
        <Deck shirtImg="https://drive.google.com/thumbnail?id=1VDYXcXVPajHRu2miFlbDxUf2Ka-6aHtM&sz=w1000" />
      </div>
    </div>
  )
}

export { CharacterPanel };