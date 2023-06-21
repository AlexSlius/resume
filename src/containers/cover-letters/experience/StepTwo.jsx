import { CForm, CCol, CRow } from "@coreui/react";
import { useSelector } from "react-redux";
import WheelPicker from 'react-simple-wheel-picker';

import { DatePicker } from "../../../components/uis/datePicker";

import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { BtnsStatus } from "../component/btnsStatus";
import moment from "moment";

import yearsMob from "./data/years.json";

export const StepTwo = ({
    handleUpdateField,
    handleClicQuery,
    StepsName,
    coverDataObj,
}) => {
    const selectYear = moment(new Date(coverDataObj.graduateDate)).format("YYYY");

    const handleClickBtn = async (value) => {
        await handleUpdateField({ name: "questionCurrentlyInCollegeUniversity", value, step: value == "Y" ? "nameCollege" : "professionalSkills" });
    }

    const {
        theme: {
            currentResolution
        }
    } = useSelector(state => state);

    const dateSelect = (data) => {
        handleUpdateField({ name: "graduateDate", value: `02, 02, ${data.value}` });
    }

    const activeIdYearn = yearsMob.find(el => (el.value == selectYear))?.id;

    return (
        <div className="step-wr">
            {
                (coverDataObj.questionGraduateFromCollege == "Y") && (
                    <div>
                        <StepContent
                            icon="/images/cover/icon-cover-2.svg"
                            title="What year did you graduate in?"
                        />
                        <div className="wr-form-cover">
                            <CForm className="wr-gab-30">
                                <CRow>
                                    <CCol xs={12} md={6}>
                                        {
                                            ['sm', 'xs'].includes(currentResolution) ?
                                                (
                                                    <div className="date-pickers-wrapper">
                                                        {
                                                            yearsMob.length ? (
                                                                <div className="date-picker-block" id="year_picker_block">
                                                                    <WheelPicker
                                                                        data={yearsMob}
                                                                        onChange={value => dateSelect(value, 'year')}
                                                                        height={320}
                                                                        width={104}
                                                                        titleText="year"
                                                                        itemHeight={50}
                                                                        selectedID={activeIdYearn || yearsMob[22]?.id || 0}
                                                                        color="#C4C7D0"
                                                                        activeColor="#01153A"
                                                                        backgroundColor="transparent"
                                                                    />
                                                                </div>
                                                            ) : null
                                                        }
                                                    </div>
                                                ) :
                                                (
                                                    <DatePicker
                                                        formatInput="YYYY"
                                                        formatData="Y"
                                                        floatingLabel="Date"
                                                        onlyAYear={true}
                                                        selected={coverDataObj.graduateDate}
                                                        onChange={(date) => handleUpdateField({ name: "graduateDate", value: date })}
                                                    />
                                                )
                                        }
                                    </CCol>
                                </CRow>
                            </CForm>
                        </div>
                        <BtnContinue
                            isButton={true}
                            onHanleBtn={() => { handleClicQuery(StepsName["nameCollege"]); }}
                        />
                    </div>
                )
            }

            {
                (coverDataObj.questionGraduateFromCollege == "N") && (
                    <div>
                        <StepContent
                            icon="/images/cover/icon-cover-1.svg"
                            title="Are you currently in college/university? "
                        />
                        <BtnsStatus onHanlebtn={(value) => handleClickBtn(value)} />
                    </div>
                )
            }
        </div>
    )
}