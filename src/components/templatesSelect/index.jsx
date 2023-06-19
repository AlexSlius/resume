import { useRouter } from 'next/router'

import { LoadWr } from "../loadWr";
import { isLoader } from "../../helpers/loadings";

import { ResumeCv001 } from '../../resumeTemplates/001-CV';
import { ResumeCv002 } from '../../resumeTemplates/002-CV';
import { ResumeCv003 } from '../../resumeTemplates/003-CV';
import { ResumeCv004 } from '../../resumeTemplates/004-CV';
import { ResumeCv005 } from '../../resumeTemplates/005-CV';
import { ResumeCv006 } from '../../resumeTemplates/006-CV';
import { ResumeCv007 } from '../../resumeTemplates/007-CV';
import { ResumeCv008 } from '../../resumeTemplates/008-CV';
import { ResumeCv009 } from '../../resumeTemplates/009-CV';
import { ResumeCv010 } from '../../resumeTemplates/010-CV';
import { ResumeCv011 } from '../../resumeTemplates/011-CV';
import { ResumeCv013 } from '../../resumeTemplates/013-CV';
import { ResumeCv016 } from '../../resumeTemplates/016-CV';
import { ResumeCv030 } from '../../resumeTemplates/030-CV';
import { ResumeCv031 } from '../../resumeTemplates/031-CV';
import { ResumeCv032 } from '../../resumeTemplates/032-CV';
import { ResumeCv040 } from '../../resumeTemplates/040-CV';
import { ResumeCv041 } from '../../resumeTemplates/041-CV';

import { sizeFont, sizeLineSpacing } from "../../thunks/templates";

export const TemplatesSelect = ({
    scale = "scale(1)",
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
    const stateClasses = `
    ${sizeLineSpacing(+stateLineSpacing)} 
    ${sizeFont(+stateFontSize)} 
    ${isNewResume ?
            (!!resumeData?.resumeActiveNew?.template_class ? resumeData.resumeActiveNew.template_class : "") :
            (!!resumeData?.resumeActive?.template_class ? resumeData.resumeActive.template_class : "")}`;
    const router = useRouter();
    const idCv = router.query.idCv;

    let statusLoad = statusResumeActive || status;

    return (
        <LoadWr isLoad={isLoader(statusLoad)} style={{ transform: scale }} classes='resume_transform'>
            {
                resumeActive == "001-CV" && (
                    <ResumeCv001
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
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

            {
                resumeActive == "005-CV" && (
                    <ResumeCv005
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "006-CV" && (
                    <ResumeCv006
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "007-CV" && (
                    <ResumeCv007
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "008-CV" && (
                    <ResumeCv008
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "009-CV" && (
                    <ResumeCv009
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "010-CV" && (
                    <ResumeCv010
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "011-CV" && (
                    <ResumeCv011
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "013-CV" && (
                    <ResumeCv013
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "016-CV" && (
                    <ResumeCv016
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "030-CV" && (
                    <ResumeCv030
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "031-CV" && (
                    <ResumeCv031
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "032-CV" && (
                    <ResumeCv032
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "040-CV" && (
                    <ResumeCv040
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive == "041-CV" && (
                    <ResumeCv041
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