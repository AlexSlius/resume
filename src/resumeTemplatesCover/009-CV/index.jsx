import React from "react";

import Icon from "../../components/Icon";

import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

import imgBg from "/public/styles/resumes/009/image/bgBot.svg?sprite";

export const CoverCv009 = ({
    data,
    idCv,
    stateClasses,
    reportTemplateRef,
}) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        country,
        city,
        zipCode,
        state,
        applyingCompanyName,
        applyingCompanyJobTitle,
        applyingCompanyTitle,
        applyingCompanyContact,
    } = data;

    return (
        <div className="sv_009 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" class={`${stateClasses} cv-chapter-section  color-scheme-state-color-set-1`} data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className="cv-body cv-body_height cv-body-2 cv-body---resume page-2 font-size-scheme-1 line-height-scheme-1">
                    <div className="cv-body-content">
                        <div className="cv-body-area top-area">
                            <div className="background-image">
                                <img src="/styles/resumes/009/image/top_area_bg.png" />
                            </div>
                            <div className="column-left">
                            </div>
                            <div className="column-right">
                                <h1 className="cv-name main-color-2-text font-weight-400 font-size-8 line-height-9-1">{firstName}{` `} {lastName}</h1>
                                <div className="white-line main-color-2-border"></div>
                            </div>
                        </div>
                        <div className="cv-body-area middle-area main-color-3-background">
                            <div className="column-right">
                                <div className="letter-body">
                                    <h3 className="letter-heading font-weight-500 font-size-3 line-height-5-1">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h3>
                                    {
                                        !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && (
                                            <div className="letter-text font-weight-400 font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="cv-body-area bottom-area">
                            <div className="bg-image-container">
                                <Icon svg={imgBg} classNames={["additional-color-2-svg-path"]}/>
                            </div>
                            <div className="column-right">
                                <div className="delivery-block">
                                    {
                                        (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact) && (
                                            <div className="block-to">
                                                <h3 className="heading-type-1 font-weight-500 font-size-5 line-height-7 main-color-2-text">To</h3>
                                                <p className="font-weight-500 font-size-1 line-height-1 main-color-2-text"> {!!applyingCompanyName && (<>{applyingCompanyName}</>)}{` `}
                                                    {!!applyingCompanyJobTitle && (<>{applyingCompanyJobTitle}</>)} </p>
                                                <p className="font-weight-500 font-size-1 line-height-1 main-color-2-text">{!!applyingCompanyTitle && (<>{applyingCompanyTitle}</>)}{` `} {!!applyingCompanyContact && (<>{applyingCompanyContact}</>)}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                            <div className="block-from">
                                                <h3 className="heading-type-1 font-weight-500 font-size-5 line-height-7 main-color-2-text">From</h3>
                                                {!!state && (<p className="font-weight-500 font-size-1 line-height-1 main-color-2-text">{state}<br /></p>)}
                                                {!!city && (<p className="font-weight-500 font-size-1 line-height-1 main-color-2-text">{`${!!city && (`${city}, `)} ${!!zipCode && (`${zipCode}, `)} ${!!country && (`${country}`)}`}<br /></p>)}
                                                {!!phone && (<p className="font-weight-500 font-size-1 line-height-1 main-color-2-text">{phone}<br /></p>)}
                                                {!!email && (<p className="font-weight-500 font-size-1 line-height-1 main-color-2-text">{email}</p>)}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}