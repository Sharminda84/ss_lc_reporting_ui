import { call, put } from 'redux-saga/effects';
import { loadCardInfo } from '../actions/refData';
import { sendGetRequest } from '../networkUtils';
import * as ReportingServerURLs from './ReportingServerURLs';
import { getCardName } from '../../utils';

export function* fetchCardInfo() {
    try {
        const fetchCardInfoURL = encodeURI(ReportingServerURLs.FETCH_CARD_INFO);
        const cardInfo = yield call(sendGetRequest, fetchCardInfoURL);
        yield put(loadCardInfo(processData(cardInfo)));
    } catch (error) {
        console.log(`Error fetching card info [${error}}]`);
    }
}

const processData = cardInfoResults => {
    const cardInfoProcessed = new Map();
    cardInfoResults.forEach(cardInfo => {
        const cardName = getCardName(cardInfo[0]);
        const cardDetails = {
            cardURL: cardInfo[1],
        };
        cardInfoProcessed.set(cardName, cardDetails);
    });
    return cardInfoProcessed;
};
