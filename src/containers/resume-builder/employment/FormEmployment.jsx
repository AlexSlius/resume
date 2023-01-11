import { useEffect, useState } from 'react';
import { withFormik } from "formik";
import { CCol, CRow, CFormSelect } from "@coreui/react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next"

import { formatDate, prewriteList as list } from "../../../utils";
import Textarea from "../../../components/uis/textarea/TextArea";
import Input from "../../../components/uis/input"
import AddButton from "../../../components/uis/addButton/AddButton";
import DraggedItem from "../../../other/draggedItem/DraggedItem";
import { DatePicker } from "../../../components/uis/datePicker";
import { withForm } from "../../../HOC/withForm";
import { withLogic } from "../../../HOC/withLogic";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const FormEmployment = (props) => {
  const {
    handleInput,
    handleSelect,
    handleDelete,
    handleValueAdd: handleEmploymentAdd,
    handleValueUpdate: handleEmploymentUpdate,
    dataValues: employments = [undefined, undefined],
    localValue: localEmployment,
    selectedValueId: selectedEmploymentId,
    addText,
    updateText,
    countries
  } = props;

  const [show, setShow] = useState(false);
  const [stateArray, setStateArray] = useState([{ id: '1222' }, { id: "333" }]);

  // useEffect(() => {
  //   setShow(false);
  // }, [selectedEmploymentId]);

  const handleFocus = (e) => {
    setShow(false);
  }

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
                                  <Input
                                    label="Job Title"
                                    placeholder="Job Title"
                                  />
                                </CCol>
                                <CCol xs={6}>
                                  <Input
                                    label="Company / Organization Name"
                                    placeholder="Company / Organization Name"
                                  />
                                </CCol>
                                <CCol xs={6}>
                                  <CRow>
                                    <CCol xs={6}>
                                      <DatePicker
                                        selected={localEmployment?.period_from ? new Date(localEmployment?.period_from) : localEmployment?.period_from}
                                        // onChange={(e) => { handleInput(e, 'period_from') }}
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
                                        selected={localEmployment?.period_to ? new Date(localEmployment?.period_to) : localEmployment?.period_to}
                                        // onChange={(e) => { handleInput(e, 'period_to') }}
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
                                  <Input
                                    label="City"
                                    placeholder="City"
                                  />
                                </CCol>
                                <CCol xs={12}>
                                  <Textarea
                                    value={localEmployment?.assignment || ''}
                                    hideButton={true}
                                    // onChange={(_, text) => handleInput(null, 'assignment', text)}
                                    onFocus={handleFocus}
                                    name="assignment"
                                    prewrite={true}
                                    prewritePopupShow={show}
                                    prewriteButtonHandler={() => setShow(prev => !prev)}
                                    prewriteItems={list}
                                    placeholder={'Description of employment'}
                                    id="employmentTextarea"
                                    currentValueId={selectedEmploymentId}
                                  />
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
        <CCol>
          <AddButton
            onClick={selectedEmploymentId ? handleEmploymentUpdate.bind(null, selectedEmploymentId) : handleEmploymentAdd}
            text={selectedEmploymentId ? updateText : addText}
          />
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


