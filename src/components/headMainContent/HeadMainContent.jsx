import { ButtonBack } from "../uis/buttonBack"

import style from "./HeadMainContent.module.scss"

const HeadMainContent = (props) => {
   const { title, description, children, isRows = true } = props;

   return (
      <>
         <div className={`${style.main_content__back}`}>
            <ButtonBack />
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
      </>
   )
}

export default HeadMainContent;