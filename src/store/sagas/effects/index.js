import { fork, take, call } from 'redux-saga/effects';

export function* takeFirst(pattern, saga, ...args) {
    return yield fork(function*() {
        while (true) {
            const action = yield take(pattern);
            yield call(saga, ...args.concat(action))
        }
    });
}