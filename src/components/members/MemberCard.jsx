import React from 'react';
import './MemberCards.css';
import { getCardName } from '../../utils';

function MemberCard(props) {
    const cardInfo = props.cardInfo;
    const memberFirstName = props.card[0];
    const memberLastName = props.card[1];
    const memberID = props.card[2];
    const memberJoinedDate = new Date(parseInt(props.card[3]));
    const memberJoined = `${memberJoinedDate.toLocaleDateString()} ${memberJoinedDate.toLocaleTimeString()}`;
    const emailAddress = props.card[4];
    const memberValidated = props.card[5];
    const leaverFirstName = props.card[6];
    const leaverLastName = props.card[7];
    const cardURL = props.card[8];
    const cardImageURL = cardInfo.get(getCardName(props.card[9])).cardURL;
    const leavingDate = props.card[10] === '0' ? '' : new Date(parseInt(props.card[10]));
    const leavingDateString = leavingDate === '' ? '' : leavingDate.toLocaleDateString();
    const messageCount = props.card[11];
    const orderId = props.card[12];
    const deliveryAddress = props.card[13];
    const eCardOrderd = orderId != null && deliveryAddress == null ? 'Y' : 'N';
    const physicalCardOrdered = orderId != null && deliveryAddress != null ? 'Y' : 'N';

    return (
        <div className='MemberCard'>
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
                    <img src={cardImageURL} width={150} height={212}/>
                </div>
                <div className='MemberCardTextInfo'>
                    <h4>Leaver: {leaverFirstName} {leaverLastName}</h4>
                    <h4>Leaving date: {leavingDateString}</h4>
                    <h4>Signatures: {messageCount}</h4>
                    <h4>eCard Ordered: {eCardOrderd}</h4>
                    <h4>Printed Card Ordered: {physicalCardOrdered}</h4>
                    <h4><a href={`https://www.leavingcard.com/card/view/${cardURL}`}>Card URL</a></h4>
                </div>
            </div>
        </div>
    );
}

export default MemberCard;