
import { useAppSelector } from '../../../../../store/store';
import { getLoginFromStorage } from '../../../../../tools/general.tools';
import { Card } from '../../../../../components/card/card';
import { CardLine } from '../../../../../components/card-line/card-line';
import { Deck } from '../../../../../components/deck/deck';
import { Token } from '../../../../../components/token/token';
import { DecksPanel } from './decks-panel';

const CharacterPanel: React.FC<any> = () => {

  const login: string = getLoginFromStorage()!;
  const characterInfo = useAppSelector((state) => state.general.players[login]);

  return(
    <div className='relative h-min pt-2 border-top-1 border-primary flex overflow-visible z-1'>
      <div className='w-14rem h-min flex flex-column mr-2 justify-content-between align-items-center'>
        <div className='w-full mb-2 flex justify-content-between'>
          <Token className='w-3rem h-3rem' imgUrl='https://drive.google.com/thumbnail?id=1aU8GwFcHLAAzekpKxc-YBPkxSJsM4AWZ&sz=w1000' />
          <Token className='w-3rem h-3rem' imgUrl='https://drive.google.com/thumbnail?id=1aSteZDhEqZj2jEOQtD6rhNtj6NhgujBI&sz=w1000' />
          <Token style={{ width: '3rem', height: '2.9rem' }} imgUrl='https://drive.google.com/thumbnail?id=1aXsOh4oKiugZn288lSAFrSPkK_0YQxeq&sz=w1000' />
          <Token style={{ width: '3rem', height: '2.9rem' }} imgUrl='https://drive.google.com/thumbnail?id=1an806GsJK7Dot6d2jOIL7N2OUyzLoT6w&sz=w1000' />
        </div>
        <Card
          className='w-13rem h-10rem'
          frontImg={characterInfo.character?.frontImg??''}
          backImg={characterInfo.character?.backImg??''} />  
      </div>
      <div style={{ width: 'calc(100% - 14rem)' }} className='flex'>
        <div className='w-full flex flex-column mr-2'>
          <CardLine className='h-6rem mb-2'/> 
          <CardLine className='h-6rem' /> 
        </div>
      </div>
      <DecksPanel style={{ top: '-9.8rem' }} className='absolute right-0' />
    </div>
  )
}

export { CharacterPanel };