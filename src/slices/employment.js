import { ROUTES } from '../constants/routes';
import { makeSlice } from './helpers';

const {actions, reducer} = makeSlice(`${ROUTES['employment']}`);

export {
  reducer
}

export const { setEmployments, setEmployment, updateEmployment, deleteEmployment } = actions;

