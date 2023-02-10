import Link from "next/link";
import { useSelector } from 'react-redux'

import { routersPages } from "../../constants/next-routers";

export const Footer = () => {
    const {
        auth: {
            autorizate: {
                isAthorized,
            }
        },
    } = useSelector((state) => state);

    return (
        <footer className="footer-r">
            <div className="containers">
                <div className="footer-r-top">
                    <Link href="/" className="footer-r-logo">
                        <img loading="lazy" src="/images/page/logo-footer.svg" alt="img" />
                    </Link>
                    <nav className="nav">
                        <ul>
                            {/* className="submenu-item" */}
                            <li >
                                <Link href="#">Resume</Link>
                                {/* <ul className="submenu">

                                </ul> */}
                            </li>
                            {/* className="submenu-item" */}
                            <li>
                                <Link href="#">Cover Letter</Link>
                                {/* <ul className="submenu">
                                    <li>
                                        <Link href="#">Cover Letter1</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Cover Letter2</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Cover Letter3</Link>
                                    </li>
                                </ul> */}
                            </li>
                            <li><Link href={`${routersPages['contactUs']}`}>Contact Us</Link></li>
                            {/* <li><Link href="#">Pricing</Link></li> */}
                            <li><Link href={`${routersPages['faqs']}`}>FAQ</Link></li>
                        </ul>
                    </nav>
                    <div className="right-info">
                        {/* <Link href="#" className="lang">English</Link> */}
                        {
                            !isAthorized && (
                                <>
                                    <Link href={`${routersPages['login']}`} className="logins">Login</Link>
                                    <Link href={`${routersPages['resumeBuilder']}`} className="get-startend btns btn--grey">
                                        <img src="/images/page/get-start.svg" alt="img" />
                                        Get started
                                    </Link>
                                </>
                            )
                        }
                    </div>
                </div>
                <div className="footer-r-bottom">
                    <p>Copyright © 2022</p>
                    <p>Adress: 32 Merrion Street Upper, Dublin 2, D02 KW80, Ireland</p>
                </div>
            </div>
        </footer>
    )
}