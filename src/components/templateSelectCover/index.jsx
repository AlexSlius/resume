import { useRef } from "react";
import { useDispatch } from "react-redux";

import { LoadWr } from "../loadWr";
import { isLoader } from "../../helpers/loadings";
import { sizeFont, sizeLineSpacing } from "../../thunks/templates";
import { handleUpdateDrawingFalse, handleUpdateDrawingTrue } from "../../slices/cover/coverDataForm";

import CoverCv001 from '../../resumeTemplatesCover/001-CV';
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
import { CoverCv013 } from '../../resumeTemplatesCover/013-CV';
import { CoverCv015 } from '../../resumeTemplatesCover/015-CV';
import { CoverCv016 } from '../../resumeTemplatesCover/016-CV';
import { CoverCv029 } from '../../resumeTemplatesCover/029-CV';
import { CoverCv030 } from '../../resumeTemplatesCover/030-CV';
import { CoverCv031 } from '../../resumeTemplatesCover/031-CV';
import { CoverCv032 } from '../../resumeTemplatesCover/032-CV';
import { CoverCv039 } from '../../resumeTemplatesCover/039-CV';
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
    drawing = false,
    isTemplate = false,
}) => {
    const dispatch = useDispatch();
    const refIdTimeout = useRef(undefined);

    const stateClasses = `
    ${sizeLineSpacing(+stateLineSpacing)} 
    ${sizeFont(+stateFontSize)} 
    ${isNewResume ?
            (!!resumeData?.resumeActiveNew?.template_class ? resumeData.resumeActiveNew.template_class : "") :
            (!!resumeData?.resumeActive?.template_class ? resumeData.resumeActive.template_class : "")}`;

    let statusLoad = statusResumeActive || status;

    const handleFalseDrafind = () => {
        if (isNewResume) {
            dispatch(handleUpdateDrawingTrue());
            return;
        }

        if (refIdTimeout.current) {
            clearTimeout(refIdTimeout.current);
        }

        refIdTimeout.current = setTimeout(async () => {
            dispatch(handleUpdateDrawingFalse());
            clearTimeout(refIdTimeout.current);
        }, 500);
    }

    return (
        <LoadWr isLoad={isLoader(statusLoad)} classes='resume_transform'>
            {
                resumeActive == "001-CV" && (
                    <CoverCv001
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        isDrawing={drawing}
                        isTemplate={isTemplate}
                        handleFalseDrafind={handleFalseDrafind}
                    />
                )
            }

            {
                resumeActive == "002-CV" && (
                    <CoverCv002
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        isTemplate={isTemplate}
                        isDrawing={drawing}
                        handleFalseDrafind={handleFalseDrafind}
                    />
                )
            }

            {
                resumeActive == "003-CV" && (
                    <CoverCv003
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        isTemplate={isTemplate}
                        isDrawing={drawing}
                        handleFalseDrafind={handleFalseDrafind}
                    />
                )
            }
            {
                resumeActive == "004-CV" && (
                    <CoverCv004
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        isTemplate={isTemplate}
                        isDrawing={drawing}
                        handleFalseDrafind={handleFalseDrafind}
                    />
                )
            }

            {
                resumeActive == "005-CV" && (
                    <CoverCv005
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        isTemplate={isTemplate}
                        isDrawing={drawing}
                        handleFalseDrafind={handleFalseDrafind}
                    />
                )
            }

            {
                resumeActive == "006-CV" && (
                    <CoverCv006
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        isTemplate={isTemplate}
                        isDrawing={drawing}
                        handleFalseDrafind={handleFalseDrafind}
                    />
                )
            }

            {
                resumeActive == "007-CV" && (
                    <CoverCv007
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        isTemplate={isTemplate}
                        isDrawing={drawing}
                        handleFalseDrafind={handleFalseDrafind}
                    />
                )
            }

            {
                resumeActive == "008-CV" && (
                    <CoverCv008
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        isTemplate={isTemplate}
                        isDrawing={drawing}
                        handleFalseDrafind={handleFalseDrafind}
                    />
                )
            }

            {
                resumeActive == "009-CV" && (
                    <CoverCv009
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        isTemplate={isTemplate}
                        isDrawing={drawing}
                        handleFalseDrafind={handleFalseDrafind}
                    />
                )
            }

            {
                resumeActive == "010-CV" && (
                    <CoverCv010
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        isTemplate={isTemplate}
                        isDrawing={drawing}
                        handleFalseDrafind={handleFalseDrafind}
                    />
                )
            }

            {
                resumeActive == "011-CV" && (
                    <CoverCv011
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        isTemplate={isTemplate}
                        isDrawing={drawing}
                        handleFalseDrafind={handleFalseDrafind}
                    />
                )
            }

            {
                resumeActive == "013-CV" && (
                    <CoverCv013
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        isTemplate={isTemplate}
                        isDrawing={drawing}
                        handleFalseDrafind={handleFalseDrafind}
                    />
                )
            }

            {
                resumeActive == "015-CV" && (
                    <CoverCv015
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        isTemplate={isTemplate}
                        isDrawing={drawing}
                        handleFalseDrafind={handleFalseDrafind}
                    />
                )
            }

            {
                resumeActive == "016-CV" && (
                    <CoverCv016
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        isTemplate={isTemplate}
                        isDrawing={drawing}
                        handleFalseDrafind={handleFalseDrafind}
                    />
                )
            }

                {
                resumeActive == "029-CV" && (
                    <CoverCv029
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        isTemplate={isTemplate}
                        isDrawing={drawing}
                        handleFalseDrafind={handleFalseDrafind}
                    />
                )
            }

            {
                resumeActive == "030-CV" && (
                    <CoverCv030
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        isTemplate={isTemplate}
                        isDrawing={drawing}
                        handleFalseDrafind={handleFalseDrafind}
                    />
                )
            }

            {
                resumeActive == "031-CV" && (
                    <CoverCv031
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        isTemplate={isTemplate}
                        isDrawing={drawing}
                        handleFalseDrafind={handleFalseDrafind}
                    />
                )
            }

            {
                resumeActive == "032-CV" && (
                    <CoverCv032
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        isTemplate={isTemplate}
                        isDrawing={drawing}
                        handleFalseDrafind={handleFalseDrafind}
                    />
                )
            }

{
                resumeActive == "039-CV" && (
                    <CoverCv039
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        isTemplate={isTemplate}
                        isDrawing={drawing}
                        handleFalseDrafind={handleFalseDrafind}
                    />
                )
            }

            {
                resumeActive == "040-CV" && (
                    <CoverCv040
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        isTemplate={isTemplate}
                        isDrawing={drawing}
                        handleFalseDrafind={handleFalseDrafind}
                    />
                )
            }

            {
                resumeActive == "041-CV" && (
                    <CoverCv041
                        reportTemplateRef={reportTemplateRef}
                        stateClasses={stateClasses}
                        data={data}
                        isTemplate={isTemplate}
                        isDrawing={drawing}
                        handleFalseDrafind={handleFalseDrafind}
                    />
                )
            }
        </LoadWr>
    )
}