import { CSSProperties, useState } from "react";
import './card.scss';
import { Image } from 'primereact/image';

interface CardProps {
  frontImg: string;
  backImg: string;
  className?: string;
  style?: CSSProperties;
}

const Card: React.FC<CardProps> = ({ frontImg, backImg, className, style }) => {

  const [characterCardFlipped, setCharacterCardFlipped] = useState<Boolean>(false);

  return(
    <div
      style={style}
      className={`card ${characterCardFlipped?'flipped':''} ${className??''}`}
      onClick={() => setCharacterCardFlipped(!characterCardFlipped)}>
      <div className='w-full h-full player-card-front border-round'>
        <Image
          src={frontImg}
          width={'100%'}
          height={'100%'}
          alt="character-card"
          />
      </div>
      <div className='w-full h-full player-card-back'>
        <Image
          src={backImg}
          width={'100%'}
          height={'100%'}
          alt="character-card"
          />
      </div>
    </div>
  )
}

export { Card }