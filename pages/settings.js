import ContainerPageSettings from "../src/containers/dashboard/settings"
import DashboardWrapper from "../src/wrappers/dashboard"
import { withPrivateRoute } from "../src/middleware/privateRouter"

const SettingsPage = () => {
    return (
        <DashboardWrapper>
            <ContainerPageSettings />
        </DashboardWrapper>
    )
}

export const getServerSideProps = withPrivateRoute({});

export default SettingsPage;
