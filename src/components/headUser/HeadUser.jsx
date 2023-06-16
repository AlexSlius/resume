import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// Components
import UserMenu from '../userMenu';
import Icon from '../Icon'

import style from './HeadUser.module.scss'
import arrowProfileIcon from '/public/images/icons/arrow-profile.svg?sprite'

const HeadUser = () => {
   const [showMenu, setShowMenu] = useState();
   const classIsShowMenu = showMenu ? style.opens : ''

   const {
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