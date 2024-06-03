import { Deck } from "../../../../../components/deck/deck";

const DecksPanel: React.FC<any> = () => {



  return(
    <div id="decks" className="border-left-1 border-primary pl-2 flex flex-column justify-content-end">
      <Deck
        shirtImg="https://drive.google.com/thumbnail?id=1VDYXcXVPajHRu2miFlbDxUf2Ka-6aHtM&sz=w1000"
      />
    </div>
  )
}

export {DecksPanel};