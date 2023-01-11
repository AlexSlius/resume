import { CFormSwitch } from "@coreui/react"

import { ButtonBack } from "../uis/buttonBack"

import style from "./HeadMainContent.module.scss"

const HeadMainContent = (props) => {
   const { title, description, switchOk } = props;

   return (
      <>
         <div className={`${style.main_content__back}`}>
            <ButtonBack />
         </div>
         <h2 className={`${style.main_content__title}`}>
            {title}
         </h2>
         {description && (<div className={`${style.main_content__head} d-flex justify-content-between gap-3`} style={{ marginBottom: '2rem' }}>
            {description ? <p className={`${style.main_content__description}`}>{description}</p> : null}
            {switchOk ? <CFormSwitch onChange={(e) => props.changeSwitch(e.target.checked)} label={switchOk} id="formSwitchCheckDefault" /> : null}
         </div>)}
      </>
   )
}

export default HeadMainContent;