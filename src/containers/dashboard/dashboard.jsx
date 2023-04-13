import Router, { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isArray } from "lodash";

import { Tabs } from "../../components/tabs/Tabs";
import { TitlePage } from "../../components/titlePage";
import { CardResume } from "../../components/cardResume";
import { LoadBlock } from "../../components/loadBlock";
import { Header } from "../../components/header";

import { tabsDashboardPage } from "../../constants/dashboardsTabs";
import { routersPages } from "../../constants/next-routers";
import { ROUTES, ROUTES_COVER } from "../../constants/routes";

import {
    fetchGetResumesList,
    fetchPostUpdateResumes
} from "../../controllers/resumes";

import {
    fetchGetCoversList,
    fetchPostUpdateCover
} from "../../controllers/cover/covers";

import {
    cleanSliseNew
} from "../../slices/contact";
import { cleanResumeSlices } from "../../slices/cleanAllResumeSlices";

import { isLoader } from "../../helpers/loadings"

import style from "./Style.module.scss";
import { CardNew } from "../../components/cardNew";

const Dashboard = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {
        resumers,
        covers,
        theme: {
            currentResolution
        }
    } = useSelector(state => state);
    let type = "resume";
    let idCv = router.query.idCv;

    switch (router.query.tab) {
        case tabsDashboardPage['resumes'].link:
            type = "resume";
            break;
        case tabsDashboardPage['cover_letters'].link:
            type = "cover";
            break;
    }

    const handleOnUpdateResume = async (data) => {
        await Router.push(`${routersPages['resumeBuilder']}/${data.id}/${ROUTES['']}`);
    }

    const handleOnUpdateCover = async (data) => {
        await Router.push(`${routersPages['coverLetter']}/${data.id}/${ROUTES_COVER['']}`);
    }

    const hangleAddNewResume = async () => {
        await cleanResumeSlices(dispatch);
        await Router.push(`${routersPages['resumeBuilderNew']}`);
    }

    const hangleAddNewCover = async () => {
        await Router.push(`${routersPages['coverLetterNew']}`);
    }

    const handlekeyUp = (e, stateName, id) => {
        if (e.keyCode == 13) {
            handleUpdateNameResume(stateName, id);
        }
    }

    const handleBlur = (stateName, id) => {
        handleUpdateNameResume(stateName, id);
    }

    const handlekeyUpCover = (e, stateName, id) => {
        if (e.keyCode == 13) {
            handleUpdateNameCover(stateName, id);
        }
    }

    const handleBlurCover = (stateName, id) => {
        handleUpdateNameCover(stateName, id);
    }

    const handleUpdateNameCover = (stateName, id) => {
        dispatch(fetchPostUpdateCover({ id, data: { cover_name: stateName } }));
    }

    const handleUpdateNameResume = (stateName, id) => {
        dispatch(fetchPostUpdateResumes({ id, data: { cv_name: stateName } }));
    }

    React.useEffect(() => {
        if (type == "resume") {
            dispatch(fetchGetResumesList());
        }

        if (type == "cover") {
            dispatch(fetchGetCoversList());
        }

    }, [router.query.tab]);

    React.useEffect(() => {
        dispatch(cleanSliseNew());
    }, []);

    return (
        <>
            {
                ['md', 'sm', 'xs'].includes(currentResolution) && (
                    <Header />
                )
            }
            <div className={style.wr_pa}>
                <div className={style.wr_title}>
                    <TitlePage titleText="Dashboard" />
                    {
                        (isLoader(covers?.status) || isLoader(resumers?.status)) && (
                            <LoadBlock isMin={true} />
                        )
                    }
                </div>
                <div className={`${style.wt_tabs}`}>
                    <div className={style.wr_tabs}>
                        <Tabs
                            obj={tabsDashboardPage}
                        />
                    </div>
                </div>

                <div className={`${style.wr_cards}`}>
                    <div className={`${style.row_card}`}>
                        {
                            type == "resume" && (
                                <>
                                    {
                                        ['md', 'sm', 'xs'].includes(currentResolution) && (
                                            <CardNew
                                                titleNwe="New Resume"
                                                text="Create a tailored resume for each job application. Double your chances of getting hired!"
                                                hangleAddNew={hangleAddNewResume}
                                                currentResolution={currentResolution}
                                            />
                                        )
                                    }
                                    {
                                        isArray(resumers.list) && resumers.list.map((item) => (
                                            <CardResume
                                                key={item.id}
                                                id={item.id}
                                                image="/images/other/img_resume.png"
                                                label={item.cvName}
                                                dateUpdate={item.updateDatetime}
                                                handleEdit={() => handleOnUpdateResume(item)}
                                                handlekeyUp={handlekeyUp}
                                                handleBlur={handleBlur}
                                            />
                                        ))
                                    }
                                    {
                                        !['md', 'sm', 'xs'].includes(currentResolution) && (
                                            <CardNew
                                                titleNwe="New Resume"
                                                text="Create a tailored resume for each job application. Double your chances of getting hired!"
                                                hangleAddNew={hangleAddNewResume}
                                                currentResolution={currentResolution}
                                            />
                                        )
                                    }
                                </>
                            )
                        }
                        {
                            type == "cover" && (
                                <>
                                    {
                                        ['md', 'sm', 'xs'].includes(currentResolution) && (
                                            <CardNew
                                                titleNwe="New Cover letters"
                                                text="Create a tailored cover letters for each job application. Double your chances of getting hired!"
                                                currentResolution={currentResolution}
                                                hangleAddNew={hangleAddNewCover}
                                            />
                                        )
                                    }
                                    {
                                        isArray(covers.list) && covers.list.map((item) => (
                                            <CardResume
                                                key={item.id}
                                                id={item.id}
                                                image="/images/cover/dash-cover.png"
                                                label={item.coverName}
                                                dateUpdate={item.updateDatetime}
                                                handleEdit={() => handleOnUpdateCover(item)}
                                                handlekeyUp={handlekeyUpCover}
                                                handleBlur={handleBlurCover}
                                            />
                                        ))
                                    }
                                    {
                                        !['md', 'sm', 'xs'].includes(currentResolution) && (
                                            <CardNew
                                                titleNwe="New Cover letters"
                                                text="Create a tailored cover letters for each job application. Double your chances of getting hired!"
                                                currentResolution={currentResolution}
                                                hangleAddNew={hangleAddNewCover}
                                            />
                                        )
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;