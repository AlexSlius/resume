import Head from 'next/head'
import { WrapperPage } from '../src/wrappers/pages'
import { ErrorPage } from '../src/containers/error-page'
import { setIsAuth } from "../src/slices/auth";
import { cookieParse } from "../src/helpers/nookies";
import { isExist } from '../src/helpers/checkingStatuses';
import api from "../src/apiSingleton";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Error404 = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function start() {
      const cookis = cookieParse({ ctx: null });

      if (!!cookis?.token) {
        api.apiClient.setToken(cookis.token);
        const serverRespons = await api.auth.isAuthorization({ 'token': cookis.token });
        dispatch(setIsAuth(isExist(serverRespons)));
      }
    }

    start();
  }, []);

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

export default Error404;
