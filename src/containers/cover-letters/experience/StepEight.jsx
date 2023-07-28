import { CForm, CCol, CRow } from "@coreui/react"
import { useEffect } from "react";

import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { InputSelect } from "../../../components/uis/inputSelect";

import { getDescribes } from "../../../controllers/dependencies";

export const StepEight = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    coverDataObj,
    dispatch,
    describes,
}) => {
    const handleClickBtn = async () => {
        await handleClicQuery(StepsName["othersDescribe"]);
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
                icon="/images/cover/icon-cover-7.svg"
                title="What word would you use to describe yourself?"
                label="Choose the word that describes you best"
            />
            <div className="wr-form-cover">
                <CForm className="wr-gab-30">
                    <CRow className="mobile-rows">
                        <CCol xs={6}>
                            <InputSelect
                                label="Please Select"
                                valueState={coverDataObj.wordDescribes || ''}
                                data={describes.list}
                                name="wordDescribes"
                                handleSaveSelect={handleUpdateFiled}
                                handleServerRequest={handleRequest}
                                isOutDataObj={false}
                                isValidIn={true}
                                validIn={coverDataObj.wordDescribes?.trim()?.length > 3}
                            />
                        </CCol>
                    </CRow>
                </CForm>
            </div>
            <BtnContinue isButton={true} onHanleBtn={handleClickBtn} />
        </div>
    )
}