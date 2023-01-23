import ContainerPageDashboard from "../../src/containers/dashboard/dashboard"
import DashboardWrapper from "../../src/wrappers/dashboard"
import { withPrivateRoute } from "../../src/middleware/privateRouter"

const ResumeActivityPage = () => {
    return (
        <DashboardWrapper>
            <ContainerPageDashboard />
        </DashboardWrapper>
    )
}

export const getServerSideProps = withPrivateRoute();

export default ResumeActivityPage;
