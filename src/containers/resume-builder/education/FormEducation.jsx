import { withFormik } from "formik";
import {
   CFormInput,
   CCol,
   CRow,
   CFormSelect
} from "@coreui/react";

import Textarea from "../../../components/uis/textarea/TextArea"
import AddButton from "../../../components/uis/addButton/AddButton"
import InputRemove from "../../../components/uis/inputRemove/InputRemove"
import DraggedItem from "../../../other/draggedItem/DraggedItem"
import { DatePicker } from "../../../components/uis/datePicker"
import { withForm } from "../../../HOC/withForm";
import { withLogic } from "../../../HOC/withLogic";

import { formatDate } from "../../../utils";

const FormEducation = (props) => {
   const {
      handleInput,
      handleSelect,
      handleDelete,
      handleValueAdd: handleEducationAdd,
      handleValueUpdate: handleEducationUpdate,
      dataValues: educations = [],
      localValue: localEducation,
      selectedValueId: selectedEducationId,
      addText,
      updateText
    } = props;
   return (
      <>
         {
            educations.length ? (      
               <CRow className="">
                  <CCol>
                  <div className="dragged">
                     {educations.map((education) => (
                        <DraggedItem
                        key={education.id}
                        title={education.facility}
                        onClick={handleSelect.bind(null, education.id)}
                        onDelete={handleDelete.bind(null, education.id)}
                        skillsList={[
                           `${formatDate(education.period_from)} - ${formatDate(
                              education.period_to
                           )}`,
                           education.degree,
                           education.description,
                        ]}
                        selected={education.id === selectedEducationId}
                        />
                     ))}
                  </div>
                  </CCol>
               </CRow>
            ) : null
         }
         <CRow className="row g-30 r-gap-30 mt-4">
            <CCol xs={6}>
               <CFormInput 
                  value={localEducation?.facility}
                  type="text" 
                  floatingLabel="Facility" 
                  placeholder="Facility" 
                  onChange={(e)=>handleInput(e, 'facility')}
                  name="facility"
               />
            </CCol>
            <CCol xs={6}>
               <CFormInput 
                  value={localEducation?.degree}
                  type="text" 
                  floatingLabel="Degree" 
                  placeholder="Degree"
                  onChange={(e)=>handleInput(e, 'degree')}
                  name="degree"
               />
            </CCol>
            <CCol xs={6}>
               <CRow>
                  <CCol xs={6}>
                     <DatePicker
                        selected={localEducation?.period_from ? new Date(localEducation?.period_from) : localEducation?.period_from}
                        onChange={(e)=> {handleInput(e, 'period_from')}}
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
                        selected={localEducation?.period_to ? new Date(localEducation?.period_to) : localEducation?.period_to}
                        onChange={(e)=> {handleInput(e, 'period_to')}}
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
               <CFormInput 
                  value={localEducation?.study}
                  type="text" 
                  floatingLabel="Field of study" 
                  placeholder="Field of study" 
                  onChange={(e)=>handleInput(e, 'study')}
                  name="study"
               />
            </CCol>
            <CCol xs={6}>
               <InputRemove></InputRemove>
            </CCol>
            <CCol xs={6}>
               <CFormSelect className="custom-select" >
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3" disabled>Three</option>
               </CFormSelect>
            </CCol>
            <CCol xs={12}>
               <Textarea
                  value={localEducation?.description}
                  onChange={(e)=> handleInput(e, 'description')}
                  name="description"
                  placeholder={'Description of education'}
                  id="educationtTextarea"
               />
            </CCol>
            <CCol xs={12}>
               <AddButton
                  onClick={selectedEducationId ? handleEducationUpdate.bind(null, selectedEducationId) : handleEducationAdd}
                  text={selectedEducationId ? updateText : addText}
               />
            </CCol>
         </CRow>
      </>

   )
}

export default withFormik({ 
   mapPropsToValues: () => {
         const initialValues = { 
           'facility': '',
           'degree': '',
           'period_from': '',
           'peiod_to': '',
           'study': '',
           'description': ''
         }
 
         return initialValues;
   }
 })(withForm(withLogic(FormEducation)));