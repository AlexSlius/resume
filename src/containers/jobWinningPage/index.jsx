import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { isArray } from "lodash";
import Link from "next/link";

import { LoadChildrenBtn } from "../../components/loadChildrenBtn"
import { ItemCardResum } from "../../components/itemCardResum";
import { ModalTemplate } from "../../components/modals/modaltemplate";

import { updateActiveResumeNew } from "../../slices/resumeData";
import { isLoader } from "../../helpers/loadings"

import { routersPages } from "../../constants/next-routers";
import { getResumesTemplates } from "../../controllers/resumeData";

export const JobWinningPage = () => {
    const [currentPage, setCurrentPage] = useState(2);
    const [modalTem, setModalTem] = useState({
        status: false,
        data: null
    });
    const dispatch = useDispatch();
    const router = useRouter();
    const category = router.query.category;

    const {
        resumeData,
    } = useSelector((state) => state);

    const handleUpload = async () => {
        let res = await dispatch(getResumesTemplates({ page: currentPage, category: (category === "undefined" || category == "all") ? "" : category }));

        if (res?.payload?.items) {
            setCurrentPage(prev => prev + 1)
        }
    };

    const handleCloseModalTemplate = () => {
        setModalTem({
            status: false,
            data: null
        });
    }

    const handlePreview = (data) => {
        setModalTem({
            status: true,
            data
        });
    }

    return (
        <>
            <section className="contact-page">
                <div className="containers text-center">
                    <h1 className="h1 h1_p48 fontw-600">Job-winning<br /> resume templates</h1>
                    <p className="text-t-t text-t-t_18">
                        Each resume template is expertly designed and follows the exact “resume rules” hiring
                        managers look for. Stand out and get hired faster with field-tested resume templates.
                    </p>

                    <div className="btn-centers-w btn-centers-w_t">
                        <Link href={routersPages['resumeBuilderNew']} className="button-p button-type-standart">Create my resume</Link>
                    </div>

                    <div className="wr-select-row">
                        <div className="seler-r">
                            <Link href={`/${routersPages['jobWinningResumeTemplates']}`} className="active">Resume</Link>
                            <Link href={`/${routersPages['pageCoverLeterTemplates']}`}>Cover Letter</Link>
                        </div>
                    </div>

                    <div className="wr-resumes">
                        <div className="items-resumes">
                            {
                                isArray(resumeData?.list?.items) && resumeData.list.items.map((item, index) => (
                                    <ItemCardResum
                                        item={item}
                                        keyRouter="resumeBuilderNew"
                                        key={index}
                                        updateActiveResumeNew={(val) => dispatch(updateActiveResumeNew(val))}
                                        handlePreview={handlePreview}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    {
                        ((resumeData?.list?.count_pages > 1) && (resumeData?.list?.count_pages + 1 > currentPage)) && (
                            <div className="btn-centers-w btn-centers-w_t2">
                                <LoadChildrenBtn isLoad={isLoader(resumeData.status)}>
                                    <button onClick={handleUpload} className="button-p button-p_light_grey">
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
                onClose={handleCloseModalTemplate}
                hrefLink={routersPages['resumeBuilderNew']}
                handleLink={(val) => dispatch(updateActiveResumeNew(val))}
            />
        </>
    )
}