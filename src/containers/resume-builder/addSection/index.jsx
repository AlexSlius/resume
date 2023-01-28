import { useDispatch, useSelector } from "react-redux";
import {
    CCol,
    CRow,
} from "@coreui/react";

import HeadMainContent from "../../../components/headMainContent/HeadMainContent"
import { ButtonSteps } from "../../../components/buttonSteps"
import Icon from "../../../components/Icon";

import style from "./Style.module.scss"
import iconPlus from "/public/images/icons/icon_plus.svg?sprite";
import activityIcon from '/public/images/icons/activities.svg?sprite'
import coursesIcon from '/public/images/icons/courses.svg?sprite'
import internshipIcon from '/public/images/icons/intership.svg?sprite'
import languagesIcon from '/public/images/icons/languages.svg?sprite'
import iconSettings from '/public/images/icons/icon_settings.svg?sprite'
import referencesIcon from '/public/images/icons/references.svg?sprite'
import certificationsIcon from '/public/images/icons/certifications.svg?sprite'


const AddSection = () => {
    const dispatch = useDispatch();
    const {
        auth: {
            autorizate: {
                isAthorized
            }
        },
    } = useSelector((state) => state);

    return (
        <>
            <HeadMainContent
                title={'Add Section'}
                description={'You can add the required block, or create a custom one.'}
            >
            </HeadMainContent>
            <CRow className="mt-4">
                <CCol xl={6} className="pb-4">
                    <div className={`${style.item_section}`}>
                        <div className={`${style.item_section__left}`}>
                            <Icon svg={activityIcon} />
                            <span>Extra-curricular activities</span>
                        </div>
                        <div className={`${style.item_section__right}`}>
                            <button className="btn-pl">
                                <Icon svg={iconPlus} />
                            </button>
                        </div>
                    </div>
                </CCol>
                <CCol xl={6} className="pb-4">
                    <div className={`${style.item_section}`}>
                        <div className={`${style.item_section__left}`}>
                            <Icon svg={referencesIcon} />
                            <span>References</span>
                        </div>
                        <div className={`${style.item_section__right}`}>
                            <button className="btn-pl">
                                <Icon svg={iconPlus} />
                            </button>
                        </div>
                    </div>
                </CCol>
                <CCol xl={6} className="pb-4">
                    <div className={`${style.item_section}`}>
                        <div className={`${style.item_section__left}`}>
                            <Icon svg={coursesIcon} />
                            <span>Courses</span>
                        </div>
                        <div className={`${style.item_section__right}`}>
                            <button className="btn-pl">
                                <Icon svg={iconPlus} />
                            </button>
                        </div>
                    </div>
                </CCol>
                <CCol xl={6} className="pb-4">
                    <div className={`${style.item_section}`}>
                        <div className={`${style.item_section__left}`}>
                            <Icon svg={languagesIcon} />
                            <span>Languages</span>
                        </div>
                        <div className={`${style.item_section__right}`}>
                            <button className="btn-pl">
                                <Icon svg={iconPlus} />
                            </button>
                        </div>
                    </div>
                </CCol>
                <CCol xl={6} className="pb-4">
                    <div className={`${style.item_section}`}>
                        <div className={`${style.item_section__left}`}>
                            <Icon svg={certificationsIcon} />
                            <span>Certifications</span>
                        </div>
                        <div className={`${style.item_section__right}`}>
                            <button className="btn-pl">
                                <Icon svg={iconPlus} />
                            </button>
                        </div>
                    </div>
                </CCol>
                <CCol xl={6} className="pb-4">
                    <div className={`${style.item_section}`}>
                        <div className={`${style.item_section__left}`}>
                            <Icon svg={internshipIcon} />
                            <span>Internship</span>
                        </div>
                        <div className={`${style.item_section__right}`}>
                            <button className="btn-pl">
                                <Icon svg={iconPlus} />
                            </button>
                        </div>
                    </div>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <ButtonSteps isFinish={true} isAthorized={isAthorized} />
                </CCol>
            </CRow>
        </>
    )
}

export default AddSection;