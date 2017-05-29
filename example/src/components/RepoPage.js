import React from 'react';
import { connect } from 'react-redux';

import List from './List';
import Repo from './Repo';
import User from './User';
import * as ActionTypes from '../constants/actionTypes';
import * as ApiStatusSelectors from '../selectors/apiStatusSelectors';
import * as PaginationSelectors from '../selectors/paginationSelectors';
import * as RouterSelectors from '../selectors/routerSelectors';

const RepoPage = ({
  repo,
  repoFullName,
  stargazers,
  pagination,
  isFetching,
  onLoadMoreClick
}) => !repo ? (
  <h1><i>Loading {repoFullName} details...</i></h1>
) : (
  <div>
    <Repo repo={repo} />
    <hr />
    <List
      renderItem={user => <User key={user.id} user={user} />}
      items={stargazers}
      onLoadMoreClick={onLoadMoreClick}
      loadingLabel={`Loading ${repoFullName} details...`}
      isFetching={isFetching}
      {...pagination}
    />
  </div>
);

const mapStateToProps = state => ({
  repo: RouterSelectors.getRepo(state),
  repoFullName: RouterSelectors.getRepoFullName(state),
  isFetching: ApiStatusSelectors.isFetching(state),
  stargazers: PaginationSelectors.getStargazersUsers(state),
  pagination: PaginationSelectors.getStargazers(state)
});

const mapDispatchToProps = {
  onLoadMoreClick: () => ({ type: ActionTypes.STARGAZERS_FETCH_MORE })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoPage);
