
import {
   CCol,
   CRow,
} from "@coreui/react";
import React from "react";
import { isArray } from "lodash";

import Input from "../../../components/uis/input"
import { LoadWr } from "../../../components/loadWr";
import { isLoader } from "../../../helpers/loadings"
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
   fetchGetCvCertificates,
   fetchDeleteAll
} from "../../../controllers/certificaties";
import { postUpdateCategoryViewedStatus } from '../../../controllers/addSections';
import { fetchGetListCertificates } from '../../../controllers/dependencies';

const FormCertificaties = ({
   dispatch,
   storeDate,
   idCv
}) => {
   const refIdTimeout = React.useRef(undefined);

   const {
      certificaties: {
         ObjNew,
         certificatiesObj,
         status,
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
      }
   }

   const handleClean = () => {
      dispatch(fetchDeleteAll({ idCv }));
   }

   const handleServerRequestCertificatsList = async (text) => {
      await dispatch(fetchGetListCertificates(text));
   }

   React.useEffect(() => {
      // dispatch(fetchGetCvCertificates({ idCv }));
      dispatch(postUpdateCategoryViewedStatus({ idCv, category: 'certificates' }));
   }, []);

   return (
      <>
         {/* isLoad={isLoader(status)} */}
         <LoadWr >
            <CRow className="g-30 r-gap-30">
               {
                  isArray(certificatiesObj) && certificatiesObj.map((item, index) => (
                     <CCol
                        key={item.id}
                        xs={6}
                     >
                        <InputSelect
                           isDelete={true}
                           placeholder={`Licence / Certification # ${index + 1}`}
                           valueState={item.name || ""}
                           name="name"
                           data={certificaties.list}
                           handleSaveSelect={({ name, value }, data) => updateitemFiled({ index, name, value }, data)}
                           handleServerRequest={handleServerRequestCertificatsList}
                           isOutDataObj={false}
                           onDelete={() => handleDeleteitem(item.id)}
                           isRequire={true}
                        />
                     </CCol>
                  ))
               }
               <CCol xs={6}
               >
                  <InputSelect
                     placeholder={`New certification #${isArray(certificatiesObj) ? certificatiesObj.length + 1 : ''}`}
                     valueState={ObjNew.name}
                     name="name"
                     data={certificaties.list}
                     handleSaveSelect={({ name, value }, data) => updateitemFiledNew({ name, value }, data)}
                     handleServerRequest={handleServerRequestCertificatsList}
                     isOutDataObj={false}
                     isRequire={true}
                  />
               </CCol>
            </CRow>
         </LoadWr>
         <CRow className="mt-4">
            <CCol>
               <ButtonSteps
                  isAthorized={isAthorized}
                  disabledNext={!isDataPage}
                  onClean={handleClean}
               />
            </CCol>
         </CRow>
      </>
   )
}

export default FormCertificaties;