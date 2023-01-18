
import {
   CFormInput,
   CCol,
   CRow,
   CFormSelect
} from "@coreui/react";
import { useState, useEffect, Fragment } from 'react';

const FormLanguages = ({
   dispatch,
   storeDate
}) => {

   const items = inputs.map((item, index) => {
      return (
         <Fragment key={item?.id}>
            <CCol xs={6}>
               <CFormInput
                  value={item?.language || ''}
                  type="text"
                  floatingLabel="Language"
                  placeholder="Language"
                  onChange={(e) => handleChange(index, 'language', e)}
               />
            </CCol>
            <CCol xs={6}>
               <CFormSelect className="custom-select"
                  value={item?.level || ''}
                  onChange={(e) => handleChange(index, 'level', e)}
               >
                  <option>Level</option>
                  <option value="5">Native</option>
                  <option value="4">Two</option>
                  <option value="3">Three</option>
               </CFormSelect>
            </CCol>
         </Fragment>

      )
   });

   return (
      <>
         <CRow className="g-30 r-gap-30">
            {items}
         </CRow>
      </>
   )
}

export default FormLanguages;