import ShareResume from "../../../src/containers/shareResume";
import { withPublicRoute } from "../../../src/middleware/publicRouter";

const ResumeSharePage = (ctx) => {
    return (
        <ShareResume isCover={false} ctx={ctx} />
    )
}

export const getServerSideProps = withPublicRoute({ isGetShareResume: true });

export default ResumeSharePage;
