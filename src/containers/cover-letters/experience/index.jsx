import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';

import FormExperience from "./FormExperience";
import HeadMainContent from "../../../components/headMainContent/HeadMainContent";
import { Progress } from "../../../components/progress";

import { helperProgress } from "../../../helpers/helperProgress";
import { getCoverLetterById } from "../../../controllers/cover/personalize";

import employmentIcon from '/public/images/icons/employment.svg?sprite';

const constFiled = [
    "questionGraduateFromCollege",
    "professionalSkills",
    "skillSet",
    "wordDescribes",
    "othersDescribe",
    "questionHaveWorkExperience",
    "applyingCompanyName",
    "applyingCompanyJobTitle",
    "applyingCompanyTitle",
    "applyingCompanyContact"
];

const stepsField = (experienceObj) => {
    let ar = [...constFiled];

    if (experienceObj.questionGraduateFromCollege == "yes") {
        ar = [...ar, ...["graduateDate", "nameCollegeOrUniversity", "pointAverage", "fieldOfStudyOrDegree"]];
    } else if (experienceObj.questionGraduateFromCollege == "no") {
        ar = [...ar, ...["questionCurrentlyInCollegeUniversity"]];

        if (experienceObj.questionCurrentlyInCollegeUniversity == "yes") {
            ar = [...ar, ...["expectedYearOfGraduation", "nameCollegeOrUniversity", "fieldOfStudyOrDegree"]];
        } else if (experienceObj.questionCurrentlyInCollegeUniversity == "no") {
            // ar = [...ar, ...["expectedYearOfGraduation"]];
        }
    }

    if (experienceObj.questionHaveWorkExperience == "yes") {
        ar = [...ar, ...["industryHoldExperienceJobTitle", "industryHoldExperienceCompanyName", "workExperience", "workExperienceYears", "questionCurrentlyWorking"]];
    } else if (experienceObj.questionHaveWorkExperience == "no") {
        // ar = [...ar, ...["expectedYearOfGraduation"]];
    }

    if (experienceObj.questionCurrentlyWorking == "yes") {
        ar = [...ar, ...["currentRoleCompanyName", "currentRoleJobTitle", "explainAnyWorkGaps"]];
    } else if (experienceObj.questionCurrentlyWorking == "no") {
        ar = [...ar, ...["recentRoleCompanyName", "recentRoleJobTitle", "explainAnyWorkGaps"]];
    }

    return ar;
}

const Contact = () => {
    const dispatch = useDispatch();
    // const [statFields, setFields] = React.useState(constFiled);
    const states = useSelector((state) => state);
    const router = useRouter();
    const idCv = router.query.idCv;

    const {
        coverExperince: {
            experienceObj,
        }
    } = states;

    React.useEffect(() => {
        if (idCv != "new") {
            dispatch(getCoverLetterById(idCv));
        }
    }, []);

    return (
        <>
            <HeadMainContent
                isRows={false}
            />
            <Progress
                label="Information completed"
                interest={helperProgress({ objForms: experienceObj, arrField: stepsField(experienceObj) })}
                icon={employmentIcon}
            />
            <FormExperience
                dispatch={dispatch}
                storeDate={states}
                idCv={idCv}
            />
        </>
    )
}

export default Contact;