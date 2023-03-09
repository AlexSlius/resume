import { CButton } from '@coreui/react'
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import { useSelector, useDispatch } from "react-redux";
import Router, { useRouter } from 'next/router';
import { isArray } from 'lodash';

import { TemplatesSelect } from '../../components/templatesSelect';
import Icon from "../../components/Icon";
import { ButtonIcon } from "../../components/uis/buttonIcon";
import TemplateHead from "../../components/templateHead/TemplateHead";
import { ButtonBack } from "../../components/uis/buttonBack"
import { Buttonhelp } from "../../components/uis/buttonHelp"

import { routersPages } from "../../constants/next-routers";

import iconPlusColor from "/public/images/icons/plus-color.svg?sprite";
import downloadIcon from '/public/images/icons/download-white.svg?sprite'
import dotsIcon from '/public/images/icons/dots.svg?sprite'
import CustomizedSlider from '../../components/uis/range';

import {
    fetchGetResumeData,
    getResumeActive,
    setUpdateResumeActive
} from "../../controllers/resumeData";


const Templates = () => {
    const refIdTimeout = React.useRef(undefined);
    const [stateLineSpacing, setStateLIneSpacig] = React.useState(50);
    const [stateFontSize, setStateFontSize] = React.useState(50);

    const dispatch = useDispatch();
    const router = useRouter();
    const { idCv, type = "new", slug = "001-CV" } = router.query;
    const reportTemplateRef = useRef(null);
    const isNewResume = (idCv == "new");

    const {
        auth: {
            autorizate: {
                isAthorized,
            }
        },
        theme: {
            currentResolution
        },
        resumeData,
        contacts: {
            contactObj
        },
        employment,
        educations,
        skills,
        socials,
        hobies,
        interships,
        courses,
        activitys,
        languages,
        references,
        certificaties,
        careers,
    } = useSelector((state) => state);

    let dataResumeTemplate = {
        contact: [contactObj],
        employment: employment.employmentObj,
        education: educations.educationObj,
        skills: skills.skillsObj,
        social_links: socials.socialObj,
        hobbies: hobies.hobiesObj,
        internship: interships.interhipObj,
        courses: courses.courseObj,
        extra_curricular: activitys.activityObj,
        career_objective: [{ data: careers.data }],
        languages: languages.languageObj,
        reference: references.referencesObj,
        certificates: certificaties.certificatiesObj,
    };

    const handleGeneratePdf = () => {
        const doc = new jsPDF({
            format: 'a4',
            // unit: 'px',
        });

        doc.setLineWidth(1);

        // Adding the fonts.
        doc.setFont('Rubik', 'normal');

        doc.html(reportTemplateRef.current, {
            async callback(doc) {
                await doc.save('document');
            },
        });
    };

    // update resume
    const handleResume = (item) => {
        if (idCv != "new") {
            dispatch(setUpdateResumeActive({ idCv, data: { cv_template_id: item.id }, isGet: true }));
        } else {
            Router.push(`/${routersPages['resumeBuilderNew']}?type=${item.id}`)
        }
    }

    const handleLineSpacing = (e) => {
        setStateLIneSpacig(e.target.value);
    }

    const handleFontSize = (e) => {
        setStateFontSize(e.target.value);
    }

    const handleUpdateServer = async (index) => {
        if (refIdTimeout.current) {
            clearTimeout(refIdTimeout.current);
        }

        refIdTimeout.current = setTimeout(async () => {
            await dispatch(setUpdateResumeActive({
                idCv, data: {
                    cv_template_id: resumeData?.resumeActive?.template_id,
                    template_line_spacing: stateLineSpacing,
                    template_text_size: stateFontSize,
                }, isGet: false
            }));
            clearTimeout(refIdTimeout.current);
        }, 1000);
    }

    React.useEffect(() => {
        if (idCv != "new") {
            handleUpdateServer();
        }
    }, [stateLineSpacing, stateFontSize]);

    React.useEffect(() => {
        setStateLIneSpacig(resumeData?.resumeActive?.template_line_spacing ? +resumeData?.resumeActive?.template_line_spacing : 50);
        setStateFontSize(resumeData?.resumeActive?.template_text_size ? +resumeData?.resumeActive?.template_text_size : 50);
    }, [resumeData]);

    React.useEffect(() => {
        if (idCv != "new") {
            dispatch(fetchGetResumeData({ idCv }));
            dispatch(getResumeActive({ idCv }));
        }
    }, []);

    return (
        <div className="page-templates">
            <div className="page-templates__row">
                <div className="page-templates__left">
                    <div className="pt_h pt_h-l plr-30">
                        <div className="pt_h-btn-back">
                            <ButtonBack text="Back to editor" />
                        </div>
                    </div>
                    <div className="pt-ts scroll-style">
                        {
                            isArray(resumeData?.list?.items) && resumeData.list.items.map((item, index) => {
                                let classActive = isNewResume ? `${item.slug == slug ? "active" : ""}` : `${item.id == resumeData?.resumeActive?.template_id ? "active" : ""}`;

                                return (
                                    <div
                                        key={index}
                                        className={`it-t ${classActive}`}
                                        onClick={() => handleResume(item)}
                                    >
                                        <img src={item.image} alt={item.name} />
                                        {
                                            (isArray(item?.types) && item.types.length > 0) && (
                                                <div className="item-card-resum__types">
                                                    {
                                                        item.types.map((itemType, index) => (
                                                            <div key={index} className="item-type type-ptf" style={{ background: itemType.background }}>{itemType.name}</div>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="pt_b-l plr-30">
                        <div className="pt_b-l_help">
                            <Buttonhelp isBlack={true} href={`/${routersPages['contactUs']}`} />
                        </div>
                    </div>
                </div>
                <div className="page-templates__right">
                    <div className="pt_h pt_h-r">
                        <TemplateHead />
                    </div>
                    <div className="ptr-c scroll-style">
                        <div className="ptr-c__content">
                            <div className="body-template-resume">
                                <TemplatesSelect
                                    status={resumeData?.status}
                                    stateLineSpacing={stateLineSpacing}
                                    stateFontSize={stateFontSize}

                                    data={isNewResume ? dataResumeTemplate : resumeData?.data}
                                    resumeActive={isNewResume ? slug : resumeData?.resumeActive?.template_slug}
                                    statusResumeActive={resumeData?.statusResumeActive}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="pt_b-r plr">
                        <div className="colors-t">
                            <div className="color-it" style={{ background: "#36F0AB" }}></div>
                            <div className="color-it" style={{ background: "#F0E208" }}></div>
                            <div className="color-it" style={{ background: "#63E1FF" }}></div>
                            <div className="color-it" style={{ background: "#FFC85E" }}></div>
                            <div className="color-it" style={{ background: "#FE8484" }}></div>
                            <div className="color-it color-select">
                                <Icon svg={iconPlusColor} />
                            </div>
                        </div>
                        <div className="ranges-row">
                            <div className='item-range'>
                                <CustomizedSlider
                                    defaultValue={50}
                                    value={stateLineSpacing}
                                    label="Line Spacing"
                                    textLeft="50%"
                                    textRight="150%"
                                    onChange={handleLineSpacing}
                                />
                            </div>
                            <div className='item-range'>
                                <CustomizedSlider
                                    defaultValue={50}
                                    value={stateFontSize}
                                    label="Text size"
                                    textLeft="12 pt"
                                    textRight="48 pt"
                                    onChange={handleFontSize}
                                />
                            </div>
                        </div>
                        <div className="btns-tem">
                            <ButtonIcon
                                isButton={true}
                                icon={downloadIcon}
                                label="Download PDF"
                                className="btn--blue"
                                onHandle={handleGeneratePdf}
                            />
                            <CButton
                                className='resume-footer__button'
                                color="secondary"
                                variant="outline"
                            >
                                <Icon svg={dotsIcon} classNames={['icon-20']} />
                            </CButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Templates;