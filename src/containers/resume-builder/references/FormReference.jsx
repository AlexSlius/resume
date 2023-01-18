
import {
   CFormInput,
   CCol,
   CRow,
} from "@coreui/react";
import { useState, useEffect, Fragment } from 'react';

const FormReference = ({
   dispatch,
   storeDate
}) => {

   return (
      <>
         <CRow className="g-30 r-gap-30">
            {localReference.map(reference => {
               return (
                  <Fragment key={reference?.id}>
                     <CCol xs={6}>
                        <CFormInput
                           value={reference?.full_name || ''}
                           type="text"
                           floatingLabel="Referent Full name"
                           placeholder="Referent Full name"
                           onChange={(e) => handleInput(e, 'full_name', reference.id)}
                        />
                     </CCol>
                     <CCol xs={6}>
                        <CFormInput
                           value={reference?.company || ''}
                           type="text"
                           floatingLabel="Company"
                           placeholder="Company"
                           onChange={(e) => handleInput(e, 'company', reference.id)}
                        />
                     </CCol>
                     <CCol xs={6}>
                        <CFormInput
                           value={reference?.email || ''}
                           type="email"
                           floatingLabel="E-mail*"
                           placeholder="Phone"
                           onChange={(e) => handleInput(e, 'email', reference.id)}
                        />
                     </CCol>
                     <CCol xs={6}>
                        <CFormInput
                           value={reference?.phone || ''}
                           type="text"
                           floatingLabel="Phone"
                           placeholder="Phone"
                           onChange={(e) => handleInput(e, 'phone', reference.id)}
                        />
                     </CCol>
                  </Fragment>
               )
            })}

         </CRow>
      </>
   )
}

export default FormReference;