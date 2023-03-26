import WrapepeAdminpage from "../../../src/wrappers/adminPage/AdminPage"
import ContainerPageExperience from "../../../src/containers/cover-letters/experience"

import { withPublicRoute } from "../../../src/middleware/publicRouter"

const ResumeExperiencePage = () => {
    return (
        <WrapepeAdminpage isCover={true}>
            <ContainerPageExperience />
        </WrapepeAdminpage>
    )
}

export const getServerSideProps = withPublicRoute({});

export default ResumeExperiencePage;
