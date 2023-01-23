import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'

import Icon from '../Icon'

import { logout } from '../../controllers/auth'

import style from './HeadUser.module.scss'
import arrowProfileIcon from '/public/images/icons/arrow-profile.svg?sprite'
import iconDashboard from '/public/images/icons/icon-dashboard.svg?sprite'
import iconHelp from '/public/images/icons/icon-he.svg?sprite'
import iconLogout from '/public/images/icons/icon-logo.svg?sprite'

import { routersPages } from "../../constants/next-routers"

const HeadUser = () => {
   const dispatch = useDispatch();
   const [showMenu, setShowMenu] = React.useState(false);
   const classIsShowMenu = showMenu ? style.opens : ''

   const {
      auth: {
         autorizate: {
            isAthorized,
         }
      },
      contacts: {
         contactObj
      },
   } = useSelector((state) => state);

   const handleOnClickOpen = () => {
      setShowMenu(prev => !prev);
   }

   React.useEffect(() => {
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
      <div className={`${style.users_head}`}>
         <div className={`${style.users_head__profile} ${classIsShowMenu} btn_no_click_menu`}>
            <div className={`${style.users_head__avatar_img} `} onClick={handleOnClickOpen}>
               <img src={contactObj?.picture || `/images/other/avatar-small.png`} />
            </div>
            {
               isAthorized && (
                  <>
                     <button className={`${style.users_head__profile_arrow}`} onClick={handleOnClickOpen}>
                        <Icon svg={arrowProfileIcon} classNames={[style.icon]} />
                     </button>

                     <div className={`${style.mod}`}>
                        <div className={`${style.mod_wr}`}>
                           <ul className={`${style.mod_m_list}`}>
                              <li>
                                 <Link href={`/${routersPages['dashboard']}`}>
                                    <Icon svg={iconDashboard} />
                                    <span>Dashboard</span>
                                 </Link>
                              </li>
                              <li>
                                 <Link href={`/${routersPages['help']}`}>
                                    <Icon svg={iconHelp} />
                                    <span>Help</span>
                                 </Link>
                              </li>
                              <li>
                                 <button onClick={() => logout(dispatch)}>
                                    <Icon svg={iconLogout} />
                                    <span>Logout</span>
                                 </button>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </>
               )
            }
         </div>
      </div>
   )
}
export default HeadUser;