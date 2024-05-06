import { Knob } from 'primereact/knob';
import { useAppSelector } from "../../../../store/store";
import { Tooltip } from 'primereact/tooltip';

interface XpBar {
  knobHeight: number;
}

const XpBar: React.FC<any> = ({ knobHeight }) => {

  const level = useAppSelector((state) => state.character.level);
  const xp = useAppSelector((state) => state.character.xp);
  const xpMax = useAppSelector((state) => state.character.xpMax);

  return(
    <>
    { xpMax > 0 ?
      <>
        <div
          className='xp relative cursor-pointer'
          data-pr-tooltip={xp+'/'+xpMax}
          style={{ height: knobHeight, width: 'fit-content' }}
          title={`Ваш уровень - ${level} (${xp} из ${xpMax})`}>
          <Knob
            value={xp}
            max={xpMax}
            readOnly={true}
            showValue={false}
            valueColor="var(--secondary-color, Yellow)"
            size={knobHeight} />
          <span
            className='absolute text-yellow-500 font-bold text-center'
            style={{ left: '0', right: '0', top: '0', bottom: '0', margin: 'auto', lineHeight: knobHeight+'px' }}>
            {level}
          </span>
        </div>
        <Tooltip target=".xp" />
      </>
    : '' }
    </>
  )
}

export { XpBar };