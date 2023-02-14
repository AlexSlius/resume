import Head from 'next/head'
import { WrapperPage } from '../src/wrappers/pages'
import { ErrorPage } from '../src/containers/error-page'
import { withPublickRoute } from "../src/middleware/publickRouter";

const Error404 = () => {
  return (
    <>
      <Head>
        <title>404</title>
        <meta name="description" content="Error 404" />
      </Head>
      <WrapperPage>
        <ErrorPage />
      </WrapperPage >
    </>
  )
}

export const getServerSideProps = withPublickRoute({});

export default Error404;
