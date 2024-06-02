import { CSSProperties, SyntheticEvent, useState } from "react";
import './card.scss';
import { Image } from 'primereact/image';

interface CardProps {
  frontImg: string;
  backImg: string;
  enabled?: boolean; 
  turnable?: boolean;
  className?: string;
  style?: CSSProperties; 
}

const Card: React.FC<CardProps> = ({ frontImg, backImg, className, style, turnable = true, enabled = true }) => {

  const [characterCardFlipped, setCharacterCardFlipped] = useState<Boolean>(false);

  const flipCard = (event: any) => {
    if(turnable && event.target.tagName === 'IMG') setCharacterCardFlipped(!characterCardFlipped);
  }

  return(
    <div
      style={style}
      className={`card relative 
        ${characterCardFlipped?'flipped':''} 
        ${enabled?'':'monochrome'} 
        ${className??''}`}
      onClick={flipCard}>
      <div className='w-full h-full player-card-front border-round'>
        <Image
          src={frontImg}
          width={'100%'}
          height={'100%'}
          alt="character-card"
          preview
          />
      </div>
      <div className='w-full h-full player-card-back'>
        <Image
          src={backImg}
          width={'100%'}
          height={'100%'}
          alt="character-card"
          preview
          />
      </div>
    </div>
  )
}

export { Card }