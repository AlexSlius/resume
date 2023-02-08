import Head from 'next/head'
import { WrapperPage } from '../src/wrappers/pages'
import { JobWinningPage } from '../src/containers/jobWinningPage'
import { withPublickRoute } from "../src/middleware/publickRouter";

const ContactUs = () => {
    return (
        <>
            <Head>
                <title>Job-winning resume templates</title>
                <meta name="description" content="Generated by create next app" />
            </Head>
            <WrapperPage>
                <JobWinningPage />
            </WrapperPage >
        </>
    )
}

export const getServerSideProps = withPublickRoute();

export default ContactUs;