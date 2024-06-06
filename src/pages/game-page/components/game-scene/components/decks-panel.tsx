import { CSSProperties } from "react";
import { Deck } from "../../../../../components/deck/deck";

interface DecksPanelProps {
  className?: string;
  style?: CSSProperties;
}

const DecksPanel: React.FC<DecksPanelProps> = ({ className='', style }) => {
  return(
    <div style={style} className={"border-left-1 border-primary pl-2 flex flex-column justify-content-end h-min "+className}>
      <Deck className="mb-1" shirtImg="https://drive.google.com/thumbnail?id=1_QtpIiopWLAHvUiK8akF5dit09-68pGf&sz=w1000" />
      <Deck shirtImg="https://drive.google.com/thumbnail?id=1VDYXcXVPajHRu2miFlbDxUf2Ka-6aHtM&sz=w1000" />
    </div>
  )
}

export {DecksPanel};