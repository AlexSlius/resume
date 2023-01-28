import { useRouter } from "next/router";
import { useEffect } from "react";
import React from "react";
import { getAllResumeBuildre } from "./controllers/getAllResumeBuilder";
import { fetchUserGetAvatar } from "./controllers/users";

import { localStorageGet } from "./helpers/localStorage";

import { routersPages } from "./constants/next-routers";

// import { setAliasScreenResolution } from "./utils/theme/themeHelper";
// import { setMobileDetect } from "./utils/theme/themeMobileDetect";
// import { useWindowSize } from "./useHooks/customHookWindow";
// import { themeSetIsHomePage } from "./redux/actions/theme";

const App = ({
    children,
    store,
}) => {
    const useStatusGet = React.useRef(true);
    const idCv = localStorageGet('idCv');
    const router = useRouter();
    const {
        auth: {
            autorizate
        }
    } = store.getState();
    // const windowSize = useWindowSize();

    // const { theme } = state;

    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         setAliasScreenResolution(theme?.currentResolution, dispatch);
    //         setMobileDetect(dispatch);
    //     }
    // }, [windowSize]);

    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         dispatch(themeSetIsHomePage(router.asPath.split("/").length <= 2));
    //     }
    // }, []);

    useEffect(() => {
        if (router.asPath.includes(routersPages['resumeBuilder'])) {
            if (!!idCv) {
                if (useStatusGet.current) {
                    getAllResumeBuildre({ store, idCv });
                    useStatusGet.current = false;
                }
            }
        }
    }, [router.asPath]);

    useEffect(() => {
        if (autorizate?.isAthorized)
            store.dispatch(fetchUserGetAvatar());
    }, []);

    return (children)
}

export default App;
