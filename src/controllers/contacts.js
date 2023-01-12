import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from "next/router";

import api from "../apiSingleton";
import { isSuccessNewContact } from '../helpers/checkingStatuses';
import { localStorageSet } from "../helpers/localStorage"
import { routersPages } from '../constants/next-routers';

export const contactSetNew = createAsyncThunk('fetch/setNewContact', async (dataImage, thunkAPI) => {
    const { contacts: { contactObj } } = thunkAPI.getState()

    const newObj = {
        date_of_birth: contactObj.dateOfBirth,
        driver_license: contactObj.driverLicense?.category || '',
        zip_code: contactObj.zipCode,
        city: contactObj.city?.name || '',
        phone: contactObj.phone,
        place_of_birth: contactObj.placeOfBirth,
        last_name: contactObj.lastName,
        address: contactObj.address,
        country: contactObj.country?.name || '',
        first_name: contactObj.firstName,
        nationality: contactObj.nationality?.name || '',
        email: contactObj.email,
        picture: dataImage
    }

    const response = await api.contact.setBaseInfo(newObj);

    if (isSuccessNewContact(response)) {
        localStorageSet("session_id", response.session_id);
        Router.push(`/${routersPages['login']}`);
    }

    return response;
})