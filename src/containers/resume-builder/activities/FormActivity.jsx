import { CCol, CRow } from "@coreui/react";
import { isArray, isObject } from "lodash";
import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next";

import Textarea from "../../../components/uis/textarea/TextArea";
import AddButton from "../../../components/uis/addButton/AddButton";
import DraggedItem from "../../../other/draggedItem/DraggedItem";
import { DatePicker } from "../../../components/uis/datePicker";
import { InputSelect } from "../../../components/uis/inputSelect"
import { ButtonSteps } from "../../../components/buttonSteps"
import { reorder } from '../../../helpers/drageDrop';
import { getIdOfNameCountrys } from "../../../helpers/countrys"
import { isObjDatas, isObjDatasKeys } from '../../../helpers/datasPage';
import { focusFieldInputClassName } from "../../../helpers/fiedlFocus";
import { isDelete } from '../../../helpers/checkingStatuses';
import { cardData } from "../../../utils";
import { isAddForm, isFocusForm, lastFormDelete } from '../../../utils/isAddNewFormResume';

import {
   updateItemFieldActivity,
   updateItemFieldActivityDate,
   updateItemFieldActivityNew,
   updatePosition
} from "../../../slices/activity";
import {
   fetchPostAddCvOneActivitys,
   fetchDeleteActivitys,
   fetchUpdateActivitys,
   fetchPostUpdatePositionActivitys,
   fetchDeleteAll
} from "../../../controllers/activitys";
import {
   fetchGetCities,
   getCompanyList,
   addCompany
} from '../../../controllers/dependencies';
import { postUpdateCategoryViewedStatus } from '../../../controllers/addSections';

import { newPosition, arrPositionUpdateItem } from "../../../helpers/position";

const keysFiled = [
   'title',
   'employer',
   'dateFrom',
   'dateTo',
   'country',
   'city',
   'description'
];

