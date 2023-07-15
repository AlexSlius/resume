import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { isArray } from "lodash";
import Link from "next/link";

import { LoadChildrenBtn } from "../../components/loadChildrenBtn"
import { ItemCardResum } from "../../components/itemCardResum";
import { ModalTemplate } from "../../components/modals/modaltemplate";

import { updateActiveCoverNew } from "../../slices/cover/coverData";
import { isLoader } from "../../helpers/loadings"

import { routersPages } from "../../constants/next-routers";
import { getCoverTemplates } from "../../controllers/cover/coverData";


export const CoverLetterTemplates = () => {
    const [currentPage, setCurrentPage] = useState(2);
    const [modalTem, setModalTem] = useState({
        status: false,
        data: null
    });
    const dispatch = useDispatch();
    const router = useRouter();
    const category = router.query.category;

    const {
        coverData,
    } = useSelector((state) => state);

    const handleUpload = async () => {
        let res = await dispatch(getCoverTemplates({ page: currentPage, category: (category === "undefined" || category == "all") ? "" : category }));

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
                    <h1 className="h1 h1_p48 fontw-600">Cover letter templates</h1>
                    <p className="text-t-t">
                        Each resume template is expertly designed and follows the exact “resume rules” hiring
                        managers look for. Stand out and get hired faster with field-tested resume templates.
                    </p>
                    <div className="btn-centers-w btn-centers-w_t">
                        <Link href={routersPages['coverLetterNew']} className="button-p button-type-standart">Create cover letter</Link>
                    </div>

                    <div className="wr-select-row">
                        <div className="seler-r">
                            <Link href={`/${routersPages['jobWinningResumeTemplates']}`}>Resume</Link>
                            <Link href={`/${routersPages['pageCoverLeterTemplates']}`} className="active">Cover Letter</Link>
                        </div>
                    </div>

                    <div className="wr-resumes">
                        <div className="items-resumes">
                            {
                                isArray(coverData?.list?.items) && coverData.list.items.map((item, index) => (
                                    <ItemCardResum
                                        item={item}
                                        keyRouter="coverLetterNew"
                                        key={index}
                                        updateActiveResumeNew={(val) => dispatch(updateActiveCoverNew(val))}
                                        handlePreview={handlePreview}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    {
                        ((coverData?.list?.count_pages > 1) && (coverData?.list?.count_pages + 1 > currentPage)) && (
                            <div className="btn-centers-w btn-centers-w_t2">
                                <LoadChildrenBtn isLoad={isLoader(coverData.status)}>
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
                hrefLink={routersPages['coverLetterNew']}
                handleLink={(val) => dispatch(updateActiveCoverNew(val))}
            />
        </>
    )
}