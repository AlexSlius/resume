import {
   CContainer,
   CRow,
   CCol
} from "@coreui/react"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import SideBar from "../../components/sideBar/SideBar";
import MenuSideBar from "../../components/sideBar/MenuSidebar";
import MenuSidebarCoverLetters from "../../components/sideBar/MenuSidebarCoverLetters";
import Resume from "../../components/resume/Resume";
import { Header } from "../../components/header";
import { ModalCodeAuth } from "../../components/modals/modalCodeAuth";

import { updateFieldsModalAuth, cleanFieldsModalAuth } from '../../slices/auth';
import { autorizeAuthCode } from "../../controllers/auth";

import style from "./AdminPage.module.scss"


const AdminPage = ({ children, isCover = false }) => {
   const [loadCode, setLoadCode] = useState(false);
   const dispatch = useDispatch();

   const {
      theme: {
         currentResolution,
      },
      auth: {
         authModalObj
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
      let res = await dispatch(autorizeAuthCode());

      if (!!res?.payload?.status) {
         handleCleanModalForm();
      } else {
         setLoadCode(false);
      }
   }

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
                        <MenuSideBar />
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