
import { Dialog } from 'primereact/dialog';
import { useAppSelector } from '../../../store/store';
import { Location, MapObject } from '../general-map/map.interfaces';
import { Card } from 'primereact/card';
import { sendSocketMessage } from '../../../tools/socket-wrapper';
import { ScrollPanel } from 'primereact/scrollpanel';
        
const address: string = process.env.REACT_APP_API_ADDRESS!+'/images/';
        
interface locationMenuProps {
  show: boolean;
  hideFunc: () => void;
}

const LocationMenu: React.FC<locationMenuProps> = ({ show, hideFunc }) => {

  const location = useAppSelector((state) => state.character.location);
  const mapObjects = useAppSelector((state) => state.map.mapObjects);

  const currentPlace: MapObject | undefined = mapObjects.find((obj: MapObject) => obj.name === location);

  const cardHeader = (url: string) => {
    return <img
      alt="Location"
      src={`${address}${url}`}
      className='border-round border-noround-bottom'
      style={{ width: '100%', height: 'auto' }}/>
  };

  const goToLocation = (locationName: string): void => {
    sendSocketMessage('location', locationName);
  }

  return(
    <Dialog
      header={location}
      visible={show}
      style={{ width: '50vw sm:60vw' }}
      dismissableMask={true}
      draggable={false}
      onHide={() => hideFunc()}>
      <ScrollPanel style={{ width: '80vw', height: '100%' }}>
        <div className='w-full h-full grid p-3'>
          {currentPlace?.locations.map((location: Location, i: number) => {
            return <div key={i} className='col-6 lg:col-3' onClick={() => { hideFunc(); goToLocation(location.name) }}>
              <Card
                title={<div className='text-lg md:text-xl'>{location.name}</div>}
                className='cursor-pointer h-full'
                header={() => cardHeader(location.url)}>
                <p className="m-0 text-xs md:text-base">{location.description}</p>
              </Card>
            </div>
          })}
        </div>
      </ScrollPanel>
    </Dialog>
  )
}

export { LocationMenu }