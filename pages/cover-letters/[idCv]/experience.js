import WrapepeAdminpage from "../../../src/wrappers/adminPage/AdminPage"
import ContainerPageExperience from "../../../src/containers/cover-letters/experience"

import { withPublickRoute } from "../../../src/middleware/publickRouter"

const ResumeExperiencePage = () => {
    return (
        <WrapepeAdminpage isCover={true}>
            <ContainerPageExperience />
        </WrapepeAdminpage>
    )
}

export const getServerSideProps = withPublickRoute({});

export default ResumeExperiencePage;
