import { ROUTES } from '../constants/routes';
import { makeSlice } from './helpers';

const {actions, reducer} = makeSlice(`${ROUTES['hobies']}`);

export {
  reducer
}

export const { setHobiess, setHobies, updateHobies, deleteHobies} = actions;
