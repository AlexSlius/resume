import api from "../apiSingleton";

import { wrapper } from "../../src/store"
import { setIsAuth } from "../slices/auth";
import { cookieParse } from "../helpers/nookies";
import { isAuthRedirect } from "../helpers/auth";
import { isExist } from '../helpers/checkingStatuses';

export const withPrivateRoute = () => {
    return wrapper.getServerSideProps(store => async (ctx) => {
        try {
            const { pathname, req, res } = ctx;
            const cookis = cookieParse({ ctx });

            if (!!cookis?.token) {

                api.apiClient.setToken(cookis.token);

                const serverRespons = await api.auth.isAutorization({ 'token': cookis.token });
                await store.dispatch(setIsAuth(isExist(serverRespons)));

                if (!isExist(serverRespons)) {
                    isAuthRedirect({ res });
                }
            } else {
                isAuthRedirect({ res });
            }

            return { props: {} };
        } catch (error) {
            console.log("withPrivateRoute: ", error)
            return { props: {} };
        }
    });
};

