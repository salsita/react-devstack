import React from 'react';
import { connect } from 'react-redux';

import { getError } from '../selectors/apiStatusSelectors';
import { DISMISS_ERROR_MESSAGE } from '../constants/actionTypes';

const ErrorMessage = ({ error, onDismiss }) => error && (
  <p style={{ backgroundColor: '#e99', padding: 10 }}>
    <b>{error}</b>
    {' '}
    <a onClick={onDismiss}>
      Dismiss
    </a>
  </p>
);

const mapStateToProps = state => ({
  error: getError(state)
});

const mapDispatchToProps = {
  onDismiss: () => ({ type: DISMISS_ERROR_MESSAGE })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorMessage);
