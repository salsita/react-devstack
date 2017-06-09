import React from 'react';
import PropTypes from 'prop-types';

import Link from './Link';
import * as Routes from '../constants/routes';

const Repo = ({ repo }) => {
  const { name, description, owner: { login } } = repo;

  return (
    <div className="Repo">
      <h3>
        <Link name={Routes.REPO} params={{ repo: name, username: login }}>
          {name}
        </Link>
        {' by '}
        <Link name={Routes.USER} params={{ username: login }}>
          {login}
        </Link>
      </h3>
      {description &&
        <p>{description}</p>
      }
    </div>
  );
};

Repo.propTypes = {
  repo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    owner: PropTypes.shape({
      login: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Repo;
