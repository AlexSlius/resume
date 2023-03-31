import { useState, useEffect } from "react";
import Head from "next/head";
import { Provider } from "react-redux"
import { useRouter } from "next/router";

import App from "../src/App";

// Components
import { PreloaderPage } from "../src/components/preloaderPage";
import Notifications from "../src/components/notifications";
import { Cookies } from "../src/components/cookies";

import { wrapper } from '../src/store'

// Styles
import 'swiper/css';
import '../public/styles/pages/vendor.scss';
import '../public/styles/pages/main.scss';
import '../public/styles/resumes/main.scss';
import '../public/styles/style.scss';


const MyApp = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  // const {
  //   resumeData: {
  //     resumeActive
  //   }
  // } = store.getState();
  const [loading, setLoading] = useState();

  const router = useRouter();

  if (typeof window != "undefined") {
    window.$ = window.jQuery = require('jquery');
    require('zebra_datepicker');
  }

  useEffect(() => {
    setLoading(false);
  //   router.events.on("routeChangeStart", () => {
  //     setLoading(true);
  //   });

  //   router.events.on("routeChangeComplete", () => {
  //     setLoading(false);
  //   });
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <meta httpEquiv="Content-type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/favicons/fav3.ico" />
      </Head>
      <App store={store}>
        <Component
          {...props}
        />
        <Notifications />
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
