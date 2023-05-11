import { useEffect, useRef, useState } from 'react';
import { CCol, CRow } from "@coreui/react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next"
import dynamic from 'next/dynamic'
import React from "react";
import { isArray } from 'lodash';

import { InputSelect } from "../../../components/uis/inputSelect"
import AddButton from "../../../components/uis/addButton/AddButton";
import DraggedItem from "../../../other/draggedItem/DraggedItem";
import { DatePicker } from "../../../components/uis/datePicker";
import { ButtonSteps } from "../../../components/buttonSteps"

import {
  getJopsTitle,
  getCompanyList,
  fetchGetCities,
  fetchGetCountrys,
  getEmploymentsList,
  addJopsTitle,
  addCompany
} from '../../../controllers/dependencies';

import {
  updateItemFieldEmployment,
  updateItemFieldEmploymentDate,
  updateItemFieldEmploymentNew,
  updatePosition
} from '../../../slices/employment';

import { getIdOfNameCountrys } from "../../../helpers/countrys"
import { reorder } from '../../../helpers/drageDrop';
import { newPosition, arrPositionUpdateItem } from "../../../helpers/position";
import { isObjDatas } from '../../../helpers/datasPage';
import { cardData } from "../../../utils";
import { isAddForm, isFocusForm, lastFormDelete } from '../../../utils/isAddNewFormResume';

import {
  fetchPostAddCvOneEmployment,
  fetchDeleteEmployment,
  fetchUpdateEmployment,
  fetchPostUpdatePositionEmployment,
  fetchDeleteCleanAllEmployment
} from "../../../controllers/employments";
import { postUpdateCategoryViewedStatus } from '../../../controllers/addSections';


const TextEditor = dynamic(() => import('../../../components/uis/TextEditor/TextEditor'), {
  ssr: false
});

const keysFiled = [
  'title',
  'company',
  'periodFrom',
  'periodTo',
  'country',
  'assignment',
  'city',
];

