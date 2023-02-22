
import {
   CCol,
   CRow
} from "@coreui/react";
import { isArray } from "lodash";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next"

import Textarea from "../../../components/uis/textarea/TextArea";
import AddButton from "../../../components/uis/addButton/AddButton";
import DraggedItem from "../../../other/draggedItem/DraggedItem";
import { DatePicker } from "../../../components/uis/datePicker";
import { InputSelect } from "../../../components/uis/inputSelect"
import { ButtonSteps } from "../../../components/buttonSteps"
import { LoadWr } from "../../../components/loadWr"
import { isLoader } from "../../../helpers/loadings"
import { reorder } from '../../../helpers/drageDrop';
import { getIdOfNameCountrys } from "../../../helpers/countrys"
import { isObjDatas } from '../../../helpers/datasPage';
import { cardData } from "../../../utils";

import {
   updateItemFieldIntership,
   updateItemFieldIntershipDate,
   updateItemFieldIntershipNew,
   updatePosition
} from "../../../slices/intersnhips";

import {
   fetchGetCvInternships,
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
   addJopsTitle
} from '../../../controllers/dependencies';
import { postUpdateCategoryViewedStatus } from '../../../controllers/addSections';
import { newPosition, arrPositionUpdateItem } from "../../../helpers/position";

const FormInterShip = ({
   dispatch,
   storeDate,
   idCv
}) => {
   const refIdTimeout = React.useRef(undefined);

   const {
      dependencies: {
         coutrys,
         cities,
         jopsTitle,
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
   const [selected, setSelected] = React.useState(null);

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

   const handleSaveSelect = async ({ index, name, value }) => {
      await dispatch(updateItemFieldIntership({ index, name, value }));
      await handleUpdateServer(index);
   }

   const handleSaveSelectNew = async ({ name, value }) => {
      await dispatch(updateItemFieldIntershipNew({ name, value }));

      automateNew();
   }

   const handleSaveSelectNewSelect = async ({ name, value }, data) => {
      await dispatch(updateItemFieldIntershipNew({ name, value }));

      if (!!data)
         automateNew();
   }

   const handleSetDateStateData = async (index, name, date) => {
      await dispatch(updateItemFieldIntershipDate({ index, name, value: date }));
      await handleUpdateServer(index);
   }

   const handleDeleteOne = (id) => {
      dispatch(fetchDeleteInternships({ idCv, id }));
   }

   const handleAddOne = async () => {
      let re = await dispatch(fetchPostAddCvOneInternships({ idCv, position: newPosition(interhipObj) }));
      setSelected(re?.payload?.id);
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

   React.useEffect(() => {
      dispatch(fetchGetCountrys());
      // fetchGetCvInternships({ idCv });
      dispatch(postUpdateCategoryViewedStatus({ idCv, category: 'internship' }));
   }, []);

   return (
      <>
         {
            isArray(interhipObj) && (interhipObj.length > 0) && (
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
                                                         <CRow className="row g-30 r-gap-30">
                                                            <CCol xs={6}>
                                                               <InputSelect
                                                                  label="Job Title"
                                                                  placeholder="Job Title"
                                                                  valueState={item?.jobTitle || ""}
                                                                  data={jopsTitle?.list || []}
                                                                  isAddDiv={true}
                                                                  name="jobTitle"
                                                                  // isBackgraundLoad={isLoader(jopsTitle?.statusAddNew) || isLoader(jopsTitle?.status)}
                                                                  handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj })}
                                                                  handleServerRequest={handleServerRequestGetJopsTitle}
                                                                  handleAddNew={handleAddNewJobTitle}
                                                                  isOutDataObj={false}
                                                                  isRequire={true}
                                                                  isCap={true}
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
                                                            <CCol xs={3}>
                                                               <InputSelect
                                                                  placeholder="Country"
                                                                  valueState={item.country || ""}
                                                                  data={coutrys.list}
                                                                  name="country"
                                                                  // isLoad={isLoader(coutrys.status)}
                                                                  handleSaveSelect={(obj, data) => handleSaveSelect({ index, ...obj }, data)}
                                                                  isOutDataObj={false}
                                                                  isIconArrow={true}
                                                                  isFlag={true}
                                                               />
                                                            </CCol>
                                                            <CCol xs={3}>
                                                               <InputSelect
                                                                  label="City"
                                                                  placeholder="City"
                                                                  valueState={item.city || ""}
                                                                  name="city"
                                                                  data={cities.list}
                                                                  // isLoad={isLoader(cities?.status)}
                                                                  handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj })}
                                                                  handleServerRequest={(value) => handleServerRequest(value, item.country)}
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
            )
         }

         {
            isArray(interhipObj) && (interhipObj.length == 0) && (
               <CRow className="row g-30 r-gap-30 mb-4">
                  <CCol xs={6}>
                     <InputSelect
                        label="Job Title"
                        placeholder="Job Title"
                        valueState={objNew.job_title || ""}
                        data={jopsTitle?.list || []}
                        isAddDiv={true}
                        name="job_title"
                        // isBackgraundLoad={isLoader(jopsTitle?.statusAddNew) || isLoader(jopsTitle?.status)}
                        handleSaveSelect={(obj, data) => handleSaveSelectNewSelect({ ...obj }, data)}
                        handleServerRequest={handleServerRequestGetJopsTitle}
                        handleAddNew={(value) => handleAddNewJobTitle(value, true)}
                        isOutDataObj={false}
                        isRequire={true}
                        isCap={true}
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
                  <CCol xs={3}>
                     <InputSelect
                        placeholder="Country" updateResolution
                        valueState={objNew.country || ""}
                        data={coutrys.list}
                        name="country"
                        // isLoad={isLoader(coutrys.status)}
                        handleSaveSelect={(obj, data) => handleSaveSelectNewSelect({ ...obj }, data)}
                        isOutDataObj={false}
                        isIconArrow={true}
                        isFlag={true}
                     />
                  </CCol>
                  <CCol xs={3}>
                     <InputSelect
                        label="City"
                        placeholder="City"
                        valueState={objNew.city || ""}
                        name="city"
                        data={cities.list}
                        // isLoad={isLoader(cities?.status)}
                        handleSaveSelect={handleSaveSelectNewSelect}
                        handleServerRequest={(value) => handleServerRequest(value, objNew.country)}
                        isOutDataObj={false}
                        isRequire={true}
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