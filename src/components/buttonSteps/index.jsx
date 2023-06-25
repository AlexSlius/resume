import { CButton } from "@coreui/react"
import Router, { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import classnames from 'classnames';
import { useState } from "react";

import { LoadChildrenBtn } from "../loadChildrenBtn"
import { isLoader } from "../../helpers/loadings"
import { isAllActive, nextofLink } from "../../helpers/routers";

import { routersPages } from "../../constants/next-routers";

import style from "./Style.module.scss";
import { ComponentHigherLoadBtn } from "../componentHigherLoadBtn";
import { sectionStatusAllButTheCustomSection, getActiveSectionByName } from "../../utils/customSection";
import { cleanFieldDepend } from "../../slices/dependencies";

export const ButtonSteps = ({
    loadBtnNext = false,
    loadBtnPrev = false,
    isFirstStep = false,
    isLastStep = false,
    isFinish = false,
    textBtnNext = "Continue",
    textBtnPrev = "Skip",
    isAthorized = false,
    isNew = false,
    disabledNext = false,
    disableDelete = false,
    onHandleBtnNext = () => { },
    onHandleNew = () => { },
    onClean = () => { },
    // clickFinish = () => { },
    nameSection = null,
}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {
        menuAsideResume: {
            list
        },
        addSection
    } = useSelector(state => state);
    const [loadNex, setLoadnex] = useState(false);
    const [loadSkip, setLoadSkip] = useState(false);
    const [loadFinish, setLoadFinish] = useState(false);

    const isAll = isAllActive(list);
    const idCv = router.query.idCv;
    const shareKey = router.query?.shareKey;
    const isSectionEnd = (sectionStatusAllButTheCustomSection(addSection?.list) && getActiveSectionByName(addSection?.list, nameSection));

    const clickNext = (load = false) => {
        if (isNew) {
            onHandleNew();
        } else {
            let pathName = router.asPath;

            if (isAthorized) {
                setLoadnex(load === true);
                setLoadSkip(load === "skip")
                let linkNext = nextofLink(list, pathName);

                if (!!linkNext)
                    Router.push(`/${routersPages['resumeBuilder']}/${idCv}${linkNext}${(shareKey?.length > 0) ? `&shareKey=${shareKey}` : ""}`);
            } else {
                onHandleBtnNext();
            }
        }
    }

    const clickFinish = (load = false) => {
        setLoadSkip(load === "skip");
        setLoadFinish(load === "finish");
        Router.push(`/${routersPages['resumeBuilder']}/${idCv}/${routersPages['templates']}${(shareKey?.length > 0) ? `&shareKey=${shareKey}` : ""}`);
    }

    const onHandleClean = () => {
        onClean();
        dispatch(cleanFieldDepend());
    }

    return (
        <div>
            <div className={classnames(style.buttonWrapper, style.row)}>
                {
                    isFinish ? (
                        <div>
                            <ComponentHigherLoadBtn isLoad={isLoader(loadBtnNext)}>
                                <CButton type="button" className={`${style.btn} ${style.btn_next}`} onClick={clickFinish}>Finish</CButton>
                            </ComponentHigherLoadBtn>
                        </div>
                    ) : (
                        isSectionEnd ? (
                            <>
                                <div>
                                    <LoadChildrenBtn isLoad={loadSkip}>
                                        <CButton
                                            disabled={disableDelete}
                                            type="button"
                                            className={`${style.btn} ${style.btn_prev}`}
                                            onClick={disabledNext ? () => { clickFinish("skip") } : onHandleClean}
                                        >{disabledNext ? "Template" : "Delete all"}</CButton>
                                    </LoadChildrenBtn>
                                </div>
                                <div>
                                    <LoadChildrenBtn isLoad={loadFinish}>
                                        <CButton type="button" className={`${style.btn} ${style.btn_next}`} onClick={() => clickFinish("finish")}>Finish</CButton>
                                    </LoadChildrenBtn>
                                </div>
                            </>
                        ) : (
                            <>
                                {
                                    !isFirstStep && (
                                        <div>
                                            <LoadChildrenBtn isLoad={loadSkip}>
                                                <CButton
                                                    disabled={disableDelete}
                                                    type="button"
                                                    className={`${style.btn} ${style.btn_prev}`}
                                                    onClick={disabledNext ? () => { clickNext("skip") } : onHandleClean}
                                                >{disabledNext ? textBtnPrev : "Delete all"}</CButton>
                                            </LoadChildrenBtn>
                                        </div>
                                    )
                                }
                                {
                                    !(isAll && isLastStep) ? (
                                        <div>
                                            <LoadChildrenBtn isLoad={loadNex}>
                                                <CButton
                                                    type="button"
                                                    className={`${style.btn} ${style.btn_next}`}
                                                    onClick={() => clickNext(true)}
                                                    disabled={disabledNext}
                                                >{textBtnNext}</CButton>
                                            </LoadChildrenBtn>
                                        </div>
                                    ) : (
                                        <LoadChildrenBtn isLoad={loadFinish}>
                                            <CButton type="button" className={`${style.btn} ${style.btn_next}`} onClick={() => clickFinish("finish")}>Finish</CButton>
                                        </LoadChildrenBtn>
                                    )
                                }
                            </>
                        )
                    )
                }
            </div>
        </div>
    )
}