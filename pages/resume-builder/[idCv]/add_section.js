import WrapepeAdminpage from "../../../src/wrappers/adminPage/AdminPage"
import AddSectionPage from "../../../src/containers/resume-builder/addSection"

import { withPrivateRoute } from "../../../src/middleware/privateRouter"

const ResumeCertificatiesPage = () => {
    return (
        <WrapepeAdminpage>
            <AddSectionPage />
        </WrapepeAdminpage>
    )
}

export const getServerSideProps = withPrivateRoute({ isGetAllBuilder: true });

export default ResumeCertificatiesPage;
