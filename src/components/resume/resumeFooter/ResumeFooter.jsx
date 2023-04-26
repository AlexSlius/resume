import { CButton } from '@coreui/react'
import { useSelector } from 'react-redux'
import Router from 'next/router';
import { useRouter } from 'next/router'

import Icon from "../../../components/Icon"

import { routersPages } from "../../../constants/next-routers";

import templateIcon from '/public/images/icons/select.svg?sprite'
import downloadIcon from '/public/images/icons/download.svg?sprite'
import dotsIcon from '/public/images/icons/dots.svg?sprite'
import { MenuButton } from '../../menuButton';

const ResumeFooter = ({ isCover }) => {
   const router = useRouter();
   const { idCv, type = "new", slug = "001-CV" } = router.query;
   const isNewResume = (idCv == "new");

   const {
      auth: {
         autorizate: {
            isAthorized,
         }
      },
   } = useSelector((state) => state);

   const handleRouter = () => {
      if (!isCover) {
         Router.push(`/${routersPages['resumeBuilder']}/${idCv}/${routersPages['templates']}`)
      } else {
         Router.push(`/${routersPages['coverLetter']}/${idCv}/${routersPages['templates']}`)
      }
   }

   return (
      <div className="resume-footer d-flex gap-3 justify-content-between py-3">
         <div className="resume-footer__left">
            <CButton
               className='resume-footer__button'
               color="secondary"
               variant="outline"
               onClick={handleRouter}
            >
               <Icon svg={templateIcon} classNames={['icon-20']} />
               Select template
            </CButton>
         </div>
         <div className="resume-footer__right d-flex ">
            {
               !isCover && (
                  <CButton
                     className='resume-footer__button'
                     color="secondary" variant="outline"
                     disabled={!isAthorized || isNewResume}
                  >
                     <Icon svg={downloadIcon} classNames={['icon-20']} />
                     Download PDF
                  </CButton>
               )
            }
            <div className={`menu-show-tem ab-menu menus-card ${(!isAthorized || isNewResume) ? "disabled" : ""}`}>
               <CButton
                  className='resume-footer__button'
                  color="secondary"
                  variant="outline"
                  disabled={!isAthorized}
               >
                  <Icon svg={dotsIcon} classNames={['icon-20']} />
               </CButton>
               {
                  isAthorized && (
                     <MenuButton isEdit={true} />
                  )
               }
            </div>
         </div>
      </div>
   )
}
export default ResumeFooter;