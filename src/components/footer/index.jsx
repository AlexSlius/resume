import Link from "next/link";
import { useSelector } from 'react-redux'

import { routersPages } from "../../constants/next-routers";

export const Footer = () => {
    const {
        auth: {
            autorizate: {
                isAthorized,
            },
        },
        theme: {
            currentResolution
        }
    } = useSelector((state) => state);

    return (
        <footer className="footer-r">
            <div className="containers">
                <div className="footer-r-top">
                    <Link href="/" className="footer-r-logo">
                        <img loading="lazy" src="/images/page/logo-white.svg" alt="img" />
                    </Link>
                    <nav className="nav">
                        <ul>
                            <li >
                                <Link href={`/`}>Resume</Link>
                            </li>
                            <li>
                                <Link href={`/${routersPages['pageCoverLetter']}`}>Cover Letter</Link>
                            </li>
                            <li><Link href={`/${routersPages['contactUs']}`}>Contact Us</Link></li>
                            {/* <li><Link href="#">Pricing</Link></li> */}
                            <li><Link href={`/${routersPages['faqs']}`}>FAQ</Link></li>
                        </ul>
                    </nav>
                    {/* <Link href="#" className="lang">English</Link> */}
                    {
                        !isAthorized && (
                            <div className="right-info">
                                <>
                                    {
                                        currentResolution !== "xs" && (
                                            <Link href={`/${routersPages['login']}`} className="logins">Login</Link>
                                        )
                                    }
                                    <Link href={`/${routersPages['resumeBuilderNew']}`} className="get-startend btns btn--grey">
                                        <img src="/images/page/get-start.svg" alt="img" />
                                        Get started
                                    </Link>
                                </>
                            </div>
                        )
                    }
                </div>
                <div className="footer-r-bottom">
                    <p className="footer-r-bottom__copy">Copyright © 2022</p>
                    <p className="footer-r-bottom__addres">
                        <Link href={`/${routersPages['termsOfUse']}`}>Terms of service</Link> <Link href={`/${routersPages['privacyPolicy']}`}>Privacy Policy</Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}