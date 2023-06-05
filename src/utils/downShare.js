import { routersPages } from "../constants/next-routers";
import { contactAddNew } from "../controllers/contacts";
import { coverAddNew } from "../controllers/cover/personalize";
import { sessionStorageGet } from "../helpers/localStorage";
import { sendCodeResume } from "./sendCode";


export const handleChanbdegAutOrPlan = async ({
    isCover,
    isNewResume,
    isAthorized,
    dispatch,
    Router,
    query,
    funCalb = () => { },
    link = undefined,
    isClickBtn = false,
    isSubscribe = false,
}) => {
    if (!isCover) {
        // resume
        if (isNewResume) {
            if (!isAthorized) {
                let pictureFile = sessionStorageGet('picture');
                await sendCodeResume({
                    dispatch,
                    pictureFile,
                    link,
                    isClickBtn,
                });
            } else {
                let pictureFile = sessionStorageGet('picture');
                dispatch(contactAddNew({ pictureFile, isNewResume }));
            }
        } else {
            // autoraizovan
            // здесь делать проверку подписку если подписка есть то выполняется функция funCalb

            if (isSubscribe) {
                funCalb();
            }

            if (!isSubscribe) {
                Router.push(`/${routersPages['resumeNow']}`);
            }
        }
    } else {
        // cover
        if (isNewResume) {
            if (!isAthorized) {
                await sendCodeResume({
                    dispatch,
                    link,
                    isResume: false,
                    isClickBtn
                });
            } else {
                dispatch(coverAddNew());
            }
        } else {
            // autoraizovan
            // здесь делать проверку подписку если подписка есть то выполняется функция funCalb
            if (isSubscribe) {
                funCalb();
            }

            if (!isSubscribe) {
                Router.push(`/${routersPages['resumeNow']}`);
            }
        }
    }
}