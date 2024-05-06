
import { ProgressBar } from 'primereact/progressbar';
import { useEffect, useState } from 'react';
import { Tooltip } from 'primereact/tooltip';
interface ProgressBarProps {
  style?: React.CSSProperties;
  className?: string;
  color?: string;
  value: number;
  maxValue: number;
  showValue?: boolean;
}

const ProgBar: React.FC<ProgressBarProps> = ({ className, style, value, maxValue, color = 'primary', showValue = false }) => {

  const [val, setVal] = useState<number>(0);

  useEffect(() => {
    calcValue();
  }, [value, maxValue])

  const calcValue = (): void => {
    setVal(value * 100 / maxValue);
  }

  return(
    <>
      { maxValue > 0 ?
        <>
          <div
            data-pr-tooltip={value+'/'+maxValue}
            data-pr-position="bottom"
            className={'relative pb ' + className}
            style={style}>
            <ProgressBar
              value={val}
              color={color}
              showValue={false}
              className='h-full w-full border-round font-bold text-yellow-500' />
            {showValue?
              <div className='absolute top-0 left-0 w-full h-full flex justify-content-center align-items-center'>{maxValue+'/'+value}</div>
            : ''}
          </div>
          {showValue ? '' : <Tooltip target=".pb" />}
        </>
      : '' }
    </>
  )
}

export { ProgBar }