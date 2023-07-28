import {
   CCol,
   CRow
} from "@coreui/react";
import { isArray } from "lodash";
import React, { useRef, useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next"

import AddButton from "../../../components/uis/addButton/AddButton";
import DraggedItem from "../../../other/draggedItem/DraggedItem";
import { DatePicker } from "../../../components/uis/datePicker";
import { InputSelect } from "../../../components/uis/inputSelect"
import { LoadWr } from "../../../components/loadWr"
import { cardData } from "../../../utils";
import { isAddForm, isFocusForm, lastFormDelete } from '../../../utils/isAddNewFormResume';
import { focusFieldInputClassName } from "../../../helpers/fiedlFocus";

import { reorder } from '../../../helpers/drageDrop';
import { isObjDatas, isObjDatasKeys } from '../../../helpers/datasPage';
import { isDelete } from '../../../helpers/checkingStatuses';
import { ButtonSteps } from "../../../components/buttonSteps"

import {
   updateItemFieldCourse,
   updateItemFieldCourseDate,
   updatePosition,
   updateItemFieldCourseNew,
} from "../../../slices/courses";

import {
   fetchPostAddCvOneCourses,
   fetchDeleteCourses,
   fetchUpdateCourses,
   fetchPostUpdatePositionCourses,
   fetchDeleteAll
} from "../../../controllers/courses";
import { postUpdateCategoryViewedStatus } from '../../../controllers/addSections';

import { newPosition, arrPositionUpdateItem } from "../../../helpers/position";

let keysFiled = [
   'title',
   'institution',
   'dateFrom',
   'dateTo'
];

const FormCourse = ({
   dispatch,
   storeDate,
   idCv
}) => {
   const refIdTimeout = useRef(undefined);

   const {
      courses: {
         courseObj,
         objNew,
      },
      auth: {
         autorizate: {
            isAthorized
         }
      },
   } = storeDate;
   const [selected, setSelected] = useState(null);
   const [lastFormIsEmpty, setLastFormIsEmpty] = useState(false);
   const refData = useRef(courseObj);
   const isDataPage = (courseObj?.length > 1) || isObjDatasKeys(courseObj?.[0] || {}) || isObjDatas(objNew);

   const onDragEnd = (result) => {
      if (!result.destination) {
         return;
      }

      const items = reorder(
         courseObj,
         result.source.index,
         result.destination.index
      );

      let updateArr = arrPositionUpdateItem(items);

      dispatch(fetchPostUpdatePositionCourses({ idCv, data: updateArr }));

      dispatch(updatePosition(updateArr));
   }

   const handleUpdateServer = async (index) => {
      if (refIdTimeout.current) {
         clearTimeout(refIdTimeout.current);
      }

      refIdTimeout.current = setTimeout(async () => {
         await dispatch((fetchUpdateCourses({ index })));
         clearTimeout(refIdTimeout.current);
      }, 1000);
   }

   const handleSaveSelect = async ({ index, name, value }) => {
      await dispatch(updateItemFieldCourse({ index, name, value }));
      await handleUpdateServer(index);
   }

   const handleSaveSelectNew = async ({ name, value }, statusClick, classnextFocus) => {
      await dispatch(updateItemFieldCourseNew({ name, value }));

      if (statusClick) {
         focusFieldInputClassName(classnextFocus);
      }

      automateNew();
   }

   const handleSetDateStateData = async (index, name, date, statusClick, classnextFocus) => {
      await dispatch(updateItemFieldCourseDate({ index, name, value: date }));
      await handleUpdateServer(index);

      if (!!statusClick) {
         focusFieldInputClassName(classnextFocus);
      }
   }

   const handleDeleteOne = (id) => {
      dispatch(fetchDeleteCourses({ idCv, id }));
   }

   const handleAddOne = async () => {
      let isAddNew = isAddForm({
         data: courseObj,
         dependence: keysFiled,
         setState: setLastFormIsEmpty
      });

      if (isAddNew) {
         let re = await dispatch(fetchPostAddCvOneCourses({ idCv, position: newPosition(courseObj) }));
         setSelected(re?.payload?.id);
      }
   }

   const handleClean = async () => {
      let res = await dispatch(fetchDeleteAll({ idCv }));

      if (isDelete(res.payload)) {
         await handleAddOne();
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

   const handleDeleteLastEmpty = () => {
      if (!(courseObj?.length > 0))
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
      if (isArray(courseObj) && (courseObj?.length == 0)) {
         handleAddOne();
      }

      dispatch(postUpdateCategoryViewedStatus({ idCv, category: 'courses' }));

      return () => {
         handleDeleteLastEmpty();
      }
   }, []);

   useEffect(() => {
      refData.current = courseObj;
   }, [courseObj]);

   return (
      <>
         {
            isArray(courseObj) && (courseObj.length > 0) && (
               <CRow>
                  <CCol>
                     {/* isLoad={isLoader(status)} */}
                     <LoadWr>
                        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                           <Droppable droppableId="droppable">
                              {
                                 (provided, snapshot) => (
                                    <div
                                       ref={provided.innerRef}
                                       {...provided.droppableProps}
                                    >
                                       {
                                          isArray(courseObj) && courseObj.map((item, index) => (
                                             <Draggable
                                                key={item.id}
                                                draggableId={String(item.id)}
                                                index={index}
                                             >
                                                {
                                                   (provided, snapshot) => (
                                                      <DraggedItem
                                                         id={item.id}
                                                         lenght={courseObj.length}
                                                         provided={provided}
                                                         key={item.id}
                                                         title={item.title}
                                                         index={index}
                                                         setSelected={setSelected}
                                                         selected={selected}
                                                         onDelete={() => handleDeleteOne(item.id)}
                                                         skillsList={[
                                                            cardData(item?.dateFrom?.date, item?.dateTo?.date),
                                                            item.institution
                                                         ]}
                                                      >
                                                         <CRow className={`mobile-rows row g-30 r-gap-30 ${isFocusForm({ last: (courseObj.length - 1) == index, isFocus: lastFormIsEmpty, setState: setSelected, id: item.id })}`}>
                                                            <CCol xs={6}>
                                                               <InputSelect
                                                                  label="Course title"
                                                                  valueState={item?.title || ""}
                                                                  handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj, name: "title" })}
                                                                  isOutDataObj={false}
                                                                  isModal={false}
                                                                  isValidIn={true}
                                                                  validIn={item?.title?.trim()?.length > 3}
                                                               />
                                                            </CCol>
                                                            <CCol xs={6}>
                                                               <InputSelect
                                                                  label="Institution"
                                                                  valueState={item?.institution || ""}
                                                                  handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj, name: "institution" })}
                                                                  isOutDataObj={false}
                                                                  isModal={false}
                                                                  isValidIn={true}
                                                                  validIn={item?.institution?.trim()?.length > 3}
                                                               />
                                                            </CCol>
                                                            <CCol xs={6}>
                                                               <CRow className='dates-wrap'>
                                                                  <CCol xs={6} className='date-block'>
                                                                     <DatePicker
                                                                        selected={item?.dateFrom?.date}
                                                                        onChange={(date, statusClick) => handleSetDateStateData(index, 'dateFrom', date, statusClick, `dataTo_n${index}`)}
                                                                        floatingLabel="From"
                                                                     />
                                                                  </CCol>
                                                                  <CCol xs={6} className={`date-block dataTo_n${index}`}>
                                                                     <DatePicker
                                                                        selected={item?.dateTo?.date}
                                                                        onChange={(date) => handleSetDateStateData(index, 'dateTo', date)}
                                                                        floatingLabel="To"
                                                                        prevData={item?.dateFrom?.date || undefined}
                                                                     />
                                                                  </CCol>
                                                               </CRow>
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
            isArray(courseObj) && (courseObj.length == 0) && (
               <CRow className="mobile-rows row g-30 r-gap-30 mb-4">
                  <CCol xs={6}>
                     <InputSelect
                        label="Course title"
                        valueState={objNew.title || ""}
                        name="title"
                        handleSaveSelect={handleSaveSelectNew}
                        isOutDataObj={false}
                        isModal={false}
                        isValidIn={true}
                        validIn={objNew.title?.trim()?.length > 3}
                     />
                  </CCol>
                  <CCol xs={6}>
                     <InputSelect
                        label="Institution"
                        valueState={objNew.institution || ""}
                        name="institution"
                        handleSaveSelect={handleSaveSelectNew}
                        isOutDataObj={false}
                        isModal={false}
                        isValidIn={true}
                        validIn={objNew.institution?.trim()?.length > 3}
                     />
                  </CCol>
                  <CCol xs={6}>
                     <CRow className='dates-wrap'>
                        <CCol xs={6} className='date-block'>
                           <DatePicker
                              selected={objNew.period_from}
                              onChange={(date, statusClick) => handleSaveSelectNew({ name: 'period_from', value: date }, statusClick, "dataTo_new")}
                              floatingLabel="From"
                           />
                        </CCol>
                        <CCol xs={6} className='date-block dataTo_new'>
                           <DatePicker
                              selected={objNew.period_to}
                              onChange={(date) => handleSaveSelectNew({ name: 'period_to', value: date })}
                              floatingLabel="To"
                              prevData={objNew.period_to || undefined}
                           />
                        </CCol>
                     </CRow>
                  </CCol>
               </CRow>
            )
         }

         <CRow>
            <CCol xs={12}>
               <AddButton
                  onClick={handleAddOne}
                  text={'Add one more course'}
                  disabled={!(courseObj?.length > 0)}
               />
            </CCol>
            <CCol className="mt-4">
               <ButtonSteps
                  isAthorized={isAthorized}
                  disabledNext={!isDataPage}
                  onClean={handleClean}
                  nameSection="courses"
               />
            </CCol>
         </CRow>
      </>
   )
}

export default FormCourse;

