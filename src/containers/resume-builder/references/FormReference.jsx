import { CCol, CRow, CForm } from "@coreui/react";
import { useEffect, useState, useRef } from 'react';
import { isArray } from "lodash";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next"

import Input from "../../../components/uis/input"
import { InputEmail } from "../../../components/uis/inputEmail";
import { InputSelect } from "../../../components/uis/inputSelect"
import AddButton from "../../../components/uis/addButton/AddButton";
import { ButtonSteps } from "../../../components/buttonSteps"
import DraggedItem from "../../../other/draggedItem/DraggedItem";

import { reorder } from '../../../helpers/drageDrop';
import { isObjDatas, isObjDatasKeys } from '../../../helpers/datasPage';
import { focusFieldInputClassName } from "../../../helpers/fiedlFocus";
import { isDelete } from '../../../helpers/checkingStatuses';
import { isAddForm, isFocusForm, lastFormDelete } from '../../../utils/isAddNewFormResume';

import {
   updateItemFieldReference,
   updateItemFieldReferenceNew,
   updatePosition,
} from "../../../slices/reference";

import {
   fetchPostAddCvOneReferences,
   fetchDeleteReferences,
   fetchUpdateReferences,
   fetchPostUpdatePositionReferences,
   fetchDeleteAll
} from "../../../controllers/references";

import {
   getCompanyList,
   addCompany
} from '../../../controllers/dependencies';
import { postUpdateCategoryViewedStatus } from '../../../controllers/addSections';
import { newPosition, arrPositionUpdateItem } from "../../../helpers/position";


let keysFiled = [
   'fullName',
   'company',
   'phone',
   'email'
];

