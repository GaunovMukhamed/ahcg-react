
import { ScrollPanel } from 'primereact/scrollpanel';
import { CSSProperties, useEffect, useRef, useState } from 'react';

interface ScrollerProps {
  children?: any;
  className?: string;
  style?: CSSProperties;
}

const Scroller: React.FC<ScrollerProps> = ({ className = '', children, style }) => {

  const [height, setHeight] = useState<number>(0);
  const containerRef = useRef(null);

  useEffect(() => {
    setHeight(containerRef.current!['clientHeight']);
  }, []);

  return(
    <div ref={containerRef} style={style} className={' '+className} >
      <ScrollPanel style={{ height: `${height}px` }} className='w-full h-full'>
        {children}
      </ScrollPanel>
    </div>
  )
}

export { Scroller };