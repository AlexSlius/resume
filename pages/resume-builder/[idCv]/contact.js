import WrapepeAdminpage from "../../../src/wrappers/adminPage/AdminPage"
import ContainerPageContact from "../../../src/containers/resume-builder/contact/Contact"

import { withPublicRoute } from "../../../src/middleware/publicRouter"

const ResumeContactPage = () => {
    return (
        <WrapepeAdminpage>
            <ContainerPageContact />
        </WrapepeAdminpage>
    )
}

export const getServerSideProps = withPublicRoute({ isGetAllBuilder: true });

export default ResumeContactPage;
