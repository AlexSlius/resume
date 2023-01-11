import React from "react";
import Router from "next/router";

import { wrapper } from "../../src/store"
import { routersPages } from "../constants/next-routers";

const WithPrivateRoute = (WrappedComponent) => {
    const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

    hocComponent.getInitialProps = wrapper.getInitialPageProps(store => ({ pathname, req, res }) => {
        const { auth: { isAthorized } } = store.getState();

        if (!isAthorized) {
            if (res) {
                res.writeHead(302, {
                    Location: `/${routersPages['login']}`,
                });
                res.end();
            } else {
                Router.push(`/${routersPages['login']}`);
            }
        }

        return { status: false };
    });

    return hocComponent;
};

export default WithPrivateRoute;
