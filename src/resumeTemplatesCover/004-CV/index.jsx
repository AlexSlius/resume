import React from "react";

import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

export const CoverCv004 = ({
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
        <div className="sv_004 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" class="cv-chapter-section" data-chapter="resume">
                <div id="cv-body-2 " data-chapter="resume" data-page="1" class={`${stateClasses} cv-body cv-body_height cv-body-2 cv-body---resume page-2`}>
                    <div class="cv-body-content">
                        <div class="name-block toggle-photo-state toggle-photo-state-active">
                            <h1 class="additional-color-1-text font-size-4 line-height-4 font-family-arsenal">{firstName}{` `} {lastName}</h1>
                        </div>
                        <div class="columns-wrapper">
                            <div class="column-1">
                                <div class="letter-block">
                                    <h3 className="first-line additional-color-1-text font-size-3 line-height-3">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h3>
                                    {
                                        !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && (
                                            <p className="font-size-1 line-height-1" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></p>
                                        )
                                    }
                                </div>
                            </div>
                            {
                                (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact || !!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                    <div class="column-2">
                                        {
                                            (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact) && (
                                                <div class="to-block">
                                                    <h3 class="additional-color-1-text font-size-3 line-height-3 font-family-arsenal">TO</h3>
                                                    <div className="to-block">
                                                        <h3 class="additional-color-1-text font-size-3 line-height-3 font-family-arsenal">TO</h3>
                                                        <p class="font-size-1 line-height-1"> {!!applyingCompanyName && (<>{applyingCompanyName}</>)}{` `}
                                                            {!!applyingCompanyJobTitle && (<>{applyingCompanyJobTitle}<br /></>)}</p>
                                                        <p class="font-size-1 line-height-1">{!!applyingCompanyTitle && (<>{applyingCompanyTitle}</>)}{` `} {!!applyingCompanyContact && (<>{applyingCompanyContact}</>)}</p>
                                                    </div>
                                                </div>
                                            )
                                        }

                                        {
                                            (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                                <div className="from-block block-block">
                                                    <h3 class="additional-color-1-text font-size-3 line-height-3 font-family-arsenal">FROM</h3>
                                                    <p className="font-size-1 line-height-1">
                                                        {!!state && (<>{state}<br /></>)}
                                                        {!!city && (<>{city}<br /></>)}
                                                        {!!zipCode && (<>{zipCode}<br /></>)}
                                                        {!!country && (<>{country}<br /></>)}
                                                        {!!phone && (<>{phone}<br /></>)}
                                                        {
                                                            !!email && (email)
                                                        }
                                                    </p>
                                                </div>
                                            )
                                        }

                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}