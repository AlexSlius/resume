import ContainerPageResumeNow from "../../src/containers/resume-now"
import DashboardWrapper from "../../src/wrappers/dashboard"
import { withPrivateRoute } from "../../src/middleware/privateRouter"

const ResumeNowPage = () => {
    return (
        <DashboardWrapper isResume={true}>
            <ContainerPageResumeNow />
        </DashboardWrapper>
    )
}

export const getServerSideProps = withPrivateRoute({});

export default ResumeNowPage;
