
import { ScrollPanel } from 'primereact/scrollpanel';
import { useEffect, useRef, useState } from 'react';

interface ScrollerProps {
  children?: any;
  className?: string;
}

const Scroller: React.FC<ScrollerProps> = ({ className = '', children }) => {

  const [height, setHeight] = useState<number>(0);
  const containerRef = useRef(null);

  useEffect(() => {
    setHeight(containerRef.current!['clientHeight']);
  }, []);

  return(
    <div ref={containerRef} className={className}>
      <ScrollPanel style={{ height: `${height}px` }} className='w-full'>
        {children}
      </ScrollPanel>
    </div>
  )
}

export { Scroller };