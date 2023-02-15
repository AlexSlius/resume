import ContainerPageTemplates from "../../src/containers/templates"
import TemplatesWrapper from "../../src/wrappers/templates"
import { withPrivateRoute } from "../../src/middleware/privateRouter"

const TemplatesPage = () => {
    return (
        <TemplatesWrapper>
            <ContainerPageTemplates />
        </TemplatesWrapper>
    )
}

export const getServerSideProps = withPrivateRoute({});

export default TemplatesPage;
