import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';

import FormExperience from "./FormExperience";
import HeadMainContent from "../../../components/headMainContent/HeadMainContent";
import { Progress } from "../../../components/progress";

import { helperProgress } from "../../../helpers/helperProgress";

import employmentIcon from '/public/images/icons/employment.svg?sprite';

let fieldsName = [
    "questionGraduateFromCollege",
    "graduate_date",
    "questionCurrentlyInCollegeUniversity",
    "expectedYearOfGraduation",
    "nameCollegeOrUniversity",
    "pointAverage",
    "fieldOfStudyOrDegree",
    "professionalSkills",
    "skillSet",
    "wordDescribes",
    "othersDescribe",
    "questionHaveWorkExperience",
    "industryHoldExperienceJobTitle",
    "industryHoldExperienceCompanyName",
    "workExperience",
    "workExperienceYears",
    "questionCurrentlyWorking",
    "currentRoleJobTitle",
    "currentRoleCompanyName",
    "recentRoleJobTitle",
    "recentRoleCompanyName",
    "explainAnyWorkGaps",
    "applyingCompanyName",
    "applyingCompanyJobTitle",
    "applyingCompanyTitle",
    "applyingCompanyContact",
];

const Contact = () => {
    const dispatch = useDispatch();
    const states = useSelector((state) => state);
    const router = useRouter();
    const idCv = router.query.idCv;

    const {
        coverExperince: {
            experienceObj,
        }
    } = states;

    return (
        <>
            <HeadMainContent
                isRows={false}
            />
            <Progress
                label="Information completed"
                interest={helperProgress({ objForms: experienceObj, arrField: fieldsName })}
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