import { call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { Actions, SagaEffects } from 'react-devstack';

import * as ActionTypes from '../constants/actionTypes';
import * as Routes from '../constants/routes';
import * as GithubApi from '../effects/githubApi';
import * as ExploreSelectors from '../selectors/exploreSelectors';
import * as PaginationSelectors from '../selectors/paginationSelectors';
import * as RouterSelectors from '../selectors/routerSelectors';

function* onSubmitExplore() {
  const formValue = yield select(ExploreSelectors.getValue);

  if (~formValue.indexOf('/')) {
    const [username, repo] = formValue.split('/');
    yield put(Actions.navigateTo(Routes.REPO, {
      username,
      repo
    }));
  } else {
    yield put(Actions.navigateTo(Routes.USER, { username: formValue }));
  }
}

function* fetchFromApi(apiCall, finalAction, ...args) {
  try {
    yield put({ type: ActionTypes.LOADING_STARTED });
    const {
      entities,
      result,
      nextPageUrl
    } = yield call(apiCall, ...args);

    yield put({ type: ActionTypes.ENTITY_REPO_HAS_CHANGED, payload: entities });

    if (finalAction) {
      yield put({ type: finalAction, payload: { result, nextPageUrl } });
    }
  } catch (ex) {
    yield put({ type: ActionTypes.LOADING_FAILED, payload: ex.message });
  } finally {
    yield put({ type: ActionTypes.LOADING_FINISHED });
  }
}

function* onEnterUser({ route: { params: { username } } }) {
  yield put({ type: ActionTypes.RESET_PAGINATION_STATE });
  yield call(fetchFromApi, GithubApi.fetchUser, null, username);
  yield call(fetchFromApi, GithubApi.fetchStarred, ActionTypes.STARRED_FETCHED, username);
}

function* onEnterRepo({ route: { params: { username, repo } } }) {
  const repoFullName = `${username}/${repo}`;

  yield put({ type: ActionTypes.RESET_PAGINATION_STATE });
  yield call(fetchFromApi, GithubApi.fetchRepo, null, repoFullName);
  yield call(fetchFromApi, GithubApi.fetchStargazers, ActionTypes.STARGAZERS_FETCHED, repoFullName);
}

function* onStarredFetchMore() {
  const { nextPageUrl } = yield select(PaginationSelectors.getStarredReposByUser);
  const username = yield select(RouterSelectors.getUsername);

  yield call(
    fetchFromApi,
    GithubApi.fetchStarred,
    ActionTypes.STARRED_FETCHED,
    username,
    nextPageUrl
  );
}

function* onStargazersFetchMore() {
  const { nextPageUrl } = yield select(PaginationSelectors.getStargazers);
  const repoFullName = yield select(RouterSelectors.getRepoFullName);

  yield call(
    fetchFromApi,
    GithubApi.fetchStargazers,
    ActionTypes.STARGAZERS_FETCHED,
    repoFullName,
    nextPageUrl
  );
}

export default function* () {
  yield [
    takeEvery(ActionTypes.EXPLORE_SUBMIT, onSubmitExplore),
    takeEvery(ActionTypes.STARRED_FETCH_MORE, onStarredFetchMore),
    takeEvery(ActionTypes.STARGAZERS_FETCH_MORE, onStargazersFetchMore),
    fork(SagaEffects.onEnterRouteUniversal, Routes.USER, onEnterUser),
    fork(SagaEffects.onEnterRouteUniversal, Routes.REPO, onEnterRepo)
  ];
}
