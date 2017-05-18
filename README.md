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

## State management (using Redux)

`react-devstack` is packed with [`redux`](http://redux.js.org/) for dealing with state. Redux provides single store instance which holds all the state information in one place.

## Routing (using router5)

## Data fetching (using redux-saga)

## Custom HTML template (using react-helmet)

## DevTools (using redux-devtools-extension)
