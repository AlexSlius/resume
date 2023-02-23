import Head from "next/head"
import { Provider } from "react-redux"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import App from "../src/App";
import { PreloaderPage } from "../src/components/preloaderPage";

import { wrapper } from '../src/store'

import 'swiper/css';
import '../public/styles/pages/vendor.scss';
import '../public/styles/pages/main.scss';
import '../public/styles/resumes/style/style.css';
import '../public/styles/style.scss';

import Natifications from "../src/components/natifications";
import { Cookies } from "../src/components/cookies";

const MyApp = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  if (typeof window != "undefined") {
    window.$ = window.jQuery = require('jquery');
    require('zebra_datepicker');
  }

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setLoading(true);
    });

    router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <meta httpEquiv="Content-type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/favicons/Resulon-logo-Sign-ICO-16x16.ico" sizes="16x16" />
        <link rel="icon" type="image/x-icon" href="/favicons/Resulon-logo-Sign-ICO-24x24" sizes="24x24" />
        <link rel="icon" type="image/x-icon" href="/favicons/Resulon-logo-Sign-ICO-32x32.ico" sizes="32x32" />
        <link rel="icon" type="image/x-icon" href="/favicons/Resulon-logo-Sign-ICO-64x64.ico" sizes="64x64" />
      </Head>
      <App store={store}>
        <Component
          {...props}
        />
        <Natifications />
        {
          loading && (
            <PreloaderPage />
          )
        }
        <Cookies />
      </App>
    </Provider>
  )
}

export default MyApp;
