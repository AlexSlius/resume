import { CContainer, CRow, CCol } from "@coreui/react"
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router'

import SideBar from "../../components/sideBar/SideBar";
import MenuSideBar from "../../components/sideBar/MenuSidebar";
import MenuSidebarCoverLetters from "../../components/sideBar/MenuSidebarCoverLetters";
import Resume from "../../components/resume/Resume";
import { Header } from "../../components/header";
import { ModalCodeAuth } from "../../components/modals/modalCodeAuth";

import { updateFieldsModalAuth, cleanFieldsModalAuth } from '../../slices/auth';
import { cleanResumeActive } from "../../slices/resumeData";
import { cleanCoverActive } from "../../slices/cover/coverData";
import { autorizeAuthCode } from "../../controllers/auth";
import { getScreenResume } from "../../controllers/resumes";
import { getScreenCover } from "../../controllers/cover/covers";

import { routersPages } from "../../constants/next-routers";

import style from "./AdminPage.module.scss"
import { updatePreviewsMobTemplateStatus } from "../../slices/theme";

const AdminPage = ({ children, isCover = false, statePictureFile = null }) => {
   const [loadCode, setLoadCode] = useState(false);
   const refIdR = useRef("new");
   const dispatch = useDispatch();
   const router = useRouter();

   const {
      theme: {
         currentResolution,
      },
      auth: {
         authModalObj,
      }
   } = useSelector((state) => state);

   const handleUpdateCode = (value) => {
      dispatch(updateFieldsModalAuth({ code: value }));
   }

   const handleCloseModal = () => {
      dispatch(updateFieldsModalAuth({ show: false }));
   }

   const handleCleanModalForm = () => {
      setLoadCode(false);
      dispatch(cleanFieldsModalAuth());
   }

   const handleSend = async () => {
      setLoadCode(true);
      let res = await dispatch(autorizeAuthCode({ pictureFile: statePictureFile }));

      if (!!res?.payload?.status) {
         handleCleanModalForm();
      } else {
         setLoadCode(false);
      }
   }

   const onScreen = () => {
      let shareKey = router?.query?.shareKey;
      let path = router?.asPath;

      if (refIdR.current != "new") {
         if (!!path.includes(routersPages['resumeBuilder'])) {
            dispatch(getScreenResume({ id: refIdR.current, shareKey }));
         }

         if (!!path.includes(routersPages['coverLetter'])) {
            dispatch(getScreenCover({ id: refIdR.current, shareKey }));
         }
      }
   };

   useEffect(() => {
      return () => {
         onScreen();
         dispatch(cleanResumeActive());
         dispatch(cleanCoverActive());
      }
   }, []);

   useEffect(() => {
      if (['sm', 'xs'].includes(currentResolution)) {
         dispatch(updatePreviewsMobTemplateStatus(false));
      }
   }, [currentResolution]);

   useEffect(() => {
      refIdR.current = router?.query?.idCv;
   }, [router]);

   return (
      <>
         {
            ['sm', 'xs'].includes(currentResolution) && (
               <Header />
            )
         }
         <CContainer fluid className={`${style.container_admin}`}>
            <CRow className={`${style.row_main} row-main`}>
               <SideBar >
                  {
                     !isCover && (
                        <MenuSideBar statePictureFile={statePictureFile} />
                     )
                  }
                  {
                     isCover && (
                        <MenuSidebarCoverLetters />
                     )
                  }
               </SideBar>
               <CCol className={`${style.main_content} main-content`}>
                  {children}
               </CCol>
               <Resume isCover={isCover} currentResolution={currentResolution} />
            </CRow>
         </CContainer>

         <ModalCodeAuth
            visible={authModalObj.show}
            setState={handleUpdateCode}
            data={authModalObj.code}
            onClose={handleCloseModal}
            onHanleBtn={handleSend}
            load={loadCode}
         />
      </>
   )
}

export default AdminPage;