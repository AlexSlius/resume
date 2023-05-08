import { routersPages } from "../constants/next-routers";
import { contactSetNew, contactAddNew } from "../controllers/contacts";
import { coverSetNew, coverAddNew } from "../controllers/cover/personalize";
import { sessionStorageGet } from "../helpers/localStorage";


export const handleChanbdegAutOrPlan = ({
    isCover,
    isNewResume,
    isAthorized,
    dispatch,
    Router,
    query,
    funCalb = () => { },
}) => {
    if (!isCover) {
        if (isNewResume) {
            if (!isAthorized) {
                let pictureFile = sessionStorageGet('picture');
                dispatch(contactSetNew({ pictureFile: pictureFile || null, isNewResume, typeResume: query.type || null }));
            } else {
                let pictureFile = sessionStorageGet('picture');
                dispatch(contactAddNew({ pictureFile, isNewResume }));
            }
        } else {
            // autoraizovan
            Router.push(`/${routersPages['resumeNow']}`);
            // здесь делать проверку подписку если подписка есть то выполняется функция funCalb
            funCalb();
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
            // здесь делать проверку подписку если подписка есть то выполняется функция funCalb
            funCalb();
        }
    }
}