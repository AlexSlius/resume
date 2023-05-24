import {
    CSidebarNav,
    CNavItem,
} from "@coreui/react"
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'

import Icon from "../Icon"
import ActiveLink from "../Active-link"

import { addAllSection } from "../../slices/menuAsideResume";
import { ModalNoAccess } from "../modals/modalNoAccess";

import { getCategoryViewedStatusCover } from "../../controllers/addSections";
import { contactSetNew, contactAddNew } from "../../controllers/contacts";
import { coverSetNew, coverAddNew } from "../../controllers/cover/personalize";
import { updateIsErrorEmail } from "../../slices/cover/coverDataForm";

import {
    routerLinksAsideMenuIcon,
    keysIcons
} from "../../constants/next-routers"

import { routersPages } from "../../constants/next-routers";

import style from './SideBar.module.scss'


const MenuSidebarCoverLetters = () => {
    const [showModalNoAccess, setShowModalNoAccess] = React.useState(false);

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
    const isNewResume = (idCv == "new");

    const handleClick = (e) => {
        if (isNewResume) {
            e.preventDefault();

            if (isAthorized) {
                dispatch(coverAddNew({}));
            } else {
                dispatch(updateIsErrorEmail());
                // setShowModalNoAccess(true);
            }
        }
    }

    const onHanleBtnRegister = () => {
        dispatch(coverSetNew({}));
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

                        if (obj?.key == 'experience' && !isNewResume) {

                            linkQuery = `?step=${lastPosition || undefined}`
                            activeClassActives = style.link_current;
                        }

                        return (
                            <CNavItem key={index}>
                                <ActiveLink href={`/${routersPages['coverLetter']}/${idCv}${obj.link}${linkQuery}`} activeClassName={style.active}>
                                    <a className={`${style.nav_link} ${activeClassActives} nav-link`} onClick={handleClick}>
                                        <Icon svg={routerLinksAsideMenuIcon[obj.keyIcon]} classNames={[style.nav_icon, 'nav-icon']} />
                                        {obj.name || ""}
                                    </a>
                                </ActiveLink>
                            </CNavItem>
                        )
                    })
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

export default MenuSidebarCoverLetters;