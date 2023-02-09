import {
    CSidebarNav,
    CNavItem,
} from "@coreui/react"
import React from "react"
import { useDispatch, useSelector } from "react-redux";

import Icon from "../Icon"
import ActiveLink from "../Active-link"

import { localStorageGet } from "../../helpers/localStorage";
// import { addAllSection, updateItemStatus } from "../../slices/menuAsideResume";

import {
    routerLinksAsideMenuIcon,
    keysIcons
} from "../../constants/next-routers"

import style from './SideBar.module.scss'
import { sectionIndexAndAll } from "../../helpers/sections";


const MenuSideBar = () => {
    const {
        addSection: {
            list,
        },
        menuAsideResume,
    } = useSelector(state => state);
    const [currentListmenu, setCurrentListMenu] = React.useState([]);
    // const dispatch = useDispatch();

    const [classDisabled, setСlassDisabled] = React.useState("");
    const idCv = localStorageGet('idCv');

    React.useEffect(() => {
        setСlassDisabled(() => {
            if (!idCv) {
                return "disableds";
            }
            return "";
        });

        let arrSect = [];
        let newArrAdd = [];
        let keysAll = Object.keys(list);

        for (let i = 0; i < keysAll.length; i++) {
            arrSect.push({ ...list[keysAll[i]], key: keysAll[i] });
        }

        arrSect.sort(function (a, b) {
            if (a.position > b.position) {
                return 1;
            }
            if (a.position < b.position) {
                return -1;
            }
            return 0;
        });

        arrSect.map(item => {
            menuAsideResume.listAdd.map((sectionItem) => {
                if (item.key == sectionItem.key) {
                    if (!!item.status) {
                        newArrAdd.push(sectionItem);
                    }
                }
            });
        });

        setCurrentListMenu([...menuAsideResume.list, ...newArrAdd]);
    }, [list]);

    return (
        <CSidebarNav>
            {
                currentListmenu.map((obj, index) => {
                    if (obj?.key) {
                        if (obj?.status == false)
                            return;
                    }

                    return (
                        <CNavItem key={index}>
                            <ActiveLink href={`${obj.link}`} activeClassName={style.active}>
                                <a className={`${style.nav_link} nav-link ${classDisabled}`}>
                                    <Icon svg={routerLinksAsideMenuIcon[obj.keyIcon]} classNames={[style.nav_icon, 'nav-icon']} />
                                    {obj.name || ""}
                                </a>
                            </ActiveLink>
                        </CNavItem>
                    )
                })
            }

            {
                !!sectionIndexAndAll(list)?.colNull && (
                    <CNavItem>
                        <ActiveLink href={`/resume-builder/add_section`} activeClassName={style.active}>
                            <a className={`${style.nav_link} nav-link ${classDisabled}`}>
                                <Icon svg={routerLinksAsideMenuIcon[keysIcons["iconAdvanced"]]} classNames={[style.nav_icon, 'nav-icon']} />
                                Advanced
                            </a>
                        </ActiveLink>
                    </CNavItem>
                )
            }
        </CSidebarNav>
    )
}

export default MenuSideBar;