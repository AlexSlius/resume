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
            <div id="cv-chapter-section-resume" class={`${stateClasses} cv-chapter-section color-scheme-state-color-set-0`} data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" class="cv-body cv-body-2 cv-body---resume page-2">
                    <div class="cv-body-content">
                        <div class="cv-body-area area-1">
                            <div class="column-left">
                                <h1 class="cv-heading additional-color-1-text cv-name font-weight-600 font-size-5 line-height-4">Matthew Mcconaghey</h1>
                            </div>
                        </div>
                        <div class="cv-body-area area-2">
                            <div class="column-left">
                                <h2 class="cv-heading heading-type-6 font-size-2 line-height-4 main-color-1-text letter-heading">Dear Dr. Boater,</h2>
                                <p class="cv-text font-size-1 line-height-1 main-color-1-text letter-text">Having worked as an LPN in geriatric residential care for eight years, I intend to
                                    transition to a smaller care home that specializes in Alzheimer’s and dementia
                                    and residents with learning difficulties. I believe Glenview Assisted Living
                                    would be the perfect fit for my experience.
                                    While studying for my LPN, I was most intrigued by coursework related to
                                    Alzheimer’s and other forms of dementias. Caring for my elderly grandparents
                                    in my youth showed me the importance of connecting with patients on
                                    whatever level possible and how various therapies can genuinely help to slow
                                    the mental decline. Working in a specialized center focused on dementia care
                                    would be my ideal next step.
                                    I know that as an LPN in Glenview Assisted Living, I will also spend a significant
                                    amount of time helping relatives come to terms with the changes in their
                                    family members. My own experiences allow me to adopt an empathetic
                                    approach. For me, it is an honor to guide and support families through this
                                    emotional journey.
                                    I have well-rounded experience in many areas of general nursing care – from
                                    administration of medication and condition assessment to wound care and
                                    patient documentation. I look forward to the opportunity of visiting Glenview
                                    and hope that my skills and experiences may help me to make a difference to your residents.
                                    <br /><br /><br />
                                    Sincerely,<br />
                                    Kath Jilkins</p>
                            </div>
                            <div class="separator"></div>
                            <div class="column-right">
                                <div class="cv-destination">
                                    <div class="cv-destination-block block-block additional-color-2-border">
                                        <div class="destination-details">
                                            <h3 class="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">
                                                TO
                                                <span class="line-after-block-heading additional-color-2-border"></span>
                                            </h3>
                                            <p class="cv-sender font-size-1 line-height-1 main-color-1-text">Glenview Assisted Living<br />Dr. Henry Boater</p>
                                            <h3 class="cv-heading heading-type-3 font-size-2 line-height-2 additional-color-1-text">
                                                FROM
                                                <span class="line-after-block-heading additional-color-2-border"></span>
                                            </h3>
                                            <p class="cv-destination font-size-1 line-height-1 main-color-1-text">
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