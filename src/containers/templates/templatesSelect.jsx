import { useSelector } from "react-redux";
import { useRouter } from 'next/router'

import { LoadWr } from "../../components/loadWr";
import { isLoader } from "../../helpers/loadings";

import { ResumeCv001 } from '../../resumeTemplates/001-CV';
import { ResumeCv002 } from '../../resumeTemplates/002-CV';
import { ResumeCv003 } from '../../resumeTemplates/003-CV';

export const TemplatesSelect = ({
    reportTemplateRef,
    status
}) => {
    const router = useRouter();
    const idCv = router.query.idCv;

    const {
        resumeData: {
            data,
            resumeActive
        }
    } = useSelector(state => state);

    return (
        <LoadWr isLoad={isLoader(status)}>
            {
                resumeActive?.template_slug == "001-CV" && (
                    <ResumeCv001
                        refs={reportTemplateRef}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive?.template_slug == "002-CV" && (
                    <ResumeCv002
                        refs={reportTemplateRef}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

            {
                resumeActive?.template_slug == "003-CV" && (
                    <ResumeCv003
                        refs={reportTemplateRef}
                        data={data}
                        idCv={idCv}
                    />
                )
            }

        </LoadWr>
    )
}