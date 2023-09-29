import ContainerPageTemplates from "../../../src/containers/templates"
import TemplatesWrapper from "../../../src/wrappers/templates"
import { withPublicRoute } from "../../../src/middleware/publicRouter"

const TemplatesPage = ({ store }) => {
    const { resumeData } = store.getState();

    return (
        <TemplatesWrapper>
            <ContainerPageTemplates beforeСontent={resumeData.stubText} />
        </TemplatesWrapper>
    )
}

export const getServerSideProps = withPublicRoute({
    isGetResumesTemplates: true,
    isGetResumeDataAll: true,
});

export default TemplatesPage;
