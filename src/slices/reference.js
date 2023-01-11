import { ROUTES } from '../constants/routes';
import { makeSlice } from './helpers';

const {actions, reducer} = makeSlice(`${ROUTES['reference']}`);

export {
  reducer
}

export const { setReferences, setReference, updateReference, deleteReference} = actions;
