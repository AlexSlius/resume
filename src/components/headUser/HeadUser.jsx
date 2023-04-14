import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'

// Components
import UserMenu from '../userMenu';
import Icon from '../Icon'

import { logout } from '../../controllers/auth'

import style from './HeadUser.module.scss'
import arrowProfileIcon from '/public/images/icons/arrow-profile.svg?sprite'
import iconDashboard from '/public/images/icons/icon-dashboard.svg?sprite'
import iconSettings from '/public/images/icons/icon_settings.svg?sprite'
import iconHelp from '/public/images/icons/icon-he.svg?sprite'
import iconLogout from '/public/images/icons/icon-logo.svg?sprite'
import iconHLogin from '/public/images/icons/icon-h-login.svg?sprite'
import iconSingUp from '/public/images/icons/icon-sing-up.svg?sprite'

import { routersPages } from "../../constants/next-routers"

const HeadUser = () => {
   const dispatch = useDispatch();
   const [showMenu, setShowMenu] = useState();
   const classIsShowMenu = showMenu ? style.opens : ''

   const {
      auth: {
         autorizate: {
            isAthorized,
         }
      },
      users: {
         avatar
      }
   } = useSelector((state) => state);

   const handleOnClickOpen = () => {
      setShowMenu(prev => !prev);
   }

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
      <div className={`${style.users_head}`}>
         <div className={`${style.users_head__profile} ${classIsShowMenu} btn_no_click_menu`}>
            <div className={style.users_head__profile_diw} onClick={handleOnClickOpen}>
               <div className={`${style.users_head__avatar_img} `}>
                  <img src={avatar?.image || `/images/other/avatar-small.png`} />
               </div>
               <button className={`${style.users_head__profile_arrow}`} >
                  <Icon svg={arrowProfileIcon} classNames={[style.icon]} />
               </button>
            </div>
            <div className={`${style.mod}`}>
               <div className={`${style.mod_wr}`}>
                  <UserMenu />
               </div>
            </div>
         </div>
      </div>
   )
}
export default HeadUser;