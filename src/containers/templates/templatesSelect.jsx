import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router'

import { LoadWr } from "../../components/loadWr";
import { isLoader } from "../../helpers/loadings";

import { ResumeCv001 } from '../../resumeTemplates/001-CV';
import { ResumeCv002 } from '../../resumeTemplates/002-CV';
import { ResumeCv003 } from '../../resumeTemplates/003-CV';
import { sizeFont, sizeLineSpacing } from "../../thunks/templates";

export const TemplatesSelect = ({
    reportTemplateRef,
    status,
    stateLineSpacing,
    stateFontSize,
}) => {
    const stateClasses = `${sizeLineSpacing(stateLineSpacing)} ${sizeFont(stateFontSize)}`
    const router = useRouter();
    const idCv = router.query.idCv;

    const {
        resumeData: {
            data,
            resumeActive,
            statusResumeActive
        }
    } = useSelector(state => state);

    let statusLoad = statusResumeActive || status;

    return (
        <LoadWr isLoad={isLoader(statusLoad)}>
            <div className="body-template-resume">
                {
                    resumeActive?.template_slug == "001-CV" && (
                        <ResumeCv001
                            stateLineSpacing={stateLineSpacing}
                            stateFontSize={stateFontSize}
                            refs={reportTemplateRef}
                            data={data}
                            idCv={idCv}
                        />
                    )
                }

                {
                    resumeActive?.template_slug == "002-CV" && (
                        <ResumeCv002
                            stateClasses={stateClasses}
                            refs={reportTemplateRef}
                            data={data}
                            idCv={idCv}
                        />
                    )
                }

                {
                    resumeActive?.template_slug == "003-CV" && (
                        <ResumeCv003
                            stateClasses={stateClasses}
                            refs={reportTemplateRef}
                            data={data}
                            idCv={idCv}
                        />
                    )
                }
            </div>
        </LoadWr>
    )
}