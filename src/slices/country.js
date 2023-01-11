import { makeSlice } from './helpers';

const {actions, reducer} = makeSlice(`country`);

export {
  reducer
}

export const { setCountrys, setCountry, updateCountry, deleteCountry} = actions;
