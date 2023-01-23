import { useEffect } from 'react';
import { CCol, CRow, CButton } from "@coreui/react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next"
import { useSelector, useDispatch } from 'react-redux';
import dynamic from 'next/dynamic'
import React from "react";

import { InputSelect } from "../../../components/uis/inputSelect"
import AddButton from "../../../components/uis/addButton/AddButton";
import DraggedItem from "../../../other/draggedItem/DraggedItem";
import { DatePicker } from "../../../components/uis/datePicker";
import { reorder } from '../../../helpers/drageDrop';
import { localStorageGet } from "../../../helpers/localStorage";
import { LoadWr } from "../../../components/loadWr"

import {
  getJopsTitle,
  getCompanyList,
  fetchGetCities,
  fetchGetCountrys,
  getEmploymentsList,
  addJopsTitle
} from '../../../controllers/dependencies';
import {
  updateItemFieldEmployment,
  updateItemFieldEmploymentDate,
  updateItemFieldEmploymentNew
} from '../../../slices/employment';

import { isLoader } from "../../../helpers/loadings"
import { TextEditorProvider } from '../../../components/uis/TextEditor/context';
import { ButtonSteps } from "../../../components/buttonSteps"
import { formatDate } from "../../../utils";

import {
  fetchPostAddCvOneEmployment,
  fetchDeleteEmployment,
  fetchUpdateEmployment,
  fetchGetCvEmployments,
} from "../../../controllers/employments";
import { isArray } from 'lodash';

const TextEditor = dynamic(() => import('../../../components/uis/TextEditor/TextEditor'), {
  ssr: false
})

