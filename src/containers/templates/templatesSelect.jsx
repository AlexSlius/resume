import { LoadWr } from "../../components/loadWr";

import { ResumeCv } from '../../resumeTemplates/001-CV';

import { isLoader } from "../../helpers/loadings";

export const TemplatesSelect = ({
    reportTemplateRef,
    status
}) => {
    return (
        <LoadWr isLoad={isLoader(status)}>
            <ResumeCv refs={reportTemplateRef} />
        </LoadWr>
    )
}