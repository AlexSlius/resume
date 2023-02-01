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
}) => {
   let isNext = lengthPages == 1 ? false : currentPage == lengthPages ? false : true;
   let isPrev = lengthPages == 1 ? false : currentPage == 1 ? false : true;

   return (
      <div className={`${style.resume_head}`}>
         <div className={`${style.resume_head__status}`}>
            <Icon svg={savedIcon} classNames={[style.icon]} />
            Saved
         </div>

         <div className={`${style.resume_head__pagination}`}>
            {
               isPrev && (
                  <button className={`${style.resume_head__pagination_button}`} onClick={onPrev}>
                     <Icon svg={arrowLeftIcon} classNames={[style.icon]} />
                  </button>
               )
            }
            <p>{currentPage}/{lengthPages}</p>
            {
               isNext && (
                  <button className={`${style.resume_head__pagination_button}`} onClick={onNext}>
                     <Icon svg={arrowRightIcon} classNames={[style.icon]} />
                  </button>
               )
            }
         </div>
         <HeadUser />
      </div>
   )
}
export default ResumeHead;