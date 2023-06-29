import { CButton } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import Router from 'next/router';
import { useRouter } from 'next/router'
import Link from 'next/link';

import Icon from "../../../components/Icon"
import { MenuButton } from '../../menuButton';
import { downloadPdf } from "../../../controllers/resumes";
import { downloadLetterPdf } from "../../../controllers/cover/covers";
import { routersPages } from "../../../constants/next-routers";
import { handleChanbdegAutOrPlan } from '../../../utils/downShare';
import { validEmail } from '../../../helpers/validEmail';

import templateIcon from '/public/images/icons/selectFillNone.svg?sprite'
import downloadIcon from '/public/images/icons/download.svg?sprite'
import dotsIcon from '/public/images/icons/dotsFillNone.svg?sprite'


const ResumeFooter = ({
   isCover,
   currentResolution,
}) => {
   const router = useRouter();
   const dispatch = useDispatch();
   const { idCv, shareKey } = router.query;
   const isNewResume = (idCv == "new");
   const isMob = ['md', 'sm', 'xs'].includes(currentResolution);
   const dopQuery = `${(shareKey?.length > 0) ? `?shareKey=${shareKey}` : ""}`;

   const {
      auth: {
         autorizate: {
            isAthorized,
         }
      },
      users: {
         isSubscribe
      },
      contacts: {
         contactObjNew,
         emailRegister
      },
      coverDataForm: {
         coverDataObjNew,
         emailRegister: emailRegisterCover
      }
   } = useSelector((state) => state);

   const showBtn = (!isAthorized && isNewResume) ?
      validEmail(router.asPath.includes(routersPages['resumeBuilder']) ?
         emailRegister?.length > 0 ? emailRegister : contactObjNew.email :
         emailRegisterCover?.length > 0 ? emailRegisterCover : coverDataObjNew.emain) :
      true;

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
            <Link href={!isCover ? `/${routersPages['resumeBuilder']}/${idCv}/${routersPages['templates']}${dopQuery}` : `/${routersPages['coverLetter']}/${idCv}/${routersPages['templates']}${dopQuery}`} className='btn btn-outline-secondary resume-footer__button'>
               <Icon svg={templateIcon} classNames={['icon-20']} />
               {
                  isMob ? ("Template") : ("Select template")
               }
            </Link>
         </div>
         {
            showBtn && (
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
            )
         }
      </div>
   )
}
export default ResumeFooter;