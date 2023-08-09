import Image from 'next/image'

import style from "./style.module.scss"

export const AuthorizationBigPicture = () => {
    return (
        <div className={`${style.wr_img}`}>
            <div>
                <Image
                    src="/images/other/img_autorization.png"
                    alt="full images"
                    width={1024}
                    height={1024}
                />
            </div>
        </div>
    )
}