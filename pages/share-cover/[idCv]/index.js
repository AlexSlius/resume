import ShareResume from "../../../src/containers/shareResume";
import { withPublicRoute } from "../../../src/middleware/publicRouter";

const CoverSharePage = (ctx) => {
    return (
        <ShareResume isCover={true} ctx={ctx} />
    )
}

export const getServerSideProps = withPublicRoute({ isGetShareCover: true });

export default CoverSharePage;
