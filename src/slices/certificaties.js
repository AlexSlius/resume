import { ROUTES } from '../constants/routes';
import { makeSlice } from './helpers';

const {actions, reducer} = makeSlice(`${ROUTES['certificaties']}`);

export {
  reducer
}

export const { setCertificatiess, setCertificaties, updateCertificaties, deleteCertificaties} = actions;
