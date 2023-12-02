import { useSelector, useDispatch } from "react-redux";

import { ButtonBack } from "../uis/buttonBack"
import { Switch } from "../../components/uis/switch";

import { fetchUpdateDrawingeServer } from "../../controllers/contacts";

import style from "./HeadMainContent.module.scss";

const HeadMainContent = (props) => {
   const dispatch = useDispatch();
   const { title, description, children, isRows = true, link = '', StubTextBtn = false } = props;

   const cont = useSelector(state => state.contacts.contactObj);
   const contNew = useSelector(state => state.contacts.contactObjNew);
   const { currentResolution } = useSelector(state => state.theme);

   return (
      <div className={style.main_content}>
         <div className={style.main_head}>
            <div className={`${style.main_content__back}`}>
               <ButtonBack link={link} />
            </div>
            {
               !!StubTextBtn && !['sm', 'xs', 'md'].includes(currentResolution) && (
                  <div className={style.switch_stub}>
                     <Switch
                        label="Example text"
                        reverse={true}
                        isChecked={!!cont.id ? !!cont?.isDummyTextHidden : !!contNew?.isDummyTextHidden}
                        handleOnChange={(prev) => dispatch(fetchUpdateDrawingeServer({ id: cont.id, status: !!cont.id ? !!cont?.isDummyTextHidden ? 0 : 1 : !!contNew?.isDummyTextHidden ? 0 : 1 }))}
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