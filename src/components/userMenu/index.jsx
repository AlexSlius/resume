import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Components
import Icon from '../Icon'
import { SvgImage } from "../../components/svgImage";
import { logout } from '../../controllers/auth'
import style from '../headUser/HeadUser.module.scss'
import iconLogout from '/public/images/icons/icon-logo.svg?sprite'
import { routersPages } from "../../constants/next-routers"

const userMenu = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showMenu, setShowMenu] = useState();
    const {
        auth: {
            autorizate: {
                isAthorized,
            }
        },
        theme: {
            currentResolution
        },
    } = useSelector((state) => state);
    const isMob = ['md', 'sm', 'xs'].includes(currentResolution);
    const isDomPuncts = [
        routersPages['dashboard'],
        routersPages['settings'],
        routersPages['resumeBuilder'],
        routersPages['resumeBuilderNew'],
        routersPages['coverLetter'],
        routersPages['pageCoverLetter'],
        routersPages['addSection'],
        routersPages['resumeNow'],
        routersPages['templates'],
    ].find(el => router.asPath.includes(el));

    useEffect(() => {
        setShowMenu(false);

        function handleClick(e) {
            if (!e.target.closest('.btn_no_click_menu'))
                setShowMenu(prev => {
                    if (prev)
                        return !prev

                    return prev;
                })
        }

        !!document?.body && document.body.addEventListener('mousedown', handleClick);

        return !!document?.body && document.body.addEventListener('mousedown', handleClick);
    }, [])

    return (
        <ul className={`${style.mod_m_list}`}>
            {
                isAthorized && (
                    <>
                        <li>
                            <Link href={isAthorized ? `/${routersPages['dashboard']}` : ''} className={`nav-link ${style.link} ${!isAthorized ? style.disabled : ""}`}>
                                {
                                    isMob ?
                                        (
                                            <SvgImage image={'dashboard'} width={'17px'} height={'17px'} color={'#838799'} />
                                        ) :
                                        (
                                            <SvgImage image={'dashboard'} width={'17px'} height={'17px'} color={'#3679fd'} />
                                        )
                                }
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={isAthorized ? `/${routersPages['settings']}` : ''} className={`nav-link ${style.link} ${!isAthorized ? style.disabled : ""}`}>
                                {
                                    isMob ?
                                        (
                                            <SvgImage image={'settings'} width={'17px'} height={'17px'} color={'#838799'} />
                                        ) :
                                        (
                                            <SvgImage image={'settings'} width={'17px'} height={'17px'} color={'#3679fd'} />
                                        )
                                }
                                <span>Settings</span>
                            </Link>
                        </li>
                    </>
                )
            }
            {
                !isAthorized && (
                    <>
                        <li>
                            <Link href={`/${routersPages['login']}`} className={`nav-link ${style.link}`}>
                                {
                                    isMob ?
                                        (
                                            <SvgImage image={'user'} width={'17px'} height={'17px'} color={'#838799'} />
                                        ) :
                                        (
                                            <SvgImage image={'user'} width={'17px'} height={'17px'} color={'#3679fd'} />
                                        )
                                }
                                <span>Account</span>
                            </Link>
                        </li>
                    </>
                )
            }

            {
                isDomPuncts && (
                    <>
                        <li>
                            <Link href={`/${routersPages['faqs']}`} className={`nav-link ${style.link}`} target='_blank'>
                                {
                                    isMob ?
                                        (
                                            <SvgImage image={'faq'} width={'17px'} height={'17px'} color={'#838799'} />
                                        ) :
                                        (
                                            <SvgImage image={'faq'} width={'17px'} height={'17px'} color={'#3679fd'} />
                                        )
                                }
                                <span>FAQ</span>
                            </Link>
                        </li>

                        {
                            isMob && (
                                <li>
                                    <Link href={`/${routersPages['contactUs']}`} className={`nav-link ${style.link}`} target='_blank'>
                                        <SvgImage image={'contacte'} width={'17px'} height={'17px'} color={'#838799'} />
                                        <span>Need help</span>
                                    </Link>
                                </li>
                            )
                        }
                    </>
                )
            }

            {
                isAthorized && !isMob ? (
                    <li>
                        <button onClick={() => logout(dispatch)} className={`nav-link ${style.link}`}>
                            <Icon svg={iconLogout} />
                            <span>Logout</span>
                        </button>
                    </li>
                ) : null
            }
        </ul>
    )
}
export default userMenu;