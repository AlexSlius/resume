import {
   CContainer,
   CRow,
   CCol
} from "@coreui/react"
import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import SideBar from "../../components/sideBar/SideBar"
import MenuSideBar from "../../components/sideBar/MenuSidebar"
import Resume from "../../components/resume/Resume"

// import { getAllResumeBuildre } from "../../controllers/getAllResumeBuilder";

// import { routersPages } from "../../constants/next-routers";

import style from "./AdminPage.module.scss"

const AdminPage = ({ children }) => {
   const dispatch = useDispatch();
   const router = useRouter();
   // const useStatusGet = React.useRef(true);
   // const idCv = router.query.idCv;

   // React.useEffect(() => {
   //    if (router.asPath.includes(routersPages['resumeBuilder'])) {
   //       if (idCv != "new") {
   //          if (useStatusGet.current) {
   //             getAllResumeBuildre({ dispatch, idCv });
   //             useStatusGet.current = false;
   //          }
   //       }
   //    }
   // }, []);

   return (
      <CContainer fluid className={`${style.container_admin}`}>
         <CRow className={`${style.row_main} row-main`}>
            <SideBar >
               <MenuSideBar />
            </SideBar>
            <CCol className={`${style.main_content} main-content`}>
               {children}
            </CCol>
            <Resume />
         </CRow>
      </CContainer>
   )
}
export default AdminPage;