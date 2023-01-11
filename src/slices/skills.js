import { ROUTES } from '../constants/routes';
import { makeSlice } from './helpers';

const { actions, reducer } = makeSlice(`${ROUTES['skills']}`);

export {
  reducer
}

export const { setSkillss, setSkills, updateSkills, deleteSkills} = actions;
