import { Dialog } from "primereact/dialog";
import { ReactNode, useEffect, useRef, useState } from "react";
import { sendSocketMessageWithCallback } from "../../../../tools/socket-wrapper";
import { DeckBuilderInfo, Decks } from "./models";
import { GameCard } from "../../models";
import { Carousel } from 'primereact/carousel';
import { Card } from "../../../../components/card/card";
import { Scroller } from "../../../../components/scroller";
        
const DeckBuilder: React.FC<any> = () => {

  const [selectedCards, setSelectedCards] = useState<GameCard[]>([]);
  const [decks, setDecks] = useState<Decks>({});

  const containerRef = useRef<any>();

  const responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
];

  useEffect(() => {
    getCardsLists();
  }, [])

  const getCardsLists = (): void => {
    sendSocketMessageWithCallback('getDeckBuilderCards', '').then((result: DeckBuilderInfo) => {
      const decks: Decks = result.decks;
      Object.values(decks).map((cards: GameCard[]) => { cards.map((card: GameCard) => card.enabled = true)})
      setDecks(decks);
      setSelectedCards(result.selectedCards);
    })
  }

  function galleryItem(cardItem: GameCard, isSelectedDeck: boolean): ReactNode {

    const toggleCardInDeck = (value: boolean) => {
      const newDecks: Decks = {...decks};
      newDecks[cardItem.type].find((card: GameCard) => card.id === cardItem.id)!.enabled = value;
      setDecks(newDecks);
    }

    return <div className="w-full h-full flex justify-content-center align-items-center">
      <div onClick={() => {
        if(cardItem.enabled) {
          if(isSelectedDeck) {
            setSelectedCards(selectedCards.filter((card: GameCard) => (card.type !== cardItem.type || card.id !== cardItem.id)));
            toggleCardInDeck(true);
          } else {
            setSelectedCards([...selectedCards, {...cardItem, enabled: true}]);
            toggleCardInDeck(false);
          }
        }}}>
        <Card
          frontImg={cardItem.frontImg}
          backImg={cardItem.backImg}
          turnable={false}
          enabled={cardItem.enabled}
          className={isSelectedDeck ? "w-3rem h-5rem" : "w-8rem h-12rem"} />
      </div>
    </div>
     
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
        <div className="w-6rem h-full flex justify-content-center align-items-center border-right-1">
          {selectedCards.length === 0 ?
            <div>Нет карт</div>:
            <div className="w-full h-full flex flex-column">
              <div className="w-full text-center mb-2">Ваши карты:</div>
              <Carousel
                verticalViewPortHeight={containerRef.current ? (containerRef.current.clientHeight - 200)+"px" : "350px"}
                className="flex-1 h-20rem flex flex-column justify-content-center"
                showIndicators={false}
                value={selectedCards}
                numVisible={3}
                numScroll={3}
                orientation="vertical"
                itemTemplate={(event: any) => galleryItem(event, true)} />
            </div>
          }
        </div>
        <div className="flex-1 overflow-hidden">
          <Scroller className="w-full h-full">
            {Object.values(decks).map((deckCards: GameCard[], i: number) => {
              return <Carousel
              className="w-full"
                key={i}
                value={deckCards}
                numVisible={5}
                numScroll={5}
                responsiveOptions={responsiveOptions}
                itemTemplate={(event) => galleryItem(event, false)} />
            })}
          </Scroller>
        </div>
      </div>
    </Dialog>
  )
}

export { DeckBuilder };