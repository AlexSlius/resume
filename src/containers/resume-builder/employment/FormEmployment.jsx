import { useEffect, useState } from 'react';
import { withFormik } from "formik";
import { CCol, CRow, CFormSelect, CButton } from "@coreui/react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next"
import { useSelector, useDispatch } from 'react-redux';

import { formatDate, prewriteList as list } from "../../../utils";
import Textarea from "../../../components/uis/textarea/TextArea";
import Input from "../../../components/uis/input"
import { InputSelect } from "../../../components/uis/inputSelect"
import AddButton from "../../../components/uis/addButton/AddButton";
import DraggedItem from "../../../other/draggedItem/DraggedItem";
import { DatePicker } from "../../../components/uis/datePicker";
import { withForm } from "../../../HOC/withForm";
import { withLogic } from "../../../HOC/withLogic";
import { reorder } from '../../../helpers/drageDrop';
import { getJopsTitle, getCompanyList } from '../../../controllers/dependencies';
import { updateItemFieldEmployment } from '../../../slices/employment';
import { isLoader } from "../../../helpers/loadings"
import { LoadChildrenBtn } from "../../../components/loadChildrenBtn"

const FormEmployment = () => {
  const dispatch = useDispatch();
  const {
    dependencies: {
      jopsTitle,
      companys,
      cities,
    },
    employment: {
      employmentObj
    }
  } = useSelector(state => state);
  const [stateArray, setStateArray] = useState([{ id: '1222' }]);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      stateArray,
      result.source.index,
      result.destination.index
    );

    // items.forEach((item, index) => {
    //   item.position = index;
    // })

    // console.log("items: ", items);

    setStateArray(items);

    // new list, idStorie, idMedia
    // dispatch(updateDragDropStorie(items, idStorie, activeMediaStorie?.id));
  }

  const handleSaveSelect = ({ name, value }) => {
    dispatch(updateItemFieldEmployment({ name, value }));
  }

  const handlerSetDateState = (name, date) => {
    dispatch(updateItemFieldEmployment({ name, value: date?.toString() }))
  }

  const handleServerRequestGetJopsTitle = async () => {
    await dispatch(getJopsTitle()); // get all jops title
  }

  const handleServerRequestCompanyList = async () => {
    await dispatch(getCompanyList()); // get all compay list
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
                      stateArray.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={String(item.id)}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <DraggedItem
                              provided={provided}
                              index={index}
                              title={'title ' + item.id}
                            // onClick={handleSelect.bind(null, employment.id)}
                            // onDelete={handleDelete.bind(null, employment.id)}
                            // skillsList={[
                            //   `${formatDate(employment.period_from)} - ${formatDate(
                            //     employment.period_to
                            //   )}`,
                            //   employment.company,
                            //   employment.country,
                            // ]}
                            >
                              <CRow className="g-30 r-gap-30 mt-4">
                                <CCol xs={6}>
                                  <InputSelect
                                    label="Job Title"
                                    placeholder="Job Title"
                                    valueState={employmentObj.title}
                                    data={jopsTitle?.list || []}
                                    isAddDiv={true}
                                    name="title"
                                    isFirstList={false}
                                    isLoad={isLoader(jopsTitle?.status)}
                                    handleSaveSelect={handleSaveSelect}
                                    handleServerRequest={handleServerRequestGetJopsTitle}
                                    isOutDataObj={false}
                                  />
                                </CCol>
                                <CCol xs={6}>
                                  <InputSelect
                                    label="Company / Organization Name"
                                    placeholder="Company / Organization Name"
                                    valueState={employmentObj.company}
                                    data={companys?.list || []}
                                    isAddDiv={true}
                                    name="company"
                                    isFirstList={false}
                                    isLoad={isLoader(companys?.status)}
                                    handleSaveSelect={handleSaveSelect}
                                    handleServerRequest={handleServerRequestCompanyList}
                                    isOutDataObj={false}
                                  />
                                </CCol>
                                <CCol xs={6}>
                                  <CRow>
                                    <CCol xs={6}>
                                      <DatePicker
                                        selected={employmentObj.period_from ? new Date(employmentObj.period_from) : employmentObj.period_from}
                                        onChange={(date) => handlerSetDateState('period_from', date)}
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
                                        selected={employmentObj.period_to ? new Date(employmentObj.period_to) : employmentObj.period_to}
                                        onChange={(date) => handlerSetDateState('period_to', date)}
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
                                  {/* <InputSelect
                                    label="City"
                                    placeholder="City"
                                    valueState={employmentObj.city}
                                    name="city"
                                    isAddDiv={true}
                                    data={cities.list}
                                    isLoad={isLoader(cities?.status)}
                                    handleSaveSelect={handleSaveSelect}
                                    handleOpenChangle={handleServerRequestCity}
                                  /> */}
                                </CCol>
                                <CCol xs={12}>
                                  {/* <Textarea
                                    //value={localEmployment?.assignment || ''}
                                    hideButton={true}
                                    // onChange={(_, text) => handleInput(null, 'assignment', text)}
                                    onFocus={handleFocus}
                                    name="assignment"
                                    prewrite={true}
                                    prewritePopupShow={show}
                                    //prewriteButtonHandler={() => setShow(prev => !prev)}
                                    prewriteItems={list}
                                    placeholder={'Description of employment'}
                                    id="employmentTextarea"
                                    //currentValueId={selectedEmploymentId}
                                  /> */}
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
        </CCol>
      </CRow>
      <CRow className="mt-4">
        <CCol xs={12}>
          <AddButton
            text={'Add one more employment'}
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
  );
};

export default FormEmployment;

// export default withFormik({
//   mapPropsToValues: () => {
//     const initialValues = {
//       'title': '',
//       'company': '',
//       'period_from': '',
//       'peiod_to': '',
//       'country': '',
//       'assignment': ''
//     }

//     return initialValues;
//   }
// })(withForm(withLogic(FormEmployment)));


