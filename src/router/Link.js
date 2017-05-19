import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { navigateTo } from '../actions';

export default class Link extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
    params: PropTypes.object,
    options: PropTypes.object
  };

  onClick = (event) => {
    if (!event.button && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
      const {
        name,
        params,
        options
      } = this.props;

      event.preventDefault();
      this.context.router.navigate(name, params, options);
    }
  }

  render() {
    const {
      name,
      params
    } = this.props;
    const { router } = this.context;
    const active = router.isActive(name, params);
    const href = router.buildPath(name, params);

    return this.props.children(this.onClick, href, active, this.props);
  }
}
