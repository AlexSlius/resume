import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';

import FormExperience from "./FormExperience";
import HeadMainContent from "../../../components/headMainContent/HeadMainContent";
import { Progress } from "../../../components/progress";

import { helperProgress } from "../../../helpers/helperProgress";
import { getCoverLetterById } from "../../../controllers/cover/personalize";
import { postUpdateCategoryViewedStatusCover } from "../../../controllers/addSections";

import employmentIcon from '/public/images/icons/employment.svg?sprite';

const constFiled = [
    // "questionGraduateFromCollege",
    "professionalSkills",
    "skillSet",
    "wordDescribes",
    "othersDescribe",
    // "questionHaveWorkExperience",
    "applyingCompanyName",
    "applyingCompanyJobTitle",
    "applyingCompanyTitle",
    "applyingCompanyContact"
];

const stepsField = (coverDataObj) => {
    let ar = [...constFiled];

    if (coverDataObj.questionGraduateFromCollege == "Y") {
        ar = [...ar, ...["graduateDate", "nameCollegeOrUniversity", "pointAverage", "fieldOfStudyOrDegree"]];
    } else if (coverDataObj.questionGraduateFromCollege == "N") {
        // ar = [...ar, ...["questionCurrentlyInCollegeUniversity"]];

        if (coverDataObj.questionCurrentlyInCollegeUniversity == "Y") {
            // "expectedYearOfGraduation",
            ar = [...ar, ...["nameCollegeOrUniversity", "fieldOfStudyOrDegree"]];
        } else if (coverDataObj.questionCurrentlyInCollegeUniversity == "N") {
            // ar = [...ar, ...["expectedYearOfGraduation"]];
        }
    }

    if (coverDataObj.questionHaveWorkExperience == "Y") {
        // "questionCurrentlyWorking"
        ar = [...ar, ...["industryHoldExperienceJobTitle", "industryHoldExperienceCompanyName", "workExperience", "workExperienceYears"]];
    } else if (coverDataObj.questionHaveWorkExperience == "N") {
        // ar = [...ar, ...["expectedYearOfGraduation"]];
    }

    if (coverDataObj.questionCurrentlyWorking == "Y") {
        ar = [...ar, ...["currentRoleCompanyName", "currentRoleJobTitle", "explainAnyWorkGaps"]];
    } else if (coverDataObj.questionCurrentlyWorking == "N") {
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
        coverDataForm: {
            coverDataObj,
        },
    } = states;

    React.useEffect(() => {
        dispatch(postUpdateCategoryViewedStatusCover({ idCv, category: 'experience' }));
    }, []);

    return (
        <>
            <HeadMainContent
                isRows={false}
            />
            <Progress
                label="Information completed"
                interest={helperProgress({ objForms: coverDataObj, arrField: stepsField(coverDataObj) })}
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