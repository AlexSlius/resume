import Head from 'next/head'
import { WrapperPage } from '../src/wrappers/pages'
import { TermsOfUse } from '../src/containers/terms-of-use'
import { withPublickRoute } from "../src/middleware/publickRouter";

const TermsOfUsePage = () => {
    return (
        <>
            <Head>
                <title>Terms of use</title>
                <meta name="description" content="Terms of use" />
            </Head>
            <WrapperPage>
                <TermsOfUse />
            </WrapperPage >
        </>
    )
}

export const getServerSideProps = withPublickRoute({});

export default TermsOfUsePage;
