import React from 'react';
import { connect } from 'react-redux';

import List from './List';
import Repo from './Repo';
import User from './User';
import * as ActionTypes from '../constants/actionTypes';
import * as ApiStatusSelectors from '../selectors/apiStatusSelectors';
import * as PaginationSelectors from '../selectors/paginationSelectors';
import * as RouterSelectors from '../selectors/routerSelectors';

const UserPage = ({
  user,
  username,
  starredRepos,
  pagination,
  isFetching,
  onLoadMoreClick
}) => !user ? (
  <h1><i>Loading {username}&apos;s profile...</i></h1>
) : (
  <div>
    <User user={user} />
    <hr />
    <List
      renderItem={repo => <Repo key={repo.fullName} repo={repo} />}
      items={starredRepos}
      onLoadMoreClick={onLoadMoreClick}
      loadingLabel={`Loading ${username}'s starred...`}
      isFetching={isFetching}
      {...pagination}
    />
  </div>
);

const mapStateToProps = state => ({
  user: RouterSelectors.getUser(state),
  username: RouterSelectors.getUsername(state),
  isFetching: ApiStatusSelectors.isFetching(state),
  starredRepos: PaginationSelectors.getStarredReposByUserRepos(state),
  pagination: PaginationSelectors.getStarredReposByUser(state)
});

const mapDispatchToProps = {
  onLoadMoreClick: () => ({ type: ActionTypes.STARRED_FETCH_MORE })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
