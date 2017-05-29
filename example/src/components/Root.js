import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Selectors } from 'react-devstack';

import * as Routes from '../constants/routes';

import ErrorMessage from './ErrorMessage';
import Explore from './Explore';
import RepoPage from './RepoPage';
import UserPage from './UserPage';

import favicon from '../assets/favicon.ico';

const Root = ({ currentRoute: { name } }) => (
  <div>
    <Helmet>
      <title>react-devstack real world example</title>
      <link rel="icon" type="image/x-icon" href={favicon} />
    </Helmet>
    <Explore />
    <hr />
    <ErrorMessage />
    {name === Routes.USER && <UserPage />}
    {name === Routes.REPO && <RepoPage />}
  </div>
);

const mapStateToProps = state => ({
  currentRoute: Selectors.getRoute(state)
});

export default connect(
  mapStateToProps
)(Root);
