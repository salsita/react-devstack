import * as SelectorsInternal from './selectors';
import * as ActionsInternal from './actions';
import takeEveryUniversal from './saga/takeEveryUniversal';
import onEnterRouteUniversal from './saga/onEnterRouteUniversal';

export const Selectors = SelectorsInternal;
export const Actions = ActionsInternal;
export const SagaEffects = {
  takeEveryUniversal,
  onEnterRouteUniversal
};
