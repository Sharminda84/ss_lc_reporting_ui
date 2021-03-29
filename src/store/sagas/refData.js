import { call, put } from 'redux-saga/effects';
import { loadCardInfo, laodCardDesignCounts } from '../actions/refData';
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

export function* fetchCardDesignCounts() {
    try {
        const cardDesignCounts = yield call(sendGetRequest, ReportingServerURLs.FETCH_CARD_DESIGNS_COUNT)
        const cardDesignCountsMap = new Map();
        cardDesignCounts.forEach(row => cardDesignCountsMap.set(row[0], row[1]));
        yield put(laodCardDesignCounts(cardDesignCountsMap));
    } catch (error) {
        console.log(`Error fetching card design counts [${error}}]`);
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
