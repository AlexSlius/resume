import { CButton } from '@coreui/react'
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import { useSelector, useDispatch } from "react-redux";
import Router, { useRouter } from 'next/router'

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
import { isArray } from 'lodash';

import {
    fetchGetResumeData,
    getResumeActive,
    setUpdateResumeActive
} from "../../controllers/resumeData";
import { TemplatesSelect } from './templatesSelect';

const Templates = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const idCv = router.query.idCv;
    const reportTemplateRef = useRef(null);

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
    } = useSelector((state) => state);

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

    const handleResume = (item) => {
        if (idCv != "new") {
            dispatch(setUpdateResumeActive({ idCv, data: { cv_template_id: item.id }, isGet: true }));
        } else {
            Router.push(`/${routersPages['resumeBuilderNew']}?type=${item.id}`)
        }
    }

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
                            isArray(resumeData?.list?.items) && resumeData.list.items.map((item, index) => (
                                <div
                                    key={index}
                                    className={`it-t ${item.id == resumeData?.resumeActive?.template_id ? "active" : ""}`}
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
                            ))
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
                            <TemplatesSelect
                                reportTemplateRef={reportTemplateRef}
                                status={resumeData?.status}
                            />
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
                                    label="Line Spacing"
                                    textLeft="50%"
                                    textRight="150%"
                                />
                            </div>
                            <div className='item-range'>
                                <CustomizedSlider
                                    defaultValue={50}
                                    label="Text size"
                                    textLeft="12 pt"
                                    textRight="48 pt"
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