import { useEffect } from "react";

import { fetchUserGetAvatar } from "./controllers/users";
import { localStorageRemove } from "./helpers/localStorage";

// import { setAliasScreenResolution } from "./utils/theme/themeHelper";
// import { setMobileDetect } from "./utils/theme/themeMobileDetect";
// import { useWindowSize } from "./useHooks/customHookWindow";
// import { themeSetIsHomePage } from "./redux/actions/theme";

const App = ({
    children,
    store,
}) => {
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
        if (autorizate?.isAthorized) {
            store.dispatch(fetchUserGetAvatar());
        } else {
            localStorageRemove('idCv')
        }
    }, []);

    return (children)
}

export default App;
