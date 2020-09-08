import React from 'react';
import './MemberCards.css';
import { getCardName, getStartOfDayInMillis } from '../../utils';
import SimpleChart from '../chart/SimpleChart';
import _ from 'lodash';

const CARD_LIFE_CYCLE_EVENTS = [
    'MESSAGE_ADDED',
    'MESSAGE_EDITED',
    'MESSAGE_DELETED',
    'ECARD_PURCHASED',
    'PRINTED_CARD_PURCHASED',
    'CHRISTMAS_ECARD_PURCHASED',
    'ORDER_PRINTED_CARD_EMAIL_SENT',
    'ORDER_ECARD_EMAIL_SENT',
    'THANK_YOU_EMAIL_SENT'
];

const generateChartData = (cardLifeCycleEvents) => {
    if (!cardLifeCycleEvents) {
        return [];
    }


    // Create a map to hold events for aggregation
    // key: event, value: map of events (key: start of the day ts, value: no of events for the day)
    const chartData = new Map();
    CARD_LIFE_CYCLE_EVENTS.forEach(eventType => chartData.set(eventType, new Map()));

    // Convert the timestamps of incoming events to start of the day and aggregate them
    cardLifeCycleEvents.forEach(event => {
        const timestamp = Number(event[1]);
        const eventType = event[2];
        const date = new Date(timestamp);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        const timestampStartOfDay = date.getTime();
        if (chartData.get(eventType).has(timestampStartOfDay)) {
            const count = chartData.get(eventType).get(timestampStartOfDay);
            chartData.get(eventType).set(timestampStartOfDay, count + 1);
        } else {
            chartData.get(eventType).set(timestampStartOfDay, 1);
        }
    });

    // Once aggregation is done, prepare the output data structure
    /*
        [
            {
                name: event type
                data: // sorted by ts asc
                [
                    [ts, count],
                    [ts, count]
                ]
            },
        ]
    */
    const outputData = [];
    chartData.forEach((dataMapForEvent, lifeCycleEvent) => {
        const dataForLifeCycleEvent = {
            name: lifeCycleEvent,
            data: [],
        };

        _.sortBy(Array.from(dataMapForEvent.keys())).forEach(date => {
            dataForLifeCycleEvent.data.push([date, dataMapForEvent.get(date)])
        });
        outputData.push(dataForLifeCycleEvent);
    });

    return outputData;
}

function MemberCard(props) {
    const cardInfo = props.cardInfo;
    const memberFirstName = props.card.cardDetails[0];
    const memberLastName = "****";
    const memberID = props.card.cardDetails[1];
    const memberJoinedDate = new Date(parseInt(props.card.cardDetails[2]));
    const memberJoined = `${memberJoinedDate.toLocaleDateString()} ${memberJoinedDate.toLocaleTimeString()}`;
    let emailAddress = props.card.cardDetails[3];
    if (props.card.cardDetails[3]) {
        emailAddress = "****" + emailAddress.substring(emailAddress.lastIndexOf("@"));
    }
    const memberValidated = props.card.cardDetails[4];
    const leaverFirstName = props.card.cardDetails[5];
    const leaverLastName = "****";
    // const cardURL = props.card.cardDetails[6];
    const cardImageURL = cardInfo.get(getCardName(props.card.cardDetails[7])) ? cardInfo.get(getCardName(props.card.cardDetails[7])).cardURL : '';
    const leavingDate = props.card.cardDetails[8] === '0' ? '' : new Date(parseInt(props.card.cardDetails[8]));
    const leavingDateString = leavingDate === '' ? '' : leavingDate.toLocaleDateString();
    const messageCount = props.card.cardDetails[9];
    const orderId = props.card.cardDetails[10];
    const deliveryAddress = props.card.cardDetails[11];
    const eCardOrderd = orderId != null && deliveryAddress == null ? 'Y' : 'N';
    const physicalCardOrdered = orderId != null && deliveryAddress != null ? 'Y' : 'N';
    const cardCreationTime = props.card.cardDetails[12] !== null && props.card.cardDetails[12] !== 0 ?
        new Date(parseInt(props.card.cardDetails[12])) : '';
    const cardCreationTimeString = cardCreationTime === ''
        ? ''
        : cardCreationTime.toLocaleDateString() + ' ' + cardCreationTime.toLocaleTimeString();
    const cardEnabled = props.card.cardDetails[13] === '0' ? 'Yes' : 'No';
    let cardCSS = 'MemberCard';
    if (orderId != null) {
        cardCSS = 'MemberCard MemberCardSold';
    } else if (leavingDate === '') {
        cardCSS = 'MemberCard MemberCardUnsold';
    } else if (leavingDate !== '' &&
        getStartOfDayInMillis(new Date().getTime()) > getStartOfDayInMillis(leavingDate.getTime())) {
        cardCSS = 'MemberCard MemberCardUnsold';
    }

    return (
        <div className={cardCSS}>
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td>{memberFirstName} {memberLastName} (id={memberID})</td>
                        <td>Joined: {memberJoined}</td>
                        <td>{emailAddress}</td>
                        <td>{memberValidated ? 'Validated' : 'Not Validated'}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className='MemberCardDetails'>
                <div>
                    <img src={cardImageURL} width={191} height={270}/>
                </div>
                <div className='MemberCardTextInfo'>
                    <h4>Card Creation Time: {cardCreationTimeString}</h4>
                    <h4>Card Receiver: {leaverFirstName} {leaverLastName}</h4>
                    <h4>Target Date: {leavingDateString}</h4>
                    <h4>Signatures: {messageCount}</h4>
                    <h4>eCard Ordered: {eCardOrderd}</h4>
                    <h4>Printed Card Ordered: {physicalCardOrdered}</h4>
                    <h4>Enabled: {cardEnabled}</h4>
                </div>
                <div>
                    <SimpleChart title='Key Card Events'
                                 type='column'
                                 chartData={generateChartData(props.card.cardLifeCycleEvents)} />
                </div>
            </div>
        </div>
    );
}

export default MemberCard;