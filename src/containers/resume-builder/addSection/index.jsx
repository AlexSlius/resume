import { useDispatch, useSelector } from "react-redux";
import {
    CCol,
    CRow,
} from "@coreui/react";
import { isArray } from "lodash";
import Router from "next/router";

import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import { ButtonSteps } from "../../../components/buttonSteps"
import Icon from "../../../components/Icon";
import { LoadBlock } from "../../../components/loadBlock";

import { fetchPostUpdateCategoryStatus } from "../../../controllers/addSections"
import { localStorageGet } from "../../../helpers/localStorage";
import { isUpdate } from "../../../helpers/checkingStatuses";
import { isLoader } from "../../../helpers/loadings"
import { camelCaseStrind } from "../../../helpers/caseConverters";

import style from "./Style.module.scss"
import iconPlus from "/public/images/icons/icon_plus.svg?sprite";
import activityIcon from '/public/images/icons/activities.svg?sprite'
import coursesIcon from '/public/images/icons/courses.svg?sprite'
import internshipIcon from '/public/images/icons/intership.svg?sprite'
// import iconSettings from '/public/images/icons/icon_settings.svg?sprite'
// import languagesIcon from '/public/images/icons/languages.svg?sprite'
import referencesIcon from '/public/images/icons/references.svg?sprite'
import certificationsIcon from '/public/images/icons/certifications.svg?sprite'
import socialIcon from '/public/images/icons/social.svg?sprite'
import hobbiesIcon from '/public/images/icons/hobies.svg?sprite'

import {
    routersPages
} from "../../../constants/next-routers";


const AddSection = () => {
    const dispatch = useDispatch();
    const {
        auth: {
            autorizate: {
                isAthorized
            }
        },
        addSection: {
            list,
            status
        },
        menuAsideResume
    } = useSelector((state) => state);
    const idCv = localStorageGet('idCv');

    const handleAddItemSection = async (name) => {
        let lengAll = Object.keys(list);
        let colNull = 0;

        Object.keys(list).map(key => {
            if (list[key].status === null) {
                colNull += 1;
            }
        });

        let index = lengAll.length - colNull;

        let res = await dispatch(fetchPostUpdateCategoryStatus({ idCv, data: { [name]: { status: true, index } } }));

        if (isUpdate(res.payload, "update")) {
            let keyLink = camelCaseStrind(name);
            let itemObj = menuAsideResume.list.find(el => el.key == keyLink)

            if (itemObj) {
                Router.push(itemObj.link);
            }
        }
    }

    const clickFinish = () => {
        Router.push(`/${routersPages['dashboard']}`);
    }

    return (
        <>
            <HeadMainContent
                title={'Add Section'}
                description={'You can add the required block, or create a custom one.'}
            >
            </HeadMainContent>

            {
                isLoader(status) ? (
                    <LoadBlock />
                ) : (
                    list && (
                        <CRow className="mt-4">
                            {
                                (list?.extraCurricular?.status === null) && (
                                    <CCol xl={6} className="pb-4">
                                        <div className={`${style.item_section}`}>
                                            <div className={`${style.item_section__left}`}>
                                                <Icon svg={socialIcon} />
                                                <span>Social Links</span>
                                            </div>
                                            <div className={`${style.item_section__right}`}>
                                                <button className="btn-pl" onClick={() => handleAddItemSection("social_links")}>
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
                                        <div className={`${style.item_section}`}>
                                            <div className={`${style.item_section__left}`}>
                                                <Icon svg={hobbiesIcon} />
                                                <span>Hobbies</span>
                                            </div>
                                            <div className={`${style.item_section__right}`}>
                                                <button className="btn-pl" onClick={() => handleAddItemSection("hobbies")}>
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
                                        <div className={`${style.item_section}`}>
                                            <div className={`${style.item_section__left}`}>
                                                <Icon svg={activityIcon} />
                                                <span>Extra-curricular activities</span>
                                            </div>
                                            <div className={`${style.item_section__right}`}>
                                                <button className="btn-pl" onClick={() => handleAddItemSection("extra_curricular")}>
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
                                        <div className={`${style.item_section}`}>
                                            <div className={`${style.item_section__left}`}>
                                                <Icon svg={referencesIcon} />
                                                <span>References</span>
                                            </div>
                                            <div className={`${style.item_section__right}`}>
                                                <button className="btn-pl" onClick={() => handleAddItemSection("reference")}>
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
                                        <div className={`${style.item_section}`}>
                                            <div className={`${style.item_section__left}`}>
                                                <Icon svg={coursesIcon} />
                                                <span>Courses</span>
                                            </div>
                                            <div className={`${style.item_section__right}`}>
                                                <button className="btn-pl" onClick={() => handleAddItemSection("courses")}>
                                                    <Icon svg={iconPlus} />
                                                </button>
                                            </div>
                                        </div>
                                    </CCol>
                                )
                            }

                            {/* {
                                (list?.languages?.status === null) && (
                                    <CCol xl={6} className="pb-4">
                                        <div className={`${style.item_section}`}>
                                            <div className={`${style.item_section__left}`}>
                                                <Icon svg={languagesIcon} />
                                                <span>Languages</span>
                                            </div>
                                            <div className={`${style.item_section__right}`}>
                                                <button className="btn-pl" onClick={() => handleAddItemSection("languages")}>
                                                    <Icon svg={iconPlus} />
                                                </button>
                                            </div>
                                        </div>
                                    </CCol>
                                )
                            } */}

                            {
                                (list?.certificates?.status === null) && (
                                    <CCol xl={6} className="pb-4">
                                        <div className={`${style.item_section}`}>
                                            <div className={`${style.item_section__left}`}>
                                                <Icon svg={certificationsIcon} />
                                                <span>Certifications</span>
                                            </div>
                                            <div className={`${style.item_section__right}`}>
                                                <button className="btn-pl" onClick={() => handleAddItemSection("certificates")}>
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
                                        <div className={`${style.item_section}`}>
                                            <div className={`${style.item_section__left}`}>
                                                <Icon svg={internshipIcon} />
                                                <span>Internship</span>
                                            </div>
                                            <div className={`${style.item_section__right}`}>
                                                <button className="btn-pl" onClick={() => handleAddItemSection("internship")}>
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
                                        <div className={`${style.item_section}`}>
                                            <div className={`${style.item_section__left}`}>
                                                <Icon svg={iconSettings} />
                                                <span>Custom section</span>
                                            </div>
                                            <div className={`${style.item_section__right}`}>
                                                <button className="btn-pl" onClick={() => handleAddItemSection("custom_section")}>
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
                        clickFinish={clickFinish}
                        isFinish={true}
                        isAthorized={isAthorized}
                    />
                </CCol>
            </CRow>
        </>
    )
}

export default AddSection;