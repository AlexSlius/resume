import ContainerPageTemplates from "../../../src/containers/templates"
import TemplatesWrapper from "../../../src/wrappers/templates"
import { withPublickRoute } from "../../../src/middleware/publicRouter"

const TemplatesPage = () => {
    return (
        <TemplatesWrapper>
            <ContainerPageTemplates isCover={true} />
        </TemplatesWrapper>
    )
}

export const getServerSideProps = withPublickRoute({});

export default TemplatesPage;
