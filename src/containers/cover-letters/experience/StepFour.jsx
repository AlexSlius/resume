import { CForm, CCol, CRow } from "@coreui/react"

import { StepContent } from "../../../components/stepContent";
import { InputSelect } from "../../../components/uis/inputSelect";
import { BtnContinue } from "../component/btnContinue";
import Input from "../../../components/uis/input";

import { getUniversityByName } from "../../../controllers/dependencies";

var rx = /^\d+(?:[\.,]\d+)?$/;

export const StepFour = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    coverDataObj,
    university,
    dispatch,
}) => {
    const handleClickBtn = async () => {
        await handleClicQuery(StepsName["studyOrDegree"]);
    }

    const handleRequest = (value) => {
        dispatch(getUniversityByName(value));
    }

    return (
        <div className="step-wr">
            {
                (coverDataObj.questionCurrentlyInCollegeUniversity == "N") && (
                    <div>
                        <StepContent
                            icon="/images/cover/icon-cover-3.svg"
                            title="What's your grade point average?"
                            label="Only write your GPA if it's above 3.0."
                        />
                        <div className="wr-form-cover">
                            <CForm className="wr-gab-30">
                                <CRow className="mobile-rows">
                                    <CCol xs={6}>
                                        <Input
                                            type="number"
                                            label="Point Average"
                                            value={coverDataObj.pointAverage}
                                            valid={+coverDataObj.pointAverage > 3}
                                            onChange={(e) => handleUpdateField({ name: "pointAverage", value: e.target.value })}
                                        />
                                    </CCol>
                                </CRow>
                            </CForm>
                        </div>
                        <BtnContinue isButton={true} onHanleBtn={handleClickBtn} />
                    </div>
                )
            }

            {
                (coverDataObj.questionCurrentlyInCollegeUniversity == "Y") && (
                    <div>
                        <StepContent
                            icon="/images/cover/icon-cover-1.svg"
                            title="What's the name of your college or university?"
                        />
                        <div className="wr-form-cover">
                            <CForm className="wr-gab-30">
                                <CRow>
                                    <CCol xs={6}>
                                        <InputSelect
                                            label="Name university"
                                            valueState={coverDataObj.nameCollegeOrUniversity || ''}
                                            data={university.list}
                                            handleSaveSelect={(obj, data) => handleUpdateField({ ...obj, name: "nameCollegeOrUniversity" }, data)}
                                            handleServerRequest={handleRequest}
                                            isOutDataObj={false}
                                            isValidIn={true}
                                            validIn={coverDataObj.nameCollegeOrUniversity?.length > 4}
                                        />
                                    </CCol>
                                </CRow>
                            </CForm>
                        </div>
                        <BtnContinue isButton={true} onHanleBtn={handleClickBtn} />
                    </div>
                )
            }
        </div>
    )
}