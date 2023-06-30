// import { useState, useEffect } from "react";
import Head from "next/head";
import { Provider } from "react-redux"
import { useRouter } from "next/router";

import App from "../src/App";

// Components
// import { PreloaderPage } from "../src/components/preloaderPage";
import Notifications from "../src/components/notifications";
import { Cookies } from "../src/components/cookies";

import { wrapper } from '../src/store'
import { downloadPagePdf } from "../src/utils/isdownPdf";

// Styles
import '../public/styles/pages/vendor/normalize.css';
import '../public/styles/pages/vendor/swiper-bundle.min.css';
import '../public/styles/pages/main.scss';
import '../public/styles/resumes/main.scss';
import '../public/styles/style.scss';
import { routersPages } from "../src/constants/next-routers";

const MyApp = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const isPdf = downloadPagePdf(rest);
  // const [loading, setLoading] = useState();
  const router = useRouter();
  const isPageShare = router.asPath.includes(routersPages['shareResume']) || router.asPath.includes(routersPages['shareCover']);

  if (typeof window != "undefined") {
    window.$ = window.jQuery = require('jquery');
    require('zebra_datepicker');
  }

  // useEffect(() => {
  //   setLoading(false);
  //   router.events.on("routeChangeStart", () => {
  //     setLoading(true);
  //   });

  //   router.events.on("routeChangeComplete", () => {
  //     setLoading(false);
  //   });
  // }, []);

  return (
    <Provider store={store}>
      <Head>
        <meta httpEquiv="Content-type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preload" href="/fonts/GTEestiProDisplay-Bold.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/GTEestiProDisplay-Light.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/GTEestiProDisplay-Medium.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/GTEestiProDisplay-UltraBold.woff2" as="font" type="font/woff2" crossOrigin="" />

        <style
          id="holderStyle"
          dangerouslySetInnerHTML={{
            __html: `

            @font-face {
              font-family: "GTEestiProDisplay";
              src: url("/fonts/GTEestiProDisplay-Light.woff2") format("woff2");
              font-weight: 350;
              font-display: swap;
              font-style: normal;
          }
          
          @font-face {
              font-family: "GTEestiProDisplay";
              src: url("/fonts/GTEestiProDisplay-Medium.woff2") format("woff2");
              font-weight: 500;
              font-display: swap;
              font-style: normal;
          }
          
          @font-face {
              font-family: "GTEestiProDisplay";
              src: url("/fonts/GTEestiProDisplay-Bold.woff2") format("woff2");
              font-weight: 700;
              font-display: swap;
              font-style: normal;
          }
          
          @font-face {
              font-family: "GTEestiProDisplay";
              src: url("/fonts/GTEestiProDisplay-UltraBold.woff2") format("woff2");
              font-weight: 900;
              font-display: swap;
              font-style: normal;
          }

            * {
                font-family: "GTEestiProDisplay", sans-serif;
            }
            
            body {
                font-family: "GTEestiProDisplay", sans-serif;
                ${isPageShare ? 'padding: 0!important' : ""}
            }
         `,
          }} />

        <link rel="icon" type="image/x-icon" href="/favicons/fav3.ico" />

      </Head>
      <App store={store}>
        <Component
          {...props}
        />
        {
          !isPdf && (
            <>
              {/* {
          loading && (
            <PreloaderPage />
          )
        } */}
              <Notifications />
              <Cookies />
            </>
          )
        }
      </App>
    </Provider>
  )
}

export default MyApp;
