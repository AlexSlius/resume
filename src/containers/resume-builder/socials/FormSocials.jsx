
import { useState, useEffect } from "react";
import {
   CFormInput,
   CCol,
   CRow,
} from "@coreui/react";
import uuid from 'react-uuid';
import { withFormik, useFormikContext } from "formik";
import { withForm } from "../../../HOC/withForm";

const FormSocials = ({ valuesFromStore, initialState }) => {
   //    const [inputs, setInputs] = useState(valuesFromStore.length > 0 ? [...valuesFromStore, ...initialState] : initialState);
   //    const { setValues: setFormikValues} = useFormikContext();

   //    useEffect(() => {
   //       setFormikValues(inputs);
   //   }, [inputs, setFormikValues]);

   //    const handleChange = (index, label, event) => {
   //       let newInputs = inputs.map((input, indexCurrent) => {
   //          if (indexCurrent !== index) return input;
   //          return { ...input, [label]: event.target.value };
   //       });
   //       if (index === inputs.length - 1) {
   //          newInputs = newInputs.concat([{ name: '', link: '', id: uuid() }]);
   //       }
   //       setInputs(newInputs);
   //    };

   const items = [undefined, undefined].map((item, index) => {
      return (
         <CRow key={item?.id} >
            <CCol xs={6} >
               <CFormInput
                  type="text"
                  // value={item?.name || ''} 
                  placeholder='Label'
                  onChange={e => handleChange(index, 'name', e)}
               />
            </CCol>
            <CCol xs={6} >
               {item?.name?.trim().length > 0 ?
                  <CFormInput
                     type="text"
                     // value={item.link || ''} 
                     placeholder='Link'
                     onChange={e => handleChange(index, 'link', e)}
                  /> : null}
            </CCol>
         </CRow>

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
})(withForm(FormSocials));