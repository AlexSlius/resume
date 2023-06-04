import { useEffect } from "react";

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
        }
    } = store.getState();
    const windowSize = useWindowSize();

    useEffect(() => {
        if (typeof window !== "undefined") {
            setAliasScreenResolution(currentResolution, store);
        }
    }, [windowSize]);

    return (children)
}

export default App;
