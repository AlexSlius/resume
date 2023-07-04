import api from "../apiSingleton";

import { wrapper } from "../store"
import { setIsAuth } from "../slices/auth";
import { cookieParse } from "../helpers/nookies";
import { isExist } from '../helpers/checkingStatuses';
import { getAllResumeBuilder } from "../controllers/getAllResumeBuilder";
import {
    getResumesTemplates,
    getResumeDataShare,
    getResumeShareTemplateActive
} from "../controllers/resumeData";
import {
    getCoverTemplates,
    getCoverShareTemplateActive
} from "../controllers/cover/coverData";
import {
    getCoverLetterById,
    getCoverDataShare,
    getCoverGenerateDate,
    getCoverTextNoAuthNew
} from "../controllers/cover/personalize";
import { getAllPageHome } from "../controllers/pages/pagesHome";
import { getAllPageCoverLetter } from "../controllers/pages/pagesCoverLetters";
import { fetchGetResumeData } from "../controllers/resumeData";
import { getResumeActive } from "../controllers/resumeData";
import { getCoverDataActive } from "../controllers/cover/coverData";

export const withPublicRoute = ({
    isGetAllBuilder = false,
    isGetResumesTemplates = false,
    isGetCoverTemplates = false,
    isGetFormCover = false,
    isPageHome = false,
    isGetShareResume = false,
    isGetShareCover = false,
    isPageCoverLetter = false,
    isItemCoverPage = false,
    isCoverNew = false,
    isGetResumeDataAll = false,
    isGetActiveResume = false,
}) => {
    return wrapper.getServerSideProps(store => async (ctx) => {
        try {
            const cookis = cookieParse({ ctx });
            const isNew = (ctx?.query?.idCv == "new");
            const isResume = ctx?.resolvedUrl.includes('resume-builder');

            if (!!cookis?.token) {
                api.apiClient.setToken(cookis.token);
                const serverRespons = await api.auth.isAuthorization({ 'token': cookis.token });
                const isEx = isExist(serverRespons);
                await store.dispatch(setIsAuth(isEx));
            }

            if (!isNew) {
                if (!!isGetAllBuilder)
                    await getAllResumeBuilder({ dispatch: store.dispatch, idCv: ctx?.query?.idCv });

                if (!!isGetFormCover) {
                    await store.dispatch(getCoverLetterById(ctx?.query?.idCv));
                }
            }

            if (isGetActiveResume) {
                if (!isNew) {
                    if (isResume) {
                        store.dispatch(getResumeActive({ idCv: ctx?.query?.idCv }));
                    } else {
                        store.dispatch(getCoverDataActive({ idCv: ctx?.query?.idCv }));
                    }
                }
            }

            if (isCoverNew && isNew && ctx?.resolvedUrl?.includes("cover-letters")) {
                await store.dispatch(getCoverTextNoAuthNew());
            }

            if (!!isGetResumeDataAll && !isNew) {
                await store.dispatch(fetchGetResumeData({ idCv: ctx?.query?.idCv }));
            }

            if (!!isGetResumesTemplates) {
                await store.dispatch(getResumesTemplates({ page: 1, category: (ctx?.query?.category === "undefined" || ctx?.query?.category == "all") ? "" : ctx?.query?.category }));
            }

            if (!!isGetCoverTemplates) {
                await store.dispatch(getCoverTemplates({ page: 1, category: (ctx?.query?.category === "undefined" || ctx?.query?.category == "all") ? "" : ctx?.query?.category }));
            }

            if (!!isPageHome) {
                await store.dispatch(getAllPageHome({ dispatch: store.dispatch }));
            }

            if (!!isPageCoverLetter) {
                await store.dispatch(getAllPageCoverLetter({ dispatch: store.dispatch }));
            }

            if (!!isItemCoverPage) {
                if (!isNew) {
                    await store.dispatch(getCoverGenerateDate(ctx?.query?.idCv));
                }
            }

            if (!!isGetShareResume) {
                await store.dispatch(getResumeDataShare({ idCv: ctx?.query?.idCv, key: ctx?.query?.key }));
                await store.dispatch(getResumeShareTemplateActive({ idCv: ctx?.query?.idCv }));
            }

            if (!!isGetShareCover) {
                await store.dispatch(getCoverDataShare({ idCv: ctx?.query?.idCv, key: ctx?.query?.key }));
                await store.dispatch(getCoverShareTemplateActive({ idCv: ctx?.query?.idCv }));
            }

            return { props: {} };
        } catch (error) {
            console.log("withPublicRoute: ", error)
            return { props: {} };
        }
    });
};