const FormReference = ({
   dispatch,
   storeDate,
   idCv
}) => {
   const {
      dependencies: {
         companys,
      },
      references: {
         referencesObj,
         objNew,
      },
      auth: {
         autorizate: {
            isAthorized
         }
      },
   } = storeDate;
   const refIdTimeout = useRef(undefined);
   const refData = useRef(referencesObj);
   const [selected, setSelected] = useState(null);
   const [lastFormIsEmpty, setLastFormIsEmpty] = useState(false);
   const isDataPage = (referencesObj?.length > 1) || isObjDatasKeys(referencesObj?.[0] || {}) || isObjDatas(objNew);

   const onDragEnd = (result) => {
      if (!result.destination) {
         return;
      }

      const items = reorder(
         referencesObj,
         result.source.index,
         result.destination.index
      );

      let updateArr = arrPositionUpdateItem(items);

      dispatch(fetchPostUpdatePositionReferences({ idCv, data: updateArr }));

      dispatch(updatePosition(updateArr));
   }

   const handleUpdateServer = async (index) => {
      if (refIdTimeout.current) {
         clearTimeout(refIdTimeout.current);
      }

      refIdTimeout.current = setTimeout(async () => {
         await dispatch((fetchUpdateReferences({ index })));
         clearTimeout(refIdTimeout.current);
      }, 1000);
   }

   const handleSaveSelect = async ({ index, name, value }, data, classnextFocus) => {
      await dispatch(updateItemFieldReference({ index, name, value }));
      await handleUpdateServer(index);

      if (!!data) {
         focusFieldInputClassName(classnextFocus);
      }
   }

   const handleSaveSelectNew = async ({ name, value }, data, classnextFocus) => {
      await dispatch(updateItemFieldReferenceNew({ name, value }));

      if (!!data) {
         focusFieldInputClassName(classnextFocus);
      }

      automateNew();
   }

   const handleSaveSelectNewCompany = async ({ name, value }, data) => {
      await dispatch(updateItemFieldReferenceNew({ name, value }));

      if (!!data) {
         focusFieldInputClassName(classnextFocus);
         automateNew();
      }
   }

   const handleDeleteOne = (id) => {
      dispatch(fetchDeleteReferences({ idCv, id }));
   }

   const handleAddOne = async () => {
      let isAddNew = isAddForm({
         data: referencesObj,
         dependence: keysFiled,
         setState: setLastFormIsEmpty
      });

      if (isAddNew) {
         let re = await dispatch(fetchPostAddCvOneReferences({ idCv, position: newPosition(referencesObj) }));
         setSelected(re?.payload?.id);
      }
   }

   const automateNew = async (index) => {
      if (refIdTimeout.current) {
         clearTimeout(refIdTimeout.current);
      }

      refIdTimeout.current = setTimeout(async () => {
         handleAddOne();
         clearTimeout(refIdTimeout.current);
      }, 500);
   }

   const handleServerRequestCompanyList = async (text) => {
      await dispatch(getCompanyList(text)); // get all compay list
   }

   const handleAddNewCompany = async (text) => {
      let re = await dispatch(addCompany(text));
      return re?.payload?.id;
   }

   const handleClean = async () => {
      let res = await dispatch(fetchDeleteAll({ idCv }));

      if (isDelete(res.payload)) {
         await handleAddOne();
      }
   }

   const handleDeleteLastEmpty = () => {
      if (!(referencesObj?.length > 0))
         return;

      let resObj = lastFormDelete({
         data: refData.current,
         dependence: keysFiled,
      });

      if (resObj?.id) {
         handleDeleteOne(resObj.id);
      }
   }

   useEffect(() => {
      // when entering, create a new form
      if (isArray(referencesObj) && (referencesObj?.length == 0)) {
         handleAddOne();
      }

      dispatch(postUpdateCategoryViewedStatus({ idCv, category: 'reference' }));

      return () => {
         handleDeleteLastEmpty();
      }
   }, []);

   useEffect(() => {
      refData.current = referencesObj;
   }, [referencesObj]);

   return (
      <>
         {
            isArray(referencesObj) && (referencesObj.length > 0) && (
               <CRow>
                  <CCol>
                        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                           <Droppable droppableId="droppable">
                              {
                                 (provided, snapshot) => (
                                    <div
                                       ref={provided.innerRef}
                                       {...provided.droppableProps}
                                    >
                                       {
                                          isArray(referencesObj) && referencesObj.map((item, index) => (
                                             <Draggable
                                                key={item.id}
                                                draggableId={String(item.id)}
                                                index={index}
                                             >
                                                {
                                                   (provided, snapshot) => (
                                                      <DraggedItem
                                                         id={item.id}
                                                         lenght={referencesObj.length}
                                                         provided={provided}
                                                         key={item.id}
                                                         title={item.fullName}
                                                         index={index}
                                                         setSelected={setSelected}
                                                         selected={selected}
                                                         onDelete={() => handleDeleteOne(item.id)}
                                                         skillsList={[
                                                            item.email,
                                                            item.phone
                                                         ]}
                                                      >
                                                         <CForm>
                                                            <CRow className={`mobile-rows row g-30 r-gap-30 ${isFocusForm({ last: (referencesObj.length - 1) == index, isFocus: lastFormIsEmpty, setState: setSelected, id: item.id })}`}>
                                                               <CCol xs={6}>
                                                                  <Input
                                                                     id={item.id}
                                                                     label="Referent Full name"
                                                                     value={item.fullName}
                                                                     onChange={(e) => handleSaveSelect({ index, name: "fullName", value: e.target.value.trim() })}
                                                                     valid={item.fullName?.length > 2}
                                                                  />
                                                               </CCol>
                                                               <CCol xs={6}>
                                                                  <InputSelect
                                                                     label="Company"
                                                                     valueState={item.company}
                                                                     data={companys?.list || []}
                                                                     isAddDiv={true}
                                                                     handleSaveSelect={(obj, data) => handleSaveSelect({ index, ...obj, name: "company" }, data, `email_n${index}`)}
                                                                     handleServerRequest={handleServerRequestCompanyList}
                                                                     handleAddNew={handleAddNewCompany}
                                                                     isOutDataObj={false}
                                                                     isCap={true}
                                                                     isValidIn={true}
                                                                     validIn={item.company?.length > 3}
                                                                  />
                                                               </CCol>
                                                               <CCol xs={6} className={`email_n${index}`}>
                                                                  <InputEmail
                                                                     label="E-mail"
                                                                     value={item.email}
                                                                     onChange={(val) => handleSaveSelect({ index, name: "email", value: val })}
                                                                  />
                                                               </CCol>
                                                               <CCol xs={6}>
                                                                  <Input
                                                                     label="Phone"
                                                                     value={item.phone}
                                                                     isNumber={true}
                                                                     isPhone={true}
                                                                     onChange={(value) => handleSaveSelect({ index, name: "phone", value })}
                                                                     valid={item.phone?.length > 6}
                                                                  />
                                                               </CCol>
                                                            </CRow>
                                                         </CForm>
                                                      </DraggedItem>
                                                   )
                                                }
                                             </Draggable>
                                          ))
                                       }
                                       {provided.placeholder}
                                    </div>
                                 )
                              }
                           </Droppable>
                        </DragDropContext>
                  </CCol>
               </CRow>
            )
         }

         {
            isArray(referencesObj) && (referencesObj.length == 0) && (
               <CRow className="mobile-rows row g-30 r-gap-30 mb-4">
                  <CCol xs={6}>
                     <Input
                        label="Referent Full name"
                        value={objNew.full_name}
                        onChange={(e) => handleSaveSelectNew({ name: "full_name", value: e.target.value.trim() })}
                        valid={objNew.full_name?.length > 2}
                     />
                  </CCol>
                  <CCol xs={6}>
                     <InputSelect
                        label="Company"
                        valueState={objNew.company}
                        data={companys?.list || []}
                        isAddDiv={true}
                        handleSaveSelect={(obj, data) => handleSaveSelectNewCompany({ ...obj, name: "company" }, data, "email_New")}
                        handleServerRequest={handleServerRequestCompanyList}
                        handleAddNew={handleAddNewCompany}
                        isOutDataObj={false}
                        isCap={true}
                        isValidIn={true}
                        validIn={objNew.company?.length > 3}
                     />
                  </CCol>
                  <CCol xs={6} className="email_New">
                     <InputEmail
                        label="E-mail"
                        value={objNew.email}
                        onChange={(val) => handleSaveSelectNew({ name: "email", value: val })}
                     />
                  </CCol>
                  <CCol xs={6}>
                     <Input
                        label="Phone"
                        value={objNew.phone}
                        isNumber={true}
                        isPhone={true}
                        onChange={(e) => handleSaveSelectNew({ name: "phone", value: e.target.value.trim() })}
                        valid={objNew.phone?.length > 6}
                     />
                  </CCol>
               </CRow>
            )
         }

         <CRow>
            <CCol xs={12}>
               <AddButton
                  onClick={handleAddOne}
                  text={'Add one more reference'}
                  disabled={!(referencesObj?.length > 0)}
               />
            </CCol>
            <CCol className="mt-4">
               <ButtonSteps
                  isAthorized={isAthorized}
                  disabledNext={!isDataPage}
                  onClean={handleClean}
                  nameSection="reference"
               />
            </CCol>
         </CRow>
      </>
   )
}

export default FormReference;