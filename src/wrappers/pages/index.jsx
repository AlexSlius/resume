import { Footer } from "../../components/footer"
import { Header } from "../../components/header"

export const WrapperPage = ({ children }) => {
    return <div className="page">
        <Header />
        <main className="main">
            {children}
        </main>
        <Footer />
    </div>
}