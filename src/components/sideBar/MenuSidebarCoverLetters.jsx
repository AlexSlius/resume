import {
    CSidebarNav,
    CNavItem,
} from "@coreui/react"
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'

import Icon from "../Icon"
import ActiveLink from "../Active-link"

import { getCategoryViewedStatusCover } from "../../controllers/addSections";
import { coverAddNew } from "../../controllers/cover/personalize";

import { sendCodeResume } from "../../utils/sendCode";

import { routerLinksAsideMenuIcon } from "../../constants/next-routers"

import { routersPages } from "../../constants/next-routers";

import style from './SideBar.module.scss'

const MenuSidebarCoverLetters = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {
        addSection: {
            viewedList,
        },
        menuAsideResume,
        auth: {
            autorizate: {
                isAthorized
            }
        },
        coverDataForm: {
            coverDataObj: {
                lastPosition
            }
        }
    } = useSelector(state => state);
    const idCv = router.query.idCv;
    const shareKey = router.query?.shareKey;
    const isNewResume = (idCv == "new");

    const handleClick = (e, link) => {
        if (isNewResume) {
            e.preventDefault();

            if (isAthorized) {
                dispatch(coverAddNew({}));
            } else {
                sendCodeResume({
                    dispatch,
                    link,
                    isResume: false
                });
            }
        }
    }

    React.useEffect(() => {
        if (!isNewResume) {
            dispatch(getCategoryViewedStatusCover({ idCv }))
        }
    }, []);

    return (
        <>
            <CSidebarNav>
                {
                    menuAsideResume.coverLetters.list.map((obj, index) => {
                        let activeClassActives = "";
                        let linkQuery = '';

                        if (obj?.key) {
                            if (obj?.status == false)
                                return;
                        }

                        if (!!viewedList?.[obj?.key]?.status) {
                            activeClassActives = style.link_current;
                        }

                        if (obj?.key == 'personalize' && !!idCv) {
                            activeClassActives = style.link_current;
                        }

                        if (obj?.key == 'experience' && !isNewResume && !!(lastPosition?.length > 0)) {
                            linkQuery = `?step=${lastPosition || undefined}${(shareKey?.length > 0) ? `&shareKey=${shareKey}` : ""}`
                            activeClassActives = style.link_current;
                        } else {
                            linkQuery = `${(shareKey?.length > 0) ? `?shareKey=${shareKey}` : ""}`
                        }

                        return (
                            <CNavItem key={index}>
                                <ActiveLink href={`/${routersPages['coverLetter']}/${idCv}${obj.link}${linkQuery}`} activeClassName={style.active}>
                                    <a className={`${style.nav_link} ${activeClassActives} nav-link`} onClick={(e) => handleClick(e, `${linkQuery}`)}>
                                        <Icon svg={routerLinksAsideMenuIcon[obj.keyIcon]} classNames={[style.nav_icon, 'nav-icon']} />
                                        {obj.name || ""}
                                    </a>
                                </ActiveLink>
                            </CNavItem>
                        )
                    })
                }
            </CSidebarNav>
        </>
    )
}

export default MenuSidebarCoverLetters;