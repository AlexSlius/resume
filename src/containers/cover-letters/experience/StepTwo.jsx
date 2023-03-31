import { CForm, CCol, CRow } from "@coreui/react";
import { useRef } from "react";
import { useSelector } from "react-redux";

import { DatePicker } from "../../../components/uis/datePicker";
import WheelPicker from 'react-simple-wheel-picker';

import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { BtnsStatus } from "../component/btnsStatus";
import { useEffect, useState } from "react";

// data
import monthData from './data/month.json';

export const StepTwo = ({
    handleUpdateField,
    handleClicQuery,
    StepsName,
    coverDataObj,
}) => {
    const handleClickBtn = async (value) => {
        await handleUpdateField({ name: "questionCurrentlyInCollegeUniversity", value, step: value == "Y" ? "nameCollege" : "professionalSkills" });
    }

    const monthBlock = useRef(null);
    const [years, setYears] = useState([]);
    const [dateValue, setdateValue] = useState();
    const [data, setData] = useState(monthData.data);

    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);

    const {
        resumers,
        theme: {
            currentResolution
        }
    } = useSelector(state => state);

    const dateSelect = (data, type) => {
        if (type === 'month') {
            setMonth(parseInt(data.id))
        } else {
            setYear(parseInt(data.value))
        }
    }

    useEffect(() => {
        const dateResult = new Date(year, month);

        handleUpdateField({ name: 'graduateDate', value: dateResult });
    }, [month, year]);


    useEffect(() => {
        const yearsArray = [];
        let currentYear = 2023;

        for (let index = 0; index < 50; index++) {
            currentYear = currentYear - 1;
            yearsArray.push({
                id: index.toString(),
                value: currentYear
            });
        }
        setYears(yearsArray);
    }, []);

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
                                                        <div className="date-picker-block" id="month_picker_block">
                                                            <WheelPicker
                                                                data={data}
                                                                onChange={value => dateSelect(value, 'month')}
                                                                height={320}
                                                                width={104}
                                                                titleText="month"
                                                                itemHeight={50}
                                                                selectedID={data[3].id}
                                                                color="#C4C7D0"
                                                                activeColor="#01153A"
                                                                backgroundColor="transparent"
                                                                ref={monthBlock}
                                                            />
                                                        </div>
                                                        {
                                                            years.length ? (
                                                                <div className="date-picker-block" id="year_picker_block">
                                                                    <WheelPicker
                                                                        data={years}
                                                                        onChange={value => dateSelect(value, 'year')}
                                                                        height={320}
                                                                        width={104}
                                                                        titleText="year"
                                                                        itemHeight={50}
                                                                        selectedID={years[3].id}
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
                                                        selected={coverDataObj.graduateDate}
                                                        onChange={(date) => handleUpdateField({ name: "graduateDate", value: date })}
                                                        placeholderText="Date"
                                                        name="graduateDate"
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