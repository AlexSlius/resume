import { ROUTES } from '../constants/routes';
import { makeSlice } from './helpers';

const {actions, reducer} = makeSlice(`${ROUTES['languages']}`);

export {
  reducer
}

export const { setLanguagess, setLanguages, updateLanguages, deleteLanguages} = actions;
