import Router, { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isArray } from "lodash";

import { Tabs } from "../../components/tabs/Tabs";
import { TitlePage } from "../../components/titlePage";
import { CardResume } from "../../components/cardResume";
import { LoadBlock } from "../../components/loadBlock";

import { tabsDashboardPage } from "../../constants/dashboardsTabs";
import { routersPages } from "../../constants/next-routers";

import { fetchGetResumesList } from "../../controllers/resumes";
import { cleanResumeSlices } from "../../slices/cleanAllResumeSlices";

import { localStorageSet, localStorageRemove } from "../../helpers/localStorage";
import { isLoader } from "../../helpers/loadings"

import style from "./Style.module.scss";
import { CardNew } from "../../components/cardNew";


const Dashboard = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {
        resumers
    } = useSelector(state => state);
    let type = "resume";

    switch (router.query.tab) {
        case tabsDashboardPage['resumes'].link:
            type = "resume";
            break;
        case tabsDashboardPage['cover_letters'].link:
            type = "cover";
            break;
    }

    const handleOnUpdateResume = async (data) => {
        await localStorageSet('idCv', data.id);
        await Router.push(routersPages['resumeBuilder']);
    }

    const hangleAddNewResume = async () => {
        await localStorageRemove('idCv');
        await cleanResumeSlices(dispatch);
        await Router.push(`${routersPages['resumeBuilder']}?new=resume`);
    }

    React.useEffect(() => {
        if (type == "resume") {
            dispatch(fetchGetResumesList());
        }

    }, [router.query.tab])

    return (
        <div>
            <TitlePage titleText="Dashboard" />
            <div className={`${style.wt_tabs}`}>
                <Tabs
                    obj={tabsDashboardPage}
                />
            </div>
            <div className={`${style.wr_cards}`}>
                {
                    isLoader(resumers?.status) ? (
                        <LoadBlock />
                    ) : (
                        <div className={`${style.row_card}`}>
                            {
                                type == "resume" && (
                                    <>
                                        {
                                            isArray(resumers.list) && resumers.list.map((item) => (
                                                <CardResume
                                                    key={item.id}
                                                    label={item.cvName}
                                                    dateUpdate={item.updateDatetime}
                                                    handleEdit={() => handleOnUpdateResume(item)}
                                                />
                                            ))
                                        }
                                        <CardNew
                                            titleNwe="New Resume"
                                            text="Create a tailored resume for each job application. Double your chances of getting hired!"
                                            hangleAddNew={hangleAddNewResume}
                                        />
                                    </>
                                )
                            }

                            {
                                type == "cover" && (
                                    <>
                                        <CardNew
                                            titleNwe="New Cover letters"
                                            text="Create a tailored cover letters for each job application. Double your chances of getting hired!"
                                        />
                                    </>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Dashboard;