import api from "../apiSingleton";

import { wrapper } from "../store"
import { setIsAuth } from "../slices/auth";
import { cookieParse } from "../helpers/nookies";
import { isExist } from '../helpers/checkingStatuses';
import { getAllResumeBuilder } from "../controllers/getAllResumeBuilder";
import { getResumesTemplates } from "../controllers/resumeData";

export const withPublicRoute = ({ isGetAllBuilder = false, isGetResumesTemplates = false }) => {
    return wrapper.getServerSideProps(store => async (ctx) => {
        try {
            const cookis = cookieParse({ ctx });

            if (!!cookis?.token) {
                api.apiClient.setToken(cookis.token);
                const serverRespons = await api.auth.isAuthorization({ 'token': cookis.token });
                store.dispatch(setIsAuth(isExist(serverRespons)));
            }

            if (!!isGetAllBuilder)
                await getAllResumeBuilder({ dispatch: store.dispatch, idCv: ctx?.query?.idCv });

            if (!!isGetResumesTemplates)
                await store.dispatch(getResumesTemplates());

            return { props: {} };
        } catch (error) {
            console.log("withPrivateRoute: ", error)
            return { props: {} };
        }
    });
};

