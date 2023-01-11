import {
   CCol,
   CRow,
} from "@coreui/react";
import Textarea from "../../../components/uis/textarea/TextArea";
import { withFormik, useFormikContext } from "formik";
import { withForm} from "../../../HOC/withForm";
import { useState, useEffect } from "react";
import { prewriteList as list } from "../../../utils";


const FormHobies = ({ handleBlur, valuesFromStore, initialState }) => {
   //     const { setValues: setFormikValues } = useFormikContext();
   //     const [show, setShow] = useState(false);
   //     const [localHobies, setLocalHobies] = useState(valuesFromStore.length > 0 ? valuesFromStore : initialState);

   //     useEffect(() => {
   //       setFormikValues(localHobies);
   //   }, [localHobies, setFormikValues]);


   //     const handleFocus = (e) => {
   //       setShow(false);
   //     }

   //     const handleInput = (_, name, id, text) => {
   //       let found = localHobies.find(el => el.id === id);

   //       if(found) {
   //          setLocalHobies((state) => {
   //             const index = state.findIndex(el => el.id === id);
   //             const before = state.slice(0, index);
   //             const after = state.slice(index + 1);
   //             return [...before, {...found, [name]: text}, ...after];
   //          });
   //       } else {
   //          setLocalHobies((state) => {
   //             return [...state, {id, [name]: text}];
   //          });
   //       }

   //    };

   return (
      <>
         <CRow className="g-30 r-gap-30">
            {[undefined, undefined].map(hobie => {
               return (
                  <CCol xs={12} key={hobie?.id}>
                     <Textarea
                        value={hobie?.text || ''}
                        // onChange={(_, text) => handleInput(null, 'text', hobie?.id, text)}
                        // onFocus={handleFocus}
                        // onBlur={handleBlur}
                        hideButton={false}
                        name="text"
                        prewrite={true}
                        // prewritePopupShow={show}
                        prewriteButtonHandler={() => setShow(prev => !prev)}
                        prewriteItems={list}
                        placeholder={'Description of hobbie'}
                        // id={"hobiesTextarea" + hobie?.id}
                        currentValueId={hobie?.id}
                     />
                  </CCol>
               )
            })}

         </CRow>
      </>
   )
}

export default withFormik({ 
   mapPropsToValues: (props) => {
         const keys = { 
            "text": ''
         }

         const initialValues = {};

         for (const [name, _] of Object.entries(keys)) {
            initialValues[name] = props.valuesFromStore[name] || '';
          }

         return initialValues;
   }
})(withForm(FormHobies));