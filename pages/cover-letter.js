import Head from 'next/head'
import { WrapperPage } from '../src/wrappers/pages';
// import { CoverLatter } from '../src/containers/cover-latter'
import { CoverLatter } from '../src/containers/cover-letter';
import { withPublicRoute } from "../src/middleware/publicRouter";

const Home = () => {
  return (
    <>
      <Head>
        <title>Home page</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <WrapperPage>
        <CoverLatter />
      </WrapperPage >
    </>
  )
}

export const getServerSideProps = withPublicRoute({ isGetCoverTemplates: true, isPageCoverLetter: true });

export default Home;