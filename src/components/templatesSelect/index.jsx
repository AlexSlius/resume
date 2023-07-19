import { useRouter } from 'next/router'
import { useRef } from "react";
import { useDispatch } from "react-redux";

import { LoadWr } from "../loadWr";
import { isLoader } from "../../helpers/loadings";
import { handleCVUpdateDrawingTrue, handleCVUpdateDrawingFalse } from "../../slices/resumeData";
import { sizeFont, sizeLineSpacing } from "../../thunks/templates";

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
import { ResumeCv015 } from '../../resumeTemplates/015-CV';
import { ResumeCv016 } from '../../resumeTemplates/016-CV';
import { ResumeCv017 } from '../../resumeTemplates/017-CV';
import { ResumeCv026 } from '../../resumeTemplates/026-CV';
import { ResumeCv029 } from '../../resumeTemplates/029-CV';
import { ResumeCv030 } from '../../resumeTemplates/030-CV';
import { ResumeCv031 } from '../../resumeTemplates/031-CV';
import { ResumeCv032 } from '../../resumeTemplates/032-CV';
import { ResumeCv039 } from '../../resumeTemplates/039-CV';
import { ResumeCv040 } from '../../resumeTemplates/040-CV';
import { ResumeCv041 } from '../../resumeTemplates/041-CV';

export const TemplatesSelect = ({
    isNewResume,
    status = "",
    stateLineSpacing = 50,
    stateFontSize = 50,
    data,
    resumeData,
    resumeActive,
    statusResumeActive,
    reportTemplateRef,
    drawing = false,
    isTemplate = false,
    handleReload = () => { },
    objActiveBlock,
}) => {
    const dispatch = useDispatch();
    const refIdTimeout = useRef(undefined);
    const stateClasses = `
    ${sizeLineSpacing(+stateLineSpacing)} 
    ${sizeFont(+stateFontSize)} 
    ${isNewResume ?
            (!!resumeData?.resumeActiveNew?.template_class ? resumeData.resumeActiveNew.template_class : "") :
            (!!resumeData?.resumeActive?.template_class ? resumeData.resumeActive.template_class : "")}`;
    const router = useRouter();
    const idCv = router.query.idCv;

    let statusLoad = statusResumeActive || status;

    const handleFalseDrafind = () => {
        if (isNewResume) {
            dispatch(handleCVUpdateDrawingTrue());
            return;
        }

        if (refIdTimeout.current) {
            clearTimeout(refIdTimeout.current);
        }

        refIdTimeout.current = setTimeout(async () => {
            dispatch(handleCVUpdateDrawingFalse());
            handleReload();
            clearTimeout(refIdTimeout.current);
        }, 500);
    }

    const dataNew = {
        contact: data?.contact.length ? contact : [{}],
        social_links: data?.social_links.length ? data.social_links : [{}],
        extra_curricular: data?.extra_curricular.length ? data.extra_curricular : [{}],
        internship: data?.internship.length ? data.internship : [{}],
        reference: data?.reference.length ? data.reference : [{}],
        education: data?.education.length ? data.education : [{}],
        career_objective: data?.career_objective.length ? data.career_objective : [{}],
        courses: data?.courses.length ? data.courses : [{}],
        certificates: data?.certificates.length ? data.certificates : [{}],
        hobbies: data?.hobbies.length ? data.hobbies : [{}],
        skills: data?.skills.length ? data.skills : [{}],
        languages: data?.languages.length ? data.languages : [{}],
    };

    return (
        <LoadWr isLoad={isLoader(statusLoad)} classes='resume_transform'>
            {
                resumeActive == "001-CV" && (
                    <ResumeCv001
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "002-CV" && (
                    <ResumeCv002
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "003-CV" && (
                    <ResumeCv003
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "004-CV" && (
                    <ResumeCv004
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "005-CV" && (
                    <ResumeCv005
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "006-CV" && (
                    <ResumeCv006
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "007-CV" && (
                    <ResumeCv007
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "008-CV" && (
                    <ResumeCv008
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "009-CV" && (
                    <ResumeCv009
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "010-CV" && (
                    <ResumeCv010
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "011-CV" && (
                    <ResumeCv011
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "013-CV" && (
                    <ResumeCv013
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "015-CV" && (
                    <ResumeCv015
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "016-CV" && (
                    <ResumeCv016
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "017-CV" && (
                    <ResumeCv017
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "026-CV" && (
                    <ResumeCv026
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "029-CV" && (
                    <ResumeCv029
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "030-CV" && (
                    <ResumeCv030
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "031-CV" && (
                    <ResumeCv031
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "032-CV" && (
                    <ResumeCv032
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "039-CV" && (
                    <ResumeCv039
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "040-CV" && (
                    <ResumeCv040
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }

            {
                resumeActive == "041-CV" && (
                    <ResumeCv041
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        dataNew={dataNew}
                        idCv={idCv}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                        objActiveBlock={objActiveBlock}
                    />
                )
            }
        </LoadWr>
    )
}