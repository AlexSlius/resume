import React from "react";
import { useRouter } from 'next/router'

import { LoadWr } from "../loadWr";
import { isLoader } from "../../helpers/loadings";
import { sizeFont, sizeLineSpacing } from "../../thunks/templates";

import { CoverCv001 } from '../../resumeTemplatesCover/001-CV';
import { CoverCv002 } from '../../resumeTemplatesCover/002-CV';
import { CoverCv003 } from '../../resumeTemplatesCover/003-CV';
import { CoverCv004 } from '../../resumeTemplatesCover/004-CV';
import { CoverCv005 } from '../../resumeTemplatesCover/005-CV';
import { CoverCv006 } from '../../resumeTemplatesCover/006-CV';
import { CoverCv007 } from '../../resumeTemplatesCover/007-CV';
import { CoverCv008 } from '../../resumeTemplatesCover/008-CV';
import { CoverCv009 } from '../../resumeTemplatesCover/009-CV';
import { CoverCv010 } from '../../resumeTemplatesCover/010-CV';
import { CoverCv011 } from '../../resumeTemplatesCover/011-CV';
import { CoverCv016 } from '../../resumeTemplatesCover/016-CV';


export const TemplatesSelectCover = ({
    status = "",
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
                    <CoverCv001
                        // reportTemplateRef={reportTemplateRef}
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
                    <CoverCv002
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "003-CV" && (
                    <CoverCv003
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }
            {
                resumeActive == "004-CV" && (
                    <CoverCv004
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "005-CV" && (
                    <CoverCv005
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "006-CV" && (
                    <CoverCv006
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "007-CV" && (
                    <CoverCv007
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "008-CV" && (
                    <CoverCv008
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "009-CV" && (
                    <CoverCv009
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "010-CV" && (
                    <CoverCv010
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "011-CV" && (
                    <CoverCv011
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "016-CV" && (
                    <CoverCv016
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