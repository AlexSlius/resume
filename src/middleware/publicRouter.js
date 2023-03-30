import api from "../apiSingleton";

import { wrapper } from "../store"
import { setIsAuth } from "../slices/auth";
import { cookieParse } from "../helpers/nookies";
import { isExist } from '../helpers/checkingStatuses';
import { getAllResumeBuilder } from "../controllers/getAllResumeBuilder";
import { getResumesTemplates } from "../controllers/resumeData";
import { getCoverTemplates } from "../controllers/cover/coverData";

export const withPublicRoute = ({
    isGetAllBuilder = false,
    isGetResumesTemplates = false,
    isGetCoverTemplates = false
}) => {
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
                await store.dispatch(getResumesTemplates({ page: 1, category: (ctx?.query?.category === "undefined" || ctx?.query?.category == "all") ? "" : ctx?.query?.category }));

            if (!!isGetCoverTemplates)
                await store.dispatch(getCoverTemplates({ page: 1, category: (ctx?.query?.category === "undefined" || ctx?.query?.category == "all") ? "" : ctx?.query?.category }));

            return { props: {} };
        } catch (error) {
            console.log("withPrivateRoute: ", error)
            return { props: {} };
        }
    });
};

