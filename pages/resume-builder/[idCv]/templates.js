import ContainerPageTemplates from "../../../src/containers/templates"
import TemplatesWrapper from "../../../src/wrappers/templates"
import { withPublicRoute } from "../../../src/middleware/publicRouter"

const TemplatesPage = () => {
    return (
        <TemplatesWrapper>
            <ContainerPageTemplates />
        </TemplatesWrapper>
    )
}

export const getServerSideProps = withPublicRoute({ isGetResumesTemplates: true, isGetResumeDataAll: true });

export default TemplatesPage;
