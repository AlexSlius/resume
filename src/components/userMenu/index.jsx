import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'

// Components
import Icon from '../Icon'
import { SvgImage } from "../../components/svgImage";

import { logout } from '../../controllers/auth'

import style from '../headUser/HeadUser.module.scss'
import iconDashboard from '/public/images/icons/icon-dashboard.svg?sprite'
import iconSettings from '/public/images/icons/icon_settings.svg?sprite'
import iconHelp from '/public/images/icons/icon-he.svg?sprite'
import iconLogout from '/public/images/icons/icon-logo.svg?sprite'
import iconHLogin from '/public/images/icons/icon-h-login.svg?sprite'
import iconSingUp from '/public/images/icons/icon-sing-up.svg?sprite'

import { routersPages } from "../../constants/next-routers"

const userMenu = () => {
   const dispatch = useDispatch();
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
      users: {
         avatar
      }
   } = useSelector((state) => state);

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
                            ['md', 'sm', 'xs'].includes(currentResolution) ? 
                            (
                                <SvgImage image={'dashboard'} width={'17px'} height={'17px'} color={'#838799'} />
                            ):
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
                            ['md', 'sm', 'xs'].includes(currentResolution) ? 
                            (
                                <SvgImage image={'settings'} width={'17px'} height={'17px'} color={'#838799'} />
                            ):
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
                            ['md', 'sm', 'xs'].includes(currentResolution) ? 
                            (
                                <SvgImage image={'user'} width={'17px'} height={'17px'} color={'#838799'} />
                            ):
                            (
                                <SvgImage image={'user'} width={'17px'} height={'17px'} color={'#3679fd'} />
                            )
                        }
                        <span>Login</span>
                      </Link>
                  </li>
                  <li>
                      <Link href={`/${routersPages['register']}`} className={`nav-link ${style.link}`}>
                        {
                            ['md', 'sm', 'xs'].includes(currentResolution) ? 
                            (
                                <SvgImage image={'sign-up'} width={'17px'} height={'17px'} color={'#838799'} />
                            ):
                            (
                                <SvgImage image={'sign-up'} width={'17px'} height={'17px'} color={'#3679fd'} />
                            )
                        }
                        <span>Sign up</span>
                      </Link>
                  </li>
                </>
            )
          }
          <li>
            <Link href={`/${routersPages['contactUs']}`} className={`nav-link ${style.link}`}>
                {
                    ['md', 'sm', 'xs'].includes(currentResolution) ? 
                    (
                        <SvgImage image={'info'} width={'17px'} height={'17px'} color={'#838799'} />
                    ):
                    (
                        <SvgImage image={'info'} width={'17px'} height={'17px'} color={'#3679fd'} />
                    )
                }
                <span>Help</span>
            </Link>
          </li>
          {
            isAthorized && !['md', 'sm', 'xs'].includes(currentResolution) ? (
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