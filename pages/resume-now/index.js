import ContainerPageResumeNow from "../../src/containers/resume-now"
import DashboardWrapper from "../../src/wrappers/dashboard"
import { withPublicRoute } from "../../src/middleware/publicRouter"
import { withPrivateRoute } from "../../src/middleware/privateRouter"

const ResumeNowPage = () => {
    return (
        <DashboardWrapper isResume={true} isMaxH={true}>
            <ContainerPageResumeNow />
        </DashboardWrapper>
    )
}

export const getServerSideProps = withPrivateRoute({});

export default ResumeNowPage;