const FormActivity = ({
   dispatch,
   storeDate,
   idCv
}) => {
   const refIdTimeout = useRef(undefined);

   const {
      dependencies: {
         coutrys,
         cities,
         companys,
      },
      activitys: {
         activityObj,
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
   const refData = useRef(activityObj);
   const isDataPage = (activityObj?.lenght > 1) || isObjDatasKeys(activityObj?.[0] || {}) || isObjDatas(objNew);

   const onDragEnd = (result) => {
      if (!result.destination) {
         return;
      }

      const items = reorder(
         activityObj,
         result.source.index,
         result.destination.index
      );

      let updateArr = arrPositionUpdateItem(items);

      dispatch(fetchPostUpdatePositionActivitys({ idCv, data: updateArr }));
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

   const handleSaveSelect = async ({ index, name, value }, data, classnextFocus) => {
      await dispatch(updateItemFieldActivity({ index, name, value }));
      await handleUpdateServer(index);

      if (!!data) {
         focusFieldInputClassName(classnextFocus);
      }
   }

   const handleSetDateStateData = async (index, name, date, statusClick = false, classnextFocus) => {
      await dispatch(updateItemFieldActivityDate({ index, name, value: date }));
      await handleUpdateServer(index);

      if (!!statusClick)
         focusFieldInputClassName(classnextFocus);
   }

   const handleDeleteOne = (id) => {
      dispatch(fetchDeleteActivitys({ idCv, id }));
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

   const handleAddOne = async () => {
      let isAddNew = isAddForm({
         data: activityObj,
         dependence: keysFiled,
         setState: setLastFormIsEmpty
      });

      if (isAddNew) {
         let re = await dispatch(fetchPostAddCvOneActivitys({ idCv, position: newPosition(activityObj) }));
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

   const handleSaveSelectNew = async ({ name, value }, data, classnextFocus) => {
      await dispatch(updateItemFieldActivityNew({ name, value }));
      automateNew();

      if (isObject(data) || data === true) {
         focusFieldInputClassName(classnextFocus);
      }
   }

   const handleSaveSelectNewCity = ({ name, value }, data, classnextFocus) => {
      dispatch(updateItemFieldActivityNew({ name, value }));

      if (!!data) {
         automateNew();
         focusFieldInputClassName(classnextFocus);
      }
   }

   const handleServerRequestCity = async (value, nameCountry) => {
      let idCountru = getIdOfNameCountrys({ objArr: coutrys.list, nameCountry });
      await dispatch(fetchGetCities({ id: idCountru, params: value }));
   }

   const handleClean = async () => {
      let res = await dispatch(fetchDeleteAll({ idCv }));

      if (isDelete(res.payload)) {
         await handleAddOne();
      }
   }

   const handleServerRequestCompanyList = async (text) => {
      await dispatch(getCompanyList(text)); // get all compay list
   }

   const handleAddNewCompany = async (text, isNewForm = false) => {
      let re = await dispatch(addCompany(text));

      if (isNewForm) {
         automateNew();
      }

      return re?.payload?.id;
   }

   useEffect(() => {
      // when entering, create a new form
      if (isArray(activityObj) && (activityObj?.length == 0)) {
         handleAddOne();
      }

      dispatch(postUpdateCategoryViewedStatus({ idCv, category: 'extraCurricular' }));

      return () => {
         handleDeleteLastEmpty();
      }
   }, []);

   useEffect(() => {
      refData.current = activityObj;
   }, [activityObj]);

   return (
      <>
         {
            isArray(activityObj) && (activityObj.length > 0) && (
               <CRow>
                  <CCol>
                     {/* <LoadWr isLoad={isLoader(status)}> */}
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
                                                      selected={selected}
                                                      skillsList={[
                                                         cardData(item?.dateFrom?.date, item?.dateTo?.date),
                                                         item.employer
                                                      ]}
                                                   >
                                                      <CRow className={`row g-30 r-gap-30 mobile-rows ${isFocusForm({ last: (activityObj.length - 1) == index, isFocus: lastFormIsEmpty, setState: setSelected, id: item.id })}`}>
                                                         <CCol xs={6}>
                                                            <InputSelect
                                                               label="Function Title"
                                                               valueState={item?.title || ""}
                                                               handleSaveSelect={(obj, data) => handleSaveSelect({ index, ...obj, name: "title" }, data, `emp_n${index}`)}
                                                               isOutDataObj={false}
                                                               isModal={false}
                                                               isValidIn={true}
                                                               validIn={item?.title?.length > 3}
                                                            />
                                                         </CCol>
                                                         <CCol xs={6} className={`emp_n${index}`}>
                                                            <InputSelect
                                                               label="Employer"
                                                               data={companys?.list || []}
                                                               valueState={item?.employer || ""}
                                                               handleSaveSelect={(obj, data) => handleSaveSelect({ index, ...obj, name: "employer" }, data, `dataFrom_n${index}`)}
                                                               handleServerRequest={handleServerRequestCompanyList}
                                                               handleAddNew={handleAddNewCompany}
                                                               isOutDataObj={false}
                                                               isAddDiv={true}
                                                               isValidIn={true}
                                                               validIn={item?.employer?.length > 3}
                                                            />

                                                         </CCol>
                                                         <CCol xs={6}>
                                                            <CRow>
                                                               <CCol xs={6} className={`dataFrom_n${index}`}>
                                                                  <DatePicker
                                                                     selected={item?.dateFrom?.date}
                                                                     onChange={(date, statusClick) => handleSetDateStateData(index, 'dateFrom', date, statusClick, `dataTo_n${index}`)}
                                                                     floatingLabel="From"
                                                                  />
                                                               </CCol>
                                                               <CCol xs={6} className={`dataTo_n${index}`}>
                                                                  <DatePicker
                                                                     selected={item?.dateTo?.date}
                                                                     onChange={(date, statusClick) => handleSetDateStateData(index, 'dateTo', date, statusClick, `country_n${index}`)}
                                                                     floatingLabel="To"
                                                                     prevData={item?.dateFrom?.date || undefined}
                                                                  />
                                                               </CCol>
                                                            </CRow>
                                                         </CCol>
                                                         <CCol xs={3} className={`country_n${index}`}>
                                                            <InputSelect
                                                               label="Country"
                                                               valueState={item.country || ""}
                                                               data={coutrys.list}
                                                               handleSaveSelect={(obj, data) => handleSaveSelect({ index, ...obj, name: "country" }, data, `city_n${index}`)}
                                                               isOutDataObj={false}
                                                               isIconArrow={true}
                                                               isFlag={true}
                                                               isValidIn={true}
                                                               validIn={item.country?.length > 3}
                                                            />
                                                         </CCol>
                                                         <CCol xs={3} className={`city_n${index}`}>
                                                            <InputSelect
                                                               label="City"
                                                               valueState={item.city || ""}
                                                               data={cities.list}
                                                               handleSaveSelect={(obj, data) => handleSaveSelect({ index, ...obj, name: "city" }, data)}
                                                               handleServerRequest={(value) => handleServerRequestCity(value, item.country)}
                                                               isOutDataObj={false}
                                                               isRequire={true}
                                                               isValidIn={true}
                                                               validIn={item.city?.length > 3}
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
                     {/* </LoadWr> */}
                  </CCol>
               </CRow>
            )
         }

         {
            isArray(activityObj) && (activityObj.length == 0) && (
               <CRow className="mobile-rows row g-30 r-gap-30 mb-4">
                  <CCol xs={6}>
                     <InputSelect
                        label="Function Title"
                        valueState={objNew.title || ""}
                        handleSaveSelect={(obj, data) => handleSaveSelectNew({ ...obj, name: "title" }, data, "emp_new")}
                        isOutDataObj={false}
                        isModal={false}
                        isValidIn={true}
                        validIn={objNew.title?.length > 3}
                     />
                  </CCol>
                  <CCol xs={6} className="emp_new">
                     <InputSelect
                        label="Employer"
                        data={companys?.list || []}
                        valueState={objNew.employer || ""}
                        handleServerRequest={handleServerRequestCompanyList}
                        handleAddNew={(value) => handleAddNewCompany(value, true)}
                        handleSaveSelect={(obj, data) => handleSaveSelectNew({ ...obj, name: "employer" }, data, "data_from_new")}
                        isAddDiv={true}
                        isOutDataObj={false}
                        isValidIn={true}
                        validIn={objNew.employer?.length > 3}
                     />

                  </CCol>
                  <CCol xs={6}>
                     <CRow className='dates-wrap'>
                        <CCol xs={6} className='date-block data_from_new'>
                           <DatePicker
                              selected={objNew.period_from}
                              onChange={(date, statusClick) => handleSaveSelectNew({ name: 'period_from', value: date }, statusClick, "data_to_new")}
                              floatingLabel="From"
                           />
                        </CCol>
                        <CCol xs={6} className='date-block data_to_new'>
                           <DatePicker
                              selected={objNew.period_to}
                              onChange={(date, statusClick) => handleSaveSelectNew({ name: 'period_to', value: date }, statusClick, "country_new")}
                              floatingLabel="To"
                              prevData={objNew.period_from || undefined}
                           />
                        </CCol>
                     </CRow>
                  </CCol>
                  <CCol xs={3} className="country_new">
                     <InputSelect
                        label="Country"
                        valueState={objNew.country || ""}
                        data={coutrys.list}
                        handleSaveSelect={(obj, data) => handleSaveSelectNew({ ...obj, name: "country" }, data, "city_new")}
                        isOutDataObj={false}
                        isIconArrow={true}
                        isFlag={true}
                        isValidIn={true}
                        validIn={objNew.country?.length > 3}
                     />
                  </CCol>
                  <CCol xs={3} className="city_new">
                     <InputSelect
                        label="City"
                        valueState={objNew.city || ""}
                        data={cities.list}
                        handleSaveSelect={(obj, data) => handleSaveSelectNewCity({ ...obj, name: "city" }, data)}
                        handleServerRequest={(value) => handleServerRequestCity(value, objNew.country)}
                        isOutDataObj={false}
                        isRequire={true}
                        isValidIn={true}
                        validIn={objNew.city?.length > 3}
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
            )
         }

         <CRow>
            <CCol xs={12}>
               <AddButton
                  onClick={handleAddOne}
                  text={'Add one more activity'}
               />
            </CCol>
            <CCol className="mt-4">
               <ButtonSteps
                  isAthorized={isAthorized}
                  disabledNext={!isDataPage}
                  onClean={handleClean}
                  nameSection="extraCurricular"
               />
            </CCol>
         </CRow>
      </>
   )
}

export default FormActivity;
