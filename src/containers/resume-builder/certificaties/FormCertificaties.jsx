
import { CCol, CRow, } from "@coreui/react";
import { useEffect } from "react";
import { isArray } from "lodash";

import { isObjDatas } from '../../../helpers/datasPage';
import { ButtonSteps } from "../../../components/buttonSteps"
import { InputSelect } from "../../../components/uis/inputSelect"

import {
   updateItemCertificatieFiledNew,
   updateItemCertificatieFiled
} from "../../../slices/certificaties";
import {
   fetchPostAddCvOneCertificates,
   fetchDeleteCertificates,
   fetchUpdateCertificates,
   fetchDeleteAll
} from "../../../controllers/certificaties";
import { postUpdateCategoryViewedStatus } from '../../../controllers/addSections';
import { fetchGetListCertificates } from '../../../controllers/dependencies';
import { focusFieldInputClassName } from "../../../helpers/fiedlFocus";

const FormCertificaties = ({
   dispatch,
   storeDate,
   idCv
}) => {
   const {
      certificaties: {
         ObjNew,
         certificatiesObj,
      },
      auth: {
         autorizate: {
            isAthorized
         }
      },
      dependencies: {
         certificaties,
      },
   } = storeDate;
   const isDataPage = (isArray(certificatiesObj) && (certificatiesObj.length > 0)) || isObjDatas(ObjNew);

   const updateitemFiled = async ({ index, name, value }, data) => {
      await dispatch(updateItemCertificatieFiled({ index, name, value }));
      if (!!data) {
         await dispatch(fetchUpdateCertificates({ index }));
      }
   }

   const handleDeleteitem = (id) => {
      dispatch(fetchDeleteCertificates({ id, idCv }));
   }

   const updateitemFiledNew = async ({ name, value }, data) => {
      await dispatch(updateItemCertificatieFiledNew({ name, value }));

      if (!!data) {
         await dispatch(fetchPostAddCvOneCertificates({ idCv }));
         focusFieldInputClassName("name_new");
         setTimeout(() => {
            dispatch(fetchGetListCertificates());
         }, 600);
      }
   }

   const handleClean = () => {
      dispatch(fetchDeleteAll({ idCv }));
      dispatch(fetchGetListCertificates());
   }

   const handleServerRequestCertificatsList = async (text) => {
      await dispatch(fetchGetListCertificates(text));
   }

   useEffect(() => {
      dispatch(postUpdateCategoryViewedStatus({ idCv, category: 'certificates' }));
      dispatch(fetchGetListCertificates());
   }, []);

   return (
      <>
         <CRow className="mobile-rows g-30 r-gap-30">
            {
               isArray(certificatiesObj) && certificatiesObj.map((item, index) => (
                  <CCol
                     key={item.id}
                     xs={6}
                  >
                     <InputSelect
                        isDelete={true}
                        label={`Licence / Certification # ${index + 1}`}
                        valueState={item.name || ""}
                        data={certificaties.list}
                        handleSaveSelect={({ name, value }, data) => updateitemFiled({ index, name: "name", value }, data)}
                        handleServerRequest={handleServerRequestCertificatsList}
                        isOutDataObj={false}
                        onDelete={() => handleDeleteitem(item.id)}
                        isRequire={true}
                        isValidIn={true}
                        validIn={item.name?.length > 2}
                     />
                  </CCol>
               ))
            }
            <CCol xs={6} className="name_new">
               <InputSelect
                  label={`New certification #${isArray(certificatiesObj) ? certificatiesObj.length + 1 : ''}`}
                  valueState={ObjNew.name}
                  data={certificaties.list}
                  handleSaveSelect={({ name, value }, data) => updateitemFiledNew({ name: "name", value }, data)}
                  handleServerRequest={handleServerRequestCertificatsList}
                  isOutDataObj={false}
                  isRequire={true}
               />
            </CCol>
         </CRow>
         <CRow className="mt-4">
            <CCol>
               <ButtonSteps
                  isAthorized={isAthorized}
                  disabledNext={!isDataPage}
                  onClean={handleClean}
                  nameSection="certificates"
               />
            </CCol>
         </CRow>
      </>
   )
}

export default FormCertificaties;