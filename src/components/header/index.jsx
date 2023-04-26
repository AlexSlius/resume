import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';

import { updateMenuStatus } from "../../slices/theme";

// Components
import { Menu } from "../menu";
import { SvgImage } from "../../components/svgImage";
import Icon from "../Icon";
import { routersPages } from "../../constants/next-routers";
import HeadUser from "../headUser/HeadUser";
import UserMenu from "../userMenu";
import { ButtonBack } from "../uis/buttonBack"
import { logout } from '../../controllers/auth'

import iconBurger from "/public/images/icons/menu-burger.svg?sprite";
import { useEffect, useState } from "react";

export const Header = () => {
    const dispatch = useDispatch();
    const [isMenuShow, setIsMenuShow] = useState(false);
    const [pageName, setPageName] = useState('');
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

    const toggleMenu = () => {
        setIsMenuShow(!isMenuShow);
    }

    useEffect(() => {
        dispatch(updateMenuStatus(isMenuShow));
    }, [isMenuShow]);

    useEffect(() => {
        setPageName(localStorage.getItem('page'));
    }, []);

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
                                <button className="btn-burger" onClick={toggleMenu}>
                                    <Icon svg={iconBurger} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link href="/" className="logo">
                                <img loading="lazy" src="/images/page/logo.svg" alt="img" />
                            </Link>
                            <Menu pageName={pageName} />
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
            </div>
            {
                ['md', 'sm', 'xs'].includes(currentResolution) ?
                    (
                        <>
                            <div className={`overlay${isMenuShow ? ' show' : ''}`} onClick={toggleMenu}></div>
                            <div className={`mobile-menu${isMenuShow ? ' show' : ''}`}>
                                <div>
                                    <header>
                                        <Link href="/" className="logo">
                                            <img className="mobile-logo" loading="lazy" src="/images/page/logo.svg" alt="logo" />
                                        </Link>
                                        <div className="close-menu" onClick={toggleMenu}>
                                            <SvgImage image={'close'} width={'11px'} height={'11px'} color={'#F63B3B'} />
                                        </div>
                                    </header>
                                    <Menu pageName={pageName} />
                                    {
                                        isAthorized && (
                                            <div className="user-menu">
                                                <UserMenu />
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="mobile-menu__bot">
                                    <div className="mobile-menu__mob">
                                        {
                                            isAthorized ?
                                                (
                                                    <>
                                                        <div className="logout-wrapper">
                                                            <button onClick={() => logout(dispatch)}>
                                                                <SvgImage image={'logout'} width={'20px'} height={'20px'} color={'#F63B3B'} />
                                                                <span>Logout</span>
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : <>
                                                    <Link href={`${routersPages['login']}`} className="logins">Login</Link>
                                                    <Link href={`${routersPages['resumeBuilderNew']}`} className="get-startend btns btn--grey">
                                                        <img src="/images/page/get-start.svg" alt="img" />
                                                        <span>Get started</span>
                                                    </Link>
                                                </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null
            }
        </header>
    )
}