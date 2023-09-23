import React from 'react';
import './TopCards.css';
import { getCardName } from '../../utils';

function TopCards(props) {
    const { cardTypeId, cards } = props;
    console.log("cardTypeId " + cardTypeId + " total" + cards.length)
    const cardsToDisplay = cards
        .map(cardArray => {
            cardArray[2] = cardArray[2].replace("Thumb", "Sample");
            return cardArray;
        })
        .filter(cardArray => cardArray[0] == cardTypeId).slice(0, 10);
    console.log("cardTypeId " + cardTypeId + " cards number" + cardsToDisplay.length)
    const renderImages = cardsToDisplay
        .map((card, index) =>
            <div className='TopCardsItem'>
                <div>
                    <h3>Rank #{index + 1}</h3>
                    <img src={card[2]} alt={getCardName(card[1])} width='350px' height='500px' />
                </div>
            </div>
        );
    return (
        <div className='TopCards'>
            {renderImages}
        </div>
    );
}

export default TopCards;