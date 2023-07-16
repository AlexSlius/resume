import { useEffect } from "react"
import { CSidebarNav, CNavItem } from "@coreui/react"
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import { addAllSection } from "../../slices/menuAsideResume";

// Components
import Icon from "../Icon"
import ActiveLink from "../Active-link"
// Controllers
import { contactAddNew } from "../../controllers/contacts"

// Helpers
import { sendCodeResume } from "../../utils/sendCode";

// Constants
import { routerLinksAsideMenuIcon, keysIcons } from "../../constants/next-routers"
import { routersPages } from "../../constants/next-routers";
import { ROUTES } from "../../constants/routes";

// Styles
import style from './SideBar.module.scss'
import { sectionStatusAllButTheCustomSection } from "../../utils/customSection";


const MenuSideBar = ({ statePictureFile }) => {
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
    const shareKey = router.query?.shareKey;
    const isNewResume = (idCv == "new");

    let dopQuery = `${(shareKey?.length > 0) ? `&shareKey=${shareKey}` : ""}`;

    const handleClick = async (e, link) => {
        if (idCv == "new") {
            e.preventDefault();

            if (isAthorized) {
                dispatch(contactAddNew({ pictureFile: statePictureFile, isNewResume, link: link, isPage: true }));
            } else {
                sendCodeResume({
                    dispatch,
                    pictureFile: statePictureFile,
                    link
                });
            }
        }
    }

    useEffect(() => {
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
                                <ActiveLink
                                    href={`/${routersPages['resumeBuilder']}/${idCv}${obj.link}${dopQuery}`} activeClassName={style.active}
                                    onQuery={"tab"}
                                >
                                    <a className={`${style.nav_link} ${activeClassActives} nav-link`} onClick={(e) => handleClick(e, `${obj.link}${dopQuery}`)}>
                                        <Icon svg={routerLinksAsideMenuIcon[obj.keyIcon]} classNames={[style.nav_icon, 'nav-icon']} />
                                        {obj.name || ""}
                                    </a>
                                </ActiveLink>
                            </CNavItem>
                        )
                    })
                }

                {
                    !sectionStatusAllButTheCustomSection(list) && (
                        <CNavItem>
                            <ActiveLink
                                href={`/${routersPages['resumeBuilder']}/${idCv}?tab=${ROUTES['addSection']}`} activeClassName={style.active}
                                onQuery={"tab"}
                            >
                                <a className={`${style.nav_link} nav-link ${!!viewedList?.['customSection']?.status ? style.link_current : ''}`} onClick={(e) => handleClick(e, `?tab=${ROUTES['addSection']}${dopQuery}`)}>
                                    <Icon svg={routerLinksAsideMenuIcon[keysIcons["iconAdvanced"]]} classNames={[style.nav_icon, 'nav-icon']} />
                                    Advanced
                                </a>
                            </ActiveLink>
                        </CNavItem>
                    )
                }
            </CSidebarNav>
        </>
    )
}

export default MenuSideBar;