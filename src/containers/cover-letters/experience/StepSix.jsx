import { CForm, CCol, CRow } from "@coreui/react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next"
import React from "react";

import { StepContent } from "../../../components/stepContent";
import { FormSearchContent } from "../../../components/uis/formSearchContent/formSearchContent";
import { BtnContinue } from "../component/btnContinue";
import { ItemDragDrop } from "../../../components/ItemDragDrop";

import { reorder } from '../../../helpers/drageDrop';

export const StepSix = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    experienceObj,
}) => {
    const [arrSlills, setArrSkills] = React.useState([]);

    const handleClickBtn = () => {
        handleClicQuery(StepsName["skillSet"]);
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        let arrOfStr = experienceObj.professionalSkills.split(',');

        const data = reorder(
            arrOfStr,
            result.source.index,
            result.destination.index
        );

        handleUpdateField({ name: "professionalSkills", value: data.join(',') });
    }

    const handleDeleteItem = (index) => {
        let arrOfStr = experienceObj.professionalSkills.split(',');
        arrOfStr.splice(index, 1);

        handleUpdateField({ name: "professionalSkills", value: arrOfStr.join(',') });
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
                            <div className="wr-col-text-r search-block">
                                <FormSearchContent
                                // valueText={data}
                                // data={objective.list}
                                // isLoad={isLoader(objective.status)}
                                // handleServerRequest={handleServerRequestObjective}
                                // handleUpdateText={handleAddText}
                                // setUpdate={setUpdate}
                                />
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
                                                        [...experienceObj.professionalSkills.split(',')].map((item, index) => (
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