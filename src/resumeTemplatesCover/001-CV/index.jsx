import React, { useEffect, useState } from "react";
import { isArray } from "lodash";
import moment from 'moment';

export const CoverCv001 = ({
    data,
    idCv,
    stateLineSpacing,
    stateFontSize,
    templateClass,
    reportTemplateRef,
}) => {
    const [classFontSize, setClassFontSize] = useState(1);
    const [classFontLineSpacing, setClassFontLineSpacing] = useState(1);

    React.useEffect(() => {
        switch (stateLineSpacing) {
            case 0: {
                setClassFontLineSpacing(1);
                break;
            }
            case 50: {
                setClassFontLineSpacing(2);
                break;
            }
            case 100: {
                setClassFontLineSpacing(3);
                break;
            }
        }

    }, [stateLineSpacing]);

    React.useEffect(() => {
        switch (stateFontSize) {
            case 0: {
                setClassFontSize(1);
                break;
            }
            case 50: {
                setClassFontSize(2);
                break;
            }
            case 100: {
                setClassFontSize(3);
                break;
            }
        }
    }, [stateFontSize]);

    return (
        <div className="sv_001" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" className="cv-chapter-section" data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" className={`
                    cv-body 
                    cv-body-2 
                    cv-body---resume 
                    page-2
                    color-scheme-1
                    font-size-scheme-${classFontSize}
                    line-height-scheme-${classFontLineSpacing}
                `}>
                    <div className="cv-body-content">
                        <div className="cv-body-area area-1 additional-color-3-background">
                            <div className="column-left">
                                <h1 className="cv-heading heading-type-1 additional-color-1-text font-size-3 line-height-3">Matthew Mcconaghey</h1>
                            </div>
                        </div>
                        <div className="cv-body-area area-2">
                            <div className="column-left">
                                <div className="cv-letter">
                                    <h2 className="cv-heading cv-letter-heading heading-type-6 font-size-1 line-height-1 additional-color-1-text">Dear Dr. Boater,</h2>
                                    <p className="cv-letter-text font-size-1 line-height-1 main-color-1-text">Having worked as an LPN in geriatric residential care for eight years, I intend to
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
                            </div>
                            <div className="column-right">
                                <div className="cv-destination">
                                    <div className="cv-destination-block additional-color-2-border">
                                        <div className="destination-details">
                                            <p className="cv-heading heading-type-6 font-size-1 line-height-1 additional-color-1-text">To</p>
                                            <p className="cv-sender font-size-1 line-height-1 main-color-1-text">Glenview Assisted Living<br />Dr. Henry Boater</p>
                                            <p className="cv-heading heading-type-6 font-size-1 line-height-1 additional-color-1-text">From</p>
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