import WrapepeAdminpage from "../../src/wrappers/adminPage/AdminPage"
import ContainerPageEmploment from "../../src/containers/resume-builder/employment/Employment"

import WithPrivateRoute from "../../src/middleware/privateRouter"

const ResumeEmplomentPage = () => {
    return (
        <WrapepeAdminpage>
            <ContainerPageEmploment />
        </WrapepeAdminpage>
    )
}

export default WithPrivateRoute(ResumeEmplomentPage);
