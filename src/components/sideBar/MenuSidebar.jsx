import {
    CSidebarNav,
    CNavItem,
} from "@coreui/react"
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { isArray, isObject, slice } from "lodash";

import Icon from "../Icon"
import ActiveLink from "../Active-link"

import { localStorageGet } from "../../helpers/localStorage";
import { updateItemStatus } from "../../slices/menuAsideResume";

import {
    routerLinksAsideMenuIcon
} from "../../constants/next-routers"

import style from './SideBar.module.scss'


const MenuSideBar = () => {
    const {
        addSection: {
            list,
        },
        menuAsideResume,
    } = useSelector(state => state);
    const dispatch = useDispatch();

    const [classDisabled, setСlassDisabled] = React.useState("");
    const idCv = localStorageGet('idCv');

    React.useEffect(() => {
        setСlassDisabled(() => {
            if (!idCv) {
                return "disableds";
            }
            return "";
        });
    }, []);

    React.useEffect(() => {
        if (isArray(list)) {
            let arSections = list[0];

            if (isObject(arSections)) {
                Object.keys(arSections).map((key) => {
                    let statusItemSection = arSections[key];

                    if (!!statusItemSection) {
                        menuAsideResume.list.map((el, index) => {
                            if (el.key === key) {
                                dispatch(updateItemStatus({ index, value: true }));
                            }
                        });
                    }
                });
            }
        }
    }, [list]);

    return (
        <CSidebarNav>
            {
                menuAsideResume.list.map((obj, index) => {
                    if (obj?.key) {
                        if (obj?.status == false)
                            return;
                    }

                    return (
                        <CNavItem key={index}>
                            <ActiveLink href={`${obj.link}`} activeClassName="active">
                                <a className={`${style.nav_link} nav-link ${classDisabled}`}>
                                    <Icon svg={routerLinksAsideMenuIcon[obj.keyIcon]} classNames={[style.nav_icon, 'nav-icon']} />
                                    {obj.name || ""}
                                </a>
                            </ActiveLink>
                        </CNavItem>
                    )
                })
            }
        </CSidebarNav>
    )
}

export default MenuSideBar;