const FormEmployment = ({
  dispatch,
  storeDate,
  idCv
}) => {
  const refIdTimeout = useRef(undefined);

  const {
    dependencies: {
      jopsTitle,
      companys,
      coutrys,
      cities,
      employers,
    },
    employment: {
      employmentObj,
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
  const refData = useRef(employmentObj);
  const isDataPage = (isArray(employmentObj) && (employmentObj.length > 0)) || isObjDatas(objNew);


  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      employmentObj,
      result.source.index,
      result.destination.index
    );

    let updateArr = arrPositionUpdateItem(items);

    dispatch(fetchPostUpdatePositionEmployment({ idCv, data: updateArr }));
    dispatch(updatePosition(updateArr));
  }

  const handleSaveSelect = async ({ index, name, value }, data) => {
    await dispatch(updateItemFieldEmployment({ index, name, value }));
    await handleUpdateServer(index);
  }

  const handlerSetDateState = async (index, name, date) => {
    await dispatch(updateItemFieldEmploymentDate({ index, name, value: date }))
    await handleUpdateServer(index);
  }

  const handleServerRequestGetJopsTitle = async (text) => {
    await dispatch(getJopsTitle(text)); // get all jops title
  }

  const handleServerRequestCompanyList = async (text) => {
    await dispatch(getCompanyList(text)); // get all compay list
  }

  const handleServerRequestCity = async (value, nameCountry) => {
    let idCountru = getIdOfNameCountrys({ objArr: coutrys.list, nameCountry });
    await dispatch(fetchGetCities({ id: idCountru, params: value }));
  }

  const handleServeDispatchContent = async (index, textContent) => {
    await dispatch(updateItemFieldEmployment({ index, name: "assignment", value: textContent }));
    await handleUpdateServer(index);
  }

  const handleServerRequest = async (textSearch, isSearchName = false) => {
    let params = {};

    if (isSearchName) {
      params = {
        "name": textSearch || '',
      };
    } else {
      params = {
        "position": textSearch || '',
      };
    }

    dispatch(getEmploymentsList({ params: { ...params, limit: 40 } }));
  }

  const handleUpdateServer = async (index) => {
    if (refIdTimeout.current) {
      clearTimeout(refIdTimeout.current);
    }

    refIdTimeout.current = setTimeout(async () => {
      await dispatch((fetchUpdateEmployment({ index })));
      clearTimeout(refIdTimeout.current);
    }, 1000);
  }

  const handleAddone = async () => {
    let isAddNew = isAddForm({
      data: employmentObj,
      dependence: keysFiled,
      setState: setLastFormIsEmpty
    });

    if (isAddNew) {
      let re = await dispatch(fetchPostAddCvOneEmployment({ idCv, position: newPosition(employmentObj) }));
      setSelected(re?.payload?.id);
    }
  }

  const handleDeleteOne = (id) => {
    dispatch(fetchDeleteEmployment({ idCv, id }));
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

  const handleAddNewJobTitle = async (text, isNewForm = false) => {
    let re = await dispatch(addJopsTitle(text));

    if (isNewForm) {
      automateNew();
    }

    return re?.payload?.id;
  }

  const handleAddNewCompany = async (text, isNewForm = false) => {
    let re = await dispatch(addCompany(text));

    if (isNewForm) {
      automateNew();
    }

    return re?.payload?.id;
  }

  // new
  const automateNew = () => {
    if (refIdTimeout.current) {
      clearTimeout(refIdTimeout.current);
    }

    refIdTimeout.current = setTimeout(async () => {
      handleAddone();
      clearTimeout(refIdTimeout.current);
    }, 500);
  }

  const handleSaveSelectNew = ({ name, value }, data) => {
    dispatch(updateItemFieldEmploymentNew({ name, value }));

    if (data) {
      automateNew()
    }
  }

  const handlerSetDateStateNew = (name, date) => {
    dispatch(updateItemFieldEmploymentNew({ name, value: date }));
    automateNew();
  }

  const handleServeDispatchContentNew = async (textContent) => {
    await dispatch(updateItemFieldEmploymentNew({ name: "assignment", value: textContent }));
  }
  // end new 

  const handleClean = () => {
    dispatch(fetchDeleteCleanAllEmployment({ idCv }));
  }

  useEffect(() => {
    dispatch(fetchGetCountrys());
    dispatch(postUpdateCategoryViewedStatus({ idCv, category: 'employment' }));

    return () => {
      handleDeleteLastEmpty();
    }
  }, []);

  useEffect(() => {
    refData.current = employmentObj;
  }, [employmentObj]);

  return (
    <>
      {
        isArray(employmentObj) && (employmentObj.length > 0) && (
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
                          isArray(employmentObj) && employmentObj.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={String(item.id)}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <DraggedItem
                                  id={item.id}
                                  lenght={employmentObj.length}
                                  provided={provided}
                                  index={index}
                                  title={item.title}
                                  setSelected={setSelected}
                                  selected={selected}
                                  onDelete={() => handleDeleteOne(item.id)}
                                  skillsList={[
                                    cardData(item?.periodFrom?.date, item?.periodTo?.date),
                                    item.company,
                                    item.country?.name,
                                    item.city
                                  ]}
                                >
                                  <CRow className={`mobile-rows ${isFocusForm({ last: (employmentObj.length - 1) == index, isFocus: lastFormIsEmpty, setState: setSelected, id: item.id })} g-30 r-gap-30`}>
                                    <CCol xs={6}>
                                      <InputSelect
                                        label="Job Title"
                                        valueState={item.title || ""}
                                        data={jopsTitle?.list || []}
                                        isAddDiv={true}
                                        handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj, name: "title" })}
                                        handleServerRequest={handleServerRequestGetJopsTitle}
                                        handleAddNew={handleAddNewJobTitle}
                                        isOutDataObj={false}
                                        isRequire={true}
                                        isValidIn={true}
                                        validIn={item.title?.length > 3}
                                        isCap={true}
                                      />
                                    </CCol>
                                    <CCol xs={6}>
                                      <InputSelect
                                        label="Company / Organization Name"
                                        valueState={item.company}
                                        data={companys?.list || []}
                                        isAddDiv={true}
                                        handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj, name: "company" })}
                                        handleServerRequest={handleServerRequestCompanyList}
                                        handleAddNew={handleAddNewCompany}
                                        isOutDataObj={false}
                                        isRequire={true}
                                        isCap={true}
                                        isValidIn={true}
                                        validIn={item.company?.length > 3}
                                      />
                                    </CCol>
                                    <CCol xs={6}>
                                      <CRow className='dates-wrap'>
                                        <CCol xs={6} className='date-block'>
                                          <DatePicker
                                            selected={item?.periodFrom?.date}
                                            onChange={(date) => handlerSetDateState(index, 'periodFrom', date)}
                                            floatingLabel="From"
                                          />
                                        </CCol>
                                        <CCol xs={6} className='date-block'>
                                          <DatePicker
                                            selected={item?.periodTo?.date}
                                            onChange={(date) => handlerSetDateState(index, 'periodTo', date)}
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
                                        isValidIn={true}
                                        validIn={item.city?.length > 3}
                                      />
                                    </CCol>
                                    <CCol xs={12}>
                                      {
                                        (typeof window !== undefined) && (
                                          <TextEditor
                                            data={employers.list}
                                            isAddModal={true}
                                            devValue={item.assignment}
                                            defParams={item.title}
                                            handleServerRequest={handleServerRequest}
                                            handleServeDispatchContent={(textContent) => handleServeDispatchContent(index, textContent)}
                                          />
                                        )
                                      }
                                    </CCol>
                                  </CRow>
                                </DraggedItem>
                              )}
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
        isArray(employmentObj) && (employmentObj.length == 0) && (
          <CRow className="g-30 r-gap-30 mb-4 mobile-rows">
            <CCol xs={6}>
              <InputSelect
                label="Job Title"
                valueState={objNew.title || ""}
                data={jopsTitle?.list || []}
                isAddDiv={true}
                handleSaveSelect={(obj, data) => handleSaveSelectNew({ ...obj, name: "title" }, data)}
                handleServerRequest={handleServerRequestGetJopsTitle}
                handleAddNew={(value) => handleAddNewJobTitle(value, true)}
                isOutDataObj={false}
                isRequire={true}
                isCap={true}
                isValidIn={true}
                validIn={objNew.title?.length > 3}
              />
            </CCol>
            <CCol xs={6}>
              <InputSelect
                label="Company / Organization Name"
                valueState={objNew.company}
                data={companys?.list || []}
                isAddDiv={true}
                handleSaveSelect={(obj, data) => handleSaveSelectNew({ ...obj, name: "company" }, data)}
                handleServerRequest={handleServerRequestCompanyList}
                handleAddNew={(value) => handleAddNewCompany(value, true)}
                isOutDataObj={false}
                isRequire={true}
                isCap={true}
                isValidIn={true}
                validIn={objNew.compan?.length > 3}
              />
            </CCol>
            <CCol xs={6}>
              <CRow className='dates-wrap'>
                <CCol xs={6} className='date-block'>
                  <DatePicker
                    selected={objNew?.period_from}
                    onChange={(date) => handlerSetDateStateNew('period_from', date)}
                    floatingLabel="From"
                  />
                </CCol>
                <CCol xs={6} className='date-block'>
                  <DatePicker
                    selected={objNew?.period_to}
                    onChange={(date) => handlerSetDateStateNew('period_to', date)}
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
                handleSaveSelect={(obj, data) => handleSaveSelectNew({ ...obj, name: "city" }, data)}
                handleServerRequest={(value) => handleServerRequestCity(value, objNew.country)}
                isRequire={true}
                isOutDataObj={false}
                isValidIn={true}
                validIn={objNew.city?.length > 3}
              />
            </CCol>
            <CCol xs={12}>
              {
                (typeof window !== undefined) && (
                  <TextEditor
                    data={employers.list}
                    isAddModal={true}
                    devValue={objNew.assignment}
                    handleServerRequest={handleServerRequest}
                    handleServeDispatchContent={(textContent) => handleServeDispatchContentNew(textContent)}
                  />
                )
              }
            </CCol>
          </CRow>
        )
      }

      <CRow className="buttons-wrap mobile-rows two-items">
        <CCol xs={12}>
          <AddButton
            onClick={handleAddone}
            text={'Add one more employment'}
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
  );
};

export default FormEmployment;


