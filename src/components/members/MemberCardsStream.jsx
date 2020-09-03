import React, {useState} from 'react';
import MemberCard from './MemberCard';
import './MemberCards.css';
import './MemberSignUps.css';
import DatePicker from 'react-datepicker';
import { getStartOfTodayInMillis, getStartOfDayInMillis } from '../../utils';

function MemberCardsStream(props) {
    const [streamDate, setStreamDate] = useState(getStartOfTodayInMillis());
    const { memberCards, cardInfo, currentDate, fetchCardsForMembers } = props;
    const memberCardsForDate = memberCards.get(streamDate);
    const stream = memberCardsForDate ?
        memberCardsForDate.map((memberCard, index) => <MemberCard key={index} card={memberCard} cardInfo={cardInfo}/>) : null;
    const heading = memberCardsForDate ?
        `New cards [Count: ${memberCardsForDate.length}] for ${new Date(currentDate).toDateString()}` :
        `Loading the card for ${new Date(streamDate).toDateString()}`;
    const fetchData = () => fetchCardsForMembers(getStartOfDayInMillis(streamDate));

    return (
            <div className='MemberCardsStream'>
                <div>
                    <h2>{heading}</h2>
                </div>
                <div className='MemberCardsStreamDate'>
                    <div>Choose a date to view cards</div>
                    <DatePicker
                        selected={streamDate}
                        onChange={(newStreamDate) => setStreamDate(newStreamDate.getTime())} />
                    <button onClick={fetchData}>Fetch</button>
                </div>
                <div>
                    {stream}
                </div>
        </div>
    );
}

export default MemberCardsStream;