import React from "react";
import { isArray } from "lodash";
import moment from 'moment';
import styled from 'styled-components';

export const CoverCv003 = ({
    data,
    idCv,
    stateClasses,
    reportTemplateRef,
}) => {
    return (
        <div className="sv_003 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className="cv-chapter-section" data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className={`${stateClasses} cv-body cv-body-2 cv-body---resume page-2 color-scheme-state-color-set-0`}>
                    <div className="cv-body-content">
                        <div className="cv-body-area area-1 additional-color-2-background">
                            <div className="column-left">
                                <h1 className="cv-heading cv-name heading-type-1 main-color-1-text font-size-3 line-height-3">
                                    <span className="name-line-1 font-weight-400">Matthew</span>
                                    <span className="name-line-2 font-weight-600">Mcconaghey</span>
                                </h1>
                            </div>
                        </div>
                        <div className="cv-body-area area-2">
                            <div className="column-left">
                                <div className="cv-letter">
                                    <h2 className="cv-heading letter-heading heading-type-6 font-size-2-2 line-height-2-2 main-color-1-text">Dear Dr. Boater,</h2>
                                    {
                                        !!data?.coverGenerateDate && (
                                            <p className="cv-text letter-text font-size-1 line-height-1 main-color-1-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></p>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="column-right">
                                <div className="cv-destination main-color-1-border">
                                    <div className="cv-destination-block block-block additional-color-2-border">
                                        <div className="destination-details">
                                            <div className="block-to">
                                                <h3 className="cv-heading heading-type-3 font-weight-600 font-size-1 line-height-1 main-color-1-text">
                                                    TO
                                                    <span className="line-after-block-heading additional-color-2-border"></span>
                                                </h3>
                                                <p className="cv-sender font-size-1 line-height-1 main-color-1-text">Glenview Assisted Living<br />Dr. Henry Boater</p>
                                            </div>
                                            <div className="block-from">
                                                <h3 className="cv-heading heading-type-3 font-weight-600 font-size-1 line-height-1 main-color-1-text">
                                                    FROM
                                                    <span className="line-after-block-heading additional-color-2-border"></span>
                                                </h3>
                                                <p className="font-size-1 line-height-1 main-color-1-text">
                                                    Piter Black<br />
                                                    5th avenue<br />
                                                    New York City<br />
                                                    084736<br />
                                                    USA<br />
                                                    +4862534823<br />
                                                    sellegro@hotmail.com
                                                </p>
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