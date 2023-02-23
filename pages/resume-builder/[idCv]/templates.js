import ContainerPageTemplates from "../../../src/containers/templates"
import TemplatesWrapper from "../../../src/wrappers/templates"
import { withPublickRoute } from "../../../src/middleware/publickRouter"

const TemplatesPage = () => {
    return (
        <TemplatesWrapper>
            <ContainerPageTemplates />
        </TemplatesWrapper>
    )
}

export const getServerSideProps = withPublickRoute();

export default TemplatesPage;
