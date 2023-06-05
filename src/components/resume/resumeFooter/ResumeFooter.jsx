import { CButton } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import Router from 'next/router';
import { useRouter } from 'next/router'

import Icon from "../../../components/Icon"
import { MenuButton } from '../../menuButton';
import { downloadPdf } from "../../../controllers/resumes";
import { downloadLetterPdf } from "../../../controllers/cover/covers";
import { routersPages } from "../../../constants/next-routers";

import templateIcon from '/public/images/icons/selectFillNone.svg?sprite'
import downloadIcon from '/public/images/icons/download.svg?sprite'
import dotsIcon from '/public/images/icons/dotsFillNone.svg?sprite'
import { handleChanbdegAutOrPlan } from '../../../utils/downShare';


const ResumeFooter = ({
   isCover,
   currentResolution,
}) => {
   const router = useRouter();
   const dispatch = useDispatch();
   const { idCv, shareKey } = router.query;
   const isNewResume = (idCv == "new");
   const isMob = ['md', 'sm', 'xs'].includes(currentResolution);

   const {
      auth: {
         autorizate: {
            isAthorized,
         }
      },
      users: {
         isSubscribe
      }
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
         dispatch(downloadPdf({ id: idCv, shareKey: shareKey }));
      }

      if (isCover) {
         dispatch(downloadLetterPdf({ id: idCv, shareKey: shareKey }));
      }
   }

   const chanbdegAutOrPlan = (funCalb = () => { }) => {
      handleChanbdegAutOrPlan({
         funCalb,
         isCover,
         isNewResume,
         isAthorized,
         dispatch,
         Router,
         query: router.query,
         isClickBtn: true,
         isSubscribe,
      });
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
               {
                  isMob ? ("Template") : ("Select template")
               }
            </CButton>
         </div>
         <div className="resume-footer__right d-flex ">
            <CButton
               className='resume-footer__button'
               color="secondary" variant="outline"
               onClick={() => chanbdegAutOrPlan(handleDownload)}
            >
               <Icon svg={downloadIcon} classNames={['icon-20']} />
               {
                  isMob ? ("PDF") : ("Download PDF")
               }
            </CButton>

            <div className={`menu-show-tem ab-menu menus-card}`}>
               <CButton
                  className='resume-footer__button'
                  color="secondary"
                  variant="outline"
               >
                  <Icon svg={dotsIcon} classNames={['icon-20']} />
               </CButton>
               <MenuButton isEdit={true} handleChanbdegAutOrPlan={chanbdegAutOrPlan} />
            </div>
         </div>
      </div>
   )
}
export default ResumeFooter;