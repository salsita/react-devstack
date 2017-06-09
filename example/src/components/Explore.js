import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as ActionTypes from '../constants/actionTypes';
import { getValue } from '../selectors/exploreSelectors';

const Explore = ({ value, onChangeField, onSubmit }) => (
  <div>
    <p>Type a username or repo full name and hit &apos;Go&apos;:</p>
    <form onSubmit={onSubmit}>
      <input
        size="45"
        value={value}
        onChange={onChangeField}
      />
      <button type="submit">Go!</button>
    </form>
  </div>
);

Explore.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeField: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  value: getValue(state)
});

const mapDispatchToProps = {
  onChangeField: ev => ({ type: ActionTypes.EXPLORE_CHANGE_FIELD, payload: ev.target.value }),
  onSubmit: (ev) => {
    ev.preventDefault();
    return { type: ActionTypes.EXPLORE_SUBMIT };
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore);

