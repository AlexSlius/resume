import ContainerPageDashboard from "../../src/containers/dashboard/dashboard"
import DashboardWrapper from "../../src/wrappers/dashboard"
import { withPrivateRoute } from "../../src/middleware/privateRouter"

const ResumeActivityPage = () => {
    return (
        <DashboardWrapper isMaxH={true}>
            <ContainerPageDashboard />
        </DashboardWrapper>
    )
}

export const getServerSideProps = withPrivateRoute({});

export default ResumeActivityPage;
