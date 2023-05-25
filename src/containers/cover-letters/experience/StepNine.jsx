import { CForm, CCol, CRow } from "@coreui/react"
import { useEffect } from "react";

import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { InputSelect } from "../../../components/uis/inputSelect";

import { getDescribes } from "../../../controllers/dependencies";

export const StepNine = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    coverDataObj,
    dispatch,
    describes,
}) => {
    const handleClickBtn = async () => {
        await handleClicQuery(StepsName["workExperinence"]);
    }

    const handleUpdateFiled = ({ name, value }) => {
        handleUpdateField({ name, value });
    }

    const handleRequest = (text) => {
        dispatch(getDescribes(text));
    }

    useEffect(() => {
        dispatch(getDescribes());
    }, []);

    return (
        <div className="step-wr">
            <StepContent
                icon="/images/cover/icon-cover-8.svg"
                title="How would others describe you?"
                label="Choose a word others would use to describe you."
            />
            <div className="wr-form-cover">
                <CForm className="wr-gab-30">
                    <CRow className="mobile-rows">
                        <CCol xs={6}>
                            <InputSelect
                                label="Please Select"
                                valueState={coverDataObj.othersDescribe || ''}
                                data={describes.list}
                                name="othersDescribe"
                                handleSaveSelect={handleUpdateFiled}
                                handleServerRequest={handleRequest}
                                isOutDataObj={false}
                                isValidIn={true}
                                validIn={coverDataObj.othersDescribe?.length > 3}
                            />
                        </CCol>
                    </CRow>
                </CForm>
            </div>
            <BtnContinue isButton={true} onHanleBtn={handleClickBtn} />
        </div>
    )
}