import React from "react";

import { isCheckDescriptionByDataCover } from "../../utils/isChecjDescriptionByData";

export const CoverCv011 = ({
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
        <div className="sv_011 template-wrapper" ref={reportTemplateRef}>
            <div id="cv-chapter-section-resume" class={`${stateClasses} cv-chapter-section color-scheme-state-color-set-0`} data-chapter="resume">
                <div id="cv-body-2" data-chapter="resume" data-page="1" class="cv-body cv-body-2 cv-body---resume page-2 font-size-scheme-1 line-height-scheme-1">
                    <div class="cv-body-content">
                        <div class="column-left">
                            <div class="personal-data-block">
                                <h1 className="cv-name font-size-5 line-height-6">{firstName}{` `} {lastName}</h1>
                            </div>
                            <div class="letter-block">
                                <h2 className="block-heading letter-heading font-size-4 line-height-4 font-weight-400 additional-color-3-text">{!!applyingCompanyTitle && (`Dear ${applyingCompanyTitle}`)} {!!applyingCompanyContact && (<>{applyingCompanyContact},</>)}</h2>
                                {
                                    !!data?.coverGenerateDate && isCheckDescriptionByDataCover(data) && (
                                        <p className="letter-text font-size-2 line-height-2 font-weight-400 additional-color-1-text" dangerouslySetInnerHTML={{ __html: data.coverGenerateDate }}></p>
                                    )
                                }
                            </div>
                        </div>
                        <div class="column-right">
                            <div class="destination-block">
                                <div class="left-block additional-color-2-background"></div>
                                <div class="right-block">
                                    <div class="destination-contacts-block">
                                        {
                                            (!!applyingCompanyName || !!applyingCompanyJobTitle || !!applyingCompanyTitle || applyingCompanyContact) && (
                                                <>
                                                    <div class="block-item">
                                                        <div class="left-side"></div>
                                                        <div class="right-side">
                                                            <h3 class="block-heading font-size-4 line-height-4 font-weight-400 additional-color-3-text">To</h3>
                                                        </div>
                                                    </div>
                                                    <div class="block-item">
                                                        <div class="left-side">
                                                            <svg class="main-color-2-svg" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.87061 5.11842C2.87061 3.11967 4.50102 1.48926 6.49977 1.48926C8.49852 1.48926 10.1289 3.11967 10.1289 5.11842C10.1289 7.59926 6.88435 11.2501 6.74352 11.4018C6.61352 11.548 6.38602 11.548 6.25602 11.4018C6.12061 11.2501 2.87061 7.59926 2.87061 5.11842ZM7.77457 4.91371C7.88603 5.61391 7.40875 6.27189 6.70855 6.38335C6.00835 6.4948 5.35037 6.01752 5.23891 5.31732C5.12746 4.61711 5.60473 3.95914 6.30494 3.84768C7.00514 3.73623 7.66312 4.2135 7.77457 4.91371Z" fill="white" />
                                                            </svg>
                                                        </div>
                                                        <div class="right-side">
                                                            <p className="font-size-2 line-height-2 font-weight-400 additional-color-1-text"> {!!applyingCompanyName && (<>{applyingCompanyName}</>)}{` `}
                                                                {!!applyingCompanyJobTitle && (<>{applyingCompanyJobTitle}<br /></>)}</p>
                                                            <p className="font-size-2 line-height-2 font-weight-400 additional-color-1-text">{!!applyingCompanyTitle && (<>{applyingCompanyTitle}</>)}{` `} {!!applyingCompanyContact && (<>{applyingCompanyContact}</>)}</p>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                        {
                                            (!!state || !!city || !!zipCode || !!country || !!phone || !!email) && (
                                                <>
                                                    <div class="block-item">
                                                        <div class="left-side"></div>
                                                        <div class="right-side">
                                                            <h3 class="block-heading font-size-4 line-height-4 font-weight-400 additional-color-3-text">From</h3>
                                                            {
                                                                !!state && (
                                                                    <p class="font-size-2 line-height-2 font-weight-400 additional-color-1-text">{state}</p>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    <div class="block-item">
                                                        <div class="left-side">
                                                            <svg class="main-color-2-svg" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.87061 5.11842C2.87061 3.11967 4.50102 1.48926 6.49977 1.48926C8.49852 1.48926 10.1289 3.11967 10.1289 5.11842C10.1289 7.59926 6.88435 11.2501 6.74352 11.4018C6.61352 11.548 6.38602 11.548 6.25602 11.4018C6.12061 11.2501 2.87061 7.59926 2.87061 5.11842ZM7.77457 4.91371C7.88603 5.61391 7.40875 6.27189 6.70855 6.38335C6.00835 6.4948 5.35037 6.01752 5.23891 5.31732C5.12746 4.61711 5.60473 3.95914 6.30494 3.84768C7.00514 3.73623 7.66312 4.2135 7.77457 4.91371Z" fill="white" />
                                                            </svg>
                                                        </div>
                                                        <div class="right-side">
                                                            <p class="font-size-2 line-height-2 font-weight-400 additional-color-1-text">
                                                                {`${!!city && (`${city}, `)} ${!!zipCode && (`${zipCode}, `)} ${!!country && (`${country}`)}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {
                                                        !!phone && (
                                                            <div class="block-item">
                                                                <div class="left-side">
                                                                    <svg class="main-color-2-svg" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M6.25081 6.74873C8.35247 8.8504 8.83456 6.41832 10.1725 7.75623C11.4616 9.0454 12.2037 9.3054 10.5679 10.9412C10.3621 11.1037 9.06206 13.0862 4.48498 8.51457C-0.0921061 3.93748 1.89039 2.63748 2.05289 2.43165C3.69414 0.790401 3.94873 1.5379 5.23789 2.82707C6.58123 4.16498 4.14914 4.64707 6.25081 6.74873Z" fill="white" />
                                                                    </svg>
                                                                </div>
                                                                <div class="right-side">
                                                                    <p class="font-size-2 line-height-2 font-weight-400 additional-color-1-text">{phone}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        !!email && (
                                                            <div class="block-item">
                                                                <div class="left-side">
                                                                    <svg class="main-color-2-svg" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.53242 3.67619C1.50446 3.78221 1.48958 3.89344 1.48958 4.00801V8.99134C1.48958 9.71176 2.07458 10.2913 2.78958 10.2913H10.2104C10.9308 10.2913 11.5104 9.71176 11.5104 8.99134V4.00801C11.5104 3.89151 11.4951 3.7787 11.4664 3.67143L7.76132 7.34958L7.76025 7.35065C7.04836 8.06143 5.94851 8.05619 5.23618 7.35299L5.23468 7.35151L1.53242 3.67619ZM10.3044 2.71137C10.2734 2.70914 10.242 2.70801 10.2104 2.70801H2.78958C2.75607 2.70801 2.72287 2.70927 2.69002 2.71176L6.28997 6.28551L6.29052 6.28605C6.42271 6.41611 6.57851 6.41107 6.70066 6.28892L6.7026 6.28698L6.7026 6.28699L10.3044 2.71137Z" fill="white" />
                                                                    </svg>
                                                                </div>
                                                                <div class="right-side">
                                                                    <p class="font-size-2 line-height-2 font-weight-400 additional-color-1-text">{email}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

