import { Image } from 'primereact/image';

interface DeckProps {
  shirtImg: string;
  dropImg?: string;
  className?: string;
}

const Deck: React.FC<DeckProps> = ({ shirtImg, dropImg, className = '' }) => {
  return(
    <div className={'flex '+className}>
      <Image
        src={shirtImg}
        imageClassName='w-3rem h-4rem mr-2 cursor-pointer'
        alt="player-deck"
      />
      {dropImg?
        <Image
          src={shirtImg}
          imageClassName='w-3rem h-4rem cursor-pointer'
          alt="player-deck"
        />:
        <div className='w-3rem h-4rem flex align-items-center justify-content-center border-1 border-dashed text-xs'>Сброс</div>
      }
     
    </div>
  )
}

export {Deck};