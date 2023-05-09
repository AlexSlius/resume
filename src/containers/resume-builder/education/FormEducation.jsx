import { CCol, CRow, } from "@coreui/react";
import { isArray } from "lodash";
import React, { useRef, useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next"

import Textarea from "../../../components/uis/textarea/TextArea"
import AddButton from "../../../components/uis/addButton/AddButton"
import DraggedItem from "../../../other/draggedItem/DraggedItem"
import { DatePicker } from "../../../components/uis/datePicker"
import { InputSelect } from "../../../components/uis/inputSelect"
import { LoadWr } from "../../../components/loadWr"
import { ButtonSteps } from "../../../components/buttonSteps"

import { cardData } from "../../../utils";
import { reorder } from '../../../helpers/drageDrop';
import { newPosition, arrPositionUpdateItem } from "../../../helpers/position";
import { isObjDatas } from '../../../helpers/datasPage';
import { isAddForm, isFocusForm, lastFormDelete } from '../../../utils/isAddNewFormResume';

import {
   updateItemFieldEducation,
   updateItemFieldEducationDate,
   updateItemFieldEducationNew,
   updatePosition,
} from "../../../slices/education";
import {
   getStudysList,
   getDegree,
   getUniversity
} from "../../../controllers/dependencies";

import {
   fetchPostAddCvOneEducation,
   fetchDeleteEducation,
   fetchUpdateEducation,
   fetchPostUpdatePositionEducations,
   fetchDeleteAll,
} from "../../../controllers/educations";
import { postUpdateCategoryViewedStatus } from '../../../controllers/addSections';

const keysFiled = [
   'facility',
   'degree',
   'dateFrom',
   'dateTo',
   'study',
   'awards',
   'description',
];

const FormEducation = ({
   dispatch,
   storeDate,
   idCv
}) => {
   const refIdTimeout = useRef(undefined);

   const {
      educations: {
         educationObj,
         objNew,
         status,
      },
      dependencies: {
         studys,
         degree,
         university,
      },
      auth: {
         autorizate: {
            isAthorized
         }
      },
   } = storeDate;
   const [selected, setSelected] = useState(null);
   const [lastFormIsEmpty, setLastFormIsEmpty] = useState(false);
   const refData = useRef(educationObj);

   const isDataPage = (isArray(educationObj) && (educationObj.length > 0)) || isObjDatas(objNew);

   const onDragEnd = (result) => {
      if (!result.destination) {
         return;
      }

      const items = reorder(
         educationObj,
         result.source.index,
         result.destination.index
      );

      let updateArr = arrPositionUpdateItem(items);

      dispatch(fetchPostUpdatePositionEducations({ idCv, data: updateArr }));

      dispatch(updatePosition(items));
   }

   const handleUpdateServer = async (index) => {
      if (refIdTimeout.current) {
         clearTimeout(refIdTimeout.current);
      }

      refIdTimeout.current = setTimeout(async () => {
         await dispatch((fetchUpdateEducation({ index })));
         clearTimeout(refIdTimeout.current);
      }, 1000);
   }

   const handleSaveSelect = async ({ index, name, value }) => {
      await dispatch(updateItemFieldEducation({ index, name, value }));
      await handleUpdateServer(index);
   }

   const handleSetDateStateData = async (index, name, date) => {
      await dispatch(updateItemFieldEducationDate({ index, name, value: date }));
      await handleUpdateServer(index);
   }

   const getSearchListStudys = async (textParams) => {
      await dispatch(getStudysList(textParams));
   }

   const handleAddOne = async () => {
      let isAddNew = isAddForm({
         data: educationObj,
         dependence: keysFiled,
         setState: setLastFormIsEmpty
      });

      if (isAddNew) {
         let re = await dispatch(fetchPostAddCvOneEducation({ idCv, position: newPosition(educationObj) }));
         setSelected(re?.payload?.id);
      }
   }

   const handleDeleteOne = (id) => {
      dispatch(fetchDeleteEducation({ idCv, id }));
   }

   const handleDeleteLastEmpty = () => {
      let resObj = lastFormDelete({
         data: refData.current,
         dependence: keysFiled,
      });

      if (resObj?.id) {
         handleDeleteOne(resObj.id);
      }
   }

   // new
   const automateNew = async (index) => {
      if (refIdTimeout.current) {
         clearTimeout(refIdTimeout.current);
      }

      refIdTimeout.current = setTimeout(async () => {
         handleAddOne();
         clearTimeout(refIdTimeout.current);
      }, 500);
   }

   const handleSaveSelectNew = ({ name, value }) => {
      dispatch(updateItemFieldEducationNew({ name, value }));
      automateNew();
   }

   const handleSaveSelectStydyNew = ({ name, value }, data) => {
      dispatch(updateItemFieldEducationNew({ name, value }));

      if (!!data) {
         automateNew();
      }
   }


   const handleSetDateStateDataNew = (name, date) => {
      dispatch(updateItemFieldEducationNew({ name, value: date }));
      automateNew();
   }
   // end new

   const handleClean = () => {
      dispatch(fetchDeleteAll({ idCv }));
   }

   const getSearchListDegree = (text = '') => {
      dispatch(getDegree(text));
   }

   const getSearchListUnivercitu = (text = '') => {
      dispatch(getUniversity(text));
   }

   useEffect(() => {
      dispatch(postUpdateCategoryViewedStatus({ idCv, category: 'education' }));
      getSearchListDegree();

      return () => {
         handleDeleteLastEmpty();
      }
   }, []);

   useEffect(() => {
      refData.current = educationObj;
   }, [educationObj]);

   return (
      <>
         {
            isArray(educationObj) && (educationObj.length > 0) && (
               <CRow>
                  <CCol>
                     {/* isLoad={isLoader(status)} */}
                     <LoadWr >
                        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                           <Droppable droppableId="droppable">
                              {
                                 (provided, snapshot) => (
                                    <div
                                       ref={provided.innerRef}
                                       {...provided.droppableProps}
                                    >
                                       {
                                          isArray(educationObj) && educationObj.map((item, index) => (
                                             <Draggable
                                                key={item.id}
                                                draggableId={String(item.id)}
                                                index={index}
                                             >
                                                {
                                                   (provided, snapshot) => (
                                                      <DraggedItem
                                                         id={item.id}
                                                         lenght={educationObj.length}
                                                         provided={provided}
                                                         key={item.id}
                                                         title={item.facility}
                                                         index={index}
                                                         setSelected={setSelected}
                                                         selected={selected}
                                                         onDelete={() => handleDeleteOne(item.id)}
                                                         skillsList={[
                                                            cardData(item?.dateFrom?.date, item?.dateTo?.date),
                                                            item.degree,
                                                            item.study
                                                         ]}
                                                      >
                                                         <CRow className={`mobile-rows row g-30 r-gap-30 ${isFocusForm({ last: (educationObj.length - 1) == index, isFocus: lastFormIsEmpty, setState: setSelected, id: item.id })}`}>
                                                            <CCol xs={6}>
                                                               <InputSelect
                                                                  label="Facility"
                                                                  valueState={item?.facility || ""}
                                                                  handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj, name: "facility" })}
                                                                  handleServerRequest={() => getSearchListUnivercitu(item?.facility)}
                                                                  isOutDataObj={false}
                                                                  data={university.list}
                                                                  isValidIn={true}
                                                                  validIn={item.facility?.length > 2}
                                                               />
                                                            </CCol>
                                                            <CCol xs={6}>
                                                               <InputSelect
                                                                  label="Degree"
                                                                  valueState={item?.degree || ""}
                                                                  handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj, name: "degree" })}
                                                                  handleServerRequest={() => getSearchListDegree(item?.degree)}
                                                                  data={degree.list}
                                                                  isOutDataObj={false}
                                                                  isValidIn={true}
                                                                  isCap={true}
                                                                  validIn={item.degree?.length > 2}
                                                               />
                                                            </CCol>
                                                            <CCol xs={6}>
                                                               <CRow className='dates-wrap'>
                                                                  <CCol xs={6} className='date-block'>
                                                                     <DatePicker
                                                                        selected={item?.dateFrom?.date}
                                                                        onChange={(date) => handleSetDateStateData(index, 'dateFrom', date)}
                                                                        floatingLabel="From"
                                                                     />
                                                                  </CCol>
                                                                  <CCol xs={6} className='date-block'>
                                                                     <DatePicker
                                                                        selected={item?.dateTo?.date}
                                                                        onChange={(date) => handleSetDateStateData(index, 'dateTo', date)}
                                                                        floatingLabel="To"
                                                                     />
                                                                  </CCol>
                                                               </CRow>
                                                            </CCol>
                                                            <CCol xs={6}>
                                                               <InputSelect
                                                                  label="Field of study"
                                                                  valueState={item.study || ""}
                                                                  data={studys.list}
                                                                  handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj, name: "study" })}
                                                                  handleServerRequest={() => getSearchListStudys(item.study)}
                                                                  isOutDataObj={false}
                                                                  isRequire={true}
                                                                  isCap={true}
                                                                  isValidIn={true}
                                                                  validIn={item.study?.length > 2}
                                                               />
                                                            </CCol>
                                                            <CCol xs={12}>
                                                               <Textarea
                                                                  value={item.description}
                                                                  onChange={(e) => handleSaveSelect({ index, name: e.target.name, value: e.target.value })}
                                                                  name="description"
                                                                  placeholder={'Description of education'}
                                                               />
                                                            </CCol>
                                                         </CRow>
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
            isArray(educationObj) && (educationObj.length == 0) && (
               <CRow className="row g-30 r-gap-30 mb-4 mobile-rows">
                  <CCol xs={6}>
                     <InputSelect
                        label="Facility"
                        valueState={objNew?.facility || ""}
                        handleSaveSelect={(obj, data) => handleSaveSelectNew({ ...obj, name: "facility" }, data)}
                        data={university.list}
                        handleServerRequest={() => getSearchListUnivercitu(objNew?.facility)}
                        isOutDataObj={false}
                        isValidIn={true}
                        validIn={objNew?.facility?.length > 2}
                     />
                  </CCol>
                  <CCol xs={6}>
                     <InputSelect
                        label="Degree"
                        valueState={objNew?.degree || ""}
                        handleSaveSelect={(obj, data) => handleSaveSelectNew({ ...obj, name: "degree" }, data)}
                        handleServerRequest={() => getSearchListDegree(objNew?.degree)}
                        data={degree.list}
                        isOutDataObj={false}
                        isValidIn={true}
                        isCap={true}
                        validIn={objNew?.degree?.length > 2}
                     />
                  </CCol>
                  <CCol xs={6}>
                     <CRow>
                        <CCol xs={6}>
                           <DatePicker
                              selected={objNew?.period_from}
                              onChange={(date) => handleSetDateStateDataNew('period_from', date)}
                              floatingLabel="From"
                           />
                        </CCol>
                        <CCol xs={6}>
                           <DatePicker
                              selected={objNew?.period_to}
                              onChange={(date) => handleSetDateStateDataNew('period_to', date)}
                              floatingLabel="To"
                           />
                        </CCol>
                     </CRow>
                  </CCol>
                  <CCol xs={6}>
                     <InputSelect
                        label="Field of study"
                        valueState={objNew.study || ""}
                        data={studys.list}
                        handleSaveSelect={(obj, data) => handleSaveSelectNew({ ...obj, name: "study" }, data)}
                        handleServerRequest={() => getSearchListStudys(objNew.study)}
                        isOutDataObj={false}
                        isRequire={true}
                        isCap={true}
                        isValidIn={true}
                        validIn={objNew.study?.length > 2}
                     />
                  </CCol>
                  <CCol xs={12}>
                     <Textarea
                        value={objNew.description}
                        onChange={(e) => handleSaveSelectNew({ name: e.target.name, value: e.target.value })}
                        name="description"
                        placeholder={'Description of education'}
                     />
                  </CCol>
               </CRow>
            )
         }

         <CRow>
            <CCol xs={12}>
               <AddButton
                  onClick={handleAddOne}
                  text={'Add one more education'}
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

export default FormEducation;
