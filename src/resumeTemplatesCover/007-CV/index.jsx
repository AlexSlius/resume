import React from "react";

import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

export const CoverCv007 = ({
    data,
    idCv,
    stateClasses,
    reportTemplateRef,
}) => {
    return (
        <div className="sv_007 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" class={`${stateClasses} cv-chapter-section color-scheme-state-color-set-1`} data-chapter="resume">
                <div class="cv-body cv-body-2 cv-body_height">
                    <div class="cv-body-content">
                        <div class="column-left">
                            <div class="cv-destination">
                                <div class="cv-destination-block">
                                    <div class="destination-details">
                                        <p class="headint-type-3 heading-to font-weight-900 font-size-2 line-height-3">TO</p>
                                        <p class="font-size-1 line-height-1">Glenview Assisted Living</p>
                                        <p class="font-size-1 line-height-1">Dr. Henry Boater</p>
                                        <p class="heading-type-3 heading-from font-weight-900 font-size-2 line-height-3">FROM</p>
                                        <p class="font-size-1 line-height-1">Piter Black</p>
                                        <p class="font-size-1 line-height-1">5th avenue, New York City, 084736, USA</p>
                                        <p class="font-size-1 line-height-1">+4862534823</p>
                                        <p class="font-size-1 line-height-1">sellegro@hotmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column-right">
                            <h1 class="cv-name font-size-5 line-height-6">
                                <span class="text-line-1 font-weight-300">Matthew</span>&nbsp;
                                <span class="text-line-2 font-weight-900">Mcconaughey</span>
                            </h1>
                            <div class="letter-wrapper additional-color-2-background">
                                <div class="black-line main-color-1-background"></div>
                                <h2 class="cv-heading font-weight-600 font-size-2 line-height-3">Dear Dr. Boater,</h2>
                                {
                                    !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && (
                                        <p className="font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></p>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div class="nine-points nine-points-1">
                        <div class="inner-wrapper">
                            <div class="point p1 additional-color-1-background"></div>
                            <div class="point p2 additional-color-1-background"></div>
                            <div class="point p3 additional-color-1-background"></div>
                            <div class="point p4 additional-color-1-background"></div>
                            <div class="point p5 additional-color-1-background"></div>
                            <div class="point p6 additional-color-1-background"></div>
                            <div class="point p7 additional-color-1-background"></div>
                            <div class="point p8 additional-color-1-background"></div>
                            <div class="point p9 additional-color-1-background"></div>
                        </div>
                    </div>

                    <div class="nine-points nine-points-2">
                        <div class="inner-wrapper">
                            <div class="point p1 additional-color-1-background"></div>
                            <div class="point p2 additional-color-1-background"></div>
                            <div class="point p3 additional-color-1-background"></div>
                            <div class="point p4 additional-color-1-background"></div>
                            <div class="point p5 additional-color-1-background"></div>
                            <div class="point p6 additional-color-1-background"></div>
                            <div class="point p7 additional-color-1-background"></div>
                            <div class="point p8 additional-color-1-background"></div>
                            <div class="point p9 additional-color-1-background"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}