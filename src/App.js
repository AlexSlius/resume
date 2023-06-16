import { useEffect } from "react";
import { useRouter } from "next/router";

import { useWindowSize } from "./hooks/custom-hooks";
import { setAliasScreenResolution } from "./helpers/theme-helpers";
import { fetchUserGetAvatar, fetchUserGetProfile, getUserDataSettings } from "./controllers/users";

const App = ({
    children,
    store,
}) => {
    const router = useRouter();

    const {
        theme: {
            currentResolution,
        }
    } = store.getState();
    const windowSize = useWindowSize();

    useEffect(() => {
        if (typeof window !== "undefined") {
            setAliasScreenResolution(currentResolution, store);
        }
    }, [windowSize]);

    useEffect(() => {
        store.dispatch(fetchUserGetProfile());
        store.dispatch(getUserDataSettings());
    }, []);

    useEffect(() => {
        store.dispatch(fetchUserGetAvatar());
    }, [router.asPath]);

    return (children)
}

export default App;
