import Link from "next/link";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router'

// Components
import Icon from "../Icon";
import { routersPages } from "../../constants/next-routers";
import MenuSideBar from "../../components/sideBar/MenuSidebar";
import MenuSidebarCoverLetters from "../../components/sideBar/MenuSidebarCoverLetters";
import HeadUser from "../headUser/HeadUser";

import iconCreative from "/public/images/icons/icon_creav.svg?sprite";
import iconProfesional from "/public/images/icons/briefcase-account.svg?sprite";
import iconSimple from "/public/images/icons/creation_simpla.svg?sprite";
import iconModern from "/public/images/icons/pencil-ruler.svg?sprite";
import iconModResume from "/public/images/icons/icon_mob_menu-resume.svg?sprite";
import iconModCover from "/public/images/icons/icon_mob_menu-cover.svg?sprite";
import iconModContact from "/public/images/icons/icon_mob_menu-contact.svg?sprite";
import iconModFaq from "/public/images/icons/icon_mob_menu-faq.svg?sprite";
import iconNeedHelp from "/public/images/icons/iocn-need-help.svg?sprite"


export const Menu = ({ pageName }) => {
    const router = useRouter();
    const path = router.pathname;
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

    let isMob = ['md', 'sm', 'xs'].includes(currentResolution);

    return (
        <div className='menu'>
            {
                path.indexOf('resume-builder') !== -1 ?
                    (
                        <MenuSideBar />
                    ) :
                    path.indexOf('cover-letters') !== -1 ?
                        (
                            <MenuSidebarCoverLetters />
                        ) :
                        (
                            <nav className="nav">
                                <ul>
                                    <li className="submenu-item">
                                        <Link className="nav-link" href="/">{isMob && <Icon svg={iconModResume} />}Resume</Link>
                                        {
                                            !isMob && (
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
                                            )
                                        }
                                    </li>
                                    <li className="submenu-item">
                                        <Link className="nav-link" href={`/${routersPages['pageCoverLetter']}`}>{isMob && <Icon svg={iconModCover} />}Cover Letter</Link>
                                        {
                                            !isMob && (
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
                                                        <Link href={`${routersPages['pageCoverLeterTemplates']}?category=Professional`} className="submenu__item-c">
                                                            <div className="submenu__item-icon">
                                                                <Icon svg={iconProfesional} />
                                                            </div>
                                                            <div className="submenu__item-title">Professional</div>
                                                            <p className="submenu__item-text">Job-winning templates to showcase professionalism and expertise</p>
                                                        </Link>
                                                        <Link href={`${routersPages['pageCoverLeterTemplates']}?category=Simple`} className="submenu__item-c">
                                                            <div className="submenu__item-icon">
                                                                <Icon svg={iconSimple} />
                                                            </div>
                                                            <div className="submenu__item-title">Simple</div>
                                                            <p className="submenu__item-text">Clean, timeless templates with a classic balanced structure. A perfect basic canvas</p>
                                                        </Link>
                                                        <Link href={`${routersPages['pageCoverLeterTemplates']}?category=Modern`} className="submenu__item-c">
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
                                                            <div className="submenu__item-bot_t">Letter Builder</div>
                                                            <p className="submenu__item-bot_text">Build powerful resumes in only 5 minutes with our easy to use Resume Builder and get hired faster.</p>
                                                            <Link href={routersPages['coverLetterNew']} className="submenu__item-bot_link link-a">Get Started Now</Link>
                                                        </div>
                                                        <div className="submenu__item__fot-right">
                                                            <img src="/images/icons/img-r-sub.svg" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </li>
                                    <li><Link className="nav-link" href={`${routersPages['contactUs']}`}>{isMob && <Icon svg={iconModContact} />}Contact Us</Link></li>
                                    <li><Link className="nav-link" href={`${routersPages['faqs']}`}>{isMob && <Icon svg={iconModFaq} />}FAQ</Link></li>
                                    {
                                        isMob && (<li><Link className="nav-link" href={`${routersPages['contactUs']}`}><Icon svg={iconNeedHelp} />Need help?</Link></li>)
                                    }
                                </ul>
                            </nav>
                        )
            }
        </div>
    )
}