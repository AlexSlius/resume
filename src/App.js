import { useEffect } from "react";

import { fetchUserGetAvatar } from "./controllers/users";
import { useWindowSize } from "./hooks/custom-hooks";
import { setAliasScreenResolution } from "./helpers/theme-helpers";

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
            isMenuOpen
        }
    } = store.getState();
    const windowSize = useWindowSize();

    useEffect(() => {
        if (typeof window !== "undefined") {
            setAliasScreenResolution(currentResolution, store);
        }
    }, [windowSize]);

    useEffect(() => {
        if (autorizate?.isAthorized) {
            store.dispatch(fetchUserGetAvatar());
        }
    }, []);

    return (children)
}

export default App;
