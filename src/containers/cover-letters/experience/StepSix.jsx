import { CForm, CCol, CRow } from "@coreui/react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next"
import React from "react";

import { StepContent } from "../../../components/stepContent";
import { FormSearchContent } from "../../../components/uis/formSearchContent/formSearchContent";
import { BtnContinue } from "../component/btnContinue";
import { ItemDragDrop } from "../../../components/ItemDragDrop";
import { InputSelect } from "../../../components/uis/inputSelect";

import { reorder } from '../../../helpers/drageDrop';
import { isLoader } from "../../../helpers/loadings"

import {
    getJopsTitle,
    getSkillsStartOneJobTitle,
    fetchGetSkillslistSearchRandom,
} from "../../../controllers/dependencies"

export const StepSix = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    coverDataObj,
    jopsTitleList,
    dispatch,
    skills,
}) => {
    const [jobTitle, setJobTitle] = React.useState("");

    const handleClickBtn = async () => {
        await handleClicQuery(StepsName["skillSet"]);
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        let arrOfStr = coverDataObj.professionalSkills.split(',');

        const data = reorder(
            arrOfStr,
            result.source.index,
            result.destination.index
        );

        handleUpdateField({ name: "professionalSkills", value: data.join(',') });
    }

    const handleDeleteItem = (index) => {
        let arrOfStr = coverDataObj.professionalSkills.split(',');
        arrOfStr.splice(index, 1);

        handleUpdateField({ name: "professionalSkills", value: arrOfStr.join(',') });
    }

    const handleAddTextSkill = (value) => {
        let arrOfStr = [];
        if (!!coverDataObj.professionalSkills) {
            arrOfStr = coverDataObj.professionalSkills.split(',');
            arrOfStr.push(value);
        } else {
            arrOfStr = ['value'];
        }

        handleUpdateField({ name: "professionalSkills", value: arrOfStr.join(',') });
    }

    const handleRequestJobTitle = async () => {
        await dispatch(getJopsTitle(jobTitle));
    }

    const handleUpdateFiled = ({ name, value }, data = null) => {
        setJobTitle(value);

        if (!!data) {
            dispatch(getSkillsStartOneJobTitle({ data: { "query": value || '', limit: 30 } }));
        }
    }

    const handleServerRequestSkills = (value) => {
        dispatch(fetchGetSkillslistSearchRandom(value));
    }

    return (
        <div className="step-wr">
            <StepContent
                icon="/images/cover/icon-cover-5.svg"
                title="What are your professional skills?"
                label="Choose up to 5 top skills you used in your last job."
            />
            <div className="wr-form-cover">
                <CForm className="wr-gab-30">
                    <CRow className="mobile-rows">
                        <CCol xs={6}>
                            <div className="wr-col-text-r">
                                <div className="wr-gab-30">
                                    <InputSelect
                                        label="Job Title"
                                        placeholder="Job Title"
                                        valueState={jobTitle || ''}
                                        data={jopsTitleList || []}
                                        name="jobTitle"
                                        handleSaveSelect={handleUpdateFiled}
                                        handleServerRequest={handleRequestJobTitle}
                                        isOutDataObj={false}
                                        isRequire={true}
                                        isCap={true}
                                    />
                                    <FormSearchContent
                                        valueText={coverDataObj.professionalSkills || ""}
                                        keys="name"
                                        data={skills.list}
                                        isLoad={isLoader(skills.status)}
                                        handleServerRequest={handleServerRequestSkills}
                                        handleUpdateText={handleAddTextSkill}
                                    />
                                </div>
                            </div>
                        </CCol>
                        <CCol xs={6}>
                            <div className="">
                                <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                                    <Droppable droppableId="droppable">
                                        {
                                            (provided, snapshot) => (
                                                <div className="items-step-skill"
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                >
                                                    {
                                                        !!coverDataObj.professionalSkills && [...coverDataObj.professionalSkills.split(',')].map((item, index) => (
                                                            <Draggable
                                                                key={index}
                                                                draggableId={String(index)}
                                                                index={index}
                                                            >
                                                                {
                                                                    (provided, snapshot) => (
                                                                        <ItemDragDrop
                                                                            id={1}
                                                                            isCol={false}
                                                                            provided={provided}
                                                                            label={item}
                                                                            onDelete={() => handleDeleteItem(index)}
                                                                        />
                                                                    )
                                                                }
                                                            </Draggable>
                                                        ))
                                                    }
                                                    {provided.placeholder}
                                                </div>
                                            )
                                        }
                                    </Droppable>
                                </DragDropContext>
                            </div>
                        </CCol>
                    </CRow>
                </CForm>
            </div>
            <BtnContinue isButton={true} onHanleBtn={handleClickBtn} />
        </div>
    )
}