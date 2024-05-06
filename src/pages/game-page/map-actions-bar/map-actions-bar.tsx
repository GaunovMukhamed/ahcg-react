import { Button } from "primereact/button"
import { useState } from "react";
import { LocationMenu } from "./location-menu";

interface MapActionsBarProps {
  className?: string;
}

const MapActionsBar: React.FC<MapActionsBarProps> = ({ className }) => {

  const [showLocationMenu, setShowLocationMenu] = useState<boolean>(false);

  return(
    <>
      <div className={'surface-50 p-2 absolute left-0 bottom-0 '+className} style={{ width: '100vw' }}>
        <Button 
          icon='pi pi-building-columns'
          tooltip="Места для посещения"
          className="mr-2"
          onClick={() => setShowLocationMenu(true)}
          aria-controls="location-actions"
          aria-haspopup />
      </div>
      <LocationMenu show={showLocationMenu} hideFunc={() => setShowLocationMenu(false)} />
    </>
  )
}

export { MapActionsBar }