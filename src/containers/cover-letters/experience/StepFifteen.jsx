import { CForm, CCol, CRow } from "@coreui/react"

import { StepContent } from "../../../components/stepContent";
import { BtnsStatus } from "../component/btnsStatus";
import { InputSelect } from "../../../components/uis/inputSelect";

export const StepFifteen = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    coverDataObj,
}) => {
    const handleClickBtn = async (value) => {
        if (value == "N") {
            await handleUpdateField({ name: "explainAnyWorkGaps", value: "N", step: "graduatedFinish" });
        } else {
            await handleClicQuery(StepsName["graduatedFinish"]);
        }
    }

    const handleUpdateFiled = ({ name, value }) => {
        handleUpdateField({ name, value });
    }

    const handleRequestReason = (text) => {

    }

    return (
        <div className="step-wr">
            <StepContent
                icon="/images/cover/icon-cover-11.svg"
                title="Do you want to explain any work gaps?"
                label="Choose the reason that best explains your work gap"
            />
            <div className="wr-form-cover">
                <CForm className="wr-gab-30">
                    <CRow>
                        <CCol xs={6}>
                            <InputSelect
                                placeholder="Reason"
                                valueState={coverDataObj.explainAnyWorkGaps || ''}
                                // data={coutrys.list}
                                name="explainAnyWorkGaps"
                                handleSaveSelect={handleUpdateFiled}
                                handleServerRequest={handleRequestReason}
                                isOutDataObj={false}
                                isIconArrow={true}
                            />
                        </CCol>
                    </CRow>
                </CForm>
            </div>
            <BtnsStatus textBtnCont="Continue" onHanlebtn={(value) => handleClickBtn(value)} />
        </div>
    )
}