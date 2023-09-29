import { useSelector, useDispatch } from "react-redux";

import { ButtonBack } from "../uis/buttonBack"
import { Switch } from "../../components/uis/switch";

import { updateStudText } from "../../slices/resumeData";

import style from "./HeadMainContent.module.scss";

const HeadMainContent = (props) => {
   const dispatch = useDispatch();
   const { title, description, children, isRows = true, link = '', StubTextBtn = false } = props;

   const { stubText } = useSelector(state => state.resumeData);

   return (
      <div className={style.main_content}>
         <div className={style.main_head}>
            <div className={`${style.main_content__back}`}>
               <ButtonBack link={link} />
            </div>
            {
               !!StubTextBtn && (
                  <div className={style.switch_stub}>
                     <Switch
                        label="Stub-text"
                        reverse={true}
                        isChecked={stubText}
                        handleOnChange={(prev) => dispatch(updateStudText(!stubText))}
                     />
                  </div>
               )
            }
         </div>
         {
            title && (
               <h2 className={`${style.main_content__title}`}>
                  {title}
               </h2>
            )
         }

         {
            !!isRows && (
               <div className={`${style.roows}`}>
                  {
                     description && (
                        <div className={`${style.main_content__des} `}>
                           <p className={`${style.main_content__description}`}>{description}</p>
                        </div>
                     )
                  }
                  {children && (<div className={style.cont_right}>{children}</div>)}
               </div>
            )
         }


      </div>
   )
}

export default HeadMainContent;