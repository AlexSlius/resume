import { ROUTES } from '../constants/routes';
import { makeSlice } from './helpers';

const {actions, reducer} = makeSlice(`${ROUTES['intership']}`);

export {
  reducer
}

export const { setInterships, setIntership, updateIntership, deleteIntership} = actions;
