import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import { useEffect } from "react";

// forms
import Contact from "./contact/Contact";
import Employment from "./employment/Employment";
import Education from "./education/Education";
import Skills from "./skills/Skills";
import Languages from "./languages/Languages";
import CareerObjective from "./сareerObjective/CareerObjective";
import Socials from "./socials/Socials";
import Hobbies from "./hobbies/Hobies";
import Activity from "./activities/Activity";
import Referense from "./references/Reference";
import Courses from "./course/Course";
import Certificaties from "./certificaties/Certificaties";
import Intership from "./intership/InterShip";
import AddSections from "./addSection";

import { fetchGetCountrys } from "../../controllers/dependencies"
import { handleCVUpdateDrawingTrue } from "../../slices/resumeData";

import { ROUTES } from "../../constants/routes";

const ResumeBuildter = () => {
    const dispatch = useDispatch();
    const {
        auth: {
            autorizate: {
                isAthorized
            }
        }
    } = useSelector(state => state);
    const states = useSelector((state) => state);
    const router = useRouter();
    const idCv = router.query?.idCv;
    const tab = router.query?.tab;

    useEffect(() => {
        dispatch(fetchGetCountrys());

        return () => {
            dispatch(handleCVUpdateDrawingTrue());
        }
    }, []);

    return (
        <>
            {
                (tab == ROUTES['contact']) && (
                    <Contact
                        idCv={idCv}
                        states={states}
                        dispatch={dispatch}
                    />
                )
            }
            {
                (isAthorized && idCv != "new") && (
                    <>
                        {
                            (tab == ROUTES['employment']) && (
                                <Employment
                                    idCv={idCv}
                                    states={states}
                                    dispatch={dispatch}
                                />
                            )
                        }
                        {
                            (tab == ROUTES['education']) && (
                                <Education
                                    idCv={idCv}
                                    states={states}
                                    dispatch={dispatch}
                                />
                            )
                        }
                        {
                            (tab == ROUTES['skills']) && (
                                <Skills
                                    idCv={idCv}
                                    states={states}
                                    dispatch={dispatch}
                                />
                            )
                        }
                        {
                            (tab == ROUTES['socials']) && (
                                <Socials
                                    idCv={idCv}
                                    states={states}
                                    dispatch={dispatch}
                                />
                            )
                        }
                        {
                            (tab == ROUTES['languages']) && (
                                <Languages
                                    idCv={idCv}
                                    states={states}
                                    dispatch={dispatch}
                                />
                            )
                        }
                        {
                            (tab == ROUTES['сareerObjective']) && (
                                <CareerObjective
                                    idCv={idCv}
                                    states={states}
                                    dispatch={dispatch}
                                />
                            )
                        }
                        {
                            (tab == ROUTES['hobies']) && (
                                <Hobbies
                                    idCv={idCv}
                                    states={states}
                                    dispatch={dispatch}
                                />
                            )
                        }
                        {
                            (tab == ROUTES['activity']) && (
                                <Activity
                                    idCv={idCv}
                                    states={states}
                                    dispatch={dispatch}
                                />
                            )
                        }
                        {
                            (tab == ROUTES['reference']) && (
                                <Referense
                                    idCv={idCv}
                                    states={states}
                                    dispatch={dispatch}
                                />
                            )
                        }
                        {
                            (tab == ROUTES['course']) && (
                                <Courses
                                    idCv={idCv}
                                    states={states}
                                    dispatch={dispatch}
                                />
                            )
                        }
                        {
                            (tab == ROUTES['certificaties']) && (
                                <Certificaties
                                    idCv={idCv}
                                    states={states}
                                    dispatch={dispatch}
                                />
                            )
                        }
                        {
                            (tab == ROUTES['intership']) && (
                                <Intership
                                    idCv={idCv}
                                    states={states}
                                    dispatch={dispatch}
                                />
                            )
                        }
                        {
                            (tab == ROUTES['addSection']) && (
                                <AddSections
                                    idCv={idCv}
                                    states={states}
                                    dispatch={dispatch}
                                />
                            )
                        }
                    </>
                )
            }
        </>
    )
}

export default ResumeBuildter;