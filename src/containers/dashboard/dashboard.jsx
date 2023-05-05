import Router, { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isArray } from "lodash";

import { Tabs } from "../../components/tabs/Tabs";
import { TitlePage } from "../../components/titlePage";
import { CardResume } from "../../components/cardResume";
import { LoadBlock } from "../../components/loadBlock";
import { Header } from "../../components/header";
import { CardNew } from "../../components/cardNew";

import { tabsDashboardPage } from "../../constants/dashboardsTabs";
import { routersPages } from "../../constants/next-routers";
import { ROUTES, ROUTES_COVER } from "../../constants/routes";
import config from "../../config/config.json";

import { isLoader } from "../../helpers/loadings"
import { copyToClipboard } from "../../helpers/bufer";

import {
    fetchGetResumesList,
    fetchPostUpdateResumes,
    postShareResume
} from "../../controllers/resumes";

import {
    fetchGetCoversList,
    fetchPostUpdateCover,
    postShareCover
} from "../../controllers/cover/covers";
import { contactAddNew } from "../../controllers/contacts";
import { coverAddNew } from "../../controllers/cover/personalize";

import {
    cleanSliseNew
} from "../../slices/contact";
import { addItemNotification } from "../../slices/notifications";
import { cleanResumeSlices } from "../../slices/cleanAllResumeSlices";

import style from "./Style.module.scss";


const Dashboard = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loadNewCard, setLoadNewCard] = useState();

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

    // new add resume
    const hangleAddNewResume = async () => {
        // await cleanResumeSlices(dispatch);
        // await Router.push(`${routersPages['resumeBuilderNew']}`);
        await setLoadNewCard(true);
        let res = await dispatch(contactAddNew({ isNewResume: true, isDashboard: true }));
        await setLoadNewCard(false);
    }

    const hangleAddNewCover = async () => {
        // await Router.push(`${routersPages['coverLetterNew']}`);
        await setLoadNewCard(true);
        let res = await dispatch(coverAddNew({ isDashboard: true }));
        await setLoadNewCard(false);
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

    const handleShareResume = async (id) => {
        let res = await dispatch(postShareResume({ id }));

        if (res?.payload?.status == 'shared') {
            copyToClipboard(`${config.DOMAIN}/${routersPages['shareResume']}/${id}?key=${res.payload.key}`, async () => {
                await dispatch(addItemNotification({ text: "link copied" }));
            });
        }
    }

    const handleShareCover = async (id) => {
        let res = await dispatch(postShareCover({ id }));

        if (res?.payload?.status == 'shared') {
            copyToClipboard(`${config.DOMAIN}/${routersPages['shareCover']}/${id}?key=${res.payload.key}`, async () => {
                await dispatch(addItemNotification({ text: "link copied" }));
            });
        }
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
                                                handleShare={() => handleShareResume(item.id)}
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
                                                isLoad={loadNewCard}
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
                                                handleShare={() => handleShareCover(item.id)}
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
                                                isLoad={loadNewCard}
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