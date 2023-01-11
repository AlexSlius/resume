import { formatDate } from "../../../utils";
import {
   CFormInput,
   CCol,
   CRow
} from "@coreui/react";
import DraggedItem from "../../../other/draggedItem/DraggedItem";
import AddButton from "../../../components/uis/addButton/AddButton";
import { withForm } from "../../../HOC/withForm";
import { withLogic } from "../../../HOC/withLogic";
import { withFormik } from "formik";
import { DatePicker } from "../../../components/uis/datePicker";

const FormCourse = (props) => {

   const {
      handleInput,
      handleSelect,
      handleDelete,
      handleValueAdd: handleCourseAdd,
      handleValueUpdate: handleCourseUpdate,
      dataValues: courses = [],
      localValue: localCourse,
      selectedValueId: selectedCourseId,
      addText,
      updateText
    } = props;

   return (
      <>
         {
            courses.length ? (      
               <CRow className="mt-4">
                  <CCol>
                  <div className="dragged">
                     {courses.map((course) => (
                        <DraggedItem
                        key={course.id}
                        title={course.title}
                        onClick={handleSelect.bind(null, course.id)}
                        onDelete={handleDelete.bind(null, course.id)}
                        skillsList={[
                           `${formatDate(course.period_from)} - ${formatDate(
                              course.period_to
                           )}`,
                           course.degree,
                           course.facility,
                        ]}
                        selected={course.id === selectedCourseId}
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
                     value={localCourse?.title}
                     type="text" 
                     floatingLabel="Course Title" 
                     placeholder="Course Title" 
                     onChange={(e)=>handleInput(e, 'title')}
                     name="title" 
               />
            </CCol>
            <CCol xs={6}>
               <CFormInput                   
                     value={localCourse?.institution}
                     type="text" 
                     floatingLabel="Institution" 
                     placeholder="Institution" 
                     onChange={(e)=>handleInput(e, 'institution')}
                     name="institution" 
                  />
            </CCol>
            <CCol xs={6}>
               <CRow>
                  <CCol xs={6}>
                     <DatePicker
                        selected={localCourse?.period_from ? new Date(localCourse?.period_from) : localCourse?.period_from}
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
                        selected={localCourse?.period_to ? new Date(localCourse?.period_to) : localCourse?.period_to}
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
            <CCol xs={12}>
               <AddButton
                  onClick={selectedCourseId ? handleCourseUpdate.bind(null, selectedCourseId) : handleCourseAdd}
                  text={selectedCourseId ? updateText : addText}
               />
            </CCol>
         </CRow>
      </>
   )
}

export default withFormik({ 
   mapPropsToValues: () => {
         const initialValues = { 
           'title': '',
           'institution': '',
           'period_from': '',
           'peiod_to': '',
         }
 
         return initialValues;
   }
 })(withForm(withLogic(FormCourse)));