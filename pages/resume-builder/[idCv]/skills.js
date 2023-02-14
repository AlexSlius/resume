import WrapepeAdminpage from "../../../src/wrappers/adminPage/AdminPage"
import ContainerPageSkills from "../../../src/containers/resume-builder/skills/Skills"

import { withPrivateRoute } from "../../../src/middleware/privateRouter"

const ResumeSkillsPage = () => {
    return (
        <WrapepeAdminpage>
            <ContainerPageSkills />
        </WrapepeAdminpage>
    )
}

export const getServerSideProps = withPrivateRoute({ isGetAllBuilder: true });

export default ResumeSkillsPage;
