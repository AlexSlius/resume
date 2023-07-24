import ContainerPageTemplates from "../../../src/containers/templates"
import TemplatesWrapper from "../../../src/wrappers/templates"
import { withPublicRoute } from "../../../src/middleware/publicRouter"

const TemplatesPage = () => {
    return (
        <TemplatesWrapper>
            <ContainerPageTemplates isCover={true} />
        </TemplatesWrapper>
    )
}

export const getServerSideProps = withPublicRoute({
    isGetCoverTemplates: true,
    isGetFormCover: true,
    isCoverNew: true,
});

export default TemplatesPage;
