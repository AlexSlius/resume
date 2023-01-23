import {
    CSidebarNav,
    CNavItem,
} from "@coreui/react"

import Icon from "../Icon"
import ActiveLink from "../Active-link"

import { localStorageGet } from "../../helpers/localStorage";

import { routerLinksAsideMenu } from "../../constants/next-routers"

import style from './SideBar.module.scss'


const MenuSideBar = () => {
    const idCv = localStorageGet('idCv');
    const classDisabled = !!idCv ? "" : "disableds";

    return (
        <CSidebarNav>
            {
                routerLinksAsideMenu.map((obj, index) => (
                    <CNavItem key={index}>
                        <ActiveLink href={`${obj.link}`} activeClassName="active">
                            <a className={`${style.nav_link} nav-link ${classDisabled}`}>
                                <Icon svg={obj.icon} classNames={[style.nav_icon, 'nav-icon']} />
                                {obj.name || ""}
                            </a>
                        </ActiveLink>
                    </CNavItem>
                ))
            }
        </CSidebarNav>
    )
}

export default MenuSideBar;