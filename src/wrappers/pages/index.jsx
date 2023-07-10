import { useRouter } from "next/router";

import { Footer } from "../../components/footer";
import { Header } from "../../components/header";

export const WrapperPage = ({ children }) => {
    const router = useRouter();
    const isHome = router.asPath == "/";

    return (
        <div className={`page renewal ${isHome ? "home" : ''}`}>
            <Header isHome={isHome} isContentpage={true}/>
            <main className="main">
                {children}
            </main>
            <Footer />
        </div>
    )
}