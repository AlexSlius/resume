import ShareResume from "../../../src/containers/shareResume";
import { withPublicRoute } from "../../../src/middleware/publicRouter";

const ResumeSharePage = () => {
    return (
        <ShareResume isCover={false} />
    )
}

export const getServerSideProps = withPublicRoute({ isGetShareResume: true });

export default ResumeSharePage;
