import { CCol, CRow } from "@coreui/react";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";

import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import { ButtonSteps } from "../../../components/buttonSteps"
import Icon from "../../../components/Icon";
import { LoadBlock } from "../../../components/loadBlock";

import { fetchPostUpdateCategoryStatus } from "../../../controllers/addSections"
import { isUpdate } from "../../../helpers/checkingStatuses";
import { camelCaseStrind } from "../../../helpers/caseConverters";
import { sectionIndexAndAll } from "../../../helpers/sections";
import { postUpdateCategoryViewedStatus } from '../../../controllers/addSections';

import { routersPages } from "../../../constants/next-routers";

import style from "./Style.module.scss"
import iconPlus from "/public/images/icons/icon_plus.svg?sprite";
import activityIcon from '/public/images/icons/activities.svg?sprite'
import coursesIcon from '/public/images/icons/courses.svg?sprite'
import internshipIcon from '/public/images/icons/intership.svg?sprite'
import iconSettings from '/public/images/icons/icon_settings.svg?sprite'
import referencesIcon from '/public/images/icons/references.svg?sprite'
import certificationsIcon from '/public/images/icons/certifications.svg?sprite'
import socialIcon from '/public/images/icons/social.svg?sprite'
import hobbiesIcon from '/public/images/icons/hobies.svg?sprite'

