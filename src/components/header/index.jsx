import Link from "next/link";

import { routersPages } from "../../constants/next-routers";

export const Header = () => {
    return (
        <header className="header-r">
            <div className="containers">
                <Link href="/" className="logo">
                    <img loading="lazy" src="/images/page/logo.svg" alt="img" />
                </Link>
                <nav className="nav">
                    <ul>
                        <li className="submenu-item">
                            <Link href="#">Resume</Link>
                            <ul className="submenu">
                                <li>
                                    <Link href="#">Resume1</Link>
                                </li>
                                <li>
                                    <Link href="#">Resume2</Link>
                                </li>
                                <li>
                                    <Link href="#">Resume3</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="submenu-item">
                            <Link href="#">Cover Letter</Link>
                            <ul className="submenu">
                                <li>
                                    <Link href="#">Cover Letter1</Link>
                                </li>
                                <li>
                                    <Link href="#">Cover Letter2</Link>
                                </li>
                                <li>
                                    <Link href="#">Cover Letter3</Link>
                                </li>
                            </ul>
                        </li>
                        <li><Link href={`${routersPages['contactUs']}`}>Contact Us</Link></li>
                        <li><Link href="#">Pricing</Link></li>
                        <li><Link href={`${routersPages['faqs']}`}>FAQ</Link></li>
                    </ul>
                </nav>
                <div className="right-info">
                    <Link href="#" className="lang">En</Link>
                    <Link href={`${routersPages['login']}`} className="logins">Login</Link>
                    <Link href={`${routersPages['resumeBuilder']}`} className="get-startend btns btn--grey">
                        <img src="/images/page/get-start.svg" alt="img" />
                        <span>Get started</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}