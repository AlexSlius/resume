import WrapepeAdminpage from "../../../src/wrappers/adminPage/AdminPage"
import ContainerPagePersonalize from "../../../src/containers/cover-letters/personalize"

import { withPublickRoute } from "../../../src/middleware/publickRouter"

const ResumeContactPage = () => {
    return (
        <WrapepeAdminpage isCover={true}>
            <ContainerPagePersonalize />
        </WrapepeAdminpage>
    )
}

export const getServerSideProps = withPublickRoute({});

export default ResumeContactPage;
