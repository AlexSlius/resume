import api from "../apiSingleton";

import { wrapper } from "../../src/store"
import { setIsAuth } from "../slices/auth";
import { cookieParse } from "../helpers/nookies";
import { isExist } from '../helpers/checkingStatuses';
import { getAllResumeBuilder } from "../controllers/getAllResumeBuilder";
import { routersPages } from "../constants/next-routers";
import { getResumesTemplates } from "../controllers/resumeData";
import { getCoverTemplates } from "../controllers/cover/coverData";
import { getCoverLetterById } from "../controllers/cover/personalize";

export const withPrivateRoute = ({
    isGetAllBuilder = false,
    isGetResumesTemplates = false,
    isGetCoverTemplates = false,
    isGetFormCover = false,
}) => {
    return wrapper.getServerSideProps(store => async (ctx) => {
        try {
            const cookies = cookieParse({ ctx });

            if (!!cookies?.token) {
                api.apiClient.setToken(cookies.token);

                const serverResponse = await api.auth.isAuthorization({ 'token': cookies.token });
                await store.dispatch(setIsAuth(isExist(serverResponse)));

                if (ctx?.query?.idCv != "new") {
                    if (!!isGetAllBuilder)
                        await getAllResumeBuilder({ dispatch: store.dispatch, idCv: ctx?.query?.idCv });

                    if (!!isGetFormCover) {
                        await store.dispatch(getCoverLetterById(ctx?.query?.idCv));
                    }
                }

                if (!!isGetResumesTemplates)
                    await store.dispatch(getResumesTemplates({ page: 1, category: (ctx?.query?.category === "undefined" || ctx?.query?.category == "all") ? "" : ctx?.query?.category }));

                if (!!isGetCoverTemplates)
                    await store.dispatch(getCoverTemplates({ page: 1, category: (ctx?.query?.category === "undefined" || ctx?.query?.category == "all") ? "" : ctx?.query?.category }));

                if (!isExist(serverResponse)) {
                    return {
                        redirect: { destination: `/${routersPages['login']}`, permanent: false },
                    }
                }
            } else {
                return {
                    redirect: { destination: `/${routersPages['login']}`, permanent: false },
                }
            }

            return { props: {} };
        } catch (error) {
            console.log("withPrivateRoute: ", error)
            return { props: {} };
        }
    });
};

