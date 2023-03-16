import React from "react";
import { useRouter } from 'next/router'

import { LoadWr } from "../loadWr";
import { isLoader } from "../../helpers/loadings";

import { ResumeCv001 } from '../../resumeTemplates/001-CV';
import { ResumeCv002 } from '../../resumeTemplates/002-CV';
import { ResumeCv003 } from '../../resumeTemplates/003-CV';
import { ResumeCv004 } from '../../resumeTemplates/004-CV';
import { sizeFont, sizeLineSpacing } from "../../thunks/templates";

export const TemplatesSelect = ({
    status = "",
    isResume = false,
    stateLineSpacing = 50,
    stateFontSize = 50,
    data,
    resumeData,
    resumeActive,
    statusResumeActive,
    reportTemplateRef,
}) => {
    const stateClasses = `${sizeLineSpacing(stateLineSpacing)} ${sizeFont(stateFontSize)} ${!!resumeData?.resumeActive?.template_class ? resumeData.resumeActive.template_class : ""}`;
    const router = useRouter();
    const idCv = router.query.idCv;

    let statusLoad = statusResumeActive || status;

    return (
        <LoadWr isLoad={isLoader(statusLoad)}>
            {
                resumeActive == "001-CV" && (
                    <ResumeCv001
                        reportTemplateRef={reportTemplateRef}
                        templateClass={resumeData?.resumeActive?.template_class}
                        stateLineSpacing={stateLineSpacing}
                        stateFontSize={stateFontSize}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "002-CV" && (
                    <ResumeCv002
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "003-CV" && (
                    <ResumeCv003
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }
            {
                resumeActive == "004-CV" && (
                    <ResumeCv004
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }
        </LoadWr>
    )
}