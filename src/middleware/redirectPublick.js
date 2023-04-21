import api from "../apiSingleton";

import { wrapper } from "../../src/store"
import { setIsAuth } from "../slices/auth";
import { cookieParse } from "../helpers/nookies";
// import { isAuthRedirect } from "../helpers/auth";
import { isExist } from '../helpers/checkingStatuses';

import { routersPages } from "../constants/next-routers";

export const withRedirectPublickPage = () => {
    return wrapper.getServerSideProps(store => async (ctx) => {
        try {
            const { pathname, req, res } = ctx;
            const cookis = cookieParse({ ctx });

            if (!!cookis?.token) {
                const serverRespons = await api.auth.isAuthorization({ 'token': cookis.token });
                await store.dispatch(setIsAuth(isExist(serverRespons)));

                if (isExist(serverRespons)) {
                    // isAuthRedirect({ res, page: 'resumeBuilder' });
                    return {
                        redirect: { destination: `/${routersPages['dashboard']}`, permanent: false },
                    }
                }
            }

            return { props: {} };
        } catch (error) {
            console.log("withRedirectRoute: ", error)
            return { props: {} };
        }
    });
};

