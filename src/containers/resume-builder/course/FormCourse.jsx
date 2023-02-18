import {
   CCol,
   CRow
} from "@coreui/react";
import { isArray } from "lodash";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next"

import AddButton from "../../../components/uis/addButton/AddButton";
import DraggedItem from "../../../other/draggedItem/DraggedItem";
import { DatePicker } from "../../../components/uis/datePicker";
import { InputSelect } from "../../../components/uis/inputSelect"
import { LoadWr } from "../../../components/loadWr"
import { isLoader } from "../../../helpers/loadings"
import { cardData } from "../../../utils";

import { reorder } from '../../../helpers/drageDrop';
import { isObjDatas } from '../../../helpers/datasPage';
import { ButtonSteps } from "../../../components/buttonSteps"

import {
   updateItemFieldCourse,
   updateItemFieldCourseDate,
   updatePosition,
   updateItemFieldCourseNew,
} from "../../../slices/courses";

import {
   fetchGetCvCourses,
   fetchPostAddCvOneCourses,
   fetchDeleteCourses,
   fetchUpdateCourses,
   fetchPostUpdatePositionCourses,
   fetchDeleteAll
} from "../../../controllers/courses";
import { postUpdateCategoryViewedStatus } from '../../../controllers/addSections';

import { newPosition, arrPositionUpdateItem } from "../../../helpers/position";

const FormCourse = ({
   dispatch,
   storeDate,
   idCv
}) => {
   const refIdTimeout = React.useRef(undefined);

   const {
      courses: {
         courseObj,
         objNew,
         status
      },
      auth: {
         autorizate: {
            isAthorized
         }
      },
   } = storeDate;
   const [selected, setSelected] = React.useState(null);

   const isDataPage = (isArray(courseObj) && (courseObj.length > 0)) || isObjDatas(objNew);

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

   const handleSaveSelectNew = async ({ name, value }) => {
      await dispatch(updateItemFieldCourseNew({ name, value }));

      automateNew();
   }

   const handleSetDateStateData = async (index, name, date) => {
      await dispatch(updateItemFieldCourseDate({ index, name, value: date }));
      await handleUpdateServer(index);
   }

   const handleDeleteOne = (id) => {
      dispatch(fetchDeleteCourses({ idCv, id }));
   }

   const handleAddOne = async () => {
      let re = await dispatch(fetchPostAddCvOneCourses({ idCv, position: newPosition(courseObj) }));
      setSelected(re?.payload?.id);
   }

   const handleClean = () => {
      dispatch(fetchDeleteAll({ idCv }));
   }

   const automateNew = async (index) => {
      if (refIdTimeout.current) {
         clearTimeout(refIdTimeout.current);
      }

      refIdTimeout.current = setTimeout(async () => {
         handleAddOne();
         clearTimeout(refIdTimeout.current);
      }, 2000);
   }

   React.useEffect(() => {
      // fetchGetCvCourses({ idCv });
      dispatch(postUpdateCategoryViewedStatus({ idCv, category: 'courses' }));
   }, []);

   return (
      <>
         {
            isArray(courseObj) && (courseObj.length > 0) && (
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
                                                         <CRow className="row g-30 r-gap-30 mt-4">
                                                            <CCol xs={6}>
                                                               <InputSelect
                                                                  label="Course title"
                                                                  placeholder="Course title"
                                                                  valueState={item?.title || ""}
                                                                  name="title"
                                                                  handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj })}
                                                                  isOutDataObj={false}
                                                                  isModal={false}
                                                               />
                                                            </CCol>
                                                            <CCol xs={6}>
                                                               <InputSelect
                                                                  label="Institution"
                                                                  placeholder="Institution"
                                                                  valueState={item?.institution || ""}
                                                                  name="institution"
                                                                  handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj })}
                                                                  isOutDataObj={false}
                                                                  isModal={false}
                                                               />
                                                            </CCol>
                                                            <CCol xs={6}>
                                                               <CRow>
                                                                  <CCol xs={6}>
                                                                     <DatePicker
                                                                        selected={item?.dateFrom?.date}
                                                                        onChange={(date) => handleSetDateStateData(index, 'dateFrom', date)}
                                                                        floatingLabel="From"
                                                                        placeholderText="From"
                                                                        name="dateFrom"
                                                                     />
                                                                  </CCol>
                                                                  <CCol xs={6}>
                                                                     <DatePicker
                                                                        selected={item?.dateTo?.date}
                                                                        onChange={(date) => handleSetDateStateData(index, 'dateTo', date)}
                                                                        floatingLabel="To"
                                                                        placeholderText="To"
                                                                        name="dateTo"
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
               <CRow className="row g-30 r-gap-30 mb-4">
                  <CCol xs={6}>
                     <InputSelect
                        label="Course title"
                        placeholder="Course title"
                        valueState={objNew.title || ""}
                        name="title"
                        handleSaveSelect={handleSaveSelectNew}
                        isOutDataObj={false}
                        isModal={false}
                     />
                  </CCol>
                  <CCol xs={6}>
                     <InputSelect
                        label="Institution"
                        placeholder="Institution"
                        valueState={objNew.institution || ""}
                        name="institution"
                        handleSaveSelect={handleSaveSelectNew}
                        isOutDataObj={false}
                        isModal={false}
                     />
                  </CCol>
                  <CCol xs={6}>
                     <CRow>
                        <CCol xs={6}>
                           <DatePicker
                              selected={objNew.period_from}
                              onChange={(date) => handleSaveSelectNew({ name: 'period_from', value: date })}
                              floatingLabel="From"
                              placeholderText="From"
                              name="period_from"
                           />
                        </CCol>
                        <CCol xs={6}>
                           <DatePicker
                              selected={objNew.period_to}
                              onChange={(date) => handleSaveSelectNew({ name: 'period_to', value: date })}
                              floatingLabel="To"
                              placeholderText="To"
                              name="period_to"
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

export default FormCourse;

