import WrapepeAdminpage from "../../../src/wrappers/adminPage/AdminPage"
import ResumeBuilderPage from "../../../src/containers/resume-builder"

import { withPublicRoute } from "../../../src/middleware/publicRouter"

const ResumeContactPage = ({ statePictureFile, setStatePictureFile }) => {
    return (
        <WrapepeAdminpage statePictureFile={statePictureFile}>
            <ResumeBuilderPage statePictureFile={statePictureFile} setStatePictureFile={setStatePictureFile} />
        </WrapepeAdminpage>
    )
}

export const getServerSideProps = withPublicRoute({ isGetActiveResume: true, isGetAllBuilder: true });

export default ResumeContactPage;
