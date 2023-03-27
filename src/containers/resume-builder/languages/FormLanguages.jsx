
import {
   CCol,
   CRow,
   CFormCheck
} from "@coreui/react";
import { useRef, useEffect } from 'react';
import uuid from "react-uuid";
import { isArray } from "lodash";

// import AddButton from "../../../components/uis/addButton/AddButton"
import { ButtonSteps } from "../../../components/buttonSteps"
import { InputSelect } from "../../../components/uis/inputSelect"
import { isLoader } from "../../../helpers/loadings"
import { LoadWr } from "../../../components/loadWr"

import {
   // fetchGetCvLanguages,
   fetchPostAddCvOneLanguages,
   fetchDeleteLanguages,
   fetchUpdateLanguages,
   fetchDeleteAll
} from "../../../controllers/languages";
import { postUpdateCategoryViewedStatus } from '../../../controllers/addSections';
import { fetchGetListLanguages } from '../../../controllers/dependencies';
import {
   updateItemLanguageFiled,
   updateItemLanguageFiledNew
} from "../../../slices/languages";
import { ButtonDeleteItem } from "../../../components/uis/buttonDelete";

const FormLanguages = ({
   dispatch,
   storeDate,
   idCv
}) => {
   const {
      dependencies: {
         language
      },
      languages: {
         languageObj,
         status,
         objNew
      },
      auth: {
         autorizate: {
            isAthorized
         }
      },
   } = storeDate;
   const refIdTimeout = useRef(undefined);

   const isDataPage = (isArray(languageObj) && (languageObj.length > 0));

   const handleSaveSelect = async ({ index, name, value }) => {
      await dispatch(updateItemLanguageFiled({ index, name, value }));
      await handleUpdateServer(index);
   }

   const handleUpdateServer = async (index) => {
      if (refIdTimeout.current) {
         clearTimeout(refIdTimeout.current);
      }

      refIdTimeout.current = setTimeout(async () => {
         await dispatch((fetchUpdateLanguages({ index })));
         clearTimeout(refIdTimeout.current);
      }, 500);
   }

   const handleAddOne = () => {
      dispatch(fetchPostAddCvOneLanguages({ idCv }));
   }

   const handDeleteitem = (id) => {
      dispatch(fetchDeleteLanguages({ idCv, id }))
   }

   const handleSaveSelectNew = ({ name, value }) => {
      dispatch(updateItemLanguageFiledNew({ name, value }));
   }

   const handleServerRequestLanguagesList = async (text) => {
      await dispatch(fetchGetListLanguages(text));
   }

   const handleClean = () => {
      dispatch(fetchDeleteAll({ idCv }));
   }

   useEffect(() => {
      // fetchGetCvLanguages({ idCv });
      dispatch(postUpdateCategoryViewedStatus({ idCv, category: 'languages' }));
   }, []);

   useEffect(() => {
      if (!!objNew.language.length && objNew.level > 0) {
         handleAddOne();
      }
   }, [objNew]);

   return (
      <>
         <LoadWr isLoad={isLoader(status)}>
            {
               isArray(languageObj) && languageObj.map((item, index) => (
                  <div className="rows-lan mt-4" key={index}>
                     <CRow key={item.id} className="mobile-rows g-30 r-gap-30 flex-auto">
                        <CCol xs={6}>
                           <InputSelect
                              label="Language"
                              placeholder="Language"
                              valueState={item.language || ""}
                              name="language"
                              handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj })}
                              handleServerRequest={handleServerRequestLanguagesList}
                              onDelete={() => { handDeleteitem(item.id) }}
                              isOutDataObj={false}
                              data={language.list || []}
                              isRequire={true}
                              isDelete={true}
                           />

                        </CCol>
                        <CCol xs={6}>
                           <div className="items-level">
                              <CFormCheck onChange={() => handleSaveSelect({ index: index, name: 'level', value: 1 })} checked={!!(item.level == 1)} button={{ color: 'secondary' }} type="radio" id={uuid()} name={`level${index}`} autoComplete="off" label="A1" />
                              <CFormCheck onChange={() => handleSaveSelect({ index: index, name: 'level', value: 2 })} checked={!!(item.level == 2)} button={{ color: 'secondary' }} type="radio" id={uuid()} name={`level${index}`} autoComplete="off" label="A2" />
                              <CFormCheck onChange={() => handleSaveSelect({ index: index, name: 'level', value: 3 })} checked={!!(item.level == 3)} button={{ color: 'secondary' }} type="radio" id={uuid()} name={`level${index}`} autoComplete="off" label="B2" />
                              <CFormCheck onChange={() => handleSaveSelect({ index: index, name: 'level', value: 4 })} checked={!!(item.level == 4)} button={{ color: 'secondary' }} type="radio" id={uuid()} name={`level${index}`} autoComplete="off" label="B3" />
                              <CFormCheck onChange={() => handleSaveSelect({ index: index, name: 'level', value: 5 })} checked={!!(item.level == 5)} button={{ color: 'secondary' }} type="radio" id={uuid()} name={`level${index}`} autoComplete="off" label="B4" />
                              <CFormCheck onChange={() => handleSaveSelect({ index: index, name: 'level', value: 6 })} checked={!!(item.level == 6)} button={{ color: 'secondary' }} type="radio" id={uuid()} name={`level${index}`} autoComplete="off" label="B5" />
                           </div>
                        </CCol>
                     </CRow>
                     {/* <div className="btn-wr-ite">
                        <ButtonDeleteItem onDelete={() => handDeleteitem(item.id)} />
                     </div> */}
                  </div>
               ))
            }

            <div className="rows-lan mt-4">
               <CRow className="mobile-rows g-30 r-gap-30 flex-auto">
                  <CCol xs={6}>
                     <InputSelect
                        label="Language"
                        placeholder="Language"
                        valueState={objNew.language || ""}
                        name="language"
                        handleSaveSelect={handleSaveSelectNew}
                        handleServerRequest={handleServerRequestLanguagesList}
                        isOutDataObj={false}
                        data={language.list || []}
                        isRequire={true}
                     />
                  </CCol>
                  <CCol xs={6}>
                     <div className="items-level">
                        <CFormCheck disabled={objNew.language.length == 0} onChange={() => handleSaveSelectNew({ name: 'level', value: 1 })} checked={!!(objNew.level == 1)} button={{ color: 'secondary' }} type="radio" id={uuid()} name={`levelNew=1`} autoComplete="off" label="A1" />
                        <CFormCheck disabled={objNew.language.length == 0} onChange={() => handleSaveSelectNew({ name: 'level', value: 2 })} checked={!!(objNew.level == 2)} button={{ color: 'secondary' }} type="radio" id={uuid()} name={`levelNew=2`} autoComplete="off" label="A2" />
                        <CFormCheck disabled={objNew.language.length == 0} onChange={() => handleSaveSelectNew({ name: 'level', value: 3 })} checked={!!(objNew.level == 3)} button={{ color: 'secondary' }} type="radio" id={uuid()} name={`levelNew=3`} autoComplete="off" label="B2" />
                        <CFormCheck disabled={objNew.language.length == 0} onChange={() => handleSaveSelectNew({ name: 'level', value: 4 })} checked={!!(objNew.level == 4)} button={{ color: 'secondary' }} type="radio" id={uuid()} name={`levelNew=4`} autoComplete="off" label="B3" />
                        <CFormCheck disabled={objNew.language.length == 0} onChange={() => handleSaveSelectNew({ name: 'level', value: 5 })} checked={!!(objNew.level == 5)} button={{ color: 'secondary' }} type="radio" id={uuid()} name={`levelNew=5`} autoComplete="off" label="B4" />
                        <CFormCheck disabled={objNew.language.length == 0} onChange={() => handleSaveSelectNew({ name: 'level', value: 6 })} checked={!!(objNew.level == 6)} button={{ color: 'secondary' }} type="radio" id={uuid()} name={`levelNew=6`} autoComplete="off" label="B5" />
                     </div>
                  </CCol>
               </CRow>
            </div>
         </LoadWr>
         <CRow className="mt-4">
            {/* <CCol xs={12}>
               <AddButton
                  onClick={handleAddOne}
                  text={'Add one more language'}
               />
            </CCol> */}
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

export default FormLanguages;