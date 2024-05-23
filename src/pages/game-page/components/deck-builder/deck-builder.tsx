import { Dialog } from "primereact/dialog";
import { useEffect, useRef, useState } from "react";
import { sendSocketMessageWithCallback } from "../../../../tools/socket-wrapper";
import { DeckBuilderInfo, Decks } from "./models";
import { GameCard } from "../../models";
import { Scroller } from "../../../../components/scroller";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { CardsMenu } from "./cards-menu";

interface DeckBuilderProps {
  maxCardsCount?: number
}

const DeckBuilder: React.FC<DeckBuilderProps> = ({ maxCardsCount }) => {

  const [selectedCards, setSelectedCards] = useState<GameCard[]>([]);
  const [decks, setDecks] = useState<Decks>({});

  const containerRef = useRef<any>();

  useEffect(() => {
    getCardsLists();
  }, [])

  const addRemoveCard = (cardItem: GameCard, addToPlayerDeck: boolean): void => { //add false - remove
    if(addToPlayerDeck === false) {
      removeCard(cardItem, addToPlayerDeck);
    } else {
      if(!maxCardsCount || (selectedCards.length < maxCardsCount)) {
        const newDecks: Decks = {...decks};
        newDecks[cardItem.type].find((card: GameCard) => card.id === cardItem.id)!.enabled = false;
        setDecks(newDecks);
        setSelectedCards([...selectedCards, {...cardItem, enabled: true}].sort((a: GameCard, b: GameCard) => {
          if ( a.type < b.type ){
            return -1;
          }
          if ( a.type > b.type ){
            return 1;
          }
          return 0;
        }));
      }
    }
  }

  const removeCard = (cardItem: GameCard, addToPlayerDeck: boolean): void => {
    const newDecks: Decks = {...decks};
    newDecks[cardItem.type].find((card: GameCard) => card.id === cardItem.id)!.enabled = true;
    setDecks(newDecks);
    setSelectedCards(selectedCards.filter((card: GameCard) => (card.type !== cardItem.type || card.id !== cardItem.id)));
  }

  const rusDeckName = (engDeckName: string): string => {
    switch(engDeckName) {
      case "common":
        return "Общие";
      case "keeper":
        return "Хранитель"
      case "seeker":
        return "Искатель"
      case "mystic":
        return "Мистик"
      default:
        return engDeckName;
    }
  }

  const getCardsLists = (): void => {
    sendSocketMessageWithCallback('getDeckBuilderCards', '').then((result: DeckBuilderInfo) => {
      const decks: Decks = result.decks;
      Object.values(decks).map((cards: GameCard[]) => { cards.map((card: GameCard) => card.enabled = true)})
      setDecks(decks);
      setSelectedCards(result.selectedCards);
    })
  }

  return(
    <Dialog
      header={"Выберите карты для вашей колоды"}
      draggable={false}
      visible={true}
      closable={false}
      style={{ width: '95vw', height: '90vh' }}
      onHide={()=>{}}>
      <div ref={containerRef} className='w-full h-full flex justify-content-between'>
        <Scroller className="w-full h-full">
          <Accordion className="w-full" activeIndex={0}>
            <AccordionTab header={`Ваша колода `+(maxCardsCount?`(${selectedCards.length}/${maxCardsCount})`:`(${selectedCards.length})`)}>
              {selectedCards.length ? <CardsMenu cards={selectedCards} addRemoveCard={removeCard} /> : 'Нет карт'}
            </AccordionTab>
             {Object.entries(decks).map(([name, deckCards]:[string, GameCard[]], i: number) => {
              return <AccordionTab key={i} header={rusDeckName(name)}>
                <CardsMenu cards={deckCards} addRemoveCard={addRemoveCard} />
              </AccordionTab>
              })}
          </Accordion>
        </Scroller>
       
      </div>
    </Dialog>
  )
}

export { DeckBuilder };