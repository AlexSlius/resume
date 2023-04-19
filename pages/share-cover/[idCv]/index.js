import ShareResume from "../../../src/containers/shareResume";
import { withRedirectPublickPage } from "../../../src/middleware/redirectPublick";

const CoverSharePage = () => {
    return (
        <ShareResume isCover={true} />
    )
}

export const getServerSideProps = withRedirectPublickPage({});

export default CoverSharePage;
