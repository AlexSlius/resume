
import {
   CFormInput,
   CCol,
   CRow,
} from "@coreui/react";
import {useState, useEffect, Fragment} from 'react';
import { withFormik, useFormikContext } from "formik";
import { withForm } from "../../../HOC/withForm";

const FormReference = ({valuesFromStore, initialState}) => {
   const [localReference, setLocalReference] = useState(valuesFromStore.length > 0 ? valuesFromStore : initialState);

//    useEffect(() => {
//       setFormikValues(localReference);
//   }, [localReference, setFormikValues]);

  const handleInput = (event, name, id) => {
   let found = localReference.find(el => el.id === id);

   if(found) {
      setLocalReference((state) => {
         const index = state.findIndex(el => el.id === id);
         const before = state.slice(0, index);
         const after = state.slice(index + 1);
         return [...before, {...found, [name]: event.target.value}, ...after];
      });
   } else {
      setLocalReference((state) => {
         return [...state, {id, [name]: event.target.value}];
      });
   }

};

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
                        onChange={(e)=>handleInput(e, 'full_name', reference.id)}
                     />
                  </CCol>
                  <CCol xs={6}>
                     <CFormInput 
                        value={reference?.company || ''}
                        type="text" 
                        floatingLabel="Company" 
                        placeholder="Company" 
                        onChange={(e)=>handleInput(e, 'company', reference.id)}
                     />
                  </CCol>
                  <CCol xs={6}>
                     <CFormInput 
                        value={reference?.email || ''}
                        type="email" 
                        floatingLabel="E-mail*" 
                        placeholder="Phone" 
                        onChange={(e)=>handleInput(e, 'email', reference.id)}
                     />
                  </CCol>
                  <CCol xs={6}>
                     <CFormInput 
                        value={reference?.phone || ''}
                        type="text" 
                        floatingLabel="Phone" 
                        placeholder="Phone" 
                        onChange={(e)=>handleInput(e, 'phone', reference.id)}
                     />
                  </CCol>
               </Fragment>
               )
            })}

         </CRow>
      </>
   )
}

export default withFormik({ 
   mapPropsToValues: (props) => {
         const initialValues = {};
         return initialValues;
   }
})(withForm(FormReference));