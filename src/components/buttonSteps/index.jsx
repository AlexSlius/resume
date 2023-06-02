import { CButton } from "@coreui/react"
import Router, { useRouter } from "next/router";
import { useSelector } from "react-redux";
import classnames from 'classnames';

import { LoadChildrenBtn } from "../loadChildrenBtn"
import { isLoader } from "../../helpers/loadings"
import { isAllActive, nextofLink, prevOfLink } from "../../helpers/routers";

import { routersPages } from "../../constants/next-routers";

import style from "./Style.module.scss";
import { ComponentHigherLoadBtn } from "../componentHigherLoadBtn";

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
    onHandleBtnPrev = () => { },
    onHandleNew = () => { },
    onClean = () => { },
    clickFinish = () => { },
}) => {
    const router = useRouter();
    const {
        menuAsideResume: {
            list
        }
    } = useSelector(state => state);

    const isAll = isAllActive(list);
    const idCv = router.query.idCv;

    const clickNext = () => {
        if (isNew) {
            onHandleNew();
        } else {
            let pathName = router.asPath;

            if (isAthorized) {
                let linkNext = nextofLink(list, pathName);

                if (!!linkNext)
                    Router.push(`/${routersPages['resumeBuilder']}/${idCv}${linkNext}`);
            } else {
                onHandleBtnNext();
            }
        }
    }

    // const clickPrev = () => {
    //     let pathName = router.asPath;
    //     let linkPrev = prevOfLink(list, pathName);

    //     if (!!linkPrev)
    //         Router.push(linkPrev);

    //     onHandleBtnPrev();
    // }

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