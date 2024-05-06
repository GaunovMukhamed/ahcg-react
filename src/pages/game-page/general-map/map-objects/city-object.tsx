import { MapObject } from "../map.interfaces"
import { Image } from 'primereact/image';

interface CityMapObjectProps {
  cityInfo: MapObject;
  mapSize: number;
  current: boolean;
}

const CityMapObject: React.FC<CityMapObjectProps> = ({ cityInfo, mapSize, current }) => {

  const address: string = process.env.REACT_APP_API_ADDRESS!+'/images/';

  const mapObjectPosition = (initPos: number): string => {
    return mapSize * initPos / 4096 + 'px';
  }

  return(
    <div
      className="absolute flex flex-column justify-content-center align-items-center cursor-pointer"
      style={{ top: mapObjectPosition(cityInfo.y), left: mapObjectPosition(cityInfo.x) }}>
      <Image
        key={cityInfo.name}
        src={address+cityInfo.url}
        className={'border-circle ' + (current ? 'glow' : '')}
        title={cityInfo.description}
        alt="mapObject"
        height={(mapSize / 10).toString()}
        width={(mapSize / 10).toString()}
      />
      <div
        style={{ bottom: '-10px' }}
        className={"absolute capitalize border-1 text-center font-bold border-round vertical-align-middle p-1 text-xs md:text-base " + (current ? 'bg-green-700' : 'bg-yellow-700')}>
          {cityInfo.name}
      </div>
    </div>
  )
}

export { CityMapObject }