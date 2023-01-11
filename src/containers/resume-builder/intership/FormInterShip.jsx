import { formatDate } from "../../../utils";
import {
   CFormInput,
   CCol,
   CRow,
   CFormSelect
} from "@coreui/react";
import Textarea from "../../../components/uis/textarea/TextArea";
import AddButton from "../../../components/uis/addButton/AddButton";
import DraggedItem from "../../../other/draggedItem/DraggedItem";
import { withForm } from "../../../HOC/withForm";
import { withLogic } from "../../../HOC/withLogic";
import { withFormik } from "formik";
import { DatePicker } from "../../../components/uis/datePicker";

const FormInterShip = (props) => {

   const {
      handleInput,
      handleSelect,
      handleDelete,
      handleValueAdd: handleIntershipAdd,
      handleValueUpdate: handleIntershipUpdate,
      dataValues: interships = [],
      localValue: localIntership,
      selectedValueId: selectedIntershipId,
      addText,
      updateText,
      countries
   } = props;

   return (
      <>
         {
            interships.length ? (
               <CRow className="mt-4">
                  <CCol>
                     <div className="dragged">
                        {interships.map((intership) => (
                           <DraggedItem
                              key={intership.id}
                              title={intership.facility}
                              onClick={handleSelect.bind(null, intership.id)}
                              onDelete={handleDelete.bind(null, intership.id)}
                              skillsList={[
                                 `${formatDate(intership.period_from)} - ${formatDate(
                                    intership.period_to
                                 )}`,
                                 intership.degree,
                                 intership.description,
                              ]}
                              selected={intership.id === selectedIntershipId}
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
                  value={localIntership?.job_title}
                  type="text"
                  floatingLabel="Job title"
                  placeholder="Job title"
                  onChange={(e) => handleInput(e, 'job_title')}
                  name="job_title"
               />
            </CCol>
            <CCol xs={6}>
               <CFormInput
                  value={localIntership?.employer}
                  type="text"
                  floatingLabel="Employer"
                  placeholder="Employer"
                  onChange={(e) => handleInput(e, 'employer')}
                  name="employer"
               />
            </CCol>
            <CCol xs={6}>
               <CRow>
                  <CCol xs={6}>
                     <DatePicker
                        selected={localIntership?.period_from ? new Date(localIntership?.period_from) : localIntership?.period_from}
                        onChange={(e) => { handleInput(e, 'period_from') }}
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
                        selected={localIntership?.period_to ? new Date(localIntership?.period_to) : localIntership?.period_to}
                        onChange={(e) => { handleInput(e, 'period_to') }}
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
               <CFormSelect
                  className="custom-select"
                  onChange={(e) => handleInput(e, 'city')}
                  value={localIntership?.city || ''}
                  floatingLabel="City/country"
                  placeholder="City/country"
                  name="city"
               >
                  <option disabled value="country">Country</option>
                  {countries && countries.map(el => {
                     return (
                        <option key={el?.id} value={el?.name}>{el?.name}</option>
                     );
                  })}
               </CFormSelect>
            </CCol>
            <CCol xs={12}>
               <Textarea
                  value={localIntership?.description}
                  onChange={(e) => handleInput(e, 'description')}
                  name="description"
                  placeholder={'Description of intership'}
                  id="intershiptTextarea"
               />
            </CCol>
            <CCol xs={12}>
               <AddButton
                  onClick={selectedIntershipId ? handleIntershipUpdate.bind(null, selectedIntershipId) : handleIntershipAdd}
                  text={selectedIntershipId ? updateText : addText}
               />
            </CCol>
         </CRow>
      </>
   )
}

export default withFormik({
   mapPropsToValues: () => {
      const initialValues = {
         'job_title': '',
         'employer': '',
         'period_from': '',
         'peiod_to': '',
         'city': '',
         'description': '',

      }

      return initialValues;
   }
})(withForm(withLogic(FormInterShip)));