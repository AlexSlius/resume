import React from "react"
import { useSelector } from 'react-redux'

import { AutorizationBigPicture } from "../../components/autorizationBigPicture"

import style from "./Autorization-wraper.module.scss"
import { AutorizationHeader } from "../../components/autorizationHeader"
import { Buttonhelp } from "../../components/uis/buttonHelp"

import { routersPages } from "../../constants/next-routers";

export const AutorizationWrapper = (props) => {
    const {
        theme: {
            currentResolution
        }
    } = useSelector((state) => state);

    return (
        <div className={`${style.main_wrapper_autorization}`}>
            <div className={`${style.autoriaztion__row}`}>
                {
                    !['sm', 'xs'].includes(currentResolution) && (
                        <div className={`${style.autoriaztion__left} ${style.autoriaztion__col}`}>
                            <AutorizationBigPicture />
                        </div>
                    )
                }
                <div className={`${style.autoriaztion__right} ${style.autoriaztion__col}`}>
                    <AutorizationHeader currentResolution={currentResolution} isHidenBtnBack={props.isHidenBtnBack} />
                    {
                        ['sm', 'xs'].includes(currentResolution) && (
                            <div className={`${style.autoriaztion__left} ${style.autoriaztion__col}`}>
                                <AutorizationBigPicture />
                            </div>
                        )
                    }
                    <div className={`${style.autoriaztion__right_center}`}>
                        {props.children}
                    </div>
                    {
                        !['md', 'sm', 'xs'].includes(currentResolution) && (
                            <div className={`${style.autoriaztion__right_bottom}`}>
                                <Buttonhelp href={`/${routersPages['contactUs']}`} />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}