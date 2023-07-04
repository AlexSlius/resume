import WrapepeAdminpage from "../../../src/wrappers/adminPage/AdminPage"
import ResumeBuilderPage from "../../../src/containers/resume-builder"

import { withPublicRoute } from "../../../src/middleware/publicRouter"

const ResumeContactPage = () => {
    return (
        <WrapepeAdminpage>
            <ResumeBuilderPage />
        </WrapepeAdminpage>
    )
}

export const getServerSideProps = withPublicRoute({ isGetActiveResume: true, isGetAllBuilder: true });

export default ResumeContactPage;