const FormEmployment = () => {
  const dispatch = useDispatch();
  const refIdTimeout = React.useRef(undefined);
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
  } = useSelector(state => state);
  const [idCountry, setIdCountry] = React.useState(undefined);
  const idCv = localStorageGet('idCv');

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      employmentObj,
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

  const handleSaveSelect = async ({ index, name, value }, data) => {
    if (!!data) {
      if (name == "country") {
        if (data?.id) {
          setIdCountry(data.id);
        }
      }
      await dispatch(updateItemFieldEmployment({ index, name, value }));
    } else {
      await dispatch(updateItemFieldEmployment({ index, name, value }));
    }

    await handleUpdateServer(index);
  }

  const handleSaveSelectNew = ({ name, value }, data) => {
    dispatch(updateItemFieldEmploymentNew({ name, value }))

    if (name == "country") {
      if (data?.id) {
        setIdCountry(data.id);
      }
    }
  }

  const handlerSetDateStateNew = (name, date) => {
    dispatch(updateItemFieldEmploymentNew({ name, value: date.toString() }))
  }

  const handleServeDispatchContentNew = async (textContent) => {
    await dispatch(updateItemFieldEmploymentNew({ name: "assignment", value: textContent }));
  }

  const handlerSetDateState = async (index, name, date) => {
    await dispatch(updateItemFieldEmploymentDate({ index, name, value: date?.toString() }))
    await handleUpdateServer(index);
  }

  const handleServerRequestGetJopsTitle = async (text) => {
    await dispatch(getJopsTitle(text)); // get all jops title
  }

  const handleServerRequestCompanyList = async (text) => {
    await dispatch(getCompanyList(text)); // get all compay list
  }

  const handleServerRequestCity = async (value) => {
    if (!!!idCountry)
      return false;

    await dispatch(fetchGetCities({ id: idCountry, params: value }));
  }

  const handleServeDispatchContent = async (index, textContent) => {
    await dispatch(updateItemFieldEmployment({ index, name: "assignment", value: textContent }));
    await handleUpdateServer(index);
  }

  const handleServerRequest = async (textSearch) => {
    dispatch(getEmploymentsList(textSearch));
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

  const handleAddone = () => {
    dispatch(fetchPostAddCvOneEmployment({ idCv }));
  }

  const handleDeleteOne = (id) => {
    dispatch(fetchDeleteEmployment({ idCv, id }));
  }

  const handleAddNewJobTitle = async (text) => {
    let re = await dispatch(addJopsTitle(text));
    return re?.payload?.id;
  }

  useEffect(() => {
    dispatch(fetchGetCountrys());
    fetchGetCvEmployments({ idCv });
  }, []);

  return (
    <>
      {
        isArray(employmentObj) && (employmentObj.length > 0) && (
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
                            isArray(employmentObj) && employmentObj.map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={String(item.id)}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <DraggedItem
                                    lenght={employmentObj.length}
                                    provided={provided}
                                    index={index}
                                    title={item.title}
                                    onDelete={() => handleDeleteOne(item.id)}
                                    skillsList={[
                                      `${formatDate(item?.periodFrom?.date)} - ${formatDate(
                                        item?.periodTo?.date
                                      )}`,
                                      item.company,
                                      item.country?.name,
                                      item.city
                                    ]}
                                  >
                                    <CRow className="g-30 r-gap-30 mt-4">
                                      <CCol xs={6}>
                                        <InputSelect
                                          label="Job Title"
                                          placeholder="Job Title"
                                          valueState={item.title || ""}
                                          data={jopsTitle?.list || []}
                                          isAddDiv={true}
                                          name="title"
                                          isLoad={isLoader(jopsTitle?.status)}
                                          isBackgraundLoad={isLoader(jopsTitle?.statusAddNew)}
                                          handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj })}
                                          handleServerRequest={handleServerRequestGetJopsTitle}
                                          handleAddNew={handleAddNewJobTitle}
                                          isOutDataObj={false}
                                        />
                                      </CCol>
                                      <CCol xs={6}>
                                        <InputSelect
                                          label="Company / Organization Name"
                                          placeholder="Company / Organization Name"
                                          valueState={item.company}
                                          data={companys?.list || []}
                                          isAddDiv={true}
                                          name="company"
                                          isLoad={isLoader(companys?.status)}
                                          handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj })}
                                          handleServerRequest={handleServerRequestCompanyList}
                                          isOutDataObj={false}
                                        />
                                      </CCol>
                                      <CCol xs={6}>
                                        <CRow>
                                          <CCol xs={6}>
                                            <DatePicker
                                              selected={item?.periodFrom?.date ? new Date(item?.periodFrom?.date) : item?.periodFrom?.date}
                                              onChange={(date) => handlerSetDateState(index, 'periodFrom', date)}
                                              floatingLabel="From"
                                              placeholderText="From"
                                              name="periodFrom"
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
                                              selected={item?.periodTo?.date ? new Date(item?.periodTo?.date) : item?.periodTo?.date}
                                              onChange={(date) => handlerSetDateState(index, 'periodTo', date)}
                                              floatingLabel="To"
                                              placeholderText="To"
                                              name="periodTo"
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
                                      <CCol xs={3}>
                                        <InputSelect
                                          isCouValid={false}
                                          label="Country"
                                          placeholder="Country"
                                          valueState={item.country || ""}
                                          data={coutrys.list}
                                          name="country"
                                          isLoad={isLoader(coutrys.status)}
                                          handleSaveSelect={(obj, data) => handleSaveSelect({ index, ...obj }, data)}
                                          isOutDataObj={false}
                                        />
                                      </CCol>
                                      <CCol xs={3}>
                                        <InputSelect
                                          label="City"
                                          placeholder="City"
                                          valueState={item.city || ""}
                                          name="city"
                                          isAddDiv={true}
                                          data={cities.list}
                                          isLoad={isLoader(cities?.status)}
                                          handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj })}
                                          handleServerRequest={handleServerRequestCity}
                                          isOutDataObj={false}
                                        />
                                      </CCol>
                                      <CCol xs={12}>
                                        {
                                          (typeof window !== undefined) && (
                                            <TextEditorProvider>
                                              <TextEditor
                                                isLoad={isLoader(employers.status)}
                                                data={employers.list}
                                                isAddModal={true}
                                                devValue={item.assignment}
                                                handleServerRequest={handleServerRequest}
                                                handleServeDispatchContent={(textContent) => handleServeDispatchContent(index, textContent)}
                                              />
                                            </TextEditorProvider>
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
              </LoadWr>
            </CCol>
          </CRow>
        )
      }

      <CRow className="g-30 r-gap-30 mt-4">
        <CCol xs={6}>
          <InputSelect
            label="Job Title"
            placeholder="Job Title"
            valueState={objNew.title || ""}
            data={jopsTitle?.list || []}
            isAddDiv={true}
            name="title"
            isLoad={isLoader(jopsTitle?.status)}
            isBackgraundLoad={isLoader(jopsTitle?.statusAddNew)}
            handleSaveSelect={handleSaveSelectNew}
            handleServerRequest={handleServerRequestGetJopsTitle}
            handleAddNew={handleAddNewJobTitle}
            isOutDataObj={false}
          />
        </CCol>
        <CCol xs={6}>
          <InputSelect
            label="Company / Organization Name"
            placeholder="Company / Organization Name"
            valueState={objNew.company}
            data={companys?.list || []}
            isAddDiv={true}
            name="company"
            isLoad={isLoader(companys?.status)}
            handleSaveSelect={handleSaveSelectNew}
            handleServerRequest={handleServerRequestCompanyList}
            isOutDataObj={false}
          />
        </CCol>
        <CCol xs={6}>
          <CRow>
            <CCol xs={6}>
              <DatePicker
                selected={objNew?.period_from ? new Date(objNew?.period_from) : objNew?.period_from}
                onChange={(date) => handlerSetDateStateNew('period_from', date)}
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
                selected={objNew?.period_to ? new Date(objNew?.period_to) : objNew?.period_to}
                onChange={(date) => handlerSetDateStateNew('period_to', date)}
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
        <CCol xs={3}>
          <InputSelect
            isCouValid={false}
            label="Country"
            placeholder="Country"
            valueState={objNew.country || ""}
            data={coutrys.list}
            name="country"
            isLoad={isLoader(coutrys.status)}
            handleSaveSelect={(obj, data) => handleSaveSelectNew({ ...obj }, data)}
            isOutDataObj={false}
          />
        </CCol>
        <CCol xs={3}>
          <InputSelect
            label="City"
            placeholder="City"
            valueState={objNew.city || ""}
            name="city"
            isAddDiv={true}
            data={cities.list}
            isLoad={isLoader(cities?.status)}
            handleSaveSelect={handleSaveSelectNew}
            handleServerRequest={handleServerRequestCity}
            isOutDataObj={false}
          />
        </CCol>
        <CCol xs={12}>
          {
            (typeof window !== undefined) && (
              <TextEditorProvider>
                <TextEditor
                  isLoad={isLoader(employers.status)}
                  data={employers.list}
                  isAddModal={true}
                  devValue={objNew.assignment}
                  handleServerRequest={handleServerRequest}
                  handleServeDispatchContent={(textContent) => handleServeDispatchContentNew(textContent)}
                />
              </TextEditorProvider>
            )
          }
        </CCol>
      </CRow>
      <CRow className="mt-4">
        <CCol xs={12}>
          <AddButton
            onClick={handleAddone}
            text={'Add one more employment'}
          />
        </CCol>
        <CCol className="mt-4">
          <ButtonSteps isAthorized={isAthorized} />
        </CCol>
      </CRow>
    </>
  );
};

export default FormEmployment;


