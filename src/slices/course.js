import { ROUTES } from '../constants/routes';
import { makeSlice } from './helpers';

const {actions, reducer} = makeSlice(`${ROUTES['course']}`);

export {
  reducer
}

export const { setCourses, setCourse, updateCourse, deleteCourse} = actions;
