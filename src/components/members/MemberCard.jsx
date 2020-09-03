import React from 'react';
import './MemberCards.css';
import { getCardName } from '../../utils';

function MemberCard(props) {
    const cardInfo = props.cardInfo;
    const memberFirstName = props.card[0];
    const memberLastName = "****";
    const memberID = props.card[1];
    const memberJoinedDate = new Date(parseInt(props.card[2]));
    const memberJoined = `${memberJoinedDate.toLocaleDateString()} ${memberJoinedDate.toLocaleTimeString()}`;
    let emailAddress = props.card[3];
    if (props.card[3]) {
        emailAddress = "****" + emailAddress.substring(emailAddress.lastIndexOf("@"));
    }
    const memberValidated = props.card[4];
    const leaverFirstName = props.card[5];
    const leaverLastName = "****";
    // const cardURL = props.card[6];
    const cardImageURL = cardInfo.get(getCardName(props.card[7])) ? cardInfo.get(getCardName(props.card[7])).cardURL : '';
    const leavingDate = props.card[8] === '0' ? '' : new Date(parseInt(props.card[8]));
    const leavingDateString = leavingDate === '' ? '' : leavingDate.toLocaleDateString();
    const messageCount = props.card[9];
    const orderId = props.card[10];
    const deliveryAddress = props.card[11];
    const eCardOrderd = orderId != null && deliveryAddress == null ? 'Y' : 'N';
    const physicalCardOrdered = orderId != null && deliveryAddress != null ? 'Y' : 'N';
    const cardCreationTime = props.card[12] !== null && props.card[12] !== 0 ?
        new Date(parseInt(props.card[12])) : '';
    const cardCreationTimeString = cardCreationTime === ''
        ? ''
        : cardCreationTime.toLocaleDateString() + ' ' + cardCreationTime.toLocaleTimeString();
    const cardEnabled = props.card[13] === '0' ? 'Yes' : 'No';

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
                    <img src={cardImageURL} width={191} height={270}/>
                </div>
                <div className='MemberCardTextInfo'>
                    <h4>Card Creation Time: {cardCreationTimeString}</h4>
                    <h4>Leaver: {leaverFirstName} {leaverLastName}</h4>
                    <h4>Leaving date: {leavingDateString}</h4>
                    <h4>Signatures: {messageCount}</h4>
                    <h4>eCard Ordered: {eCardOrderd}</h4>
                    <h4>Printed Card Ordered: {physicalCardOrdered}</h4>
                    <h4>Enabled: {cardEnabled}</h4>
                </div>
            </div>
        </div>
    );
}

export default MemberCard;