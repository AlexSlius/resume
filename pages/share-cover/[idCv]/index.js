import ShareResume from "../../../src/containers/shareResume";
import { withPublicRoute } from "../../../src/middleware/publicRouter";

const CoverSharePage = () => {
    return (
        <ShareResume isCover={true} />
    )
}

export const getServerSideProps = withPublicRoute({});

export default CoverSharePage;