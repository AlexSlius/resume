import React from "react";

import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

export const CoverCv006 = ({
    data,
    idCv,
    stateClasses,
    reportTemplateRef,
}) => {
    return (
        <div className="sv_006 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" class={`${stateClasses} cv-chapter-section color-scheme-state-color-set-1`} data-chapter="resume">
                <div class="cv-body cv-body-2 cv-body_height">
                    <div class="cv-body-content">
                        <div class="cv-body-area top-area">
                            <div class="profile-information additional-color-1-border">
                                <h1 class="cv-name font-weight-700 font-size-3 line-height-4">
                                    Matthew Mcconaughey
                                </h1>
                            </div>
                        </div>
                        <div class="cv-body-area middle-area">
                            <h2 class="cv-heading main-color-1-text font-size-2 line-height-3">Dear Dr. Boater,</h2>
                            {
                                !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && (
                                    <p className="cv-text main-color-1-text font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></p>
                                )
                            }
                        </div>
                        <div class="cv-body-area bottom-area additional-color-1-background">
                            <div class="cv-destination">
                                <div class="cv-destination-block">
                                    <div class="destination-details">
                                        <div class="to-block block-block">
                                            <p class="cv-heading main-color-2-text font-weight-700 font-size-2 line-height-2">TO</p>
                                            <span class="horizontal-line main-color-2-border"></span>
                                            <p class="cv-sender main-color-2-text font-size-1 line-height-1">Glenview Assisted Living</p>
                                            <p class="cv-sender main-color-2-text font-size-1 line-height-1">Dr. Henry Boater</p>
                                        </div>
                                        <div class="from-block block-block">
                                            <p class="cv-heading main-color-2-text font-weight-700 font-size-2 line-height-2">FROM</p>
                                            <span class="horizontal-line main-color-2-border"></span>
                                            <div class="cv-destination">
                                                <p class="main-color-2-text font-size-1 line-height-1">Piter Black</p>
                                                <p class="main-color-2-text font-size-1 line-height-1">5th avenue, New York City, 084736, USA</p>
                                                <p class="main-color-2-text font-size-1 line-height-1">+4862534823</p>
                                                <p class="main-color-2-text font-size-1 line-height-1">sellegro@hotmail.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}