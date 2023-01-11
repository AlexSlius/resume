import { ROUTES } from '../constants/routes';
import { makeSlice } from './helpers';

const {actions, reducer} = makeSlice(`${ROUTES['education']}`);

export {
  reducer
}

export const { setEducations, setEducation, updateEducation, deleteEducation} = actions;
