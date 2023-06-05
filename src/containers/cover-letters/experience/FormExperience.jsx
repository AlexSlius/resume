import Router, { useRouter } from "next/router";
import React, { useEffect } from "react";

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

import { updateItemField } from "../../../slices/cover/coverDataForm";
import { routersPages } from "../../../constants/next-routers";
import { ROUTES_COVER } from "../../../constants/routes";
import { updateCoverLetterById } from "../../../controllers/cover/personalize";
import { StepsName } from "../../../constants/cover";


const FormExperience = ({
    dispatch,
    storeDate,
    idCv,
}) => {
    const router = useRouter();
    const refIdTimeout = React.useRef(undefined);
    const isNew = (idCv == "new");

    const {
        coverDataForm: {
            coverDataObj,
            status
        },
        dependencies: {
            coutrys,
            cities,
            fieldOfStudy,
            jopsTitle,
            companys,
            skills,
            university,
            describes
        },
        auth: {
            autorizate: {
                isAthorized
            }
        },
    } = storeDate;

    const { step, shareKey } = router.query;

    const handleUpdateField = async ({ name, value, step = null }) => {
        await dispatch(updateItemField({ name, value }));

        if (!isNew && !step) {
            await handleUpdateServer();
        }

        if (!!step) {
            await dispatch((updateCoverLetterById({ idCv })));
            await handleClicQuery(StepsName[step]);
        }
    }

    const handleClicQuery = async (queryStep) => {
        await Router.push({
            pathname: `/${routersPages['coverLetter']}/${idCv}/${ROUTES_COVER['experience']}`,
            query: { step: queryStep, ...((shareKey?.length > 0) ? { shareKey: shareKey } : {}) },
        });
    }

    const handleUpdateServer = async (index) => {
        if (refIdTimeout.current) {
            clearTimeout(refIdTimeout.current);
        }

        refIdTimeout.current = setTimeout(async () => {
            await dispatch((updateCoverLetterById({ idCv })));
            clearTimeout(refIdTimeout.current);
        }, 300);
    }

    return (
        <div>
            {
                (step == undefined || step == "undefined") && (
                    <StepOne
                        handleUpdateField={handleUpdateField}
                        handleClicQuery={handleClicQuery}
                        StepsName={StepsName}
                        coverDataObj={coverDataObj}
                    />
                )
            }

            {
                (step === StepsName["graduated"]) && (
                    <StepTwo
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        coverDataObj={coverDataObj}
                    />
                )
            }

            {
                (step === StepsName["nameCollege"]) && (
                    <StepThree
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        coverDataObj={coverDataObj}
                        university={university}
                        dispatch={dispatch}
                    />
                )
            }

            {
                (step === StepsName["pointAverage"]) && (
                    <StepFour
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        coverDataObj={coverDataObj}
                        university={university}
                        dispatch={dispatch}
                    />
                )
            }

            {
                (step === StepsName["studyOrDegree"]) && (
                    <StepFive
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        coverDataObj={coverDataObj}
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
                        coverDataObj={coverDataObj}
                        jopsTitleList={jopsTitle.list}
                        dispatch={dispatch}
                        skills={skills}
                    />
                )
            }

            {
                (step === StepsName["skillSet"]) && (
                    <StepSeven
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        coverDataObj={coverDataObj}
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
                        coverDataObj={coverDataObj}
                        dispatch={dispatch}
                        describes={describes}
                    />
                )
            }

            {
                (step === StepsName["othersDescribe"]) && (
                    <StepNine
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        coverDataObj={coverDataObj}
                        dispatch={dispatch}
                        describes={describes}
                    />
                )
            }

            {
                (step === StepsName["workExperinence"]) && (
                    <StepTen
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        coverDataObj={coverDataObj}
                    />
                )
            }

            {
                (step === StepsName["previousJob"]) && (
                    <StepEleven
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        coverDataObj={coverDataObj}
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
                        coverDataObj={coverDataObj}
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
                        coverDataObj={coverDataObj}
                    />
                )
            }

            {
                (step === StepsName["graduatedTwo"]) && (
                    <StepFourteen
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        coverDataObj={coverDataObj}
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
                        coverDataObj={coverDataObj}
                    />
                )
            }

            {
                (step === StepsName["graduatedFinish"]) && (
                    <StepSixteen
                        handleClicQuery={handleClicQuery}
                        handleUpdateField={handleUpdateField}
                        StepsName={StepsName}
                        coverDataObj={coverDataObj}
                        dispatch={dispatch}
                        jopsTitleList={jopsTitle.list}
                        companysList={companys.list}
                        idCv={idCv}
                    />
                )
            }
        </div>
    )
}

export default FormExperience;