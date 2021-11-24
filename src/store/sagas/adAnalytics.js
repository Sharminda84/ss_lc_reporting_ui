import { call, put } from 'redux-saga/effects';
import { loadAdMetrics } from '../actions/adAnalytics';
import { sendGetRequest } from '../networkUtils';
import * as ReportingServerURLs from './ReportingServerURLs';

export function* fetchAdMetrics() {
    try {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1);
        const endDate = tomorrow.toISOString().split('T')[0];
        const fetchAdMetricsURL = encodeURI(`${ReportingServerURLs.FETCH_AD_METRICS}?from=2000-01-01&to=${endDate}`);
        const metrics = yield call(sendGetRequest, fetchAdMetricsURL);
        yield put(loadAdMetrics(metrics));
    } catch (error) {
        console.log(`Error fetching card tags [${error}}]`);
    }
}