const AddSection = ({ idCv, states, dispatch }) => {
    const router = useRouter();
    const {
        auth: {
            autorizate: {
                isAthorized
            }
        },
        addSection: {
            list,
        },
        menuAsideResume
    } = states;

    const shareKey = router.query?.shareKey;

    const handleAddItemSection = async (name) => {
        const { index } = sectionIndexAndAll(list);

        let res = await dispatch(fetchPostUpdateCategoryStatus({ idCv, data: `${name}/active/${index}` }));

        if (isUpdate(res.payload, "update")) {
            let keyLink = camelCaseStrind(name);
            let itemObj = menuAsideResume.listAdd.find(el => el.key == keyLink)

            if (itemObj) {
                Router.push(`/${routersPages['resumeBuilder']}/${idCv}${itemObj.link}${(shareKey?.length > 0) ? `&shareKey=${shareKey}` : ""}`);
            }
        }
    }

    useEffect(() => {
        dispatch(postUpdateCategoryViewedStatus({ idCv, category: 'customSection' }));
    }, []);

    return (
        <>
            <HeadMainContent
                title={'Add Section'}
                description={'You can add the required block, or create a custom one.'}
                StubTextBtn={true}
            >
            </HeadMainContent>

            {
                false ? (
                    <LoadBlock />
                ) : (
                    list && (
                        <CRow className="mt-4">
                            {
                                (list?.socialLinks?.status === null) && (
                                    <CCol xl={6} className="pb-4">
                                        <div className={`${style.item_section} itm-s`} onClick={() => handleAddItemSection("socialLinks")}>
                                            <div className={`${style.item_section__left} `}>
                                                <Icon svg={socialIcon} />
                                                <span>Social Links</span>
                                            </div>
                                            <div className={`${style.item_section__right} `}>
                                                <button className="btn-pl" >
                                                    <Icon svg={iconPlus} />
                                                </button>
                                            </div>
                                        </div>
                                    </CCol>
                                )
                            }

                            {
                                (list?.hobbies?.status === null) && (
                                    <CCol xl={6} className="pb-4">
                                        <div className={`${style.item_section} itm-s`} onClick={() => handleAddItemSection("hobbies")}>
                                            <div className={`${style.item_section__left} `}>
                                                <Icon svg={hobbiesIcon} />
                                                <span>Hobbies</span>
                                            </div>
                                            <div className={`${style.item_section__right} `}>
                                                <button className="btn-pl" >
                                                    <Icon svg={iconPlus} />
                                                </button>
                                            </div>
                                        </div>
                                    </CCol>
                                )
                            }


                            {
                                (list?.extraCurricular?.status === null) && (
                                    <CCol xl={6} className="pb-4">
                                        <div className={`${style.item_section} itm-s`} onClick={() => handleAddItemSection("extraCurricular")}>
                                            <div className={`${style.item_section__left} `}>
                                                <Icon svg={activityIcon} />
                                                <span>Extra-curricular activities</span>
                                            </div>
                                            <div className={`${style.item_section__right} `}>
                                                <button className="btn-pl" >
                                                    <Icon svg={iconPlus} />
                                                </button>
                                            </div>
                                        </div>
                                    </CCol>
                                )
                            }

                            {
                                (list?.reference?.status === null) && (
                                    <CCol xl={6} className="pb-4">
                                        <div className={`${style.item_section} itm-s`} onClick={() => handleAddItemSection("reference")}>
                                            <div className={`${style.item_section__left} `}>
                                                <Icon svg={referencesIcon} />
                                                <span>References</span>
                                            </div>
                                            <div className={`${style.item_section__right} `}>
                                                <button className="btn-pl" >
                                                    <Icon svg={iconPlus} />
                                                </button>
                                            </div>
                                        </div>
                                    </CCol>
                                )
                            }

                            {
                                (list?.courses?.status === null) && (
                                    <CCol xl={6} className="pb-4">
                                        <div className={`${style.item_section} itm-s`} onClick={() => handleAddItemSection("courses")}>
                                            <div className={`${style.item_section__left} `}>
                                                <Icon svg={coursesIcon} />
                                                <span>Courses</span>
                                            </div>
                                            <div className={`${style.item_section__right} `}>
                                                <button className="btn-pl" >
                                                    <Icon svg={iconPlus} />
                                                </button>
                                            </div>
                                        </div>
                                    </CCol>
                                )
                            }

                            {
                                (list?.certificates?.status === null) && (
                                    <CCol xl={6} className="pb-4">
                                        <div className={`${style.item_section} itm-s`} onClick={() => handleAddItemSection("certificates")}>
                                            <div className={`${style.item_section__left} `}>
                                                <Icon svg={certificationsIcon} />
                                                <span>Certifications</span>
                                            </div>
                                            <div className={`${style.item_section__right} `}>
                                                <button className="btn-pl" >
                                                    <Icon svg={iconPlus} />
                                                </button>
                                            </div>
                                        </div>
                                    </CCol>
                                )
                            }

                            {
                                (list?.internship?.status === null) && (
                                    <CCol xl={6} className="pb-4">
                                        <div className={`${style.item_section} itm-s`} onClick={() => handleAddItemSection("internship")}>
                                            <div className={`${style.item_section__left} `}>
                                                <Icon svg={internshipIcon} />
                                                <span>Internship</span>
                                            </div>
                                            <div className={`${style.item_section__right} `}>
                                                <button className="btn-pl" >
                                                    <Icon svg={iconPlus} />
                                                </button>
                                            </div>
                                        </div>
                                    </CCol>
                                )
                            }
                            {/* {
                                (list?.customSection?.status === null) && (
                                    <CCol xl={6} className="pb-4">
                                        <div className={`${style.item_section} ${style.disabled} itm-s`} onClick={() => handleAddItemSection("customSection")}>
                                            <div className={`${style.item_section__left} `}>
                                                <Icon svg={iconSettings} />
                                                <span>Custom section</span>
                                            </div>
                                            <div className={`${style.item_section__right} `}>
                                                <button className="btn-pl" >
                                                    <Icon svg={iconPlus} />
                                                </button>
                                            </div>
                                        </div>
                                    </CCol>
                                )
                            } */}
                        </CRow>
                    )
                )
            }
            <CRow>
                <CCol>
                    <ButtonSteps
                        isFinish={true}
                        isAthorized={isAthorized}
                    />
                </CCol>
            </CRow>
        </>
    )
}

export default AddSection;