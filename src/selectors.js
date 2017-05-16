import { constants } from 'router5';

export const getRouter = state => state.router;

export const getRoute = state => getRouter(state).route;

export const isNotFoundRoute = state => getRoute(state).name === constants.UNKNOWN_ROUTE;
