import { createAction, createReducer, on, props, Store } from '@ngrx/store';
import { isEqual } from 'lodash';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
/*
  By extending the class ComponentStore<T> in @ngrx/component-store , the
  dispatched actions cannot be viewed in redux devtools by default, so a hack
  were introduced to show dispatched actions in devtools.

  resource: https://github.com/ngrx/platform/issues/2692

*/
export const updateComponentState = createAction(
  '[Component Store] Update Action',
  props<{ componentName: any; componentState: any }>()
);

export const initialState: any = {};

export const componentStateReducer = createReducer(
  initialState,
  on(updateComponentState, (state, { componentName, componentState }) => {
    return { [componentName]: { ...componentState } };
  })
);

export const linkToGlobalState = (
  componentState$: Observable<any>,
  componentName: string,
  globalStore: Store
) => {
  componentState$
    .pipe(distinctUntilChanged((prev, next) => isEqual(prev, next)))
    .subscribe(componentState => {
      globalStore.dispatch(
        updateComponentState({ componentName, componentState })
      );
    });
};
