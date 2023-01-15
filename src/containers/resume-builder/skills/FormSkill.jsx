import {
   CCol,
   CRow,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";

import initialSkills from "./InitialSkills";
import ModifyItems from './ModifyItems';
import { InputSelect } from "../../../components/uis/inputSelect"
import InputSearch from "../../../components/uis/inputSearch";
import { fetchGetSkillsPosition } from "../../../controllers/dependencies";
import { updateItemSkillsFiled } from "../../../slices/skills";
import { isLoader } from "../../../helpers/loadings"
import {
   fetchGetSkillslistWork,
   fetchGetSkillslistSearch
} from "../../../controllers/skills";
import { LoadBlock } from "../../../components/loadBlock";

const FormSkill = ({ visibleRating }) => {
   const dispatch = useDispatch();
   const {
      skills: {
         skillsObj,
         statusIsListSkills,
      },
      dependencies: {
         skillsPositions,
      }
   } = useSelector(state => state);

   const updateitemFiled = ({ name, value, isClisk }) => {
      dispatch(updateItemSkillsFiled({ name, value }));

      if (isClisk) {
         switch (name) {
            case "selectd_work": {
               dispatch(fetchGetSkillslistWork(value));
               break;
            }
         }
      }
   }

   const handleGetSkillsPos = async () => {
      updateitemFiled({ name: "searchSkils", value: '' });
      await dispatch(fetchGetSkillsPosition(skillsObj?.selectd_work));
   }

   const randomSearchSkills = async () => {
      updateitemFiled({ name: "selectd_work", value: '' });
      await dispatch(fetchGetSkillslistSearch(skillsObj?.searchSkils));
   }

   return (
      <CRow className="g-30 r-gap-30">
         <CCol className="gap-3" xs={6}>
            <CRow>
               <CCol className="mb-4" xs={12}>
                  <InputSelect
                     label="Selected work"
                     placeholder="Selected work"
                     valueState={skillsObj?.selectd_work || ""}
                     name="selectd_work"
                     data={skillsPositions.list}
                     isLoad={isLoader(skillsPositions?.status)}
                     handleSaveSelect={updateitemFiled}
                     handleServerRequest={handleGetSkillsPos}
                     isOutDataObj={false}
                     isFirstList={false}
                     isIconArrow={true}
                     keyName="position"
                     keyText="position"
                  />
               </CCol>
               <CCol className="mb-4" xs={12}>
                  <InputSearch
                     placeholder="Search skill"
                     floatingLabel="Search skill"
                     value={skillsObj?.searchSkils}
                     onChange={(e) => updateitemFiled({ name: "searchSkils", value: e.target.value })}
                     handleServerRequest={randomSearchSkills}
                  />
               </CCol>
               <CCol xs={12}>
                  {
                     isLoader(statusIsListSkills) ? (
                        <LoadBlock />
                     ) : (
                        <ModifyItems
                           arr={skillsObj?.skillsList}
                        // changeItem={changeItem}
                        />
                     )
                  }
               </CCol>
            </CRow>
         </CCol >
         <CCol xs={6}>
            <div className="skills__adding-items d-flex gap-3 flex-wrap">
               {/* <ModifyItems arr={localNotSelectedItems} ratingChanged={ratingChanged} changeItem={changeItem} /> */}
            </div>
         </CCol>
      </CRow >
   )
}

export default FormSkill;