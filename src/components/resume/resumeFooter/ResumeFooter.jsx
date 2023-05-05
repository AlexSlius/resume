import { CButton } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import Router from 'next/router';
import { useRouter } from 'next/router'

import Icon from "../../../components/Icon"
import { MenuButton } from '../../menuButton';
import { sessionStorageGet } from '../../../helpers/localStorage';
import { contactSetNew, contactAddNew } from '../../../controllers/contacts';
import { coverAddNew, coverSetNew } from "../../../controllers/cover/personalize";
import { routersPages } from "../../../constants/next-routers";

import templateIcon from '/public/images/icons/selectFillNone.svg?sprite'
import downloadIcon from '/public/images/icons/download.svg?sprite'
import dotsIcon from '/public/images/icons/dotsFillNone.svg?sprite'


const ResumeFooter = ({ isCover }) => {
   const router = useRouter();
   const dispatch = useDispatch();
   const { idCv } = router.query;
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

   const handleDownload = () => {
      if (!isCover) {
         if (isNewResume) {
            if (!isAthorized) {
               let pictureFile = sessionStorageGet('picture');
               dispatch(contactSetNew({ pictureFile: pictureFile || null, isNewResume, typeResume: router.query.type || null }));
            } else {
               let pictureFile = sessionStorageGet('picture');
               dispatch(contactAddNew({ pictureFile, isNewResume }));
            }
         } else {
            // autoraizovan
            Router.push(`/${routersPages['resumeNow']}`);
         }
      } else {
         // cover
         if (isNewResume) {
            if (!isAthorized) {
               dispatch(coverSetNew({ isNewCover: true }));
            } else {
               dispatch(coverAddNew());
            }
         } else {
            // autoraizovan
            Router.push(`/${routersPages['resumeNow']}`);
         }
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
            <CButton
               className='resume-footer__button'
               color="secondary" variant="outline"
               onClick={handleDownload}
            >
               <Icon svg={downloadIcon} classNames={['icon-20']} />
               Download PDF
            </CButton>
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