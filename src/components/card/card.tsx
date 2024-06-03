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
  onClick?: (event: SyntheticEvent) => void;
}

const Card: React.FC<CardProps> = ({ frontImg, backImg, className, style, turnable = true, enabled = true, onClick }) => {

  const [characterCardFlipped, setCharacterCardFlipped] = useState<Boolean>(false);

  const onCardClick = (event: any) => {
    if(event.target.tagName === 'IMG') {
      if(turnable) {
        setCharacterCardFlipped(!characterCardFlipped);
      } else {
        if(onClick) onClick(event);
      }
    }
  }

  return(
    <div
      style={style}
      className={`card relative 
        ${characterCardFlipped?'flipped':''} 
        ${enabled?'':'monochrome'} 
        ${className??''}`}
      onClick={onCardClick}>
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