
import { useState, useEffect} from "react";
import {
   CFormInput,
   CCol,
   CRow,
} from "@coreui/react";
import uuid from 'react-uuid';
import { withFormik, useFormikContext } from "formik";
import { withForm } from "../../../HOC/withForm";

const FormCertificaties = ({valuesFromStore, initialState}) => {

   const [inputs, setInputs] = useState(valuesFromStore.length > 0 ? [...valuesFromStore, ...initialState] : initialState);
//    const { setValues: setFormikValues} = useFormikContext();

//    useEffect(() => {
//       setFormikValues(inputs);
//   }, [inputs, setFormikValues]);


   const handleChange = (index, event) => {
      let newInputs = inputs.map((input, indexCurrent) => {
         if (indexCurrent !== index) return input;
         return { ...input, name: event.target.value };
      });
      if (index === inputs.length - 1) {
         newInputs = newInputs.concat([{ name: "", id: uuid() }]);
      }
      setInputs(newInputs);
   };
   const items = inputs.map((item, index) => {
      return (
         <CCol key={item.id } xs={6} >
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

export default withFormik({ 
   mapPropsToValues: (props) => {
         const initialValues = {};
         return initialValues;
   }
})(withForm(FormCertificaties));