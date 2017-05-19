# react-devstack

> An ultimate opinionated universal React devstack. Don't hassle with project build and other stuff, just do what matters: start developing your application, right now!

## Getting started

In order to get started as easily as possible, we have prepared CLI utility to make app bootstrapping a breeze.

1. Install `react-devstack-cli` globally using: `npm install react-devstack-cli -g`
2. Create an empty React project using the CLI (it's called `rdc`): `rdc create project-name`
3. After generating the project, CLI will guide you, however in case you wondered just: `cd project-name`
4. And start the app using `npm run dev`

It will automatically open your browser upon compilation.

Enjoy all the hot-reloading, server side rendering etc. :-)

## State management (using [redux](http://redux.js.org/))

`react-devstack` is packed with Redux for dealing with state. Redux provides single store instance which holds all the state information in one place. Start using `redux` is as simple as creating root [reducer](http://redux.js.org/docs/basics/Reducers.html) in `src/reducers/rootReducer.js`.

```javascript
export default (state = 0, { type }) {
  switch (type) {
    case 'Increment':
      return state + 1;
    default:
      return state;
  }
}
```

And then just simply [`connect`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) any component you need. For instance, you can `connect` the `Root`. State corresponding with the `rootReducer.js` is actually nested under key `root` in global application state passed to connect. Therefore you can either access the field directly using `root` key, or use `getRootState` selector from `react-devstack`.

```javascript
import React from 'react';
import { connect } from 'react-redux';
import { Selectors } from 'react-devstack';

import logo from '../assets/salsita-logo.svg';

const mapStateToProps = state => ({
  clicked: state.root // Or simply use Selectors.getRootState(state)
});

const mapDispatchToProps = dispatch => ({
  increment: () => ({ type: 'Increment' })
})

export default connect(mapStateToProps, mapDispatchToProps)(({ clicked, increment }) => (
  <div>
    <h1>Hello from react-devstack!</h1>
    <img src={logo} width={200} />
    <button onClick={increment}>Button clicked {clicked} times</button>
  </div>
));
```

`react-devstack-cli` offers easy way to create root reducer for you. Just use `rdc add redux` in your project.

## Routing (using [router5](http://router5.github.io/))

Fundamental part of every real application is routing. `react-devstack` utilizes `router5` as underlying routing library and it's automatically synchronized with `redux`. Adding routing to your project involves creating [routing schema file](http://router5.github.io/docs/configuring-routes.html) as defined by `router5`. Just create a file named `src/routing/routes.js` and export list of routes:

```javascript
export default [{
  name: 'index',
  path: '/'
}, {
  name: 'cats',
  path: '/cats'
}];
```

Now, whenever in your code, you can just use `Selectors.getRoute` which returns active route object. The object contains field `name` so that you can conditionally check in any component.

```javascript
import { Selectors } from 'react-devstack';

const Root = ({
  isRouteFound,
  activeRoute
}) => (
  <div>
    {isRouteFound && (
      <div>
        {activeRoute.name === 'cats' && <Cats />}
        {activeRoute.name === 'index' && <Index />}
      </div>
    )}
    {!isRouteFound && <div>404</div>}
  </div>
);

const mapStateToProps = state => ({
  isRouteFound: !Selectors.isNotFoundRoute(state),
  activeRoute: Selectors.getRoute(state)
});

export default connect(
  mapStateToProps
)(Root);
```

`react-devstack-cli` offers easy way to create routing file for you. Just use `rdc add routing` in your project.

### Links

`react-devstack` exposes `Link` component. You need to provide route name as the only required property. Child of the component should be a function returning markup. This function is called with three important arguments: `onClick`, `href`, `active` and `props` originally passed to the component, so that you can define your own markup.

```javascript
import { Link } from 'react-devstack';

const Root = () => (
  <div>
    <Link name="cats">{(onClick, href, active) => active ? <span>Cats</span> : <a href={href} onClick={onClick}>Cats</a>}</Link>
  </div>
);

export default Root;
```

However, it's better to create re-usable component which could look as follows:

```javascript
import React from 'react';
import { Link } from 'react-devstack';

// It's better to have this function stored so that
// it's not being re-created with each render
// unlike anonymous function
const render = (onClick, href, active, props) => active ?
  <span>{props.originalChildren}</span> :
  <a href={href} onClick={onClick}>{props.originalChildren}</a>;

const MyApplicationLink = (props) => <Link {...props} originalChildren={props.children}>{render}</Link>;
```

Now it can be used like a simple component:

```javascript
const Root = () => (
  <div>
    <MyApplicationLink name="cats">Cats</MyApplicationLink>
  </div>
);

export default Root;
```

## Data fetching (using redux-saga)

## Custom HTML template (using react-helmet)

## DevTools (using redux-devtools-extension)
