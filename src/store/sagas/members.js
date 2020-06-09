import { call, put, select } from 'redux-saga/effects';
import { loadMembersData } from '../actions/members';
import _ from 'lodash';
import allMembers from './static-data/members.json';

function fetchMemberSignUpsFromStaticFile(startDate, endDate) {
    return _.orderBy(allMembers, member => member.joined, 'desc');
}

export function* fetchMemberSignups(startDate, endDate) {
    const members = fetchMemberSignUpsFromStaticFile(startDate, endDate);
    yield put(loadMembersData(members));
}