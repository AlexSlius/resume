import { useEffect } from "react";

import { useWindowSize } from "./hooks/custom-hooks";
import { setAliasScreenResolution } from "./helpers/theme-helpers";
import { fetchUserGetAvatar, fetchUserGetProfile, getUserDataSettings } from "./controllers/users";

const App = ({
    children,
    store,
}) => {
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
        store.dispatch(fetchUserGetAvatar());
    }, []);

    return (children)
}

export default App;
