import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isArray } from "lodash";

import { Tabs } from "../../components/tabs/Tabs";
import { CardResume } from "../../components/cardResume";
import { Header } from "../../components/header";
import { CardNew } from "../../components/cardNew";
import { ModalDelete } from "../../components/modals/modalDelete";
import { TitleAndLoad } from "../../components/titleAndLoad";
import { NotificationPayment } from '../../components/notificationPayment';


import { isLoader } from "../../helpers/loadings"
import { copyToClipboard } from "../../helpers/bufer";
import { handleChanbdegAutOrPlan } from "../../utils/downShare";
import {
    deleteResume,
    fetchGetResumesList,
    fetchPostUpdateResumes,
    postShareResume,
    downloadPdf
} from "../../controllers/resumes";
import {
    deleteCover,
    fetchGetCoversList,
    fetchPostUpdateCover,
    postShareCover,
    downloadLetterPdf
} from "../../controllers/cover/covers";
import { contactAddNew } from "../../controllers/contacts";
import { coverAddNew } from "../../controllers/cover/personalize";

import { tabsDashboardPage } from "../../constants/dashboardsTabs";
import { routersPages } from "../../constants/next-routers";
import { ROUTES, QUERY_TAB_COVER } from "../../constants/routes";

import style from "./Style.module.scss";

import config from "../../config/config.json";

const obj = {
    isShow: false,
    status: null,
    title: "Payment success",
    discription: "After 5 failed attempts to enter incorrect payment password, access to the payment services, protected by the payment password, will be temporarily blocked."
};

