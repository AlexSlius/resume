
import {
   CFormInput,
   CCol,
   CRow,
   CFormSelect
} from "@coreui/react";
import { withFormik, useFormikContext } from "formik";
import { withForm } from "../../../HOC/withForm";
import {useState, useEffect, Fragment} from 'react';
import uuid from 'react-uuid';

const FormLanguages = ({valuesFromStore, initialState}) => {
      const [inputs, setInputs] = useState(valuesFromStore.length > 0 ? [...valuesFromStore, ...initialState] : initialState);
      // const { setValues: setFormikValues} = useFormikContext();

      // useEffect(() => {
      //    setFormikValues(inputs);
      // }, [inputs]); // setFormikValues

      const handleChange = (index, label, event) => {
         let newInputs = inputs.map((input, indexCurrent) => {
            if (indexCurrent !== index) return input;
            return { ...input, [label]: event.target.value };
         });
         if (index === inputs.length - 1) {
            newInputs = newInputs.concat([{ language: '', level: '', id: uuid() }]);
         }
         setInputs(newInputs);
      };

      const items = inputs.map((item, index) => {
         return (
            <Fragment key={item?.id}>
               <CCol xs={6}>
                  <CFormInput
                     value={item?.language || ''}
                     type="text" 
                     floatingLabel="Language" 
                     placeholder="Language" 
                     onChange={(e)=>handleChange(index, 'language', e)}
                  />
               </CCol>
               <CCol xs={6}>
                  <CFormSelect className="custom-select" 
                     value={item?.level || ''}
                     onChange={(e)=>handleChange(index, 'level', e)}
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

export default withFormik({ 
   mapPropsToValues: (props) => {
         const initialValues = {};
         return initialValues;
   }
})(withForm(FormLanguages));