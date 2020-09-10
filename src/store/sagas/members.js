import { call, put } from 'redux-saga/effects';
import { loadMembersData, loadCardsForMembers } from '../actions/members';
import { sendGetRequest } from '../networkUtils';
import * as ReportingServerURLs from './ReportingServerURLs';

export function* fetchMemberSignups(action) {
    try {
        // The time stamps have the time component to current time.
        // For start time, set time to 00:00:00:000
        let startDate = new Date(action.payload.startDate);
        startDate.setHours(0, 0, 0, 0);
        startDate = startDate.getTime();

        // For end time, set time to 23:59:59:999
        let endDate = new Date(action.payload.endDate);
        endDate.setHours(23, 59, 59, 999);
        endDate = endDate.getTime();

        const fetchMembersURL = encodeURI(`${ReportingServerURLs.FETCH_ALL_MEMBERS_URL}?from=${startDate}&to=${endDate}`);
        const members = yield call(sendGetRequest, fetchMembersURL);
        yield put(loadMembersData(members));
    } catch (error) {
        console.log('ERROR.....');
    }
}

export function* fetchCardsForMembers(action) {
    try {
        const fetchCardsForMembersURL = encodeURI(`${ReportingServerURLs.FETCH_CARDS_FOR_MEMBERS_URL}?date=${action.payload}`);
        // const cards = yield call(sendGetRequest, fetchCardsForMembersURL);

        const cards = [
            {
                cardDetails: [
                    "Sye",
                    "1335",
                    "1599746450000",
                    "sye.thevathas@cityoflondon.gov.uk",
                    "true",
                    "Steven",
                    "1595324413570oAtrbjg5815c",
                    "com.leavingcard.pdfgen.carddesigns.eliza.citypeople.CityBoyWhiteCardWriter",
                    "1599832850000",  // leaving date
                    "3",
                    null, // order id
                    null,  // deliver address
                    "1595324413572",
                    "0",
                    "1963"
                ],
                cardLifeCycleEvents: [
                    [
                        "1963",
                        "1597738971535",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597739963586",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597740045376",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597740253817",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597740275672",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597740337128",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597740400378",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597740442389",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597740442820",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597740482252",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597740540569",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597740594374",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597740708065",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597740758242",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597740769430",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597741224106",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597741303019",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597741404231",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597741536486",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597741723066",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597741939233",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597742612673",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597742670854",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597742676013",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597743090522",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597743143807",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597743455306",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597743517295",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597743904488",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597744266612",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597744506183",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597744686642",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597744759874",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597744834690",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597745664373",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597745812201",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597748208541",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597749455393",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597751947225",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597752479680",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597753208635",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597758122185",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597759028169",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597764518747",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1597768554623",
                        "MESSAGE_ADDED"
                    ],
                    [
                        "1963",
                        "1595030400000",
                        "MESSAGE_ADDED"
                    ]
                ]
            },
        ];

        yield put(loadCardsForMembers(cards, action.payload));
        document.body.classList.remove('busy-cursor');
    } catch (error) {
        console.log(`Error while fetching cards for members: ${error}`);
    }
}