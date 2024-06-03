import { CSSProperties, ReactNode, SyntheticEvent, useState } from "react";
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
  const [cardFocused, setcardFocused] = useState<Boolean>(false);

  const onCardClick = (event: any) => {
    if(event.target.tagName === 'IMG' && onClick) onClick(event);
  }

  const imageContent = (url: string): ReactNode => {
    return <div
      className="relative w-full h-full" 
      onMouseEnter={() => setcardFocused(true)}
      onMouseLeave={() => setcardFocused(false)}
      onBlur={() => setcardFocused(false)}>
      <Image
        src={url}
        width={'100%'}
        height={'100%'}
        alt="character-card"
        preview
      />
      {turnable ? 
        <div
          className="flex justify-content-center align-items-center card-button"
          style={{ top: 'calc(10px + 2rem)', opacity: cardFocused?'1':'0' }}
          onClick={() => { setCharacterCardFlipped(!characterCardFlipped); setcardFocused(false) }}>
          <i className="pi pi-refresh" style={{ fontSize: '1.3rem' }}></i>
        </div>
      : ''}
    </div>
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
        {imageContent(frontImg)}
      </div>
      <div className='w-full h-full player-card-back'>
        {imageContent(backImg)}
      </div>
    </div>
  )
}

export { Card }