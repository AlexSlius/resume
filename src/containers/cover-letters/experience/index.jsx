import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';

import FormExperience from "./FormExperience";
import HeadMainContent from "../../../components/headMainContent/HeadMainContent";
import { Progress } from "../../../components/progress";

import { postUpdateCategoryViewedStatusCover } from "../../../controllers/addSections";

import employmentIcon from '/public/images/icons/employment.svg?sprite';
import { backRoter } from "../../../helpers/experienceRouterBack";

import { StepsName } from "../../../constants/cover";

const arrStep = {
    undefined: {
        id: 0,
        value: 1,
    },
    [StepsName["graduated"]]: {
        id: 1,
        value: 2,
    },
    [StepsName["nameCollege"]]: {
        id: 2,
        value: 3,
    },
    [StepsName["pointAverage"]]: {
        id: 3,
        value: 4,
    },
    [StepsName["studyOrDegree"]]: {
        id: 4,
        value: 5,
    },
    [StepsName["professionalSkills"]]: {
        id: 5,
        value: 6,
    },
    [StepsName["skillSet"]]: {
        id: 6,
        value: 7,
    },
    [StepsName["describes"]]: {
        id: 7,
        value: 8,
    },
    [StepsName["othersDescribe"]]: {
        id: 8,
        value: 9,
    },
    [StepsName["workExperinence"]]: {
        id: 9,
        value: 10,
    },
    [StepsName["previousJob"]]: {
        id: 10,
        value: 11,
    },
    [StepsName["howMachWork"]]: {
        id: 11,
        value: 12,
    },
    [StepsName["graduatedStep"]]: {
        id: 12,
        value: 13,
    },
    [StepsName["graduatedTwo"]]: {
        id: 13,
        value: 14,
    },
    [StepsName["workGaps"]]: {
        id: 14,
        value: 15,
    },
    [StepsName["graduatedFinish"]]: {
        id: 15,
        value: 16,
    },
};

const Contact = () => {
    const dispatch = useDispatch();
    const states = useSelector((state) => state);
    const router = useRouter();
    const { step, idCv } = router.query;
    let routerStetBack = backRoter(StepsName, step, idCv);

    React.useEffect(() => {
        dispatch(postUpdateCategoryViewedStatusCover({ idCv, category: 'experience' }));
    }, []);

    return (
        <>
            <HeadMainContent
                isRows={false}
                link={routerStetBack}
            />
            <Progress
                label="Information completed"
                interest={arrStep[step].value * 6.25}
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