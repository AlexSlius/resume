import { useEffect } from "react";
import { Footer } from "../../components/footer"
import { Header } from "../../components/header"

import { cleanSliseNew } from "../../slices/contact";
import { useDispatch } from "react-redux";

export const WrapperPage = ({ children }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(cleanSliseNew());
    }, []);

    return <div className="page">
        <Header />
        <main className="main">
            {children}
        </main>
        <Footer />
    </div>
}