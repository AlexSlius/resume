
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

const FormCertificaties = ({
   dispatch,
   storeDate,
   idCv
}) => {
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
   } = storeDate;
   const isDataPage = (isArray(certificatiesObj) && (certificatiesObj.length > 0)) || isObjDatas(ObjNew);

   const updateitemFiled = async ({ index, name, value }) => {
      await dispatch(updateItemCertificatieFiled({ index, name, value }));
   }

   const handleDeleteitem = (id) => {
      dispatch(fetchDeleteCertificates({ id, idCv }));
   }

   const updateitemFiledServer = ({ index }) => {
      dispatch(fetchUpdateCertificates({ index }));
   }

   const updateitemFiledNew = async ({ name, value }) => {
      await dispatch(updateItemCertificatieFiledNew({ name, value }));
   }

   const addNewOne = async () => {
      await dispatch(fetchPostAddCvOneCertificates({ idCv }));
      await updateitemFiledNew({ name: "name", value: '' });
   }

   const handleClean = () => {
      dispatch(fetchDeleteAll({ idCv }));
   }

   React.useEffect(() => {
      // dispatch(fetchGetCvCertificates({ idCv }));
      dispatch(postUpdateCategoryViewedStatus({ idCv, category: 'certifications' }));
   }, [])

   return (
      <>
         <LoadWr isLoad={isLoader(status)}>
            <CRow className="g-30 r-gap-30">
               {
                  isArray(certificatiesObj) && certificatiesObj.map((item, index) => (
                     <CCol
                        key={item.id}
                        xs={6}
                     >
                        <Input
                           id={item.id}
                           placeholder={`Licence / Certification # ${index + 1}`}
                           value={item.name}
                           name="name"
                           isDelete={true}
                           onDelete={handleDeleteitem}
                           onBlur={(e) => updateitemFiledServer({ index })}
                           onChange={(e) => updateitemFiled({ index, name: e.target.name, value: e.target.value })}
                        />
                     </CCol>
                  ))
               }
               <CCol xs={6}
               >
                  <Input
                     placeholder={`New certification #${isArray(certificatiesObj) ? certificatiesObj.length + 1 : ''}`}
                     value={ObjNew.name}
                     name="name"
                     onBlur={addNewOne}
                     onChange={(e) => updateitemFiledNew({ name: e.target.name, value: e.target.value })}
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