
import {
   CCol,
   CRow
} from "@coreui/react";
import { isArray, isObject } from "lodash";
import React, { useRef, useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next"

import Textarea from "../../../components/uis/textarea/TextArea";
import AddButton from "../../../components/uis/addButton/AddButton";
import DraggedItem from "../../../other/draggedItem/DraggedItem";
import { DatePicker } from "../../../components/uis/datePicker";
import { InputSelect } from "../../../components/uis/inputSelect"
import { ButtonSteps } from "../../../components/buttonSteps"
import { LoadWr } from "../../../components/loadWr"
import { reorder } from '../../../helpers/drageDrop';
import { getIdOfNameCountrys } from "../../../helpers/countrys"
import { isObjDatas } from '../../../helpers/datasPage';
import { cardData } from "../../../utils";
import { isAddForm, isFocusForm, lastFormDelete } from '../../../utils/isAddNewFormResume';
import { focusFieldInputClassName } from "../../../helpers/fiedlFocus";

import {
   updateItemFieldIntership,
   updateItemFieldIntershipDate,
   updateItemFieldIntershipNew,
   updatePosition
} from "../../../slices/intersnhips";

import {
   fetchPostAddCvOneInternships,
   fetchDeleteInternships,
   fetchUpdateInternships,
   fetchPostUpdatePositionInternships,
   fetchDeleteAll
} from "../../../controllers/interships";

import {
   fetchGetCities,
   fetchGetCountrys,
   getJopsTitle,
   addJopsTitle,
   getCompanyList,
   addCompany
} from '../../../controllers/dependencies';
import { postUpdateCategoryViewedStatus } from '../../../controllers/addSections';
import { newPosition, arrPositionUpdateItem } from "../../../helpers/position";

let keysFiled = [
   'jobTitle',
   'employer',
   'dateFrom',
   'dateTo',
   'country',
   'city',
   'description',
];

const FormInterShip = ({
   dispatch,
   storeDate,
   idCv
}) => {
   const refIdTimeout = useRef(undefined);

   const {
      dependencies: {
         coutrys,
         cities,
         jopsTitle,
         companys,
      },
      interships: {
         interhipObj,
         objNew,
         status
      },
      auth: {
         autorizate: {
            isAthorized
         }
      },
   } = storeDate;
   const [selected, setSelected] = useState(null);
   const [lastFormIsEmpty, setLastFormIsEmpty] = useState(false);
   const refData = useRef(interhipObj);

   const isDataPage = (isArray(interhipObj) && (interhipObj.length > 0)) || isObjDatas(objNew);

   const onDragEnd = (result) => {
      if (!result.destination) {
         return;
      }

      const items = reorder(
         interhipObj,
         result.source.index,
         result.destination.index
      );

      let updateArr = arrPositionUpdateItem(items);

      dispatch(fetchPostUpdatePositionInternships({ idCv, data: updateArr }));

      dispatch(updatePosition(updateArr));
   }

   const handleUpdateServer = async (index) => {
      if (refIdTimeout.current) {
         clearTimeout(refIdTimeout.current);
      }

      refIdTimeout.current = setTimeout(async () => {
         await dispatch((fetchUpdateInternships({ index })));
         clearTimeout(refIdTimeout.current);
      }, 1000);
   }

   const handleSaveSelect = async ({ index, name, value }, data, classnextFocus) => {
      await dispatch(updateItemFieldIntership({ index, name, value }));
      await handleUpdateServer(index);

      if (!!data) {
         focusFieldInputClassName(classnextFocus);
      }
   }

   const handleSaveSelectNew = async ({ name, value }, data, classnextFocus) => {
      await dispatch(updateItemFieldIntershipNew({ name, value }));

      if (isObject(data) || data === true) {
         focusFieldInputClassName(classnextFocus);
      }

      automateNew();
   }

   const handleSaveSelectNewSelect = async ({ name, value }, data) => {
      await dispatch(updateItemFieldIntershipNew({ name, value }));

      if (!!data)
         automateNew();
   }

   const handleSetDateStateData = async (index, name, date, statusClick, classnextFocus) => {
      await dispatch(updateItemFieldIntershipDate({ index, name, value: date }));
      await handleUpdateServer(index);

      if (!!statusClick)
         focusFieldInputClassName(classnextFocus);
   }

   const handleDeleteOne = (id) => {
      dispatch(fetchDeleteInternships({ idCv, id }));
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
         data: interhipObj,
         dependence: keysFiled,
         setState: setLastFormIsEmpty
      });

      if (isAddNew) {
         let re = await dispatch(fetchPostAddCvOneInternships({ idCv, position: newPosition(interhipObj) }));
         setSelected(re?.payload?.id);
      }
   }

   const handleServerRequest = async (value, nameCountry) => {
      let idCountru = getIdOfNameCountrys({ objArr: coutrys.list, nameCountry });
      await dispatch(fetchGetCities({ id: idCountru, params: value }));
   }

   const automateNew = () => {
      if (refIdTimeout.current) {
         clearTimeout(refIdTimeout.current);
      }

      refIdTimeout.current = setTimeout(async () => {
         handleAddOne();
         clearTimeout(refIdTimeout.current);
      }, 500);
   }

   const handleClean = () => {
      dispatch(fetchDeleteAll({ idCv }));
   }

   const handleServerRequestGetJopsTitle = async (text) => {
      await dispatch(getJopsTitle(text)); // get all jops title
   }

   const handleAddNewJobTitle = async (text, isNewForm = false) => {
      let re = await dispatch(addJopsTitle(text));

      if (isNewForm) {
         automateNew();
      }

      return re?.payload?.id;
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
      dispatch(fetchGetCountrys());
      dispatch(postUpdateCategoryViewedStatus({ idCv, category: 'internship' }));

      return () => {
         handleDeleteLastEmpty();
      }
   }, []);

   useEffect(() => {
      refData.current = interhipObj;
   }, [interhipObj]);

   return (
      <>
         {
            isArray(interhipObj) && (interhipObj.length > 0) && (
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
                                          isArray(interhipObj) && interhipObj.map((item, index) => (
                                             <Draggable
                                                key={item.id}
                                                draggableId={String(item.id)}
                                                index={index}
                                             >
                                                {
                                                   (provided, snapshot) => (
                                                      <DraggedItem
                                                         id={item.id}
                                                         lenght={interhipObj.length}
                                                         provided={provided}
                                                         key={item.id}
                                                         title={item.jobTitle}
                                                         index={index}
                                                         setSelected={setSelected}
                                                         selected={selected}
                                                         onDelete={() => handleDeleteOne(item.id)}
                                                         skillsList={[
                                                            cardData(item?.dateFrom?.date, item?.dateTo?.date),
                                                            item?.employer
                                                         ]}
                                                      >
                                                         <CRow className={`mobile-rows row g-30 r-gap-30 ${isFocusForm({ last: (interhipObj.length - 1) == index, isFocus: lastFormIsEmpty, setState: setSelected, id: item.id })}`}>
                                                            <CCol xs={6}>
                                                               <InputSelect
                                                                  label="Job Title"
                                                                  valueState={item?.jobTitle || ""}
                                                                  data={jopsTitle?.list || []}
                                                                  isAddDiv={true}
                                                                  handleSaveSelect={(obj, data) => handleSaveSelect({ index, ...obj, name: "jobTitle" }, data, `emp_n${index}`)}
                                                                  handleServerRequest={handleServerRequestGetJopsTitle}
                                                                  handleAddNew={handleAddNewJobTitle}
                                                                  isOutDataObj={false}
                                                                  isRequire={true}
                                                                  isCap={true}
                                                                  isValidIn={true}
                                                                  validIn={item?.jobTitle?.length > 3}
                                                               />
                                                            </CCol>
                                                            <CCol xs={6} className={`emp_n${index}`}>
                                                               <InputSelect
                                                                  label="Employer"
                                                                  data={companys?.list || []}
                                                                  valueState={item?.employer || ""}
                                                                  handleSaveSelect={(obj, data) => handleSaveSelect({ index, ...obj, name: "employer" }, data, `data_from_n${index}`)}
                                                                  handleServerRequest={handleServerRequestCompanyList}
                                                                  handleAddNew={handleAddNewCompany}
                                                                  isOutDataObj={false}
                                                                  isAddDiv={true}
                                                                  isValidIn={true}
                                                                  validIn={item?.employer?.length > 3}
                                                               />
                                                            </CCol>
                                                            <CCol xs={6}>
                                                               <CRow className='dates-wrap'>
                                                                  <CCol xs={6} className={`date-block data_from_n${index}`}>
                                                                     <DatePicker
                                                                        selected={item?.dateFrom?.date}
                                                                        onChange={(date, statusClick) => handleSetDateStateData(index, 'dateFrom', date, statusClick, `data_to_n${index}`)}
                                                                        floatingLabel="From"
                                                                     />
                                                                  </CCol>
                                                                  <CCol xs={6} className={`date-block data_to_n${index}`}>
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
                                                                  handleSaveSelect={(obj, data) => handleSaveSelect({ index, ...obj, name: "city" }, data, `area_n${index}`)}
                                                                  handleServerRequest={(value) => handleServerRequest(value, item.country)}
                                                                  isOutDataObj={false}
                                                                  isValidIn={true}
                                                                  validIn={item.city?.length > 3}
                                                               />
                                                            </CCol>
                                                            <CCol xs={12} className={`area_n${index}`}>
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
            )
         }

         {
            isArray(interhipObj) && (interhipObj.length == 0) && (
               <CRow className="mobile-rows row g-30 r-gap-30 mb-4">
                  <CCol xs={6}>
                     <InputSelect
                        label="Job Title"
                        valueState={objNew.job_title || ""}
                        data={jopsTitle?.list || []}
                        isAddDiv={true}
                        handleSaveSelect={(obj, data) => handleSaveSelectNewSelect({ ...obj, name: "job_title" }, data, "emp_new")}
                        handleServerRequest={handleServerRequestGetJopsTitle}
                        handleAddNew={(value) => handleAddNewJobTitle(value, true)}
                        isOutDataObj={false}
                        isRequire={true}
                        isCap={true}
                        isValidIn={true}
                        validIn={objNew.job_title?.length > 3}
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
                        handleSaveSelect={(obj, data) => handleSaveSelectNewSelect({ ...obj, name: "country" }, data, "city_new")}
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
                        handleSaveSelect={(obj, data) => handleSaveSelectNewSelect({ ...obj, name: "city" }, data, "area_new")}
                        handleServerRequest={(value) => handleServerRequest(value, objNew.country)}
                        isOutDataObj={false}
                        isRequire={true}
                        isValidIn={true}
                        validIn={objNew.city?.length > 3}
                     />
                  </CCol>
                  <CCol xs={12} className="area_new">
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
                  text={'Add one more internship'}
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

export default FormInterShip;