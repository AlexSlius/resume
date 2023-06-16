import { CButton } from "@coreui/react"
import Router, { useRouter } from "next/router";
import { useSelector } from "react-redux";
import classnames from 'classnames';

import { LoadChildrenBtn } from "../loadChildrenBtn"
import { isLoader } from "../../helpers/loadings"
import { isAllActive, nextofLink } from "../../helpers/routers";

import { routersPages } from "../../constants/next-routers";

import style from "./Style.module.scss";
import { ComponentHigherLoadBtn } from "../componentHigherLoadBtn";
import { sectionStatusAllButTheCustomSection, getActiveSectionByName } from "../../utils/customSection";

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
    const {
        menuAsideResume: {
            list
        },
        addSection
    } = useSelector(state => state);

    const isAll = isAllActive(list);
    const idCv = router.query.idCv;
    const shareKey = router.query?.shareKey;

    const clickNext = () => {
        if (isNew) {
            onHandleNew();
        } else {
            let pathName = router.asPath;

            if (isAthorized) {
                let linkNext = nextofLink(list, pathName);

                if (!!linkNext)
                    Router.push(`/${routersPages['resumeBuilder']}/${idCv}${linkNext}${(shareKey?.length > 0) ? `?shareKey=${shareKey}` : ""}`);
            } else {
                onHandleBtnNext();
            }
        }
    }

    const clickFinish = () => {
        Router.push(`/${routersPages['resumeBuilder']}/${idCv}/${routersPages['templates']}${(shareKey?.length > 0) ? `?shareKey=${shareKey}` : ""}`);
    }

    return (
        <div>
            <div className={classnames(style.buttonWrapper, style.row)}>

                {
                    (isFinish || (sectionStatusAllButTheCustomSection(addSection?.list) && getActiveSectionByName(addSection?.list, nameSection))) ? (
                        <div>
                            <ComponentHigherLoadBtn isLoad={isLoader(loadBtnNext)}>
                                <CButton type="button" className={`${style.btn} ${style.btn_next}`} onClick={clickFinish}>Finish</CButton>
                            </ComponentHigherLoadBtn>
                        </div>
                    ) : (
                        <>
                            {
                                !isFirstStep && (
                                    <div>
                                        <LoadChildrenBtn isLoad={isLoader(loadBtnPrev)}>
                                            <CButton
                                                disabled={disableDelete}
                                                type="button"
                                                className={`${style.btn} ${style.btn_prev}`}
                                                onClick={disabledNext ? clickNext : onClean}
                                            >{disabledNext ? textBtnPrev : "Delete all"}</CButton>
                                        </LoadChildrenBtn>
                                    </div>
                                )
                            }
                            {
                                !(isAll && isLastStep) ? (
                                    <div>
                                        <ComponentHigherLoadBtn isLoad={isLoader(loadBtnNext)}>
                                            <CButton
                                                type="button"
                                                className={`${style.btn} ${style.btn_next}`}
                                                onClick={clickNext}
                                                disabled={disabledNext}
                                            >{textBtnNext}</CButton>
                                        </ComponentHigherLoadBtn>
                                    </div>
                                ) : (
                                    <ComponentHigherLoadBtn isLoad={isLoader(loadBtnNext)}>
                                        <CButton type="button" className={`${style.btn} ${style.btn_next}`} onClick={clickFinish}>Finish</CButton>
                                    </ComponentHigherLoadBtn>
                                )
                            }
                        </>
                    )
                }
            </div>
        </div >
    )
}