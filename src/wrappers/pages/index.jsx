import { useRouter } from "next/router";

import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { routersPages } from "../../constants/next-routers";

export const WrapperPage = ({ children }) => {
    const router = useRouter();
    const isHome = router.asPath == "/";
    const isCover = router.pathname == `/${routersPages['pageCoverLetter']}`;
    const isLanding = (router.asPath == "/" || router.asPath.includes(routersPages['pageCoverLetter']));

    return (
        <div className={`page renewal ${isHome ? "home" : ''} ${isCover ? "coverPage" : ''} ${isLanding ? "landing" : ""}`}>
            <Header isHome={isHome} isCoverPage={isCover} isContentpage={true} isLanding={isLanding} />
            <main className="main">
                {children}
            </main>
            <Footer />
        </div>
    )
}