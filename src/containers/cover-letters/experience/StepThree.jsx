import { CForm, CCol, CRow } from "@coreui/react"
import { useSelector } from "react-redux";
import moment from "moment";
import WheelPicker from 'react-simple-wheel-picker';

import { StepContent } from "../../../components/stepContent";
import { InputSelect } from "../../../components/uis/inputSelect";
import { BtnContinue } from "../component/btnContinue";
import { DatePicker } from "../../../components/uis/datePicker"
import { getUniversityByName } from "../../../controllers/dependencies";

import yearsMob from "./data/years.json";

export const StepThree = ({
    handleUpdateField,
    handleClicQuery,
    StepsName,
    coverDataObj,
    university,
    dispatch,
}) => {
    const {
        theme: {
            currentResolution
        }
    } = useSelector(state => state);
    const selectYear = moment(new Date(coverDataObj.expectedYearOfGraduation)).format("YYYY");
    const activeIdYearn = yearsMob.find(el => (el.value == selectYear))?.id;

    const handleClickBtn = async () => {
        await handleClicQuery(StepsName["pointAverage"]);
    }

    const handleRequest = (value) => {
        dispatch(getUniversityByName(value));
    }

    const dateSelect = (data) => {
        handleUpdateField({ name: "expectedYearOfGraduation", value: `02, 02, ${data.value}` });
    }

    return (
        <div className="step-wr">
            {
                (coverDataObj.questionCurrentlyInCollegeUniversity == "N") && (
                    <div>
                        <StepContent
                            icon="/images/cover/icon-cover-1.svg"
                            title="What's the name of your college or university?"
                        />
                        <div className="wr-form-cover">
                            <CForm className="wr-gab-30">
                                <CRow className="mobile-rows">
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

            {
                (coverDataObj.questionCurrentlyInCollegeUniversity == "Y") && (
                    <div>
                        <StepContent
                            icon="/images/cover/icon-cover-2.svg"
                            title="What is your expected year of graduation?"
                            label="If applicable/optional"
                        />
                        <div className="wr-form-cover">
                            <CForm className="wr-gab-30">
                                <CRow>
                                    <CCol xs={12} md={6}>
                                        {
                                            ['sm', 'xs'].includes(currentResolution) ? (
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
                                            ) : (
                                                <DatePicker
                                                    formatInput="YYYY"
                                                    formatData="Y"
                                                    onlyAYear={true}
                                                    floatingLabel="Date"
                                                    selected={coverDataObj.expectedYearOfGraduation}
                                                    onChange={(date) => handleUpdateField({ name: 'expectedYearOfGraduation', value: date })}
                                                    name="expectedYearOfGraduation"
                                                />
                                            )
                                        }
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