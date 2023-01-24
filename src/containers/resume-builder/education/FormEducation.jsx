import {
   CCol,
   CRow,
} from "@coreui/react";
import { isArray } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next"

import Textarea from "../../../components/uis/textarea/TextArea"
import AddButton from "../../../components/uis/addButton/AddButton"
import DraggedItem from "../../../other/draggedItem/DraggedItem"
import { DatePicker } from "../../../components/uis/datePicker"
import { InputSelect } from "../../../components/uis/inputSelect"
import { LoadWr } from "../../../components/loadWr"
import { ButtonSteps } from "../../../components/buttonSteps"

import { formatDate } from "../../../utils";
import { reorder } from '../../../helpers/drageDrop';
import { isLoader } from "../../../helpers/loadings"
import {
   updateItemFieldEducation,
   updateItemFieldEducationDate,
   updateItemFieldEducationNew,
   updatePosition,
} from "../../../slices/education";
import { getStudysList } from "../../../controllers/dependencies";
import { localStorageGet } from "../../../helpers/localStorage";

import {
   functionFetchEducation,
   fetchPostAddCvOneEducation,
   fetchDeleteEducation,
   fetchUpdateEducation
} from "../../../controllers/educations";

const FormEducation = () => {
   const dispatch = useDispatch();
   const refIdTimeout = React.useRef(undefined);
   const {
      educations: {
         educationObj,
         objNew,
         status
      },
      dependencies: {
         studys
      },
      auth: {
         autorizate: {
            isAthorized
         }
      },
   } = useSelector(state => state);
   const idCv = localStorageGet('idCv');

   const onDragEnd = (result) => {
      if (!result.destination) {
         return;
      }

      const items = reorder(
         educationObj,
         result.source.index,
         result.destination.index
      );

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

   const handleAddOne = () => {
      dispatch(fetchPostAddCvOneEducation({ idCv }));
   }

   const handleDeleteOne = (id) => {
      dispatch(fetchDeleteEducation({ idCv, id }));
   }

   // new
   const handleSaveSelectNew = ({ name, value }) => {
      dispatch(updateItemFieldEducationNew({ name, value }));
   }

   const handleSetDateStateDataNew = (name, date) => {
      dispatch(updateItemFieldEducationNew({ name, value: date }));
   }
   // end new

   React.useEffect(() => {
      functionFetchEducation({ dispatch, isPage: true, idCv });
   }, []);

   return (
      <>
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
                                    isArray(educationObj) && educationObj.map((item, index) => (
                                       <Draggable
                                          key={item.id}
                                          draggableId={String(item.id)}
                                          index={index}
                                       >
                                          {
                                             (provided, snapshot) => (
                                                <DraggedItem
                                                   lenght={educationObj.length}
                                                   provided={provided}
                                                   key={item.id}
                                                   title={item.facility}
                                                   index={index}
                                                   onDelete={() => handleDeleteOne(item.id)}
                                                   skillsList={[
                                                      `${formatDate(item?.dateFrom?.date)} - ${formatDate(
                                                         item?.dateTo?.date
                                                      )}`,
                                                      item.degree,
                                                      item.study
                                                   ]}
                                                >
                                                   <CRow className="row g-30 r-gap-30 mt-4">
                                                      <CCol xs={6}>
                                                         <InputSelect
                                                            label="Facility"
                                                            placeholder="Facility"
                                                            valueState={item?.facility || ""}
                                                            name="facility"
                                                            handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj })}
                                                            isOutDataObj={false}
                                                            isModal={false}
                                                         />
                                                      </CCol>
                                                      <CCol xs={6}>
                                                         <InputSelect
                                                            label="Degree"
                                                            placeholder="Degree"
                                                            valueState={item?.degree || ""}
                                                            name="degree"
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
                                                      <CCol xs={6}>
                                                         <InputSelect
                                                            label="Field of study"
                                                            placeholder="Field of study"
                                                            valueState={item.study || ""}
                                                            name="study"
                                                            data={studys.list}
                                                            isLoad={isLoader(studys?.status)}
                                                            handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj })}
                                                            handleServerRequest={() => getSearchListStudys(item.study)}
                                                            isOutDataObj={false}
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
         <CRow className="row g-30 r-gap-30 mt-4">
            <CCol xs={6}>
               <InputSelect
                  label="Facility"
                  placeholder="Facility"
                  valueState={objNew?.facility || ""}
                  name="facility"
                  handleSaveSelect={handleSaveSelectNew}
                  isOutDataObj={false}
                  isModal={false}
               />
            </CCol>
            <CCol xs={6}>
               <InputSelect
                  label="Degree"
                  placeholder="Degree"
                  valueState={objNew?.degree || ""}
                  name="degree"
                  handleSaveSelect={handleSaveSelectNew}
                  isOutDataObj={false}
                  isModal={false}
               />
            </CCol>
            <CCol xs={6}>
               <CRow>
                  <CCol xs={6}>
                     <DatePicker
                        selected={objNew?.period_from}
                        onChange={(date) => handleSetDateStateDataNew('period_from', date)}
                        floatingLabel="From"
                        placeholderText="From"
                        name="period_from"
                     />
                  </CCol>
                  <CCol xs={6}>
                     <DatePicker
                        selected={objNew?.period_to}
                        onChange={(date) => handleSetDateStateDataNew('period_to', date)}
                        floatingLabel="To"
                        placeholderText="To"
                        name="period_to"
                     />
                  </CCol>
               </CRow>
            </CCol>
            <CCol xs={6}>
               <InputSelect
                  label="Field of study"
                  placeholder="Field of study"
                  valueState={objNew.study || ""}
                  name="study"
                  data={studys.list}
                  isLoad={isLoader(studys?.status)}
                  handleSaveSelect={handleSaveSelectNew}
                  handleServerRequest={() => getSearchListStudys(objNew.study)}
                  isOutDataObj={false}
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
         <CRow className="mt-4">
            <CCol xs={12}>
               <AddButton
                  onClick={handleAddOne}
                  text={'Add one more education'}
               />
            </CCol>
            <CCol className="mt-4">
               <ButtonSteps isAthorized={isAthorized} />
            </CCol>
         </CRow>
      </>
   )
}

export default FormEducation;
