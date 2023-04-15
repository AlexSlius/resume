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
import { isObjDatas } from '../../../helpers/datasPage';
import { cardData } from "../../../utils";

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
   fetchGetCountrys,
   getCompanyList,
   addCompany
} from '../../../controllers/dependencies';
import { postUpdateCategoryViewedStatus } from '../../../controllers/addSections';

import { newPosition, arrPositionUpdateItem } from "../../../helpers/position";

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
         companys,
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

   const isDataPage = (isArray(activityObj) && (activityObj.length > 0)) || isObjDatas(objNew);

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

   const handleAddOne = async () => {
      let re = await dispatch(fetchPostAddCvOneActivitys({ idCv, position: newPosition(activityObj) }));
      setSelected(re?.payload?.id);
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

   const handleSaveSelectNew = async ({ name, value }) => {
      await dispatch(updateItemFieldActivityNew({ name, value }));
      automateNew();
   }

   const handleSaveSelectNewCity = ({ name, value }, data) => {
      dispatch(updateItemFieldActivityNew({ name, value }));

      if (!!data) {
         automateNew();
      }
   }

   const handleServerRequestCity = async (value, nameCountry) => {
      let idCountru = getIdOfNameCountrys({ objArr: coutrys.list, nameCountry });
      await dispatch(fetchGetCities({ id: idCountru, params: value }));
   }

   const handleClean = () => {
      dispatch(fetchDeleteAll({ idCv }));
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

   React.useEffect(() => {
      dispatch(fetchGetCountrys());
      dispatch(postUpdateCategoryViewedStatus({ idCv, category: 'extraCurricular' }));
   }, []);

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
                                                      <CRow className="row g-30 r-gap-30 mobile-rows">
                                                         <CCol xs={6}>
                                                            <InputSelect
                                                               label="Function Title"
                                                               valueState={item?.title || ""}
                                                               handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj, name: "title" })}
                                                               isOutDataObj={false}
                                                               isModal={false}
                                                               isValidIn={true}
                                                               validIn={item?.title?.length > 3}
                                                            />
                                                         </CCol>
                                                         <CCol xs={6}>
                                                            <InputSelect
                                                               label="Employer"
                                                               data={companys?.list || []}
                                                               valueState={item?.employer || ""}
                                                               handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj, name: "employer" })}
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
                                                               <CCol xs={6}>
                                                                  <DatePicker
                                                                     selected={item?.dateFrom?.date}
                                                                     onChange={(date) => handleSetDateStateData(index, 'dateFrom', date)}
                                                                     floatingLabel="From"
                                                                  />
                                                               </CCol>
                                                               <CCol xs={6}>
                                                                  <DatePicker
                                                                     selected={item?.dateTo?.date}
                                                                     onChange={(date) => handleSetDateStateData(index, 'dateTo', date)}
                                                                     floatingLabel="To"
                                                                  />
                                                               </CCol>
                                                            </CRow>
                                                         </CCol>
                                                         <CCol xs={3}>
                                                            <InputSelect
                                                               label="Country"
                                                               valueState={item.country || ""}
                                                               data={coutrys.list}
                                                               handleSaveSelect={(obj, data) => handleSaveSelect({ index, ...obj, name: "country" }, data)}
                                                               isOutDataObj={false}
                                                               isIconArrow={true}
                                                               isFlag={true}
                                                               isValidIn={true}
                                                               validIn={item.country?.length > 3}
                                                            />
                                                         </CCol>
                                                         <CCol xs={3}>
                                                            <InputSelect
                                                               label="City"
                                                               valueState={item.city || ""}
                                                               data={cities.list}
                                                               handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj, name: "city" })}
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
                        handleSaveSelect={(obj, data) => handleSaveSelectNew({ ...obj, name: "title" }, data)}
                        isOutDataObj={false}
                        isModal={false}
                        isValidIn={true}
                        validIn={objNew.title?.length > 3}
                     />
                  </CCol>
                  <CCol xs={6}>
                     <InputSelect
                        label="Employer"
                        data={companys?.list || []}
                        valueState={objNew.employer || ""}
                        handleServerRequest={handleServerRequestCompanyList}
                        handleAddNew={(value) => handleAddNewCompany(value, true)}
                        handleSaveSelect={(obj, data) => handleSaveSelectNew({ ...obj, name: "employer" }, data)}
                        isAddDiv={true}
                        isOutDataObj={false}
                        isValidIn={true}
                        validIn={objNew.employer?.length > 3}
                     />

                  </CCol>
                  <CCol xs={6}>
                     <CRow className='dates-wrap'>
                        <CCol xs={6} className='date-block'>
                           <DatePicker
                              selected={objNew.period_from}
                              onChange={(date) => handleSaveSelectNew({ name: 'period_from', value: date })}
                              floatingLabel="From"
                           />
                        </CCol>
                        <CCol xs={6} className='date-block'>
                           <DatePicker
                              selected={objNew.period_to}
                              onChange={(date) => handleSaveSelectNew({ name: 'period_to', value: date })}
                              floatingLabel="To"
                           />
                        </CCol>
                     </CRow>
                  </CCol>
                  <CCol xs={3}>
                     <InputSelect
                        label="Country"
                        valueState={objNew.country || ""}
                        data={coutrys.list}
                        handleSaveSelect={(obj, data) => handleSaveSelectNew({ ...obj, name: "country" }, data)}
                        isOutDataObj={false}
                        isIconArrow={true}
                        isFlag={true}
                        isValidIn={true}
                        validIn={objNew.country?.length > 3}
                     />
                  </CCol>
                  <CCol xs={3}>
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
               />
            </CCol>
         </CRow>
      </>
   )
}

export default FormActivity;
