import WrapepeAdminpage from "../../../src/wrappers/adminPage/AdminPage";
import ContainerPageCareer from "../../../src/containers/resume-builder/сareerObjective/CareerObjective";

import { withPrivateRoute } from "../../../src/middleware/privateRouter"

const CareerPage = () => {
    return (
        <WrapepeAdminpage>
            <ContainerPageCareer />
        </WrapepeAdminpage>
    )
}

export const getServerSideProps = withPrivateRoute({ isGetAllBuilder: true });

export default CareerPage;
