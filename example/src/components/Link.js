import React from 'react';
import { Link } from 'react-devstack';

const render = (onClick, href, active, props) => active ?
  <span>{props.originalChildren}</span> :
  <a href={href} onClick={onClick}>{props.originalChildren}</a>;

export default props => <Link {...props} originalChildren={props.children}>{render}</Link>;
