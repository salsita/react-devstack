import { END } from 'redux-saga';
import { fork, take } from 'redux-saga/effects';

export default function* takeEveryUniversal(pattern, saga, ...params) {
  let action = yield take(pattern);

  while (action !== END) {
    yield fork(saga, action, ...params);
    action = yield take(pattern);
  }
}
