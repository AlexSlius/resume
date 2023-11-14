import React from 'react'
import { useDispatch, useSelector } from "react-redux";

import Icon from '../../Icon'

import style from './ResumeHead.module.scss'
import savedIcon from '/public/images/icons/saved.svg?sprite'
import arrowLeftIcon from '/public/images/icons/arrow-left.svg?sprite'
import arrowRightIcon from '/public/images/icons/arrow-right.svg?sprite'
import HeadUser from '../../headUser/HeadUser'
import { Switch } from "../../../components/uis/switch";

import { fetchUpdateDrawingeServer } from "../../../controllers/contacts";

const ResumeHead = ({
   currentPage,
   lengthPages,
   onNext = () => { },
   onPrev = () => { },
   isLoad = false,
   currentResolution,
}) => {
   const dispatch = useDispatch();
   let isNext = lengthPages == 1 ? false : currentPage == lengthPages ? false : true;
   let isPrev = lengthPages == 1 ? false : currentPage == 1 ? false : true;
   const cont = useSelector(state => state.contacts.contactObj);

   return (
      <div className={`${style.resume_head} head_resume_div`}>
         {
            !['sm', 'xs', 'md'].includes(currentResolution) ? (
               <div className={`${style.resume_head__status}`}>
                  <div className={`${style.resume_head__status_icon}`}>
                     <Icon svg={savedIcon} classNames={[style.icon, isLoad ? style.icon_load : ""]} />
                  </div>
                  Saved
               </div>
            ) : (
               <div className={style.resume_head__title}>Preview</div>
            )
         }

         <div className='head_resume_div__flex'>
            {
               ['sm', 'xs', 'md'].includes(currentResolution) && (
                  <div className={style.switch_stub}>
                     <Switch
                        label="Stub-text"
                        reverse={true}
                        isChecked={!!cont?.isDummyTextHidden}
                        handleOnChange={(prev) => dispatch(fetchUpdateDrawingeServer({ id: cont.id, status: !!cont?.isDummyTextHidden ? 0 : 1 }))}
                     />
                  </div>
               )
            }

            <div className={`${style.resume_head__pagination}`}>
               <button className={`${style.resume_head__pagination_button} ${!isPrev ? style.non : ""}`} onClick={onPrev}>
                  <Icon svg={arrowLeftIcon} classNames={[style.icon]} />
               </button>
               <p>{currentPage}/{lengthPages}</p>
               <button className={`${style.resume_head__pagination_button} ${!isNext ? style.non : ""}`} onClick={onNext}>
                  <Icon svg={arrowRightIcon} classNames={[style.icon]} />
               </button>
            </div>
         </div>
         {
            !['sm', 'xs', 'md'].includes(currentResolution) && (
               <HeadUser />
            )
         }
      </div>
   )
}
export default ResumeHead;