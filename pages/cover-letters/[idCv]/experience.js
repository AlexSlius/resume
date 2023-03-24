import WrapepeAdminpage from "../../../src/wrappers/adminPage/AdminPage"
import ContainerPageExperience from "../../../src/containers/cover-letters/experience"

import { withPrivateRoute } from "../../../src/middleware/privateRouter"

const ResumeExperiencePage = () => {
    return (
        <WrapepeAdminpage isCover={true}>
            <ContainerPageExperience />
        </WrapepeAdminpage>
    )
}

export const getServerSideProps = withPrivateRoute({});

export default ResumeExperiencePage;
