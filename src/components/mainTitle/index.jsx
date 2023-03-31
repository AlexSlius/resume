// Components
import { SvgImage } from "../../components/svgImage";
import { ImageSprite } from "../../components/imageSprite";

import style from './Style.module.scss';

export const MainTitle = ({ firstText, secondText, thirdText, fourthText }) => {
  return (
    <h1 className="h1">
        <div className={style.firstText}>
            <span>{firstText} </span>
            <span className={style.textIcon}>
                {secondText}
                <SvgImage image={'text-icon'} width={'54px'} height={'51px'} color={'#FFAD61'} />
            </span>
        </div>
        <div className={style.secondTextWrapper}>
            <span>{thirdText} </span>
            <div className={style.border}>
                <i></i>
                  {fourthText}
                  <div className={style.iconBlock}>
                    <ImageSprite iconName={'cursor'} width={'25px'} height={'27px'} />
                  </div>
            </div>
        </div>
    </h1>
    )
}