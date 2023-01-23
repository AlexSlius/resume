import Icon from "../../../components/Icon";

import style from "./Style.module.scss"
import plusIcon from '/public/images/icons/plus.svg?sprite'
import iconEdit from '/public/images/icons/icon_edit_photo.svg?sprite'

export const PhotoAdd = ({
    handleFileSelect = () => { },
    value = null,
}) => {
    let textbtn = !!value ? 'Edit Photo' : 'Add Photo'
    let classPicture = !!value ? style.edit_photo : ""

    return (
        <div className={`${style.add_photo} ${classPicture}`}>
            {
                !!value && (
                    <img src={value} className={`${style.add_photo__image}`} />
                )
            }
            <input
                onChange={handleFileSelect}
                hidden
                type="file"
                accept="image/png, image/jpeg"
                id='upload'
                className={`${style.add_photo__inpu}`}
            />
            <label className={`${style.add_photo__label}`} htmlFor="upload">
                <Icon svg={!!value ? iconEdit : plusIcon} classNames={[`${style.icon_add}`]} />
                {textbtn}
            </label>
        </div>
    )
}