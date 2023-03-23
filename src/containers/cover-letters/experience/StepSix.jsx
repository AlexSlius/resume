import { CForm, CCol, CRow } from "@coreui/react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next"

import { StepContent } from "../../../components/stepContent";
import { FormSearchContent } from "../../../components/uis/formSearchContent/formSearchContent";
import { BtnContinue } from "../component/btnContinue";
import { ItemDragDrop } from "../../../components/ItemDragDrop";

import { reorder } from '../../../helpers/drageDrop';

export const StepSix = () => {
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        // const data = reorder(
        //    skillsObj.skillsListAll,
        //    result.source.index,
        //    result.destination.index
        // );

        // let updateArr = arrPositionUpdateItem(data);

        // dispatch(fetchPostUpdatePositionSkills({ idCv, data: updateArr }));
        // dispatch(updatePosition(updateArr));
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
                    <CRow>
                        <CCol xs={6}>
                            <div className="wr-col-text-r">
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
                            <div className="wr-gab-30">
                                <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                                    <Droppable droppableId="droppable">
                                        {
                                            (provided, snapshot) => (
                                                <div className="g-30"
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                >
                                                    {
                                                        [...new Array(5)].map((item, index) => (
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
                                                                            label={"User Interface Design"}
                                                                        // onDelete={onDeleteItemHobies}
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
            <BtnContinue isButton={true} />
        </div>
    )
}