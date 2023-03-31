import { CForm, CCol, CRow } from "@coreui/react"

import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { InputSelect } from "../../../components/uis/inputSelect";

import { fetchGetFieldOfStudy } from "../../../controllers/dependencies";

export const StepFive = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    experienceObj,
    dispatch,
    fieldOfStudy,
}) => {
    const handleClickBtn = () => {
        handleClicQuery(StepsName["professionalSkills"]);
    }

    const handleUpdateFiled = ({ name, value }) => {
        handleUpdateField({ name, value });
    }

    const handleRequest = () => {
        dispatch(fetchGetFieldOfStudy(experienceObj.fieldOfStudyOrDegree));
    }

    return (
        <div className="step-wr">
            <StepContent
                icon="/images/cover/icon-cover-4.svg"
                title="What's your field of study or degree?"
            />
            <div className="wr-form-cover">
                <CForm className="wr-gab-30">
                    <CRow className="mobile-rows">
                        <CCol xs={6}>
                            <InputSelect
                                placeholder="Please Select"
                                valueState={experienceObj.fieldOfStudyOrDegree || ''}
                                data={fieldOfStudy.list}
                                name="fieldOfStudyOrDegree"
                                handleSaveSelect={handleUpdateFiled}
                                handleServerRequest={handleRequest}
                                isOutDataObj={false}
                                isIconArrow={true}
                            />
                        </CCol>
                    </CRow>
                </CForm>
            </div>
            <BtnContinue isButton={true} onHanleBtn={handleClickBtn} />
        </div>
    )
}