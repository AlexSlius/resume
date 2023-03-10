import {
    CSidebarNav,
    CNavItem,
} from "@coreui/react"
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'

import Icon from "../Icon"
import ActiveLink from "../Active-link"

import { sessionStorageGet } from "../../helpers/localStorage";
import { sectionIndexAndAll } from "../../helpers/sections";
import { contactSetNew, contactAddNew } from "../../controllers/contacts"
import { addAllSection } from "../../slices/menuAsideResume";
import { ModalNoAccess } from "../modals/modalNoAccess";

import {
    routerLinksAsideMenuIcon,
    keysIcons
} from "../../constants/next-routers"

import { routersPages } from "../../constants/next-routers";

import style from './SideBar.module.scss'


const MenuSideBar = () => {
    const [showModalNoAccess, setShowModalNoAccess] = React.useState(false);

    const router = useRouter();
    const dispatch = useDispatch();
    const {
        addSection: {
            list,
            viewedList,
        },
        menuAsideResume,
        auth: {
            autorizate: {
                isAthorized
            }
        },
    } = useSelector(state => state);
    const idCv = router.query.idCv;
    const isNewResume = (idCv == "new");

    const handleClick = (e) => {
        if (idCv == "new") {
            e.preventDefault();

            let pictureFile = sessionStorageGet('picture');

            if (isAthorized) {
                dispatch(contactAddNew({ pictureFile, isNewResume }));
            } else {
                setShowModalNoAccess(true);
            }
        }
    }

    const onHanleBtnRegister = () => {
        let pictureFile = sessionStorageGet('picture');
        dispatch(contactSetNew({ pictureFile: pictureFile || null, isNewResume, typeResume: router.query.type || null }));
    }

    React.useEffect(() => {
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

        dispatch(addAllSection([...menuAsideResume.listStart, ...newArrAdd]));
    }, [list]);

    return (
        <>
            <CSidebarNav>
                {
                    menuAsideResume.list.map((obj, index) => {
                        let activeClassActives = "";

                        if (obj?.key) {
                            if (obj?.status == false)
                                return;
                        }

                        if (!!viewedList?.[obj?.key]?.status) {
                            activeClassActives = style.link_current;
                        }

                        if (obj?.key == 'contact' && !!idCv) {
                            activeClassActives = style.link_current;
                        }

                        return (
                            <CNavItem key={index}>
                                <ActiveLink href={`/${routersPages['resumeBuilder']}/${idCv}${obj.link}`} activeClassName={style.active}>
                                    <a className={`${style.nav_link} ${activeClassActives} nav-link`} onClick={handleClick}>
                                        <Icon svg={routerLinksAsideMenuIcon[obj.keyIcon]} classNames={[style.nav_icon, 'nav-icon']} />
                                        {obj.name || ""}
                                    </a>
                                </ActiveLink>
                            </CNavItem>
                        )
                    })
                }

                {/* !!sectionIndexAndAll(list)?.lengAll && ( */}
                {
                    <CNavItem>
                        <ActiveLink href={`/${routersPages['resumeBuilder']}/${idCv}/add_section`} activeClassName={style.active}>
                            <a className={`${style.nav_link} nav-link ${!!viewedList?.['customSection']?.status ? style.link_current : ''}`} onClick={handleClick}>
                                <Icon svg={routerLinksAsideMenuIcon[keysIcons["iconAdvanced"]]} classNames={[style.nav_icon, 'nav-icon']} />
                                Advanced
                            </a>
                        </ActiveLink>
                    </CNavItem>
                }
            </CSidebarNav>

            <ModalNoAccess
                title="No access!"
                desc="In order to access this tab you must be registered in the system"
                visible={showModalNoAccess}
                onClose={() => setShowModalNoAccess(false)}
                onHanleBtn={onHanleBtnRegister}
            />
        </>
    )
}

export default MenuSideBar;