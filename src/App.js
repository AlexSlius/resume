// import { useRouter } from "next/router";
// import { useEffect } from "react";

// import { setAliasScreenResolution } from "./utils/theme/themeHelper";
// import { setMobileDetect } from "./utils/theme/themeMobileDetect";
// import { useWindowSize } from "./useHooks/customHookWindow";
// import { themeSetIsHomePage } from "./redux/actions/theme";

const App = ({
    children,
}) => {
    // const windowSize = useWindowSize();
    // const router = useRouter();

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

    return (children)
}

export default App;
