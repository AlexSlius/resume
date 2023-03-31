import Link from "next/link";
import { useSelector } from 'react-redux'

import Icon from "../Icon";
import { routersPages } from "../../constants/next-routers";
import HeadUser from "../headUser/HeadUser";
import { ButtonBack } from "../uis/buttonBack"

import iconCreative from "/public/images/icons/icon_creav.svg?sprite";
import iconProfesional from "/public/images/icons/briefcase-account.svg?sprite";
import iconSimple from "/public/images/icons/creation_simpla.svg?sprite";
import iconModern from "/public/images/icons/pencil-ruler.svg?sprite";
import iconBurger from "/public/images/icons/menu-burger.svg?sprite";

export const Header = () => {
    const {
        auth: {
            autorizate: {
                isAthorized,
            }
        },
        theme: {
            currentResolution
        }
    } = useSelector((state) => state);

    return (
        <header className="header-r">
            <div className="containers">
                {
                    ['md', 'sm', 'xs'].includes(currentResolution) ? (
                        <div className="head-mob">
                            <div className="head-mob__back">
                                <ButtonBack text="" />
                            </div>
                            <Link href="/" className="logo">
                                <img loading="lazy" src="/images/page/logo.svg" alt="logo" />
                            </Link>
                            <div className="wr-burger">
                                <button className="btn-burger">
                                    <Icon svg={iconBurger} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link href="/" className="logo">
                                <img loading="lazy" src="/images/page/logo.svg" alt="img" />
                            </Link>
                            <nav className="nav">
                                <ul>
                                    <li className="submenu-item">
                                        <Link href="/" onClick={(e) => e.preventDefault()}>Resume</Link>
                                        <div className="submenu">
                                            <div className="submenu__top">
                                                <div className="submenu__title">Resume Templates</div>
                                                <div className="submenu__r">
                                                    <Link href={routersPages['jobWinningResumeTemplates']} className="link-a">View all</Link>
                                                </div>
                                            </div>
                                            <div className="submenu_items">
                                                <Link href={`${routersPages['jobWinningResumeTemplates']}?category=Creative`} className="submenu__item-c">
                                                    <div className="submenu__item-icon">
                                                        <Icon svg={iconCreative} />
                                                    </div>
                                                    <div className="submenu__item-title">Creative</div>
                                                    <p className="submenu__item-text">A bold, original feel perfect for artistic fields and contemporary companies</p>
                                                </Link>
                                                <Link href={`${routersPages['jobWinningResumeTemplates']}?category=Professional`} className="submenu__item-c">
                                                    <div className="submenu__item-icon">
                                                        <Icon svg={iconProfesional} />
                                                    </div>
                                                    <div className="submenu__item-title">Professional</div>
                                                    <p className="submenu__item-text">Job-winning templates to showcase professionalism and expertise</p>
                                                </Link>
                                                <Link href={`${routersPages['jobWinningResumeTemplates']}?category=Simple`} className="submenu__item-c">
                                                    <div className="submenu__item-icon">
                                                        <Icon svg={iconSimple} />
                                                    </div>
                                                    <div className="submenu__item-title">Simple</div>
                                                    <p className="submenu__item-text">Clean, timeless templates with a classic balanced structure. A perfect basic canvas</p>
                                                </Link>
                                                <Link href={`${routersPages['jobWinningResumeTemplates']}?category=Modern`} className="submenu__item-c">
                                                    <div className="submenu__item-icon">
                                                        <Icon svg={iconModern} />
                                                    </div>
                                                    <div className="submenu__item-title">Modern</div>
                                                    <p className="submenu__item-text">A current and stylish feel for forward-thinking candidate in innovative fields</p>
                                                </Link>
                                            </div>
                                            <div className="submenu__item__fot">
                                                <div className="submenu__item__fot-left">
                                                    <img src="/images/icons/img-l-sub.svg" />
                                                </div>
                                                <div className="submenu__item__fot-center">
                                                    <div className="submenu__item-bot_t">Resume Builder</div>
                                                    <p className="submenu__item-bot_text">Build powerful resumes in only 5 minutes with our easy to use Resume Builder and get hired faster.</p>
                                                    <Link href={routersPages['resumeBuilderNew']} className="submenu__item-bot_link link-a">Get Started Now</Link>
                                                </div>
                                                <div className="submenu__item__fot-right">
                                                    <img src="/images/icons/img-r-sub.svg" />
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="submenu-item">
                                        <Link href={`/${routersPages['pageCoverLetter']}`}>Cover Letter</Link>
                                        <div className="submenu">
                                            <div className="submenu__top">
                                                <div className="submenu__title">Cover Templates</div>
                                                <div className="submenu__r">
                                                    <Link href={routersPages['pageCoverLeterTemplates']} className="link-a">View all</Link>
                                                </div>
                                            </div>
                                            <div className="submenu_items">
                                                <Link href={`${routersPages['pageCoverLeterTemplates']}?category=Creative`} className="submenu__item-c">
                                                    <div className="submenu__item-icon">
                                                        <Icon svg={iconCreative} />
                                                    </div>
                                                    <div className="submenu__item-title">Creative</div>
                                                    <p className="submenu__item-text">A bold, original feel perfect for artistic fields and contemporary companies</p>
                                                </Link>
                                                <Link href={`${routersPages['pageCoverLeterTemplates']}?category=Creative`} className="submenu__item-c">
                                                    <div className="submenu__item-icon">
                                                        <Icon svg={iconProfesional} />
                                                    </div>
                                                    <div className="submenu__item-title">Professional</div>
                                                    <p className="submenu__item-text">Job-winning templates to showcase professionalism and expertise</p>
                                                </Link>
                                                <Link href={`${routersPages['pageCoverLeterTemplates']}?category=Creative`} className="submenu__item-c">
                                                    <div className="submenu__item-icon">
                                                        <Icon svg={iconSimple} />
                                                    </div>
                                                    <div className="submenu__item-title">Simple</div>
                                                    <p className="submenu__item-text">Clean, timeless templates with a classic balanced structure. A perfect basic canvas</p>
                                                </Link>
                                                <Link href={`${routersPages['pageCoverLeterTemplates']}?category=Creative`} className="submenu__item-c">
                                                    <div className="submenu__item-icon">
                                                        <Icon svg={iconModern} />
                                                    </div>
                                                    <div className="submenu__item-title">Modern</div>
                                                    <p className="submenu__item-text">A current and stylish feel for forward-thinking candidate in innovative fields</p>
                                                </Link>
                                            </div>
                                            <div className="submenu__item__fot">
                                                <div className="submenu__item__fot-left">
                                                    <img src="/images/icons/img-l-sub.svg" />
                                                </div>
                                                <div className="submenu__item__fot-center">
                                                    <div className="submenu__item-bot_t">Resume Builder</div>
                                                    <p className="submenu__item-bot_text">Build powerful resumes in only 5 minutes with our easy to use Resume Builder and get hired faster.</p>
                                                    <Link href={routersPages['coverLetterNew']} className="submenu__item-bot_link link-a">Get Started Now</Link>
                                                </div>
                                                <div className="submenu__item__fot-right">
                                                    <img src="/images/icons/img-r-sub.svg" />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li><Link href={`${routersPages['contactUs']}`}>Contact Us</Link></li>
                                    {/* <li><Link href="#">Pricing</Link></li> */}
                                    <li><Link href={`${routersPages['faqs']}`}>FAQ</Link></li>
                                </ul>
                            </nav>
                            <div className="right-info">
                                {/* <Link href="#" className="lang">En</Link> */}
                                {
                                    isAthorized ? (
                                        <div className="right-info__auth">
                                            <HeadUser />
                                        </div>
                                    ) : (
                                        <>
                                            <Link href={`${routersPages['login']}`} className="logins">Login</Link>
                                            <Link href={`${routersPages['resumeBuilderNew']}`} className="get-startend btns btn--grey">
                                                <img src="/images/page/get-start.svg" alt="img" />
                                                <span>Get started</span>
                                            </Link>
                                        </>
                                    )
                                }
                            </div>
                        </>
                    )
                }
            </div >
        </header >
    )
}