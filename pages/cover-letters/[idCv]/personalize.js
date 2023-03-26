import WrapepeAdminpage from "../../../src/wrappers/adminPage/AdminPage"
import ContainerPagePersonalize from "../../../src/containers/cover-letters/personalize"

import { withPublicRoute } from "../../../src/middleware/publicRouter"

const ResumePersonalizePage = () => {
    return (
        <WrapepeAdminpage isCover={true}>
            <ContainerPagePersonalize />
        </WrapepeAdminpage>
    )
}

export const getServerSideProps = withPublicRoute({});

export default ResumePersonalizePage;
