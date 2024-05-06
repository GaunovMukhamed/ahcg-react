import { GeneralMap } from "../general-map/general-map";
        
interface LocationsProps {
  className?: string;
}

const Locations: React.FC<LocationsProps> = ({ className }) => {
  return(
    <>
      <div className={"relative "+className}>        
        <GeneralMap className="flex-1" />
      </div>
    </>
  )
}

export { Locations };