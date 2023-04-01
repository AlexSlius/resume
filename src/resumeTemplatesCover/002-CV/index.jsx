import React from "react";
import { isArray } from "lodash";
import moment from 'moment';
import styled from 'styled-components';

export const CoverCv002 = ({
    data,
    idCv,
    stateClasses,
    reportTemplateRef,
}) => {
    return (
        <div className="sv_002" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className={`${stateClasses} cv-chapter-section color-scheme-state-color-set-0`} data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className="cv-body cv-body-2 cv-body---resume page-2">
                    <div className="cv-body-content">
                        <div className="cv-body-area area-1">
                            <div className="column-left">
                                <h1 className="cv-heading additional-color-1-text cv-name font-weight-600 font-size-5 line-height-4">Matthew Mcconaghey</h1>
                            </div>
                        </div>
                        <div className="cv-body-area area-2">
                            <div className="column-left">
                                <h2 className="cv-heading heading-type-6 font-size-2 line-height-4 main-color-1-text letter-heading">Dear Dr. Boater,</h2>
                                {
                                    !!data?.coverGenerateDate && (
                                        <p className="cv-text font-size-1 line-height-1 main-color-1-text letter-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></p>
                                    )
                                }
                            </div>
                            <div className="separator"></div>
                            <div className="column-right">
                                <div className="cv-destination">
                                    <div className="cv-destination-block block-block additional-color-2-border">
                                        <div className="destination-details">
                                            <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">
                                                TO
                                                <span className="line-after-block-heading additional-color-2-border"></span>
                                            </h3>
                                            <p className="cv-sender font-size-1 line-height-1 main-color-1-text">Glenview Assisted Living<br />Dr. Henry Boater</p>
                                            <h3 className="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">
                                                FROM
                                                <span className="line-after-block-heading additional-color-2-border"></span>
                                            </h3>
                                            <p className="cv-destination font-size-1 line-height-1 main-color-1-text">
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
    )
}