import { ROUTES } from '../constants/routes';
import { makeSlice } from './helpers';

const { actions, reducer } = makeSlice(`${ROUTES['socials']}`);

export {
  reducer
}

export const { setSocialss, setSocials, updateSocials, deleteSocials} = actions;
