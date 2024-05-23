import { ReactNode } from "react";
import { Card } from "../../../../components/card/card";
import { GameCard } from "../../models";

interface CardsMenuProps {
  cards: GameCard[];
  addRemoveCard: (card: GameCard, value: boolean) => void;
}

const CardsMenu: React.FC<CardsMenuProps> = ({ cards, addRemoveCard }) => {

  const cardItem = (cardItem: GameCard): ReactNode => {
    return <div
      className="w-full h-full flex justify-content-center align-items-center"
      onClick={() => addRemoveCard(cardItem, !!cardItem.enabled)}>
      <Card
        frontImg={cardItem.frontImg}
        backImg={cardItem.backImg}
        turnable={false}
        enabled={cardItem.enabled}
        className="w-8rem h-12rem" />
    </div>
  }

  return(
    <div className="w-full flex flex-wrap gap-2">
      {cards.map((card: GameCard, i: number) => {
        return <div key={i}>{cardItem(card)}</div>
      })}
    </div>
  )
}

export { CardsMenu };