import Image from 'next/image'

import { ButtonBack } from "../uis/buttonBack"

import style from "./Style.module.scss"
import Link from 'next/link';

export const AuthorizationHeader = ({
    isHidenBtnBack = false,
    currentResolution
}) => {
    return (
        <div className={`${style.head}`}>
            <div className={`${style.head__row}`}>
                {
                    !isHidenBtnBack && (
                        <div className={`${style.head__back}`}>
                            <ButtonBack text={['md', 'sm', 'xs'].includes(currentResolution) ? "" : "Back"} />
                        </div>
                    )
                }
                <div className={`${style.head__logo}`}>
                    <Link href="/">
                        <Image
                            src={'/images/page/logo.svg'}
                            width={120}
                            height={30}
                            alt=""
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}