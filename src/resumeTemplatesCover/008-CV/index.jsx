import React from "react";

import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

export const CoverCv008 = ({
    data,
    idCv,
    stateClasses,
    reportTemplateRef,
}) => {
    return (
        <div className="sv_008 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" class={`${stateClasses} cv-chapter-section  color-scheme-state-color-set-1`} data-chapter="resume">
                <div class="cv-body cv-body-2 cv-body_height main-color-3-background">
                    <div class="red-circle-1 additional-color-1-background"></div>
                    <div class="red-circle-2 additional-color-1-background"></div>
                    <div class="white-circle main-color-2-border"></div>
                    <div class="cv-body-content">
                        <div class="cv-body-area top-area">
                            <div class="column-left">
                                <h1 class="cv-name font-size-6 line-height-9 main-color-2-text">Matthew Mcconaghey</h1>
                                <span class="white-line main-color-2-border"></span>
                            </div>
                        </div>
                        <div class="cv-body-area middle-area">
                            <div class="column-left"></div>
                            <div class="column-right">
                                <h2 class="cv-heading font-weight-500 font-size-4 line-height-0 main-color-2-text">Dear Dr. Boater,</h2>
                                {
                                    !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && (
                                        <p className="cv-text font-size-1 line-height-1 main-color-2-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></p>
                                    )
                                }
                            </div>
                        </div>
                        <div class="cv-body-area bottom-area">
                            <div class="column-left">
                                <div class="cv-destination">
                                    <div class="cv-destination-block">
                                        <div class="destination-details">
                                            <p class="cv-heading to-heading font-weight-700 font-size-2 line-height-0-1 main-color-2-text">TO</p>
                                            <p class="cv-sender font-size-1 line-height-1 main-color-2-text">Glenview Assisted Living<br />Dr. Henry Boater</p>
                                            <p class="cv-heading from-heading font-weight-700 font-size-2 line-height-0-1 main-color-2-text">FROM</p>
                                            <p class="font-size-1 line-height-1 main-color-2-text">Piter Black</p>
                                            <p class="font-size-1 line-height-1 main-color-2-text">5th avenue</p>
                                            <p class="font-size-1 line-height-1 main-color-2-text">New York City</p>
                                            <p class="font-size-1 line-height-1 main-color-2-text">084736</p>
                                            <p class="font-size-1 line-height-1 main-color-2-text">USA</p>
                                            <p class="font-size-1 line-height-1 main-color-2-text">+4862534823</p>
                                            <p class="font-size-1 line-height-1 main-color-2-text">sellegro@hotmail.com</p>
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