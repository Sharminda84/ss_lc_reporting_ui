import React from 'react';
import './TopCards.css';
import { getCardName } from '../../utils';

function TopCards(props) {
    const { cardTypeId, cards } = props;
    const cardsToDisplay = cards
        .map(cardArray => {
            cardArray[2] = cardArray[2].replace("Thumb", "Sample");
            return cardArray;
        })
        .filter(cardArray => cardArray[0] == cardTypeId).slice(0, 10);
    const renderImages = cardsToDisplay
        .map((card) => <img className='TopCardsItem' src={card[2]} alt={getCardName(card[1])} width='350px' height='500px' />);
    return (
        <div className='TopCards'>
            {renderImages}
        </div>
    );
}

export default TopCards;