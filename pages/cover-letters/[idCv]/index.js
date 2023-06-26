import WrapepeAdminpage from "../../../src/wrappers/adminPage/AdminPage"
import ContainerCoverPage from "../../../src/containers/cover-letters"

import { withPublicRoute } from "../../../src/middleware/publicRouter"

const ResumePersonalizePage = () => {
    return (
        <WrapepeAdminpage isCover={true}>
            <ContainerCoverPage />
        </WrapepeAdminpage>
    )
}

export const getServerSideProps = withPublicRoute({ isGetFormCover: true, isCoverNew: true });

export default ResumePersonalizePage;
