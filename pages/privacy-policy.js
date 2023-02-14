import Head from 'next/head'
import { WrapperPage } from '../src/wrappers/pages'
import { PrivacyPolicy } from '../src/containers/privacy-policy'
import { withPublickRoute } from "../src/middleware/publickRouter";

const PrivacyPolicyPage = () => {
    return (
        <>
            <Head>
                <title>Privacy policy</title>
                <meta name="description" content="Privacy policy" />
            </Head>
            <WrapperPage>
                <PrivacyPolicy />
            </WrapperPage >
        </>
    )
}

export const getServerSideProps = withPublickRoute({});

export default PrivacyPolicyPage;
