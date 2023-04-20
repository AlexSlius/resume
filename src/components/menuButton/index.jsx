import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import Icon from "../Icon"

import { ROUTES, ROUTES_COVER } from "../../constants/routes";
import { routersPages } from "../../constants/next-routers";
import { postShareResume } from "../../controllers/resumes";
import { postShareCover } from "../../controllers/cover/covers";
import { addItemNotification } from "../../slices/notifications";
import { copyToClipboard } from "../../helpers/bufer";
import config from "../../config/config.json";

import iconEdit from "/public/images/icons/icon-edite.svg?sprite"
import iconShare from "/public/images/icons/icon_share.svg?sprite"

export const MenuButton = ({
    isEdit = false,
}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { idCv } = router.query;
    const isResume = router.asPath.includes("resume-builder");

    const handleShare = () => {
        if (isResume) {
            handleShareResume();
        } else {
            handleShareCover();
        }
    }

    const handleShareResume = async () => {
        let res = await dispatch(postShareResume({ id: idCv }));

        if (res?.payload?.status == 'shared') {
            copyToClipboard(`${config.DOMAIN}/${routersPages['shareResume']}/${idCv}?key=${res.payload.key}`, async () => {
                await dispatch(addItemNotification({ text: "link copied" }));
            });
        }
    }

    const handleShareCover = async () => {
        let res = await dispatch(postShareCover({ id: idCv }));

        if (res?.payload?.status == 'shared') {
            copyToClipboard(`${config.DOMAIN}/${routersPages['shareCover']}/${idCv}?key=${res.payload.key}`, async () => {
                await dispatch(addItemNotification({ text: "link copied" }));
            });
        }
    }

    return (
        <div className="menus-card_wr">
            <div className="menus-card_cont">
                <ul className="menus-card_ul">
                    {
                        !isEdit && (
                            <li className="menus-card_li">
                                {/* onClick={handleEdit} */}
                                <Link href={`/${routersPages[isResume ? "resumeBuilder" : "coverLetter"]}/${idCv}/${isResume ? ROUTES[''] : ROUTES_COVER['']}`} className="item-btn-m" >
                                    <Icon svg={iconEdit} />
                                    <span>Edit</span>
                                </Link>
                            </li>
                        )
                    }
                    <li className="menus-card_li">
                        <button className="item-btn-m" onClick={handleShare}>
                            <Icon svg={iconShare} />
                            <span>Share a link</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}