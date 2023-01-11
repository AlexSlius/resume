import { useState, useEffect, useMemo } from "react";
import {
   CCol,
   CRow,
} from "@coreui/react";
import { withFormik, useFormikContext } from "formik";
import { withForm } from "../../../HOC/withForm";
import initialSkills from "./InitialSkills";
import ModifyItems from './ModifyItems';

const getUniq = (arr, key) => {
   let seen = {};
   let uniq = [];

   arr.forEach(el => {
      if (!(el[key] in seen)) {
         seen[el[key]] = el[key];
         uniq.push(el);
      }
   })

   return uniq;
}

const FormSkill = ({ visibleRating, valuesFromStore, ...rest }) => {

   const localSkills = useMemo(() => {
      const selectedItemsFromStore = valuesFromStore.map(el => {
         return { ...el, selected: true }
      });
      const localInitialSkills = [...selectedItemsFromStore, ...initialSkills];
      return getUniq(localInitialSkills, 'name')
   }, [valuesFromStore]);

   const selectedItems = localSkills.filter(({ selected }) => selected === true);
   const notSelectedItems = localSkills.filter(({ selected }) => selected === false);

   // const { setValues: setFormikValues } = useFormikContext();

   const [skills, setSkils] = useState(localSkills);
   const [localSelectedItems, setSelectedItems] = useState(selectedItems);
   const [localNotSelectedItems, setNotSelectedItems] = useState(notSelectedItems);


   const ratingChanged = (newRating, id) => {
      setSkils(prev => prev.map((item) => id === item.id ? { ...item, level: newRating } : item));
   };

   const changeItem = (id, e) => {
      e.preventDefault();
      setSkils(prev => prev.map((item) => id === item.id ? { ...item, selected: !item.selected } : item));
   }

   // useEffect(() => {
   //    const selectedItems = skills.filter(({ selected }) => selected === true);
   //    setSelectedItems(selectedItems);
   //    const notSelectedItems = skills.filter(({ selected }) => selected === false);
   //    setNotSelectedItems(notSelectedItems);
   // }, [skills, setFormikValues]);

   // useEffect(() => {
   //    setFormikValues(localSelectedItems);
   // }, [localSelectedItems, setFormikValues]);


   return (
      <>
         <CRow className="g-30 r-gap-30">
            {localSelectedItems.length > 0 ?
               <CCol className="skills__selected-items d-flex gap-3 flex-wrap" xs={12}>
                  <ModifyItems
                     visibleRating={visibleRating}
                     arr={localSelectedItems}
                     ratingChanged={ratingChanged}
                     changeItem={changeItem} />
               </CCol> : null}
            <CCol xs={12}>
               <div className="skills__title mb-3">
                  Suggested skills
               </div>
               <div className="skills__adding-items d-flex gap-3 flex-wrap">
                  <ModifyItems arr={localNotSelectedItems} ratingChanged={ratingChanged} changeItem={changeItem} />
               </div>
            </CCol>
         </CRow>
      </>
   )
}

export default withFormik({ 
   mapPropsToValues: (props) => {
         const initialValues = {};
         return initialValues;
   }
})(withForm(FormSkill));