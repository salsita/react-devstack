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

It's highly recommended to read through router5 [documentation](http://router5.github.io/docs/why-router5.html).

## Data fetching (using [redux-saga](https://redux-saga.js.org/))

Generally `react-devstack` utilizes `redux-saga` to deal with side effects. You don't need to install nor setup anything. Everything is already plugged in and it's up to you to just create `src/sagas/rootSaga.js` and export generator function which will act as your root saga.

You can also use `react-devstack-cli` to create the file by calling `rdc add saga`.

It's possible to use `redux-saga` exactly the way it's proposed in the documentation, for example you can fetch user from the server as easily as:

```javascript
import { takeEvery, put, call } from 'redux-saga/effects';

const fetchUser = fetch('/user').then(result => result.json());

export default function*() {
  yield takeEvery('FetchUser', function*() {
    try {
      const user = yield call(fetchUser);
      yield put({ type: 'UserFetched', payload: user });
    } catch (ex) {
      console.error(ex);
      yield put({ type: 'UserFetchingFailed' });
    }
  });
}
```

However, this would not work because `react-devstack` waits until all the tasks in sagas are resolved before sending response from the server and since `takeEvery` waits indefinitely it would just hang. Therefore we have wrapped simple concept for server-side-rendering as proposed in (redux-saga docs) and very trivial implementation of `takeEveryUniversal` saga is exposed.

```javascript
import { put, call } from 'redux-saga/effects';
import { SagaEffects } from 'react-devstack';

const fetchUser = fetch('/user').then(result => result.json());

export default function*() {
  yield SagaEffects.takeEveryUniversal('FetchUser', function*() {
    try {
      const user = yield call(fetchUser);
      yield put({ type: 'UserFetched', payload: user });
    } catch (ex) {
      console.error(ex);
      yield put({ type: 'UserFetchingFailed' });
    }
  });
}
```

So just swapping `takeEvery` with `SagaEffects.takeEveryUniversal` from `react-devstack` will do the trick.

### Route based data fetching

Typical use case for any web application is fetch some data based on active route. It's very simple with `react-devstack` because `onEnterRouteUniversal` saga is exposed.

```javascript
import { call, fork, put } from 'redux-saga/effects';
import { SagaEffects } from 'react-devstack';

const fetchGif = topic => fetch(`http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${topic}`)
  .then(response => response.json());

export default function* () {
  yield fork(SagaEffects.onEnterRouteUniversal, 'cats', function*() {
    const data = yield call(fetchGif, 'funny cats');
    yield put({ type: 'CatsFetched', payload: data.data.image_url });
  });
}
```

Now, whenever user enters `/cats` route, it will automatically fetch random gif. This is of course happens on the server when user opens the app from `/cats` url, and the request is sent just once (on the server), once it loads on the client, the request is not sent again, they would need to click on different link and get back to `/cats` again to re-trigger API call.

## Custom HTML template (using react-helmet)

## DevTools (using redux-devtools-extension)
