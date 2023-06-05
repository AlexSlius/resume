import { useEffect } from "react";

import { useWindowSize } from "./hooks/custom-hooks";
import { setAliasScreenResolution } from "./helpers/theme-helpers";
import { fetchUserGetAvatar, fetchUserGetProfile } from "./controllers/users";

const App = ({
    children,
    store,
}) => {
    const {
        auth: {
            autorizate
        },
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
        store.dispatch(fetchUserGetAvatar());
        store.dispatch(fetchUserGetProfile());
    }, []);

    return (children)
}

export default App;
