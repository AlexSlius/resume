import { useState, useEffect, useMemo } from "react";
import {
   CCol,
   CRow,
} from "@coreui/react";
import initialSkills from "./InitialSkills";
import ModifyItems from './ModifyItems';
import { InputSelect } from "../../../components/uis/inputSelect"

const FormSkill = ({ visibleRating }) => {
   return (
      <CRow className="g-30 r-gap-30">
         <CCol className="gap-3" xs={6}>
            <CRow>
               <CCol>
                  <InputSelect
                     label="Selected work"
                     placeholder="Selected work"
                     // valueState={item?.facility || ""}
                     name="facility"
                     // isAddDiv={true}
                     // data={studys.list}
                     // isLoad={isLoader(studys?.status)}
                     // handleSaveSelect={(obj) => handleSaveSelect({ index, ...obj })}
                     // handleServerRequest={() => getSearchListStudys(item.study)}
                     isOutDataObj={false}
                     // isFirstList={false}
                  />
                  {/* <ModifyItems
            // visibleRating={visibleRating}
            // arr={localSelectedItems}
            // ratingChanged={ratingChanged}
            // changeItem={changeItem}
            /> */}
               </CCol>
            </CRow>
         </CCol>
         <CCol xs={6}>
            <div className="skills__adding-items d-flex gap-3 flex-wrap">
               {/* <ModifyItems arr={localNotSelectedItems} ratingChanged={ratingChanged} changeItem={changeItem} /> */}
            </div>
         </CCol>
      </CRow>
   )
}

export default FormSkill;