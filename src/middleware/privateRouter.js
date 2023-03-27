import api from "../apiSingleton";

import { wrapper } from "../../src/store"
import { setIsAuth } from "../slices/auth";
import { cookieParse } from "../helpers/nookies";
import { isExist } from '../helpers/checkingStatuses';
import { getAllResumeBuilder } from "../controllers/getAllResumeBuilder";
import { routersPages } from "../constants/next-routers";
import { getResumesTemplates } from "../controllers/resumeData";

export const withPrivateRoute = ({ isGetAllBuilder = false, isGetResumesTemplates = false }) => {
    return wrapper.getServerSideProps(store => async (ctx) => {
        try {
            const cookies = cookieParse({ ctx });

            if (!!cookies?.token) {
                api.apiClient.setToken(cookies.token);

                const serverResponse = await api.auth.isAuthorization({ 'token': cookies.token });
                await store.dispatch(setIsAuth(isExist(serverResponse)));

                if (!!isGetAllBuilder)
                    await getAllResumeBuilder({ dispatch: store.dispatch, idCv: ctx?.query?.idCv });

                if (!!isGetResumesTemplates)
                    await getResumesTemplates();

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

