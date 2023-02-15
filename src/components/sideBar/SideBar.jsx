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
   children
}) => {
   return (
      <CSidebar className={`${style.side}`} style={vars}>
         <Link href="/" className={`${style.nav_logo}`}>
            Res<span>Tamplate</span>
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