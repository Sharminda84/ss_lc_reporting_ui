import { call, put, select } from 'redux-saga/effects';
import { loadMembersData } from '../actions/members';
import _ from 'lodash';
import allMembers from './static-data/members.json';

function fetchMemberSignUpsFromStaticFile(startDate, endDate) {
    let members = {};
    allMembers.forEach(member => {
        const memberJoinedTime = new Date(member.joined).getTime();
        if (memberJoinedTime >=startDate && memberJoinedTime <= endDate ) {
            members = _.merge(members, {
                date: member.joined, members: [ member ]
            });
        }
    });

    return members;
}

export function* fetchMemberSignups(startDate, endDate) {
    const members = fetchMemberSignUpsFromStaticFile(startDate, endDate);
    yield put(loadMembersData(members));
}