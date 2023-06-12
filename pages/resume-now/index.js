import { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";

import ContainerPageResumeNow from "../../src/containers/resume-now"
import DashboardWrapper from "../../src/wrappers/dashboard"
import { withPrivateRoute } from "../../src/middleware/privateRouter"

import { routersPages } from '../../src/constants/next-routers';

const ResumeNowPage = () => {
    const { users: { isSubscribe } } = useSelector(state => state);

    useEffect(() => {
        if (isSubscribe) {
            Router.push(`/${routersPages['dashboard']}`);
        }
    }, [isSubscribe]);

    return (
        <DashboardWrapper isResume={true} isMaxH={true}>
            <ContainerPageResumeNow />
        </DashboardWrapper>
    )
}

export const getServerSideProps = withPrivateRoute({});

export default ResumeNowPage;
