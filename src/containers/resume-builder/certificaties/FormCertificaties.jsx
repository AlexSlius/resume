
import { useState, useEffect } from "react";
import {
   CFormInput,
   CCol,
   CRow,
} from "@coreui/react";

const FormCertificaties = ({
   dispatch,
   storeDate
}) => {
   const items = inputs.map((item, index) => {
      return (
         <CCol key={item.id} xs={6} >
            <CFormInput
               type="text"
               value={item.name}
               placeholder={`Licence / Certification ${index + 1}#`}
               onChange={e => handleChange(index, e)} />
         </CCol>
      )
   })

   return (
      <>
         <CRow className="g-30 r-gap-30">
            {items}
         </CRow>
      </>
   )
}

export default FormCertificaties;