const Dashboard = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loadNewCard, setLoadNewCard] = useState();
    const [loadCards, setLoadDards] = useState(true);
    const [deleteModal, setDeleteModal] = useState({ id: null, isResume: true });
    const [errorModal, setErrorModal] = useState(obj);

    const {
        resumers,
        covers,
        theme: {
            currentResolution
        },
        users: {
            isSubscribe
        }
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
        await Router.push(`${routersPages['resumeBuilder']}/${data.id}?tab=${ROUTES['contact']}&shareKey=${data.shareKey}`);
    }

    const handleOnUpdateCover = async (data) => {
        await Router.push(`${routersPages['coverLetter']}/${data.id}?tab=${QUERY_TAB_COVER['contact']}&shareKey=${data.shareKey}`);
    }

    // new add resume
    const hangleAddNewResume = async () => {
        await setLoadNewCard(true);
        let res = await dispatch(contactAddNew({ isNewResume: true, isDashboard: true }));
        await setLoadNewCard(false);
    }

    const hangleAddNewCover = async () => {
        await setLoadNewCard(true);
        let res = await dispatch(coverAddNew({ isDashboard: true }));
        await setLoadNewCard(false);
    }

    const handleBlur = (stateName, id) => {
        handleUpdateNameResume(stateName, id);
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

    // handle Share resume
    const handleShareResume = async (id) => {
        let res = await dispatch(postShareResume({ id }));

        if (res?.payload?.status == 'shared') {
            copyToClipboard(`${config.DOMAIN}/${routersPages['shareResume']}/${id}?key=${res.payload.key}`, async () => {
                // 
            });
        }
    }

    // download handle
    const handleDownloadResume = (id, shareKey) => {
        dispatch(downloadPdf({ id, shareKey }));
    }

    const chanbdegAutOrPlanResume = (id, isDown = false, shareKey) => {
        handleChanbdegAutOrPlan({
            funCalb: () => { isDown ? handleDownloadResume(id, shareKey) : handleShareResume(id) },
            isCover: false,
            isNewResume: false,
            isAthorized: true,
            dispatch,
            Router,
            query: router.query,
            isSubscribe
        });
    }

    // handleShare cover
    const handleShareCover = async (id) => {
        let res = await dispatch(postShareCover({ id }));

        if (res?.payload?.status == 'shared') {
            copyToClipboard(`${config.DOMAIN}/${routersPages['shareCover']}/${id}?key=${res.payload.key}`, async () => {
                // 
            });
        }
    }

    // download handle
    const handleDownloadCover = (id, shareKey) => {
        dispatch(downloadLetterPdf({ id, shareKey }));
    }

    const chanbdegAutOrPlanCover = (id, isDown = false, shareKey) => {
        handleChanbdegAutOrPlan({
            funCalb: () => { isDown ? handleDownloadCover(id, shareKey) : handleShareCover(id) },
            isCover: true,
            isNewResume: false,
            isAthorized: true,
            dispatch,
            Router,
            query: router.query,
            isSubscribe
        });
    }

    const handleDeleteResume = (id) => {
        setDeleteModal({ id: id, isResume: true })
    }

    const handleDeleteCover = (id) => {
        setDeleteModal({ id: id, isResume: false })
    }

    const handleCLoseModalDelete = () => {
        setDeleteModal({ id: null, isResume: true });
    }

    const onHanleBtnDelete = () => {
        if (deleteModal.isResume) {
            dispatch(deleteResume({ id: deleteModal.id }));
        } else {
            dispatch(deleteCover({ id: deleteModal.id }));
        }

        handleCLoseModalDelete();
    }

    const updateError = (obj) => {
        setErrorModal(prev => ({
            ...prev,
            ...obj,
        }));
    }

    useEffect(() => {
        if (router.query?.success == 'true') {
            updateError({
                isShow: true,
                status: 'success',
                discription: 'Payment success...',
            })
            return;
        }
    }, []);

    useEffect(() => {
        setLoadDards(true);

        if (type == "resume") {
            dispatch(fetchGetResumesList());
        }

        if (type == "cover") {
            dispatch(fetchGetCoversList());
        }

        setTimeout(() => {
            if (type == "resume") {
                dispatch(fetchGetResumesList());
            }

            if (type == "cover") {
                dispatch(fetchGetCoversList());
            }

            setLoadDards(false);
        }, 2000);
    }, [router.query.tab]);

    return (
        <>
            {
                ['md', 'sm', 'xs'].includes(currentResolution) && (
                    <Header />
                )
            }
            <div className={style.wr_pa}>
                <TitleAndLoad title="Dashboard" isLoad={(isLoader(covers?.status) || isLoader(resumers?.status))} />
                {
                    errorModal.isShow && (
                        <>
                            <br />
                            <NotificationPayment
                                type={errorModal.status}
                                title={errorModal.title}
                                discription={errorModal.discription}
                            />
                        </>
                    )
                }
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
                                                isLoad={loadNewCard}
                                            />
                                        )
                                    }
                                    {
                                        isArray(resumers.list) && resumers.list.map((item) => (
                                            <CardResume
                                                key={item.id}
                                                id={item.id}
                                                image={!!item?.screenUrl ? item?.screenUrl : ""} // /images/other/img_resume.png
                                                label={item.cvName}
                                                load={loadCards}
                                                dateUpdate={item.updateDatetime}
                                                handleEdit={() => handleOnUpdateResume(item)}
                                                handleBlur={handleBlur}
                                                handleDelete={() => handleDeleteResume(item.id)}
                                                handleShare={() => chanbdegAutOrPlanResume(item.id, false)}
                                                handleDewnload={() => chanbdegAutOrPlanResume(item.id, true, item.shareKey)}
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
                                                isLoad={loadNewCard}
                                            />
                                        )
                                    }
                                    {
                                        isArray(covers.list) && covers.list.map((item) => (
                                            <CardResume
                                                key={item.id}
                                                id={item.id}
                                                image={!!item?.screenUrl ? item?.screenUrl : ""} // /images/cover/dash-cover.png
                                                label={item.coverName}
                                                load={loadCards}
                                                dateUpdate={item.updateDatetime}
                                                handleEdit={() => handleOnUpdateCover(item)}
                                                handleBlur={handleBlurCover}
                                                handleDelete={() => handleDeleteCover(item.id)}
                                                handleShare={() => chanbdegAutOrPlanCover(item.id, false)}
                                                handleDewnload={() => chanbdegAutOrPlanCover(item.id, true, item.shareKey)}
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

            <ModalDelete
                visible={!!deleteModal?.id}
                title="Delete resume"
                desc="Are you sure you want to delete
                this project?"
                onClose={handleCLoseModalDelete}
                onHanleBtnDelete={onHanleBtnDelete}
            />
        </>
    )
}

export default Dashboard;