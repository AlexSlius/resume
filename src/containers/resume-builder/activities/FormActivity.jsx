
import { formatDate } from "../../../utils";
import {
   CFormInput,
   CCol,
   CRow,
} from "@coreui/react";
import Textarea from "../../../components/uis/textarea/TextArea";
import AddButton from "../../../components/uis/addButton/AddButton";
import DraggedItem from "../../../other/draggedItem/DraggedItem";
import { DatePicker } from "../../../components/uis/datePicker";
import { withForm } from "../../../HOC/withForm";
import { withLogic } from "../../../HOC/withLogic";
import { withFormik } from "formik";

const FormActivity = (props) => {
   const {
      handleInput,
      handleSelect,
      handleDelete,
      handleValueAdd: handleActivityAdd,
      handleValueUpdate: handleActivityUpdate,
      dataValues: activitys = [],
      localValue: localActivity,
      selectedValueId: selectedActivityId,
      addText,
      updateText
    } = props;

   return (
      <>
         {
            activitys.length ? (      
               <CRow className="mt-4">
                  <CCol>
                  <div className="dragged">
                     {activitys.map((activity) => (
                        <DraggedItem
                        key={activity.id}
                        title={activity.title}
                        onClick={handleSelect.bind(null, activity.id)}
                        onDelete={handleDelete.bind(null, activity.id)}
                        skillsList={[
                           `${formatDate(activity.period_from)} - ${formatDate(
                              activity.period_to
                           )}`,
                           activity.degree,
                           activity.facility,
                        ]}
                        selected={activity.id === selectedActivityId}
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
                  value={localActivity?.title}
                  type="text" 
                  floatingLabel="Function Title" 
                  placeholder="Job Title" 
                  onChange={(e)=>handleInput(e, 'title')}
                  name="title"
               />
            </CCol>
            <CCol xs={6}>
               <CFormInput 
                  value={localActivity?.employer}
                  type="text" 
                  floatingLabel="Employer" 
                  placeholder="Company / Organization Name" 
                  onChange={(e)=>handleInput(e, 'employer')}
                  name="employer"
               />
            </CCol>
            <CCol xs={6}>
               <CRow>
                  <CCol xs={6}>
                        <DatePicker
                           selected={localActivity?.period_from ? new Date(localActivity?.period_from) : localActivity?.period_from}
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
                        selected={localActivity?.period_to ? new Date(localActivity?.period_to) : localActivity?.period_to}
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
                  value={localActivity?.city}
                  type="text" 
                  floatingLabel="City" 
                  placeholder="City" 
                  onChange={(e)=>handleInput(e, 'city')}
                  name="city"
               />
            </CCol>
            <CCol xs={12}>
               <Textarea
                  value={localActivity?.description}
                  hideButton={true}
                  onChange={(e)=> handleInput(e, 'description')}
                  name="description"
                  placeholder={'Description of activity'}
                  id="activityTextarea"
               />
            </CCol>
            <CCol xs={12}>
               <AddButton
                  onClick={selectedActivityId ? handleActivityUpdate.bind(null, selectedActivityId) : handleActivityAdd}
                  text={selectedActivityId ? updateText : addText}
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
           'employer': '',
           'period_from': '',
           'peiod_to': '',
           'city': '',
           'description': ''
         }
 
         return initialValues;
   }
 })(withForm(withLogic(FormActivity)));