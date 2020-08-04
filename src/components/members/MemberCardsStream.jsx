import React from 'react';
import MemberCard from './MemberCard';
import './MemberCards.css';

function MemberCardsStream(props) {
    const { memberCards, cardInfo } = props;
    const stream = memberCards.map((memberCard) => <MemberCard card={memberCard} cardInfo={cardInfo}/>);

    return (
            <div className='MemberCardsStream'>
                <div>
                    <h2>Home: New Members Card Stream</h2>
                </div>
                <div>
                    {stream}
                </div>
        </div>
    );
}

export default MemberCardsStream;