import Head from 'next/head'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { isArray } from "lodash";
import Link from "next/link";

import { LoadChildrenBtn } from "../../components/loadChildrenBtn"
import { ItemCardResum } from "../../components/itemCardResum";
import { ModalTemplate } from "../../components/modals/modaltemplate";

import { updateActiveCoverNew } from "../../slices/cover/coverData";
import { updateActiveResumeNew } from "../../slices/resumeData";
import { isLoader } from "../../helpers/loadings"

import { routersPages } from "../../constants/next-routers";
import { getResumesTemplates } from "../../controllers/resumeData";
import { getCoverTemplates } from "../../controllers/cover/coverData";

import dataPage from "../../dataPages/pageResumeAndCover.json";

export const JobWinningPage = ({
    startType = "resume"
}) => {
    const [currentPage, setCurrentPage] = useState(2);
    const [typePage, setTypePage] = useState(startType);
    const [objData, setObjData] = useState({});
    const [modalTem, setModalTem] = useState({
        status: false,
        data: null,
        activeClassColor: null
    });
    const dispatch = useDispatch();
    const router = useRouter();
    const category = router.query.category;
    const isResume = typePage == "resume";

    const {
        resumeData,
        coverData
    } = useSelector((state) => state);

    const handleUpload = async (isNew = false) => {
        if (isResume) {
            let res = await dispatch(getResumesTemplates({ params: { page: currentPage, category: (category === "undefined" || category == "all") ? "" : category }, isNew }));

            if (res?.payload?.items) {
                setCurrentPage(prev => prev + 1)
            }
        }

        if (!isResume) {
            let res = await dispatch(getCoverTemplates({ params: { page: currentPage, category: (category === "undefined" || category == "all") ? "" : category, isNew }, isNew }));

            if (res?.payload?.items) {
                setCurrentPage(prev => prev + 1)
            }
        }
    };

    const handleCloseModalTemplate = () => {
        setModalTem({
            status: false,
            data: null,
            activeClassColor: null
        });
    }

    const handlePreview = (data, activeClassColor) => {
        setModalTem({
            status: true,
            data,
            activeClassColor
        });
    }

    const handleTypePage = (type) => {
        setCurrentPage(1);
        setTimeout(() => {
            setTypePage(type);
        }, 0);
    }

    useEffect(() => {
        if (currentPage == 1) {
            handleUpload(true);
        }
    }, [typePage]);

    useEffect(() => {
        setObjData((isResume) ? resumeData : coverData);
    }, [resumeData, coverData, typePage]);

    useEffect(() => {
        setTypePage(startType);
    }, [router]);

    return (
        <>
            <section className="contact-page">
                <div className="containers text-center">
                    <h1 className="h1 h1_p48 fontw-600" dangerouslySetInnerHTML={{ __html: dataPage[typePage].h1 }}></h1>
                    <p className="text-t-t text-t-t_18">{dataPage[typePage].descPage}</p>

                    <div className="btn-centers-w btn-centers-w_t">
                        <Link href={isResume ? routersPages['resumeBuilderNew'] : routersPages['coverLetterNew']} className="button-p button-type-standart">{dataPage[typePage].nameTable}</Link>
                    </div>

                    <div className="wr-select-row">
                        <div className="seler-r">
                            <button onClick={() => handleTypePage("resume")} className={`${isResume ? "active" : ""}`}>Resume</button>
                            <button onClick={() => handleTypePage("cover")} className={`${!isResume ? "active" : ""}`}>Cover Letter</button>
                        </div>
                    </div>

                    <div className="wr-resumes">
                        <div className="items-resumes">
                            {
                                isArray(objData?.list?.items) && objData.list.items.map((item, index) => (
                                    <ItemCardResum
                                        item={item}
                                        keyRouter={isResume ? "resumeBuilderNew" : "coverLetterNew"}
                                        key={index}
                                        updateActiveResumeNew={(val) => dispatch(isResume ? updateActiveResumeNew(val) : updateActiveCoverNew(val))}
                                        handlePreview={handlePreview}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    {
                        ((objData?.list?.count_pages > 1) && (objData?.list?.count_pages + 1 > currentPage)) && (
                            <div className="btn-centers-w btn-centers-w_t2">
                                <LoadChildrenBtn isLoad={isLoader(objData.status)}>
                                    <button onClick={() => handleUpload(false)} className="button-p button-p_light_grey">
                                        <span>Upload more</span>
                                    </button>
                                </LoadChildrenBtn>
                            </div>
                        )
                    }
                </div>
            </section>
            <ModalTemplate
                visible={modalTem.status}
                item={modalTem.data}
                activeClassColor={modalTem.activeClassColor}
                onClose={handleCloseModalTemplate}
                hrefLink={routersPages[isResume ? 'resumeBuilderNew' : 'coverLetterNew']}
                handleLink={(val) => dispatch(isResume ? updateActiveResumeNew(val) : updateActiveCoverNew(val))}
            />
        </>
    )
}