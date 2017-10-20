import { removeRefValues } from './remove-values';

import { searchFactory } from 'components/math-component/models';

import {
  selectMathKeys,
  selectMathKey,
  selectById
} from 'components/math-component/models';

import { enableLazyMode } from 'components/math-component/actions';

export const updateMathCreator = ({
  removeRefValues,

  selectMathKeys,
  selectMathKey,
  selectById,
  searchFactory,

  enableLazyMode
}) => ({ selector }) => pointFree => (dispatch, getState) => {
  const { selectedItem, increasedIndex } = pointFree;

  let state = getState();
  let component = selector(state);

  removeRefValues(selectMathKey(component, increasedIndex).coordinate)(dispatch, getState);

  // update state
  state = getState();
  component = selector(state);

  const currentMathValues = selectMathKeys(component);
  const currentMathValue = selectMathKey(component, increasedIndex);

  const newId = selectById(component, selectedItem.value);

  const newMathValue = searchFactory.createMathDescription(
    currentMathValue,
    newId
  );

  const newDistanceValues = [...currentMathValues];
  newDistanceValues[increasedIndex] = newMathValue;

  dispatch({
    ...component,
    coordinates: {
      ...component.coordinates,
      flatearth: {
        ...component.coordinates.flatearth,
        distanceValues: newDistanceValues
      }
    }
  });

  dispatch(
    enableLazyMode()
  );
};

export const updateMath = updateMathCreator({
  removeRefValues,

  selectMathKeys,
  selectMathKey,
  selectById,
  searchFactory,

  enableLazyMode
});
