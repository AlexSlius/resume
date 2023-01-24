import {
   CCol,
   CRow,
} from "@coreui/react";
import React from "react";
import { isArray } from "lodash";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next"

import ModifyItems from './ModifyItems';
import { InputSelect } from "../../../components/uis/inputSelect"
import InputSearch from "../../../components/uis/inputSearch";
import { ButtonSteps } from "../../../components/buttonSteps"
import { LoadWr } from "../../../components/loadWr";
import { LoadBlock } from "../../../components/loadBlock";
import { ActiveItemSkillsAndStarts } from "./ActiveItemSkillsAndStarts";

import { isLoader } from "../../../helpers/loadings"
import { reorderUpdateItem } from '../../../helpers/drageDrop';

import { fetchGetSkillsPosition } from "../../../controllers/dependencies";
import {
   updateItemSkillsFiled,
   updatePosition
} from "../../../slices/skills";
import {
   fetchGetSkillslistWork,
   fetchGetSkillslistSearch,
   fetchPostAddSkillone,
   fetchPostUpdateSkillone,
   fetchPostDeleteSkillOne,
   fetchGetSkillslistAll
} from "../../../controllers/skills";


const FormSkill = ({
   dispatch,
   states,
   idCv
}) => {
   const {
      skills: {
         skillsObj,
         statusIsListSkills,
         statusListSkillsAll
      },
      dependencies: {
         skillsPositions,
      },
      auth: {
         autorizate: {
            isAthorized
         }
      },
   } = states;

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

   const handleAddItemSkillOne = async (idSkill, text) => {
      await dispatch(fetchPostAddSkillone({ idCv, data: { name: text, level: 4, skill_id: idSkill, position: skillsObj.skillsListAll.length + 1 } }));
   }

   const handleUpdateItemSkillOne = async (id, data) => {
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

   const onDragEnd = (result) => {
      if (!result.destination) {
         return;
      }

      const { items, idUpdate } = reorderUpdateItem(
         skillsObj.skillsListAll,
         result.source.index,
         result.destination.index
      );

      let objOut = null;

      console.log(items);

      for (let i = 0; i < items.length; i++) {
         if (items[i].id == idUpdate) {
            objOut = { ...items[i] }
            objOut.position = (items.length - i);
            break;
         }
      }

      handleUpdateItemSkillOne(objOut.id, objOut);

      dispatch(updatePosition(items));
   }

   React.useEffect(() => {
      dispatch(fetchGetSkillslistAll(idCv));
   }, []);

   return (
      <>
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
                              arrActive={skillsObj?.skillsListAll}
                              handleClick={handleAddItemSkillOne}
                              handleClickDelete={handleClickDeleteItem}
                           />
                        )
                     }
                  </CCol>
               </CRow>
            </CCol >
            <CCol xs={6}>
               <LoadWr isLoad={isLoader(statusListSkillsAll)}>
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
                                                      provided={provided}
                                                      id={item.id}
                                                      label={item.name}
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
               <ButtonSteps isAthorized={isAthorized} />
            </CCol>
         </CRow>
      </>
   )
}

export default FormSkill;