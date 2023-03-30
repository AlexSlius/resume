import Router, { useRouter } from "next/router";

import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { StepFour } from "./StepFour";
import { StepFive } from "./StepFive";
import { StepSix } from "./StepSix";
import { StepSeven } from "./StepSeven";
import { StepEight } from "./StepEight";
import { StepNine } from "./StepNine";
import { StepTen } from "./StepTen";
import { StepEleven } from "./StepEleven";
import { StepTwelve } from "./StepTwelve";
import { StepThirteen } from "./StepThirteen";
import { StepFourteen } from "./StepFourteen";
import { StepFifteen } from "./StepFifteen";
import { StepSixteen } from "./StepSixteen";

import { updateItemField } from "../../../slices/cover/coverExperience";
import { routersPages } from "../../../constants/next-routers";
import { ROUTES_COVER } from "../../../constants/routes";
import { StepsName } from "../../../constants/cover";

const FormExperience = ({
    dispatch,
    storeDate,
    idCv,
}) => {
    const router = useRouter();

    const {
        coverPerson: {
            personObj,
            status,
        },
        coverExperince: {
            experienceObj,
        },
        dependencies: {
            coutrys,
            cities,
            fieldOfStudy,
            jopsTitle,
            companys,
        },
        auth: {
            autorizate: {
                isAthorized
            }
        },
    } = storeDate;

    const { step } = router.query;

    const handleUpdateField = ({ name, value }) => {
        dispatch(updateItemField({ name, value }));
    }

    const handleClicQuery = (queryStep) => {
        Router.push({
            pathname: `/${routersPages['coverLetter']}/${idCv}/${ROUTES_COVER['experience']}`,
            query: { step: queryStep },
        });
    }

    return (
        <div>
            {/* {
                (step === undefined) && (
                    <StepOne
                        handleUpdateField={handleUpdateField}
                        handleClicQuery={handleClicQuery}
                        StepsName={StepsName}
                        experienceObj={experienceObj}
                    />
                )
            } */}

            {/* {
                (step === StepsName["graduated"]) && ( */}
                    <StepTwo
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        experienceObj={experienceObj}
                    />
                {/* )
            } */}

            {
                (step === StepsName["nameCollege"]) && (
                    <StepThree
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        experienceObj={experienceObj}
                    />
                )
            }

            {
                (step === StepsName["pointAverage"]) && (
                    <StepFour
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        experienceObj={experienceObj}
                    />
                )
            }

            {
                (step === StepsName["studyOrDegree"]) && (
                    <StepFive
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        experienceObj={experienceObj}
                        dispatch={dispatch}
                        fieldOfStudy={fieldOfStudy}
                    />
                )
            }

            {
                (step === StepsName["professionalSkills"]) && (
                    <StepSix
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        experienceObj={experienceObj}
                        dispatch={dispatch}
                    />
                )
            }

            {
                (step === StepsName["skillSet"]) && (
                    <StepSeven
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        experienceObj={experienceObj}
                        dispatch={dispatch}
                    />
                )
            }

            {
                (step === StepsName["describes"]) && (
                    <StepEight
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        experienceObj={experienceObj}
                        dispatch={dispatch}
                    />
                )
            }

            {
                (step === StepsName["othersDescribe"]) && (
                    <StepNine
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        experienceObj={experienceObj}
                        dispatch={dispatch}
                    />
                )
            }

            {
                (step === StepsName["workExperinence"]) && (
                    <StepTen
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        experienceObj={experienceObj}
                    />
                )
            }

            {
                (step === StepsName["previousJob"]) && (
                    <StepEleven
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        experienceObj={experienceObj}
                        dispatch={dispatch}
                        jopsTitleList={jopsTitle.list}
                        companysList={companys.list}
                    />
                )
            }

            {
                (step === StepsName["howMachWork"]) && (
                    <StepTwelve
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        experienceObj={experienceObj}
                        dispatch={dispatch}
                    />
                )
            }

            {
                (step === StepsName["graduatedStep"]) && (
                    <StepThirteen
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        experienceObj={experienceObj}
                    />
                )
            }

            {
                (step === StepsName["graduatedTwo"]) && (
                    <StepFourteen
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        experienceObj={experienceObj}
                        dispatch={dispatch}
                        jopsTitleList={jopsTitle.list}
                        companysList={companys.list}
                    />
                )
            }

            {
                (step === StepsName["workGaps"]) && (
                    <StepFifteen
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        experienceObj={experienceObj}
                    />
                )
            }

            {
                (step === StepsName["graduatedFinish"]) && (
                    <StepSixteen
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        experienceObj={experienceObj}
                        dispatch={dispatch}
                        jopsTitleList={jopsTitle.list}
                        companysList={companys.list}
                    />
                )
            }
        </div>
    )
}

export default FormExperience;