import {
   CCol,
   CRow,
   CForm
} from "@coreui/react";
import { useEffect, useState, useRef } from 'react';
import { isArray } from "lodash";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next"

import { LoadWr } from "../../../components/loadWr"
import Input from "../../../components/uis/input"
import { InputSelect } from "../../../components/uis/inputSelect"
import AddButton from "../../../components/uis/addButton/AddButton";
import { ButtonSteps } from "../../../components/buttonSteps"
import DraggedItem from "../../../other/draggedItem/DraggedItem";
import { InputPhoneNoControler } from "../../../components/uis/inputPhoneNoControler"

import { isLoader } from "../../../helpers/loadings"
import { reorder } from '../../../helpers/drageDrop';
import { isObjDatas } from '../../../helpers/datasPage';

import {
   updateItemFieldReference,
   updateItemFieldReferenceNew,
   updatePosition,
} from "../../../slices/reference";

import {
   fetchGetCvReferences,
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
         status,
      },
      auth: {
         autorizate: {
            isAthorized
         }
      },
   } = storeDate;
   const refIdTimeout = useRef(undefined);
   const [selected, setSelected] = useState(null);

   const isDataPage = (isArray(referencesObj) && (referencesObj.length > 0)) || isObjDatas(objNew);

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

   const handleSaveSelect = async ({ index, name, value }) => {
      await dispatch(updateItemFieldReference({ index, name, value }));
      await handleUpdateServer(index);
   }

   const handleSaveSelectNew = async ({ name, value }) => {
      await dispatch(updateItemFieldReferenceNew({ name, value }));
   }

   const handleDeleteOne = (id) => {
      dispatch(fetchDeleteReferences({ idCv, id }));
   }

   const handleAddOne = async () => {
      let re = await dispatch(fetchPostAddCvOneReferences({ idCv, position: newPosition(referencesObj) }));
      setSelected(re?.payload?.id);
   }

   const handleServerRequestCompanyList = async (text) => {
      await dispatch(getCompanyList(text)); // get all compay list
   }

   const handleAddNewCompany = async (text) => {
      let re = await dispatch(addCompany(text));
      return re?.payload?.id;
   }

   const handleClean = () => {
      dispatch(fetchDeleteAll({ idCv }));
   }

   useEffect(() => {
      // fetchGetCvReferences({ idCv });
      dispatch(postUpdateCategoryViewedStatus({ idCv, category: 'reference' }));
   }, []);

   return (
      <>
         {
            isArray(referencesObj) && (referencesObj.length > 0) && (
               <CRow>
                  <CCol>
                     <LoadWr isLoad={isLoader(status)}>
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
                                                            <CRow className="row g-30 r-gap-30 mt-4">
                                                               <CCol xs={6}>
                                                                  <Input
                                                                     id={item.id}
                                                                     label="Referent Full name"
                                                                     placeholder="Referent Full name"
                                                                     value={item.fullName}
                                                                     name="fullName"
                                                                     onChange={(e) => handleSaveSelect({ index, name: e.target.name, value: e.target.value })}
                                                                  />
                                                               </CCol>
                                                               <CCol xs={6}>
                                                                  <InputSelect
                                                                     label="Company"
                                                                     placeholder="Company"
                                                                     valueState={item.company}
                                                                     data={companys?.list || []}
                                                                     isAddDiv={true}
                                                                     name="company"
                                                                     isLoad={isLoader(companys?.status)}
                                                                     isBackgraundLoad={isLoader(companys?.statusAddNew)}
                                                                     handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj })}
                                                                     handleServerRequest={handleServerRequestCompanyList}
                                                                     handleAddNew={handleAddNewCompany}
                                                                     isOutDataObj={false}
                                                                  />
                                                               </CCol>
                                                               <CCol xs={6}>
                                                                  <Input
                                                                     label="E-mail*"
                                                                     placeholder="E-mail*"
                                                                     value={item.email}
                                                                     name="email"
                                                                     invalid={(item.email.length > 0) && !(/\S+@\S+\.\S+/.test(item.email))}
                                                                     valid={/\S+@\S+\.\S+/.test(item.email)}
                                                                     onChange={(e) => handleSaveSelect({ index, name: e.target.name, value: e.target.value })}
                                                                  />
                                                               </CCol>
                                                               <CCol xs={6}>
                                                                  <InputPhoneNoControler
                                                                     label="Phone"
                                                                     placeholder="Phone"
                                                                     onChange={(value) => handleSaveSelect({ index, name: "phone", value: value })}
                                                                     value={item.phone}
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
                     </LoadWr>
                  </CCol>
               </CRow>
            )
         }

         {
            isArray(referencesObj) && (referencesObj.length == 0) && (
               <CRow className="row g-30 r-gap-30 mb-4">
                  <CCol xs={6}>
                     <Input
                        label="Referent Full name"
                        placeholder="Referent Full name"
                        value={objNew.full_name}
                        name="full_name"
                        onChange={(e) => handleSaveSelectNew({ name: e.target.name, value: e.target.value })}
                     />
                  </CCol>
                  <CCol xs={6}>
                     <InputSelect
                        label="Company"
                        placeholder="Company"
                        valueState={objNew.company}
                        data={companys?.list || []}
                        isAddDiv={true}
                        name="company"
                        isLoad={isLoader(companys?.status)}
                        isBackgraundLoad={isLoader(companys?.statusAddNew)}
                        handleSaveSelect={handleSaveSelectNew}
                        handleServerRequest={handleServerRequestCompanyList}
                        handleAddNew={handleAddNewCompany}
                        isOutDataObj={false}
                     />
                  </CCol>
                  <CCol xs={6}>
                     <Input
                        label="E-mail*"
                        placeholder="E-mail*"
                        value={objNew.email}
                        name="email"
                        invalid={(objNew.email.length > 0) && !(/\S+@\S+\.\S+/.test(objNew.email))}
                        valid={/\S+@\S+\.\S+/.test(objNew.email)}
                        onChange={(e) => handleSaveSelectNew({ name: e.target.name, value: e.target.value })}
                     />
                  </CCol>
                  <CCol xs={6}>
                     <InputPhoneNoControler
                        label="Phone"
                        placeholder="Phone"
                        onChange={(value) => handleSaveSelectNew({ name: "phone", value: value })}
                        value={objNew.phone}
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
               />
            </CCol>
            <CCol className="mt-4">
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

export default FormReference;