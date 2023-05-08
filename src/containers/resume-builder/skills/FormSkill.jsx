import {
   CCol,
   CRow,
} from "@coreui/react";
import React from "react";
import { isArray } from "lodash";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next"

import ModifyItems from './ModifyItems';
import { InputSelect } from "../../../components/uis/inputSelect"
import { ButtonSteps } from "../../../components/buttonSteps"
import { LoadWr } from "../../../components/loadWr";
import { ActiveItemSkillsAndStarts } from "./ActiveItemSkillsAndStarts";

import { reorder } from '../../../helpers/drageDrop';
import { newPosition, arrPositionUpdateItem } from "../../../helpers/position";

import {
   getJopsTitle
} from "../../../controllers/dependencies";

import {
   updateItemSkillsFiled,
   updatePosition,
   updateItemSkillsFiledLevel
} from "../../../slices/skills";
import {
   fetchGetSkillslistSearch,
   fetchPostAddSkillone,
   fetchPostUpdateSkillone,
   fetchPostDeleteSkillOne,
   fetchPostUpdatePositionSkills,
   fetchDeleteAll,
   getSkillsPositionStartOne
} from "../../../controllers/skills";
import { postUpdateCategoryViewedStatus } from '../../../controllers/addSections';

const FormSkill = ({
   dispatch,
   states,
   idCv
}) => {
   const {
      skills: {
         skillsObj,
         statusIsListSkills,
      },
      dependencies: {
         jopsTitle,
      },
      auth: {
         autorizate: {
            isAthorized
         }
      },
      contacts
   } = states;

   const isDataPage = (isArray(skillsObj?.skillsListAll) && (skillsObj.skillsListAll.length > 0));

   const updateitemFiled = ({ name, value, isClisk, update }, data) => {
      if (!isClisk) {
         dispatch(updateItemSkillsFiled({ name, value }));
      }

      if (isClisk && update) {
         dispatch(updateItemSkillsFiled({ name, value }));
      }

      if (isClisk) {
         if (update) {
            switch (name) {
               case "selectd_work": {
                  dispatch(getSkillsPositionStartOne({ data: { "query": value || '', limit: 15 } }));
                  break;
               }
            }
         } else {
            handleAddItemSkillOne(data.id, data.name);
         }
      }
   }

   const handleGetSkillsPos = async () => {
      await dispatch(getJopsTitle(skillsObj?.selectd_work || ""));
   }

   const randomSearchSkills = async () => {
      await dispatch(fetchGetSkillslistSearch(skillsObj?.searchSkils));
   }

   const handleAddItemSkillOne = async (idSkill, text) => {
      await dispatch(fetchPostAddSkillone({ idCv, data: { name: text, level: 0, skill_id: idSkill, position: newPosition(skillsObj.skillsListAll) } }));
   }

   const handleUpdateItemSkillOne = async (id, data, index) => {
      dispatch(updateItemSkillsFiledLevel({ index, value: data.level }));
      await dispatch(fetchPostUpdateSkillone({ idCv, id, data }));
   }

   const handleDeleteItemSkill = (id) => {
      dispatch(fetchPostDeleteSkillOne({ idCv, id }));
   }

   const handleClickDeleteItem = (id) => {
      if (isArray(skillsObj.skillsListAll)) {
         let result = skillsObj.skillsListAll.find((el) => id == el.skillId)
         handleDeleteItemSkill(result.id);
      }
   }

   const handleClickActiveItem = (data) => {
      if (isArray(skillsObj?.skillsListAll)) {
         let { id } = skillsObj.skillsListAll.find(el => el.skillId == data.id);

         if (id)
            handleDeleteItemSkill(id);
      }
   }

   const onDragEnd = (result) => {
      if (!result.destination) {
         return;
      }

      const data = reorder(
         skillsObj.skillsListAll,
         result.source.index,
         result.destination.index
      );

      let updateArr = arrPositionUpdateItem(data);

      dispatch(fetchPostUpdatePositionSkills({ idCv, data: updateArr }));
      dispatch(updatePosition(updateArr));
   }

   const handleClean = () => {
      dispatch(fetchDeleteAll({ idCv }));
   }

   React.useEffect(() => {
      dispatch(getSkillsPositionStartOne({ data: { "query": contacts.contactObj?.jobTitle || '', limit: 15 } }));
      dispatch(postUpdateCategoryViewedStatus({ idCv, category: 'skills' }));
   }, []);

   return (
      <>
         <CRow className="mobile-rows g-30 r-gap-30">
            <CCol className="gap-3" xs={6}>
               <CRow>
                  <CCol className="mb-4" xs={12}>
                     <InputSelect
                        label="Selected work"
                        valueState={skillsObj?.selectd_work || ""}
                        data={jopsTitle?.list || []}
                        handleSaveSelect={(obj) => updateitemFiled({ ...obj, name: "selectd_work", update: true })}
                        handleServerRequest={handleGetSkillsPos}
                        isOutDataObj={false}
                        isIconArrow={true}
                        isRequire={true}
                     />
                  </CCol>
                  <CCol className="mb-4" xs={12}>
                     <InputSelect
                        label="Search skill"
                        valueState={skillsObj?.searchSkils}
                        data={skillsObj?.searchSkillsList || []}
                        handleSaveSelect={(obj, data) => updateitemFiled({ ...obj, name: "searchSkils", update: false }, data)}
                        handleServerRequest={randomSearchSkills}
                        handleClickActiveItem={handleClickActiveItem}
                        isOutDataObj={false}
                        isIconArrow={true}
                        isRequire={true}
                        isShowUpClick={false}
                        isActiveItem={true}
                        activeArr={skillsObj?.skillsListAll}
                        isAddDiv={false}
                        keyActiveEl='skillId'
                     />
                  </CCol>
                  <CCol xs={12}>
                     <ModifyItems
                        arr={skillsObj?.skillsList}
                        arrActive={skillsObj?.skillsListAll}
                        handleClick={handleAddItemSkillOne}
                        handleClickDelete={handleClickDeleteItem}
                     />
                  </CCol>
               </CRow>
            </CCol >
            <CCol xs={6}>
               {/* isLoad={isLoader(statusListSkillsAll)} */}
               <LoadWr >
                  <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                     <Droppable droppableId="droppable">
                        {
                           (provided, snapshot) => (
                              <div
                                 className="skills-items-level"
                                 ref={provided.innerRef}
                                 {...provided.droppableProps}
                              >
                                 {
                                    isArray(skillsObj?.skillsListAll) && (
                                       skillsObj.skillsListAll.map((item, index) => (
                                          <Draggable
                                             key={item.id}
                                             draggableId={String(item.id)}
                                             index={index}
                                          >
                                             {
                                                (provided, snapshot) => (
                                                   <ActiveItemSkillsAndStarts
                                                      key={item.id}
                                                      index={index}
                                                      provided={provided}
                                                      id={item.id}
                                                      label={item.name}
                                                      position={item.position}
                                                      onDelete={handleDeleteItemSkill}
                                                      ratingChanged={handleUpdateItemSkillOne}
                                                      valueStats={item.level}
                                                      isStar={!skillsObj.hideExperienceLevel}
                                                   />
                                                )
                                             }
                                          </Draggable>
                                       ))
                                    )
                                 }
                                 {provided.placeholder}
                              </div>
                           )
                        }
                     </Droppable>
                  </DragDropContext>
               </LoadWr>
            </CCol>
         </CRow>
         <CRow className="mt-4">
            <CCol>
               <ButtonSteps
                  isAthorized={isAthorized}
                  disabledNext={!isDataPage}
                  onClean={handleClean}
               />
            </CCol>
         </CRow>
      </>
   )
}

export default FormSkill;