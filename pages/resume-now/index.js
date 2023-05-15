import ContainerPageResumeNow from "../../src/containers/resume-now"
import DashboardWrapper from "../../src/wrappers/dashboard"
import { withPublicRoute } from "../../src/middleware/publicRouter"

const ResumeNowPage = () => {
    return (
        <DashboardWrapper isResume={true} isMaxH={true}>
            <ContainerPageResumeNow />
        </DashboardWrapper>
    )
}

export const getServerSideProps = withPublicRoute({ isStrite: true });

export default ResumeNowPage;
