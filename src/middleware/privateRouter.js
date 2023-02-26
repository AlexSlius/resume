import api from "../apiSingleton";

import { wrapper } from "../../src/store"
import { setIsAuth } from "../slices/auth";
import { cookieParse } from "../helpers/nookies";
import { isExist } from '../helpers/checkingStatuses';
import { getAllResumeBuildre } from "../controllers/getAllResumeBuilder";
import { routersPages } from "../constants/next-routers";
import { getResumesTemplates } from "../controllers/resumeData";

export const withPrivateRoute = ({ isGetAllBuilder = false, isGetResumesTempaltes = false }) => {
    return wrapper.getServerSideProps(store => async (ctx) => {
        try {
            const cookis = cookieParse({ ctx });

            if (!!cookis?.token) {
                api.apiClient.setToken(cookis.token);

                const serverRespons = await api.auth.isAutorization({ 'token': cookis.token });
                await store.dispatch(setIsAuth(isExist(serverRespons)));

                if (!!isGetAllBuilder)
                    await getAllResumeBuildre({ dispatch: store.dispatch, idCv: ctx?.query?.idCv });

                if (!!isGetResumesTempaltes)
                    await getResumesTemplates();

                if (!isExist(serverRespons)) {
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

