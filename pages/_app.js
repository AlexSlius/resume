import Head from "next/head"
import { Provider } from "react-redux"

import App from "../src/App";
import { wrapper } from '../src/store'

import '../public/styles/style.scss'

const MyApp = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Head>
        <meta httpEquiv="Content-type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
      </Head>
      <App
      >
        <Component
          {...props}
        />
      </App>
    </Provider>
  )
}

export default MyApp;

// export default wrapper.withRedux(MyApp);
