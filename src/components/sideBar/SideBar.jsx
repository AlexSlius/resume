import {
   CSidebar,
} from "@coreui/react"

import Link from "next/link"
import Icon from "../Icon"

import vars from "./varsStyle"
import style from './SideBar.module.scss'

import helpIcon from '/public/images/icons/chat.svg?sprite'

import { routersPages } from "../../constants/next-routers"

const SideBar = ({
   children,
   isMaxH = false,
}) => {
   return (
      <CSidebar className={`${style.side} ${isMaxH ? style.max_he : ""}`} style={vars}>
         <Link href="/" className={`${style.nav_logo}`}>
            <img loading="lazy" src="/images/page/logo.svg" alt="img" />
         </Link>

         {children}

         <div className={`${style.nav_help}`}>
            <Link href={`/${routersPages['contactUs']}`} className={`${style.nav_help_link}`}>
               <Icon svg={helpIcon} classNames={[style.nav_icon, 'nav-icon']} />
               Need help?
            </Link>
         </div>
      </CSidebar>
   )
}

export default SideBar;