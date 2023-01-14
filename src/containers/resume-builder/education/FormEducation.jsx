import {
   CFormInput,
   CButton,
   CCol,
   CRow,
} from "@coreui/react";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next"

import Textarea from "../../../components/uis/textarea/TextArea"
import AddButton from "../../../components/uis/addButton/AddButton"
import DraggedItem from "../../../other/draggedItem/DraggedItem"
import { DatePicker } from "../../../components/uis/datePicker"
import { LoadChildrenBtn } from "../../../components/loadChildrenBtn"
import { InputSelect } from "../../../components/uis/inputSelect"

import { formatDate } from "../../../utils";
import { reorder } from '../../../helpers/drageDrop';
import { isLoader } from "../../../helpers/loadings"
import { updateItemFieldEducation } from "../../../slices/education";
import { getStudysList } from "../../../controllers/dependencies";

const FormEducation = () => {
   const dispatch = useDispatch();
   const {
      educations: {
         educationObj
      },
      dependencies: {
         studys
      },
   } = useSelector(state => state);

   const onDragEnd = (result) => {
      if (!result.destination) {
         return;
      }

      const items = reorder(
         educationObj,
         result.source.index,
         result.destination.index
      );

      // items.forEach((item, index) => {
      //   item.position = index;
      // })

      // console.log("items: ", items);

      // setStateArray(items);

      // new list, idStorie, idMedia
      // dispatch(updateDragDropStorie(items, idStorie, activeMediaStorie?.id));
   }

   const handleSaveSelect = ({ index, name, value }) => {
      dispatch(updateItemFieldEducation({ index, name, value }));
   }

   const handlerSetDateState = (index, name, date) => {
      dispatch(updateItemFieldEducation({ index, name, value: date?.toString() }))
   }

   const getSearchListStudys = async (textParams) => {
      await dispatch(getStudysList(textParams));
   }

   return (
      <>
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
                                 educationObj.map((item, index) => (
                                    <Draggable
                                       key={item.id}
                                       draggableId={String(item.id)}
                                       index={index}
                                    >
                                       {
                                          (provided, snapshot) => (
                                             <DraggedItem
                                                provided={provided}
                                                key={item.id}
                                                title={item.facility}
                                                // onClick={handleSelect.bind(null, education.id)}
                                                // onDelete={handleDelete.bind(null, education.id)}
                                                skillsList={[
                                                   `${formatDate(item.period_from)} - ${formatDate(
                                                      item.period_to
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
                                                         // isAddDiv={true}
                                                         // data={studys.list}
                                                         // isLoad={isLoader(studys?.status)}
                                                         handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj })}
                                                         // handleServerRequest={() => getSearchListStudys(item.study)}
                                                         isOutDataObj={false}
                                                         // isFirstList={false}
                                                         isModal={false}
                                                      />
                                                   </CCol>
                                                   <CCol xs={6}>
                                                      <InputSelect
                                                         label="Degree"
                                                         placeholder="Degree"
                                                         valueState={item?.degree || ""}
                                                         name="degree"
                                                         // isAddDiv={true}
                                                         // data={studys.list}
                                                         // isLoad={isLoader(studys?.status)}
                                                         handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj })}
                                                         // handleServerRequest={() => getSearchListStudys(item.study)}
                                                         isOutDataObj={false}
                                                         // isFirstList={false}
                                                         isModal={false}
                                                      />
                                                   </CCol>
                                                   <CCol xs={6}>
                                                      <CRow>
                                                         <CCol xs={6}>
                                                            <DatePicker
                                                               selected={item.period_from ? new Date(item.period_from) : item.period_from}
                                                               onChange={(date) => handlerSetDateState(index, 'period_from', date)}
                                                               floatingLabel="From"
                                                               placeholderText="From"
                                                               name="period_from"
                                                               calendarClassName="custom-datepicker"
                                                               wrapperClassName="custom-datepicker-wrapper"
                                                               dateFormat="MMM, yyyy"
                                                               showMonthYearPicker
                                                               showPopperArrow={false}
                                                               useShortMonthInDropdown={true}
                                                            />
                                                         </CCol>
                                                         <CCol xs={6}>
                                                            <DatePicker
                                                               selected={item.period_to ? new Date(item.period_to) : item.period_to}
                                                               onChange={(date) => handlerSetDateState(index, 'period_to', date)}
                                                               floatingLabel="To"
                                                               placeholderText="To"
                                                               name="period_to"
                                                               calendarClassName="custom-datepicker"
                                                               wrapperClassName="custom-datepicker-wrapper"
                                                               dateFormat="MMM, yyyy"
                                                               showMonthYearPicker
                                                               showPopperArrow={false}
                                                               useShortMonthInDropdown={true}
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
                                                         isAddDiv={true}
                                                         data={studys.list}
                                                         isLoad={isLoader(studys?.status)}
                                                         handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj })}
                                                         handleServerRequest={() => getSearchListStudys(item.study)}
                                                         isOutDataObj={false}
                                                         isFirstList={false}
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
            </CCol>
         </CRow>
         <CRow className="mt-4">
            <CCol xs={12}>
               <AddButton
                  text={'Add one more education'}
               />
            </CCol>
            <CCol className="mt-4">
               {/* isLoad={isLoader(status)} */}
               <LoadChildrenBtn >
                  <CButton type="submit" color="blue">Continue</CButton>
               </LoadChildrenBtn>
            </CCol>
         </CRow>
      </>
   )
}

export default FormEducation;
