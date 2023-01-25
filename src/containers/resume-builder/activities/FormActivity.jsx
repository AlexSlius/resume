
import { formatDate } from "../../../utils";
import {
   CCol,
   CRow,
} from "@coreui/react";
import { isArray } from "lodash";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next"

import Textarea from "../../../components/uis/textarea/TextArea";
import AddButton from "../../../components/uis/addButton/AddButton";
import DraggedItem from "../../../other/draggedItem/DraggedItem";
import { DatePicker } from "../../../components/uis/datePicker";
import { InputSelect } from "../../../components/uis/inputSelect"
import { LoadWr } from "../../../components/loadWr"
import { ButtonSteps } from "../../../components/buttonSteps"
import { isLoader } from "../../../helpers/loadings"
import { reorder } from '../../../helpers/drageDrop';
import { getIdOfNameCountrys } from "../../../helpers/countrys"

import {
   updateItemFieldActivity,
   updateItemFieldActivityDate,
   updateItemFieldActivityNew,
   updatePosition
} from "../../../slices/activity";

import {
   fetchGetCvActivitys,
   fetchPostAddCvOneActivitys,
   fetchDeleteActivitys,
   fetchUpdateActivitys,
} from "../../../controllers/activitys";

import {
   fetchGetCities,
   fetchGetCountrys,
} from '../../../controllers/dependencies';

const FormActivity = ({
   dispatch,
   storeDate,
   idCv
}) => {
   const refIdTimeout = React.useRef(undefined);

   const {
      dependencies: {
         coutrys,
         cities,
      },
      activitys: {
         activityObj,
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

   const onDragEnd = (result) => {
      if (!result.destination) {
         return;
      }

      const items = reorder(
         activityObj,
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
         await dispatch((fetchUpdateActivitys({ index })));
         clearTimeout(refIdTimeout.current);
      }, 1000);
   }

   const handleSaveSelect = async ({ index, name, value }) => {
      await dispatch(updateItemFieldActivity({ index, name, value }));
      await handleUpdateServer(index);
   }

   const handleSetDateStateData = async (index, name, date) => {

      await dispatch(updateItemFieldActivityDate({ index, name, value: date }));
      await handleUpdateServer(index);
   }

   const handleDeleteOne = (id) => {
      dispatch(fetchDeleteActivitys({ idCv, id }));
   }

   const handleAddOne = () => {
      dispatch(fetchPostAddCvOneActivitys({ idCv }));
   }

   const handleSaveSelectNew = async ({ name, value }) => {
      await dispatch(updateItemFieldActivityNew({ name, value }));
   }

   const handleServerRequestCity = async (value, nameCountry) => {
      let idCountru = getIdOfNameCountrys({ objArr: coutrys.list, nameCountry });
      await dispatch(fetchGetCities({ id: idCountru, params: value }));
   }

   React.useEffect(() => {
      dispatch(fetchGetCountrys());
      fetchGetCvActivitys({ idCv });
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
                                    isArray(activityObj) && activityObj.map((item, index) => (
                                       <Draggable
                                          key={item.id}
                                          draggableId={String(item.id)}
                                          index={index}
                                       >
                                          {
                                             (provided, snapshot) => (
                                                <DraggedItem
                                                   id={item.id}
                                                   lenght={activityObj.length}
                                                   provided={provided}
                                                   key={item.id}
                                                   title={item.title}
                                                   index={index}
                                                   onDelete={() => handleDeleteOne(item.id)}
                                                   setSelected={setSelected}
                                                   selected={selected == item.id}
                                                   skillsList={[
                                                      `${formatDate(item?.dateFrom?.date)} - ${formatDate(
                                                         item?.dateTo?.date
                                                      )}`,
                                                      item.employer
                                                   ]}
                                                >
                                                   <CRow className="row g-30 r-gap-30 mt-4">
                                                      <CCol xs={6}>
                                                         <InputSelect
                                                            label="Function Title"
                                                            placeholder="Function Title"
                                                            valueState={item?.title || ""}
                                                            name="title"
                                                            handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj })}
                                                            isOutDataObj={false}
                                                            isModal={false}
                                                         />
                                                      </CCol>
                                                      <CCol xs={6}>
                                                         <InputSelect
                                                            label="Employer"
                                                            placeholder="Employer"
                                                            valueState={item?.employer || ""}
                                                            name="employer"
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
                                                      <CCol xs={2}>
                                                         <InputSelect
                                                            valueState={item.country || ""}
                                                            data={coutrys.list}
                                                            name="country"
                                                            isLoad={isLoader(coutrys.status)}
                                                            handleSaveSelect={(obj, data) => handleSaveSelect({ index, ...obj }, data)}
                                                            isOutDataObj={false}
                                                            isIconArrow={true}
                                                            isFlag={true}
                                                            isSearch={false}
                                                         />
                                                      </CCol>
                                                      <CCol xs={4}>
                                                         <InputSelect
                                                            label="City"
                                                            placeholder="City"
                                                            valueState={item.city || ""}
                                                            name="city"
                                                            data={cities.list}
                                                            isLoad={isLoader(cities?.status)}
                                                            handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj })}
                                                            handleServerRequest={(value) => handleServerRequestCity(value, item.country)}
                                                            isOutDataObj={false}
                                                         />
                                                      </CCol>
                                                      <CCol xs={12}>
                                                         <Textarea
                                                            value={item.description}
                                                            onChange={(e) => handleSaveSelect({ index, name: e.target.name, value: e.target.value })}
                                                            hideButton={true}
                                                            name="description"
                                                            placeholder={'Description of activity'}
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

         <CRow className="row g-30 r-gap-30 mt-4 bt-1">
            <CCol xs={6}>
               <InputSelect
                  label="Function Title"
                  placeholder="Function Title"
                  valueState={objNew.title || ""}
                  name="title"
                  handleSaveSelect={handleSaveSelectNew}
                  isOutDataObj={false}
                  isModal={false}
               />
            </CCol>
            <CCol xs={6}>
               <InputSelect
                  label="Employer"
                  placeholder="Employer"
                  valueState={objNew.employer || ""}
                  name="employer"
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
            <CCol xs={2}>
               <InputSelect
                  valueState={objNew.country || ""}
                  data={coutrys.list}
                  name="country"
                  isLoad={isLoader(coutrys.status)}
                  handleSaveSelect={handleSaveSelectNew}
                  isOutDataObj={false}
                  isIconArrow={true}
                  isFlag={true}
                  isSearch={false}
               />
            </CCol>
            <CCol xs={4}>
               <InputSelect
                  label="City"
                  placeholder="City"
                  valueState={objNew.city || ""}
                  name="city"
                  data={cities.list}
                  isLoad={isLoader(cities?.status)}
                  handleSaveSelect={handleSaveSelectNew}
                  handleServerRequest={(value) => handleServerRequestCity(value, objNew.country)}
                  isOutDataObj={false}
               />
            </CCol>
            <CCol xs={12}>
               <Textarea
                  value={objNew.description}
                  onChange={(e) => handleSaveSelectNew({ name: e.target.name, value: e.target.value })}
                  hideButton={true}
                  name="description"
                  placeholder={'Description of activity'}
               />
            </CCol>
         </CRow>
         <CRow className="mt-4">
            <CCol xs={12}>
               <AddButton
                  onClick={handleAddOne}
                  text={'Add one more activity'}
               />
            </CCol>
            <CCol className="mt-4">
               <ButtonSteps isAthorized={isAthorized} />
            </CCol>
         </CRow>
      </>
   )
}

export default FormActivity;
