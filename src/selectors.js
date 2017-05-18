import { constants } from 'router5';

export const getRootState = state => state.root;
export const getRouter = state => state.router;
export const getRoute = state => getRouter(state).route;
export const isNotFoundRoute = state => getRoute(state).name === constants.UNKNOWN_ROUTE;
