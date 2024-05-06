
import { useEffect, useRef, useState } from "react";
import { Image } from 'primereact/image';
import { MapObject } from "./map.interfaces";
import { CityMapObject } from "./map-objects/city-object";
import { useAppSelector } from "../../../store/store";
import { MapActionsBar } from "../map-actions-bar/map-actions-bar";

interface GeneralMapProps {
  className?: string;
}

const GeneralMap: React.FC<GeneralMapProps> = ({ className }) => {

  const address: string = process.env.REACT_APP_API_ADDRESS!+'/images/';
  const container = useRef();
  const [mapSize, setMapSize] = useState<number>(0);
  const mapObjects = useAppSelector((state) => state.map.mapObjects);
  const location = useAppSelector((state) => state.character.location);

  useEffect(() => {
    prepareMap();
  },[])

  const prepareMap = (): void => {
    const containerWidth: number = container.current!['offsetWidth'];
    const containerHeight: number = container.current!['offsetHeight'];
    if(containerWidth >= containerHeight) {
      setMapSize(containerHeight+10);
    } else {
      setMapSize(containerWidth);
    }
  }

  return(
    //@ts-ignore
    <div ref={container} id="map" className={'overflow-hidden relative h-full w-full select-none flex justify-content-center align-items-center '+className}>
      <div className="relative" style={{ width: mapSize, height: mapSize }}>
        <Image src={address+'/map.jpeg'} alt="map" height={mapSize.toString()} width={mapSize.toString()} />
        <div className="absolute bg-yellow-800 border-round border-1 p-2 text-small md:text-base" style={{ top: '10px', left: '10px' }}>Вы находитесь в городе <span className="capitalize">{location}</span></div>
        {mapObjects.map((object: MapObject) => {
          return  <CityMapObject
                    key={object.name}
                    cityInfo={object}
                    mapSize={mapSize}
                    current={ object.name === location } />
        })}
      </div>
      <MapActionsBar />
    </div>
  )
}

export { GeneralMap };