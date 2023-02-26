import api from "../apiSingleton";

import { wrapper } from "../../src/store"
import { setIsAuth } from "../slices/auth";
import { cookieParse } from "../helpers/nookies";
import { isExist } from '../helpers/checkingStatuses';
import { getAllResumeBuildre } from "../controllers/getAllResumeBuilder";
import { getResumesTemplates } from "../controllers/resumeData";

export const withPublickRoute = ({ isGetAllBuilder = false, isGetResumesTempaltes = false }) => {
    return wrapper.getServerSideProps(store => async (ctx) => {
        try {
            const cookis = cookieParse({ ctx });

            if (!!cookis?.token) {
                api.apiClient.setToken(cookis.token);
                const serverRespons = await api.auth.isAutorization({ 'token': cookis.token });
                store.dispatch(setIsAuth(isExist(serverRespons)));
            }

            if (!!isGetAllBuilder)
                await getAllResumeBuildre({ dispatch: store.dispatch, idCv: ctx?.query?.idCv });

            if (!!isGetResumesTempaltes)
                await store.dispatch(getResumesTemplates());

            return { props: {} };
        } catch (error) {
            console.log("withPrivateRoute: ", error)
            return { props: {} };
        }
    });
};

