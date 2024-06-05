import { ScrollPanel } from "primereact/scrollpanel";
import { Card } from "../card/card";
import './card-line.scss';

interface CardLineProps {
  className?: string;
}

const CardLine: React.FC<CardLineProps> = ({className = ''}) => {
  return(
    <div className={"w-full h-full border-1 border-primary border-round p-1 surface-ground "+className}>
      <ScrollPanel className="w-full h-full">
        <Card 
          style={{ width: '3.8rem' }}
          frontImg="https://drive.google.com/thumbnail?id=1VDYXcXVPajHRu2miFlbDxUf2Ka-6aHtM&sz=w1000"
          backImg="https://drive.google.com/thumbnail?id=1VDYXcXVPajHRu2miFlbDxUf2Ka-6aHtM&sz=w1000" />
        <Card 
          style={{ width: '3.8rem' }}
          frontImg="https://drive.google.com/thumbnail?id=1VDYXcXVPajHRu2miFlbDxUf2Ka-6aHtM&sz=w1000"
          backImg="https://drive.google.com/thumbnail?id=1VDYXcXVPajHRu2miFlbDxUf2Ka-6aHtM&sz=w1000" />
      </ScrollPanel>
    </div>
  )
}

export {CardLine}