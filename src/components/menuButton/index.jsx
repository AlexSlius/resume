import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import Icon from "../Icon"
import { SvgImage } from "../svgImage";

import { ROUTES, QUERY_TAB_COVER } from "../../constants/routes";
import { routersPages } from "../../constants/next-routers";
import { postShareResume } from "../../controllers/resumes";
import { postShareCover } from "../../controllers/cover/covers";
import { copyToClipboard } from "../../helpers/bufer";
import config from "../../config/config.json";

import iconEdit from "/public/images/icons/icon-edite.svg?sprite"
import iconShare from "/public/images/icons/icon_share.svg?sprite"

export const MenuButton = ({
    isEdit = false,
    isNew = false,
    isMob = false,
    isAthorized = false,
    handleChanbdegAutOrPlan = () => { },
}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { idCv } = router.query;
    const isResume = router.asPath.includes("resume-builder");

    const handleShare = () => {
        if (isResume) {
            handleChanbdegAutOrPlan(handleShareResume);
        } else {
            handleChanbdegAutOrPlan(handleShareCover);
        }
    }

    const handleShareResume = async () => {
        let res = await dispatch(postShareResume({ id: idCv }));

        if (res?.payload?.status == 'shared') {
            copyToClipboard(`${config.DOMAIN}/${routersPages['shareResume']}/${idCv}?key=${res.payload.key}`, async () => {
                //    
            });
        }
    }

    const handleShareCover = async () => {
        let res = await dispatch(postShareCover({ id: idCv }));

        if (res?.payload?.status == 'shared') {
            copyToClipboard(`${config.DOMAIN}/${routersPages['shareCover']}/${idCv}?key=${res.payload.key}`, async () => {
                // 
            });
        }
    }

    return (
        <div className="menus-card_wr">
            <div className="menus-card_cont">
                <ul className="menus-card_ul">
                    {
                        (isMob && isAthorized) && (
                            <li className="menus-card_li">
                                <Link href={`/${routersPages['dashboard']}`} className="item-btn-m">
                                    <SvgImage image={'dashboard'} width={'17px'} height={'17px'} color={'#3679fd'} />
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                        )
                    }
                    {
                        !isEdit && !isNew && (
                            <li className="menus-card_li">
                                <Link href={isResume ? `/${routersPages["resumeBuilder"]}/${idCv}/${ROUTES['']}` : `/${routersPages["coverLetter"]}/${idCv}?tab=${QUERY_TAB_COVER['contact']}`} className="item-btn-m" >
                                    <Icon svg={iconEdit} />
                                    <span>Edit</span>
                                </Link>
                            </li>
                        )
                    }
                    <li className="menus-card_li">
                        <button className="item-btn-m" onClick={handleShare}>
                            <Icon svg={iconShare} />
                            <span>Copy URL</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}