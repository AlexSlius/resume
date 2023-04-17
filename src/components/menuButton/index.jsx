import Link from "next/link";
import { useRouter } from "next/router";

import Icon from "../Icon"

import { ROUTES, ROUTES_COVER } from "../../constants/routes";
import { routersPages } from "../../constants/next-routers";

import iconEdit from "/public/images/icons/icon-edite.svg?sprite"
import iconShare from "/public/images/icons/icon_share.svg?sprite"

export const MenuButton = ({
    isEdit = false,
}) => {
    const router = useRouter();
    const { idCv } = router.query;
    const isResume = router.asPath.includes("resume-builder");

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
                        <button className="item-btn-m">
                            <Icon svg={iconShare} />
                            <span>Share a link</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}