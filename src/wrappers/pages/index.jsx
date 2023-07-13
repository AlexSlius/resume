import { useRouter } from "next/router";

import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { routersPages } from "../../constants/next-routers";

export const WrapperPage = ({ children }) => {
    const router = useRouter();
    const isHome = router.asPath == "/";
    const isCover = router.pathname == `/${routersPages['pageCoverLetter']}`;

    return (
        <div className={`page renewal ${isHome ? "home" : ''} ${isCover ? "coverPage" : ''}`}>
            <Header isHome={isHome} isCoverPage={isCover} isContentpage={true} />
            <main className="main">
                {children}
            </main>
            <Footer />
        </div>
    )
}