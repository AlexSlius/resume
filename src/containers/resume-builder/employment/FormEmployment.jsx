import { useEffect } from 'react';
import { CCol, CRow, CButton } from "@coreui/react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next"
import { useSelector, useDispatch } from 'react-redux';
import dynamic from 'next/dynamic'

import { InputSelect } from "../../../components/uis/inputSelect"
import AddButton from "../../../components/uis/addButton/AddButton";
import DraggedItem from "../../../other/draggedItem/DraggedItem";
import { DatePicker } from "../../../components/uis/datePicker";
import { reorder } from '../../../helpers/drageDrop';

import {
  getJopsTitle,
  getCompanyList,
  fetchGetCities,
  fetchGetCountrys,
  getEmploymentsList
} from '../../../controllers/dependencies';
import { updateItemFieldEmployment } from '../../../slices/employment';
import { isLoader } from "../../../helpers/loadings"
import { LoadChildrenBtn } from "../../../components/loadChildrenBtn"
import { TextEditorProvider } from '../../../components/uis/TextEditor/context';
import { formatDate } from "../../../utils";

const TextEditor = dynamic(() => import('../../../components/uis/TextEditor/TextEditor'), {
  ssr: false
})

const FormEmployment = () => {
  const dispatch = useDispatch();
  const {
    dependencies: {
      jopsTitle,
      companys,
      coutrys,
      cities,
      employers,
    },
    employment: {
      employmentObj
    }
  } = useSelector(state => state);

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

  const handleSaveSelect = ({ index, name, value }) => {
    dispatch(updateItemFieldEmployment({ index, name, value }));
  }

  const handlerSetDateState = (index, name, date) => {
    dispatch(updateItemFieldEmployment({ index, name, value: date?.toString() }))
  }

  const handleServerRequestGetJopsTitle = async (text) => {
    await dispatch(getJopsTitle(text)); // get all jops title
  }

  const handleServerRequestCompanyList = async (text) => {
    await dispatch(getCompanyList(text)); // get all compay list
  }

  const handleServerRequestCity = async (idCountry) => {
    if (!!!idCountry)
      return false;

    await dispatch(fetchGetCities(idCountry)); // get list cities by id country
  }

  const handleServeDispatchContent = (index, textContent) => {
    dispatch(updateItemFieldEmployment({ index, name: "assignment", value: textContent }))
  }

  const handleServerRequest = async (textSearch) => {
    dispatch(getEmploymentsList(textSearch));
  }

  useEffect(() => {
    dispatch(fetchGetCountrys()); // get all countrys
  }, []);

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
                      employmentObj.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={String(item.id)}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <DraggedItem
                              provided={provided}
                              index={index}
                              title={item.title}
                              // onClick={handleSelect.bind(null, employment.id)}
                              // onDelete={handleDelete.bind(null, employment.id)}
                              skillsList={[
                                `${formatDate(item.period_from)} - ${formatDate(
                                  item.period_to
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
                                    valueState={item.title}
                                    data={jopsTitle?.list || []}
                                    isAddDiv={true}
                                    name="title"
                                    isFirstList={false}
                                    isLoad={isLoader(jopsTitle?.status)}
                                    handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj })}
                                    handleServerRequest={handleServerRequestGetJopsTitle}
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
                                    isFirstList={false}
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
                                <CCol xs={3}>
                                  <InputSelect
                                    isCouValid={false}
                                    label="Country"
                                    placeholder="Country"
                                    valueState={item.country || {}}
                                    data={coutrys.list}
                                    name="country"
                                    isLoad={isLoader(coutrys.status)}
                                    handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj })}
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
                                    handleOpenChangle={() => handleServerRequestCity(item.country?.id)}
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


