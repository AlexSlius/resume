import Link from "next/link";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'

// Components
import Icon from "../Icon";
import { routersPages } from "../../constants/next-routers";
import MenuSideBar from "../../components/sideBar/MenuSidebar";
import MenuSidebarCoverLetters from "../../components/sideBar/MenuSidebarCoverLetters";
import { CardTemplateMenu } from "./cardTemplateMenu";
import { ModalTemplate } from "../../components/modals/modaltemplate";

import iconModResume from "/public/images/icons/icon_mob_menu-resume.svg?sprite";
import iconModCover from "/public/images/icons/icon_mob_menu-cover.svg?sprite";
import iconModContact from "/public/images/icons/icon_mob_menu-contact.svg?sprite";
import iconModFaq from "/public/images/icons/icon_mob_menu-faq.svg?sprite";
import iconModResTemp from "/public/images/icons/icon_mob_menu-res_temp.svg?sprite";
import iconModCoverTemp from "/public/images/icons/icon_mob_menu-cover_temp.svg?sprite";


import { updateActiveResumeNew } from "../../slices/resumeData";
import { updateActiveCoverNew } from "../../slices/cover/coverData";

import menuData from "./data/menuData.json";

export const Menu = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const path = router.pathname;
    const {
        theme: {
            currentResolution
        }
    } = useSelector((state) => state);

    const [modalTem, setModalTem] = useState({
        status: false,
        data: null,
        type: "resume",
    });

    const handleCloseModalTemplate = () => {
        setModalTem({
            status: false,
            data: null
        });
    }

    const handlePreview = (data, type = "resume") => {
        setModalTem({
            status: true,
            data,
            type
        });
    }

    let isMob = ['md', 'sm', 'xs'].includes(currentResolution);

    return (
        <>
            <div className='menu'>
                {
                    path.indexOf('resume-builder') !== -1 ?
                        (
                            <MenuSideBar />
                        ) :
                        path.indexOf('cover-letters') !== -1 ?
                            (
                                <MenuSidebarCoverLetters />
                            ) :
                            (
                                <nav className="nav">
                                    <ul>
                                        <li className="submenu-item">
                                            <Link className="nav-link" href="/">{isMob && <Icon svg={iconModResume} />}Resume</Link>
                                            {
                                                !isMob && (
                                                    <div className="submenu">
                                                        <div className="submenu__cont">
                                                            <div className="containers">
                                                                <div className="submenu__left">
                                                                    <div>
                                                                        <div className="submenu__top">
                                                                            <div className="submenu__title">Popular Resume Templates</div>
                                                                            <div className="submenu__r">
                                                                                <Link href={routersPages['jobWinningResumeTemplates']} className="link-a">View all</Link>
                                                                            </div>
                                                                        </div>
                                                                        <div className="submenu__templs">
                                                                            {
                                                                                menuData.templatesResum.map((itemResume) => (
                                                                                    <CardTemplateMenu
                                                                                        key={itemResume.id}
                                                                                        scrImg={itemResume.img}
                                                                                        link={`/${routersPages['resumeBuilderNew']}`}
                                                                                        handlePreview={() => handlePreview(itemResume.data)}
                                                                                        handleLink={() => dispatch(updateActiveResumeNew({ slug: itemResume.slug, id: itemResume.id, template_class: itemResume.class }))}
                                                                                    />
                                                                                ))
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="submenu__bot">
                                                                        <Link href={`/${routersPages['resumeBuilderNew']}`} className="button-p  button-p_black">Create My Resume</Link>
                                                                    </div>
                                                                </div>
                                                                <div className="submenu__right">
                                                                    <div className="submenu__top">
                                                                        <div className="submenu__title">Try our best cover letters</div>
                                                                    </div>
                                                                    <div className="submenu__templs submenu__te_ims submenu__te_ims_cover">
                                                                        <img src="/images/tem_menu/img_group_cover.png" alt="img cover" />
                                                                    </div>
                                                                    <div className="submenu__bot">
                                                                        <Link href={`/${routersPages['coverLetterNew']}`} className="button-p  button-p_grey">Try Cover Letter</Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </li>
                                        {isMob && (<li><Link className="nav-link" href={`${routersPages['jobWinningResumeTemplates']}`}><Icon svg={iconModResTemp} />Resume Templates</Link></li>)}
                                        <li className="submenu-item">
                                            <Link className="nav-link" href={`/${routersPages['pageCoverLetter']}`}>{isMob && <Icon svg={iconModCover} />}Cover Letter</Link>
                                            {
                                                !isMob && (
                                                    <div className="submenu">
                                                        <div className="submenu__cont">
                                                            <div className="containers">
                                                                <div className="submenu__left">
                                                                    <div>
                                                                        <div className="submenu__top">
                                                                            <div className="submenu__title">Popular Resume Templates</div>
                                                                            <div className="submenu__r">
                                                                                <Link href={routersPages['pageCoverLeterTemplates']} className="link-a">View all</Link>
                                                                            </div>
                                                                        </div>
                                                                        <div className="submenu__templs">
                                                                            {
                                                                                menuData.templatesCover.map((itemResume, index) => (
                                                                                    <CardTemplateMenu
                                                                                        key={itemResume.id}
                                                                                        scrImg={itemResume.img}
                                                                                        link={`/${routersPages['coverLetterNew']}`}
                                                                                        handlePreview={() => handlePreview(itemResume.data, "cover")}
                                                                                        handleLink={() => dispatch(updateActiveCoverNew({ slug: itemResume.slug, id: itemResume.id, template_class: itemResume.class }))}
                                                                                        dopClass={(index == 0) ? 'box_card-t' : ''}
                                                                                    />
                                                                                ))
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="submenu__bot">
                                                                        <Link href={`/${routersPages['coverLetterNew']}`} className="button-p  button-p_black">Create Cover Letter</Link>
                                                                    </div>
                                                                </div>
                                                                <div className="submenu__right">
                                                                    <div className="submenu__top">
                                                                        <div className="submenu__title">Try our best Resume</div>
                                                                    </div>
                                                                    <div className="submenu__templs submenu__te_ims submenu__te_ims_resume">
                                                                        <img src="/images/tem_menu/img_grup_res.png" alt="img cover" />
                                                                    </div>
                                                                    <div className="submenu__bot">
                                                                        <Link href={`/${routersPages['resumeBuilderNew']}`} className="button-p  button-p_grey">Try Resume</Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </li>
                                        {isMob && (<li><Link className="nav-link" href={`${routersPages['pageCoverLeterTemplates']}`}><Icon svg={iconModCoverTemp} />Cover Letter Templates</Link></li>)}
                                        <li><Link className="nav-link" href={`${routersPages['contactUs']}`}>{isMob && <Icon svg={iconModContact} />}Contact Us</Link></li>
                                        <li><Link className="nav-link" href={`${routersPages['faqs']}`}>{isMob && <Icon svg={iconModFaq} />}FAQ</Link></li>
                                    </ul>
                                </nav>
                            )
                }
            </div>

            <ModalTemplate
                visible={modalTem.status}
                item={modalTem.data}
                onClose={handleCloseModalTemplate}
                hrefLink={(modalTem.type == "resume") ? routersPages['resumeBuilderNew'] : routersPages['coverLetterNew']}
                handleLink={(val) => (modalTem.type == "resume") ? dispatch(updateActiveResumeNew(val)) : dispatch(updateActiveCoverNew(val))}
            />
        </>
    )
}