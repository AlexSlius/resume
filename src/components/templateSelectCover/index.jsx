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
import { CoverCv030 } from '../../resumeTemplatesCover/030-CV';
import { CoverCv031 } from '../../resumeTemplatesCover/031-CV';
import { CoverCv032 } from '../../resumeTemplatesCover/032-CV';
import { CoverCv040 } from '../../resumeTemplatesCover/040-CV';
import { CoverCv041 } from '../../resumeTemplatesCover/041-CV';

export const TemplatesSelectCover = ({
    isNewResume,
    status = "",
    stateLineSpacing = 50,
    stateFontSize = 50,
    data,
    resumeData,
    resumeActive,
    statusResumeActive,
    reportTemplateRef,
}) => {
    const stateClasses = `${sizeLineSpacing(+stateLineSpacing)} ${sizeFont(+stateFontSize)} 
    ${isNewResume ?
            (!!resumeData?.resumeActiveNew?.template_class ? resumeData.resumeActiveNew.template_class : "")
            : (!!resumeData?.resumeActive?.template_class ? resumeData.resumeActive.template_class : "")}`;
    const router = useRouter();
    const idCv = router.query.idCv;

    let statusLoad = statusResumeActive || status;

    return (
        <LoadWr isLoad={isLoader(statusLoad)}>
            {
                resumeActive == "001-CV" && (
                    <CoverCv001
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
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

            {
                resumeActive == "030-CV" && (
                    <CoverCv030
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "031-CV" && (
                    <CoverCv031
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "032-CV" && (
                    <CoverCv032
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "040-CV" && (
                    <CoverCv040
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "041-CV" && (
                    <CoverCv041
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