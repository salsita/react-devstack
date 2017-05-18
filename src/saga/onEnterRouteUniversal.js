import { call } from 'redux-saga/effects';

import takeEveryUniversal from './takeEveryUniversal';

export default function* onEnterRouteUniversal(route, saga, ...params) {
  yield call(takeEveryUniversal, '@@router5/TRANSITION_START', function* onTakeEveryUniversal({ payload }) {
    if (payload.route.name === route) {
      yield call(saga, payload, ...params);
    }
  });
}
