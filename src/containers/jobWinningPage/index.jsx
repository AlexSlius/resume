import Router, { useRouter } from "next/router";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { isArray } from "lodash";

import { ButtonIcon } from "../../components/uis/buttonIcon";
import { LoadChildrenBtn } from "../../components/loadChildrenBtn"
import { ItemCardResum } from "../../components/itemCardResum";
import { ResumeTabs } from "../../components/resumeTabs";

import { updateActiveResumeNew } from "../../slices/resumeData";
import { isLoader } from "../../helpers/loadings"

import iconAddNew from "/public/images/icons/icon-add-new-white.svg?sprite";
import iconUploadMore from "/public/images/icons/upload-more.svg?sprite";

import { routersPages } from "../../constants/next-routers";
import { getResumesTemplates } from "../../controllers/resumeData";


export const JobWinningPage = () => {
    const [currentPage, setCurrentPage] = useState(2);
    const dispatch = useDispatch();
    const router = useRouter();
    const category = router.query.category;

    const handleCategory = (nameCategory) => {
        Router.push({
            query: { category: nameCategory },
        });
    }

    const {
        resumeData,
    } = useSelector((state) => state);

    const handleUpload = async () => {
        let res = await dispatch(getResumesTemplates({ page: currentPage, category: (category === "undefined" || category == "all") ? "" : category }));

        if (res?.payload?.items) {
            setCurrentPage(prev => prev + 1)
        }
    };

    return (
        <section className="contact-page">
            <div className="containers text-center">
                <h1 className="h1">
                    Job-winning resume template<span className="icon-right-top">s</span>
                </h1>
                <p className="bottom-text">
                    Each resume template is expertly designed and follows the exact “resume rules” hiring
                    managers look for. Stand out and get hired faster with field-tested resume templates.
                </p>

                <div className="btn-centers-w mt-40">
                    <ButtonIcon href={routersPages['resumeBuilderNew']} icon={iconAddNew} label="Create my resume" className="btn--blue" />
                </div>

                <div className="wr-resumes">
                    <ResumeTabs
                        category={category}
                        handleCategory={handleCategory}
                    />
                    <div className="items-resumes">
                        {
                            isArray(resumeData?.list?.items) && resumeData.list.items.map((item, index) => (
                                <ItemCardResum
                                    item={item}
                                    keyRouter="resumeBuilderNew"
                                    key={index}
                                    updateActiveResumeNew={(val) => dispatch(updateActiveResumeNew(val))}
                                />
                            ))
                        }
                    </div>
                </div>
                {
                    ((resumeData?.list?.count_pages > 1) && (resumeData?.list?.count_pages + 1 > currentPage)) && (
                        <div className="btn-centers-w mt-40">
                            <LoadChildrenBtn isLoad={isLoader(resumeData.status)}>
                                <ButtonIcon
                                    icon={iconUploadMore}
                                    label="Upload more"
                                    className="btn--blue"
                                    isButton={true}
                                    onHandle={handleUpload}
                                />
                            </LoadChildrenBtn>
                        </div>
                    )
                }
            </div>
        </section>
    )
}