import React from 'react'

import Icon from '../../Icon'

import style from './ResumeHead.module.scss'
import savedIcon from '/public/images/icons/saved.svg?sprite'
import arrowLeftIcon from '/public/images/icons/arrow-left.svg?sprite'
import arrowRightIcon from '/public/images/icons/arrow-right.svg?sprite'
import HeadUser from '../../headUser/HeadUser'

const ResumeHead = ({
   currentPage,
   lengthPages,
   onNext = () => { },
   onPrev = () => { },
   isLoad = false,
   currentResolution,
}) => {
   let isNext = lengthPages == 1 ? false : currentPage == lengthPages ? false : true;
   let isPrev = lengthPages == 1 ? false : currentPage == 1 ? false : true;

   return (
      <div className={`${style.resume_head}`}>
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

         <div className={`${style.resume_head__pagination}`}>
            <button className={`${style.resume_head__pagination_button} ${!isPrev ? style.non : ""}`} onClick={onPrev}>
               <Icon svg={arrowLeftIcon} classNames={[style.icon]} />
            </button>
            <p>{currentPage}/{lengthPages}</p>
            <button className={`${style.resume_head__pagination_button} ${!isNext ? style.non : ""}`} onClick={onNext}>
               <Icon svg={arrowRightIcon} classNames={[style.icon]} />
            </button>
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