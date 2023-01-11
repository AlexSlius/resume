import { ROUTES } from '../constants/routes';
import { makeSlice } from './helpers';

const {actions, reducer} = makeSlice(`${ROUTES['activity']}`);

export {
  reducer
}

export const { setActivitys, setActivity, updateActivity, deleteActivity} = actions;
