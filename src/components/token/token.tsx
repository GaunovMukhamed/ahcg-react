import { Image } from 'primereact/image';
import { CSSProperties, useState } from 'react';

interface TokenProps {
  imgUrl: string;
  className?: string;
  style?: CSSProperties;
}

const Token: React.FC<TokenProps> = ({ imgUrl, className = '', style }) => {

  const [count, setCount] = useState<number>(0);

  return(
    <div
      style={style}
      className={'relative cursor-pointer select-none '+ className}
      onClick={() => setCount(count+1)}
      onContextMenu={(event: any) => { event.preventDefault(); setCount(count-1); }}>
      <Image
        src={imgUrl}
        width={'100%'}
        height={'100%'}
        alt="token"/>
      <div className='absolute top-0 left-0 w-full h-full flex justify-content-center align-items-center z-1'>{count}</div>
    </div>
  )
}

export {Token};