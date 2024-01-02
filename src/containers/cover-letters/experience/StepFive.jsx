import { CForm, CCol, CRow } from "@coreui/react"

import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { InputSelect } from "../../../components/uis/inputSelect";

import { fetchGetFieldOfStudy } from "../../../controllers/dependencies";

export const StepFive = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    coverDataObj,
    dispatch,
    fieldOfStudy,
}) => {
    const handleClickBtn = async () => {
        // professionalSkills
        await handleClicQuery(StepsName["workExperinence"]);
    }

    const handleUpdateFiled = async ({ name, value }) => {
        await handleUpdateField({ name, value });
    }

    const handleRequest = async () => {
        await dispatch(fetchGetFieldOfStudy(coverDataObj.fieldOfStudyOrDegree));
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
                                label="Please Select"
                                valueState={coverDataObj.fieldOfStudyOrDegree || ''}
                                data={fieldOfStudy.list}
                                name="fieldOfStudyOrDegree"
                                handleSaveSelect={handleUpdateFiled}
                                handleServerRequest={handleRequest}
                                isOutDataObj={false}
                                isIconArrow={true}
                                isValidIn={true}
                                validIn={coverDataObj.fieldOfStudyOrDegree?.trim()?.length > 3}
                            />
                        </CCol>
                    </CRow>
                </CForm>
            </div>
            <BtnContinue isButton={true} onHanleBtn={handleClickBtn} />
        </div>
    )
}