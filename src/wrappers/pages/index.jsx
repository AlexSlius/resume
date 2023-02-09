import { useEffect } from "react";
import { Footer } from "../../components/footer"
import { Header } from "../../components/header"

import { localStorageRemove } from "../../helpers/localStorage";

export const WrapperPage = ({ children }) => {
    useEffect(() => {
        localStorageRemove("idCv");
    }, []);

    return <div className="page">
        <Header />
        <main className="main">
            {children}
        </main>
        <Footer />
    </div>
}