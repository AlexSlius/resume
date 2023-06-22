import { updateIsErrorEmail } from "../controllers/contacts"
import { fetcAutorizeSendCode } from "../controllers/auth";
import { updateIsErrorEmail as updateIsErrorEmailCover } from "../controllers/cover/personalize";

export const sendCodeResume = async ({
    dispatch,
    pictureFile,
    link = undefined,
    isResume = true,
    isClickBtn = false,
    funCalb = () => { },
    allFunCalb = () => { },
}) => {
    let res = undefined;

    if (isResume) {
        res = await dispatch(updateIsErrorEmail());
    }

    if (!isResume) {
        res = await dispatch(updateIsErrorEmailCover());
    }

    if (res?.payload?.email) {
        let { email } = res?.payload;

        let resAuth = await dispatch(fetcAutorizeSendCode({ data: { email }, isResume: isResume, pictureFile, linkRedirect: link, isClickBtn, allFunCalb: allFunCalb }));

        if (resAuth.payload?.id) {
            let obj = { id: resAuth.payload?.id };
            funCalb(obj);

            return obj;
        }

    }

    return {};
}