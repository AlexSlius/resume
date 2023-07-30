import { CButton } from '@coreui/react'
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Router, { useRouter } from 'next/router';
import { isArray } from 'lodash';
import Carousel from 'react-material-ui-carousel'

import { SvgImage } from "../../components/svgImage";
import { TemplatesSelect } from '../../components/templatesSelect';
import { TemplatesSelectCover } from '../../components/templateSelectCover';
import Icon from "../../components/Icon";
import { ButtonIcon } from "../../components/uis/buttonIcon";
import TemplateHead from "../../components/templateHead/TemplateHead";
import { ButtonBack } from "../../components/uis/buttonBack"
import { Buttonhelp } from "../../components/uis/buttonHelp"
import CustomizedSlider from '../../components/uis/range';
import { MenuButton } from '../../components/menuButton';
import { SelectColor } from '../../components/selectColor';
import { LoadChildrenBtn } from '../../components/loadChildrenBtn';

import { downloadPdf, getScreenResume } from "../../controllers/resumes";
import { downloadLetterPdf, getScreenCover } from "../../controllers/cover/covers";

import {
    updateActiveResumeNew,
    updateActiveResume,
    handleCVUpdateDrawingTrue
} from "../../slices/resumeData";
import {
    updateActiveCoverNew,
    updateActiveCover
} from "../../slices/cover/coverData";
import { handleUpdateDrawingTrue } from "../../slices/cover/coverDataForm";

import {
    // fetchGetResumeData,
    getResumeActive,
    setUpdateResumeActive,
    getResumesTemplates
} from "../../controllers/resumeData";
import {
    getCoverDataActive,
    setUpdateCoverDataActive,
    getCoverTemplates,
} from "../../controllers/cover/coverData";
import { getCoverTextNoAuthNew } from "../../controllers/cover/personalize";
import { useScaleResumePageShare } from '../../hooks/custom-hooks';
import { handleChanbdegAutOrPlan } from "../../utils/downShare";
import { validEmail } from '../../helpers/validEmail';

import { routersPages } from "../../constants/next-routers";

import downloadIcon from '/public/images/icons/download-white.svg?sprite'
import dotsIcon from '/public/images/icons/dots.svg?sprite'
import iconPlusColor from "/public/images/icons/plus-color.svg?sprite";
import iconDotMenuH from "/public/images/icons/dot-menu-h.svg?sprite";

const Templates = ({
    isCover = false,
    isPageView = false,
    beforeСontent = true,
}) => {
    const refIdTimeout = useRef(undefined);
    const refWr = useRef(undefined);
    const refTime = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(false);

    const [pagesPag, setPagesPag] = useState(1);
    const [pagePagCurrent, setPagePagCurrent] = useState(1);
    const [showSettings, setShowSettings] = useState(false);
    const [showColorMob, setShowColorMod] = useState(false);
    const [stateLoadDown, setStatesetStateLoadDown] = useState(false);
    const [isOnegetMobTemplate, setIsOnegetTemplate] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();
    const { idCv, shareKey } = router.query;
    const reportTemplateRef = useRef(null);
    const isNewResume = (idCv == "new");

    const {
        auth: {
            autorizate: {
                isAthorized,
            }
        },
        theme: {
            currentResolution
        },
        users: {
            isSubscribe
        },
        resumeData,
        coverData,
        coverDataForm,
        contacts: {
            contactObj,
            contactObjNew,
            emailRegister
        },
        employment,
        educations,
        skills,
        socials,
        hobies,
        interships,
        courses,
        activitys,
        languages,
        references,
        certificaties,
        careers,
    } = useSelector((state) => state);

    const dataOther = isCover ? coverData : resumeData;
    const templatesItems = isCover ? coverData?.list?.items : resumeData?.list?.items;
    const showBtn = (!isAthorized && isNewResume) ?
        !validEmail(router.asPath.includes(routersPages['resumeBuilder']) ?
            emailRegister?.length > 0 ? emailRegister : contactObjNew.email :
            coverDataForm?.emailRegister?.length > 0 ? coverDataForm.emailRegister : coverDataForm.coverDataObjNew.emain) :
        false;

    const isMode = ['sm', 'xs', 'md', 'lg'].includes(currentResolution);

    let dataResumeTemplate = {
        contact: isNewResume ? [contactObjNew] : [contactObj],
        employment: employment.employmentObj,
        education: educations.educationObj,
        skills: skills?.skillsObj?.skillsListAll || [],
        social_links: socials.socialObj,
        hobbies: hobies.hobiesObj,
        internship: interships.interhipObj,
        courses: courses.courseObj,
        extra_curricular: activitys.activityObj,
        career_objective: [{ data: careers.data }],
        languages: languages.languageObj,
        reference: references.referencesObj,
        certificates: certificaties.certificatiesObj,
        hide_experience_level: skills?.skillsObj?.hideExperienceLevel,
    };

    let dataCoverLetterTemplate = {
        firstName: coverDataForm.coverDataObj.firstName,
        lastName: coverDataForm.coverDataObj.lastName,
        email: coverDataForm.coverDataObj.email,
        phone: coverDataForm.coverDataObj.phone,
        country: coverDataForm.coverDataObj.country,
        city: coverDataForm.coverDataObj.city,
        zipCode: coverDataForm.coverDataObj.zipCode,
        state: coverDataForm.coverDataObj.state,
        coverGenerateDate: coverDataForm.coverGenerateDate,
        from: coverDataForm.from,
        to: coverDataForm.to,
    };

    let dataCoverLetterTemplateNew = {
        firstName: coverDataForm.coverDataObjNew.firstName,
        lastName: coverDataForm.coverDataObjNew.lastName,
        email: coverDataForm.coverDataObjNew.email,
        phone: coverDataForm.coverDataObjNew.phone,
        country: coverDataForm.coverDataObjNew.country,
        city: coverDataForm.coverDataObjNew.city,
        zipCode: coverDataForm.coverDataObjNew.zipCode,
        state: coverDataForm.coverDataObjNew.state,
        coverGenerateDate: coverDataForm.coverGenerateDate,
        from: coverDataForm.from,
        to: coverDataForm.to,
    };

    // update resume
    const handleResume = (item) => {
        let colorClass = "";

        if (item?.colors?.length > 0) {
            colorClass = item.colors[0].class;
        }

        if (!isCover) {
            if (!isNewResume) {
                dispatch(setUpdateResumeActive({ idCv, data: { cv_template_id: item.id, template_class: colorClass }, isGet: true }));
            } else {
                dispatch(updateActiveResumeNew({ slug: item.slug, id: item.id, colors: item.colors, template_class: colorClass }))
            }
        } else {
            if (!isNewResume) {
                dispatch(setUpdateCoverDataActive({ idCv, data: { cover_template_id: item.id, template_class: colorClass }, isGet: true }));
            } else {
                dispatch(updateActiveCoverNew({ slug: item.slug, id: item.id, colors: item.colors, template_class: colorClass }))
            }
        }
    }

    const handleUpdateColor = (dataResume, value) => {
        if (!isCover) {
            if (!isNewResume) {
                dispatch(updateActiveResume({ template_class: value?.class || "" }));
            } else {
                dispatch(updateActiveResumeNew({ slug: dataResume.slug, id: dataResume.template_id, template_class: value?.class || "" }))
            }
        } else {
            if (!isNewResume) {
                dispatch(updateActiveCover({ template_class: value?.class || "" }));
            } else {
                dispatch(updateActiveCoverNew({ slug: dataResume.slug, id: dataResume.template_id, template_class: value?.class || "" }))
            }
        }
    }

    const handleFont = (e, name) => {
        if (!isCover) {
            if (!isNewResume) {
                dispatch(updateActiveResume({ [name]: e.target.value }));
            } else {
                dispatch(updateActiveResumeNew({ [name]: e.target.value }))
            }
        } else {
            if (!isNewResume) {
                dispatch(updateActiveCover({ [name]: e.target.value }));
            } else {
                dispatch(updateActiveCoverNew({ [name]: e.target.value }))
            }
        }
    }

    const handleUpdateServer = async () => {
        const { template, ...obj } = dataOther.resumeActive;
        if (refIdTimeout.current) {
            clearTimeout(refIdTimeout.current);
        }

        refIdTimeout.current = setTimeout(async () => {
            if (!isNewResume) {
                if (!isCover) {
                    dispatch(setUpdateResumeActive({
                        idCv, data: {
                            ...obj
                        }, isGet: false
                    }));
                } else {
                    dispatch(setUpdateCoverDataActive({
                        idCv, data: {
                            ...obj
                        }, isGet: false
                    }));
                }
            }

            clearTimeout(refIdTimeout.current);
        }, 10);
    }

    const handleScroll = async (e) => {
        if (e.target.scrollHeight - (e.target.offsetHeight + e.target.scrollTop) < 100) {
            setFetching(true);
        }
    }

    const onNext = () => {
        setPagePagCurrent(prev => prev + 1);
    }

    const onPrev = () => {
        setPagePagCurrent(prev => prev - 1);
    }

    const templateChangeHandler = (now, previous) => {
        handleResume(templatesItems[now]);
        if (now == 1 && !isOnegetMobTemplate) {
            if (!isCover) {
                dispatch(getResumesTemplates({ page: resumeData?.list?.count_pages }));
            } else {
                dispatch(getCoverTemplates({ page: coverData?.list?.count_pages }));
            }

            setIsOnegetTemplate(true);
        }
    }

    const toggleTextSettings = () => {
        setShowSettings(!showSettings);
    }

    const handleDownload = () => {
        setStatesetStateLoadDown(true);

        if (!isCover) {
            dispatch(downloadPdf({ id: idCv, shareKey: shareKey, setStatesetStateLoadDown }));
        }

        if (isCover) {
            dispatch(downloadLetterPdf({ id: idCv, shareKey: shareKey, setStatesetStateLoadDown }));
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
            isSubscribe
        });
    }

    useEffect(() => {
        if (dataOther?.resumeActive?.template_id) {
            handleUpdateServer();
        }

    }, [dataOther?.resumeActive]);

    useEffect(() => {
        if (!isPageView) {
            async function start() {
                const isNextPage = dataOther?.list?.count_pages > currentPage;

                if (!isCover) {
                    if (fetching && isNextPage) {
                        let res = await dispatch(getResumesTemplates({ page: currentPage + 1 }));
                        if (res?.payload?.items) {
                            setFetching(false);
                            setCurrentPage((currentPage + 1));
                        }
                    }
                } else {
                    if (fetching && isNextPage) {
                        let res = await dispatch(getCoverTemplates({ page: currentPage + 1 }));

                        if (res?.payload?.items) {
                            setFetching(false);
                            setCurrentPage((currentPage + 1));
                        }
                    }
                }
            }
            start();
        }
    }, [fetching]);

    useEffect(() => {
        if (!isPageView) {
            if (typeof window != "undefined") {
                if (!!reportTemplateRef.current) {
                    if (refTime.current) {
                        clearTimeout(refTime.current);
                    }

                    function start() {
                        let devPages = reportTemplateRef.current?.querySelectorAll('.cv-body.cv-body-visible');
                        setPagesPag(!!devPages?.length ? devPages.length : 1);

                        if (!!devPages) {
                            devPages.forEach(element => {
                                element.classList.add("none");
                            });

                            let currentPage = devPages[pagePagCurrent - 1];

                            if (!!currentPage) {
                                currentPage.classList.remove("none");
                                currentPage.classList.add("active");
                            }
                        }
                    }

                    start();
                }
                else {
                    setPagesPag(1);
                }
            }
        }
    }, [pagePagCurrent, dataOther, dataOther.drawing, coverDataForm.drawing]);

    useEffect(() => {
        if (!isPageView) {
            setPagePagCurrent(1);
        }
    }, [dataOther.resumeActive]);

    useEffect(() => {
        if (isNewResume)
            dispatch(getCoverTextNoAuthNew());

        if (!isPageView) {
            if (!isCover) {
                if (isNewResume) {
                    dispatch(updateActiveResumeNew({ colors: templatesItems[0]?.colors || [] }));
                    if (!!templatesItems[0]?.colors?.[0]?.class)
                        dispatch(updateActiveResumeNew({ template_class: templatesItems[0]?.colors?.[0]?.class || "" }));
                }
            } else {
                if (isNewResume) {
                    dispatch(updateActiveCoverNew({ colors: templatesItems[0]?.colors || [] }));
                    if (!!templatesItems[0]?.colors?.[0]?.class)
                        dispatch(updateActiveCoverNew({ template_class: templatesItems[0]?.colors?.[0]?.class || "" }));
                }
            }

            if (!isNewResume) {
                async function startA() {
                    if (!isCover) {
                        // get resume
                        let res = await dispatch(getResumeActive({ idCv }));

                        if (res?.payload?.template_id) {
                            setTimeout(() => {
                                dispatch(handleCVUpdateDrawingTrue());
                            }, 1000);
                        }
                    } else {
                        // get cover 
                        let res = await dispatch(getCoverDataActive({ idCv }));

                        if (res?.payload?.template_id) {
                            setTimeout(() => {
                                dispatch(handleCVUpdateDrawingTrue());
                            }, 1000);
                        }
                    }
                }

                startA();
            }

            !!refWr.current && refWr.current.addEventListener('scroll', handleScroll);

            return () => {
                !!refWr.current && refWr.current.addEventListener('scroll', handleScroll);
            }
        }

        return () => {
            let idR = router?.query?.idCv;
            let shareKey = router?.query?.shareKey;
            let path = router?.asPath;

            if (idR != "new") {
                if (!!path.includes(routersPages['resumeBuilder'])) {
                    dispatch(getScreenResume({ id: idR, shareKey }));
                }

                if (!!path.includes(routersPages['coverLetter'])) {
                    dispatch(getScreenCover({ id: idR, shareKey }));
                }
            }
        }
    }, []);

    useEffect(() => {
        setPagePagCurrent(1);
        dispatch(handleCVUpdateDrawingTrue());
        dispatch(handleUpdateDrawingTrue());
    }, []);

    return (
        <div className={`page-templates ${isPageView ? "page-view-share" : "page-template"}`}>
            <div className="page-templates__row">
                {
                    !isPageView && (
                        <div className="page-templates__left">
                            <div className="pt_h pt_h-l plr-30">
                                <div className="pt_h-btn-back ">
                                    <ButtonBack text="Back to editor" />
                                </div>
                                {
                                    isMode && (
                                        <>
                                            <div className="pt_h-logo">
                                                <img src="/images/page/logo.svg" alt='logo' />
                                            </div>
                                            <div className="pt_h-menu ab-menu menus-card">
                                                <button type='button'>
                                                    <Icon svg={iconDotMenuH} />
                                                </button>
                                                <MenuButton isMob={true} isAthorized={isAthorized} handleChanbdegAutOrPlan={chanbdegAutOrPlan} />
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            <div className="pt-ts scroll-style" ref={refWr}>
                                {
                                    isMode ? (
                                        <div className='carousel'>
                                            <span className='carousel-title'>Template</span>
                                            <Carousel
                                                autoPlay={false}
                                                indicators={false}
                                                swipe={true}
                                                navButtonsAlwaysVisible={true}
                                                cycleNavigation={false}
                                                animation={'slide'}
                                                onChange={templateChangeHandler}
                                                navButtonsProps={{ className: 'nav-button' }}
                                                NextIcon={<SvgImage image={'arrow-right'} width={'14px'} height={'17px'} color={'#C4C7D0'} />}
                                                PrevIcon={<div className="block-rotate arrow-left"><SvgImage image={'arrow-right'} width={'14px'} height={'17px'} color={'#C4C7D0'} /></div>}
                                            >
                                                {
                                                    isArray(templatesItems) && templatesItems.map((item, index) => (
                                                        <div key={`item-${index}`} className="carousel-item-block">{item.name}</div>
                                                    ))
                                                }
                                            </Carousel>
                                        </div>
                                    ) :
                                        (
                                            isArray(templatesItems) && templatesItems.map((item, index) => {
                                                let classActive = isNewResume ? `${item.slug == dataOther?.resumeActiveNew?.slug ? "active" : ""}` : `${item.id == dataOther?.resumeActive?.template_id ? "active" : ""}`;

                                                return (
                                                    <div
                                                        key={index}
                                                        className={`it-t ${classActive}`}
                                                        onClick={() => handleResume(item)}
                                                    >
                                                        <img src={item.image} alt={item.name} />
                                                        {
                                                            (isArray(item?.types) && item.types.length > 0) && (
                                                                <div className="item-card-resum__types">
                                                                    {
                                                                        item.types.map((itemType, index) => (
                                                                            <div key={index} className="item-type type-ptf" style={{ background: itemType.background }}>{itemType.name}</div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            })
                                        )
                                }
                            </div>
                            {
                                !isMode ? (
                                    <div className="pt_b-l plr-30">
                                        <div className="pt_b-l_help">
                                            <Buttonhelp isBlack={true} href={`/${routersPages['contactUs']}`} />
                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>
                    )
                }

                <div className="page-templates__right">
                    {
                        !isPageView && (
                            !['sm', 'xs', 'md'].includes(currentResolution) ? (
                                <div className="pt_h pt_h-r">
                                    <TemplateHead
                                        currentPage={pagePagCurrent}
                                        lengthPages={pagesPag}
                                        onNext={onNext}
                                        onPrev={onPrev}
                                    />
                                </div>
                            ) : null
                        )
                    }

                    {/* hide_scroll */}
                    <div className={`ptr-c scroll-style`}>
                        <div className="ptr-c__content">
                            <div className="body-template-resume" style={{ transform: `scale(${useScaleResumePageShare()})` }}>
                                {
                                    !isCover && (
                                        <TemplatesSelect
                                            isNewResume={isNewResume}
                                            status={dataOther?.status}
                                            stateLineSpacing={isNewResume ? dataOther?.resumeActiveNew?.template_line_spacing : dataOther?.resumeActive?.template_line_spacing}
                                            stateFontSize={isNewResume ? dataOther?.resumeActiveNew?.template_text_size : dataOther?.resumeActive?.template_text_size}
                                            reportTemplateRef={reportTemplateRef}
                                            resumeData={dataOther}
                                            data={isNewResume ? dataResumeTemplate : dataOther?.data}
                                            resumeActive={isNewResume ? dataOther?.resumeActiveNew?.slug : dataOther?.resumeActive?.template_slug}
                                            statusResumeActive={dataOther?.statusResumeActive}
                                            drawing={dataOther.drawing}
                                            isTemplate={true}
                                            beforeСontent={beforeСontent}
                                        />
                                    )
                                }

                                {
                                    isCover && (
                                        <TemplatesSelectCover
                                            status={dataOther?.status}
                                            stateLineSpacing={isNewResume ? dataOther?.resumeActiveNew?.template_line_spacing : dataOther?.resumeActive?.template_line_spacing}
                                            stateFontSize={isNewResume ? dataOther?.resumeActiveNew?.template_text_size : dataOther?.resumeActive?.template_text_size}
                                            reportTemplateRef={reportTemplateRef}
                                            isNewResume={isNewResume}
                                            resumeData={dataOther}
                                            data={isNewResume ? dataCoverLetterTemplateNew : dataCoverLetterTemplate}
                                            resumeActive={isNewResume ? dataOther?.resumeActiveNew?.slug : dataOther?.resumeActive?.template_slug}
                                            statusResumeActive={dataOther?.statusResumeActive}
                                            drawing={coverDataForm.drawing}
                                            isTemplate={true}
                                            beforeСontent={beforeСontent}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    {
                        !isPageView && (
                            <div className={`pt_b-r plr buttons-wrapper${showSettings ? ' show' : ''}`}>
                                {
                                    isMode ? (
                                        <div className="ranges-row">
                                            <div className='item-range'>
                                                <CustomizedSlider
                                                    defaultValue={50}
                                                    value={isNewResume ? (+dataOther?.resumeActiveNew?.template_line_spacing || 0) : (+dataOther?.resumeActive?.template_line_spacing || 0)}
                                                    label="Line Spacing"
                                                    textLeft="50%"
                                                    textRight="150%"
                                                    onChange={(e) => handleFont(e, "template_line_spacing")}
                                                />
                                            </div>
                                            <div className='item-range'>
                                                <CustomizedSlider
                                                    defaultValue={50}
                                                    value={isNewResume ? +dataOther?.resumeActiveNew?.template_text_size : +dataOther?.resumeActive?.template_text_size}
                                                    label="Text size"
                                                    textLeft="12 pt"
                                                    textRight="48 pt"
                                                    onChange={(e) => handleFont(e, "template_text_size")}
                                                />
                                            </div>
                                        </div>
                                    ) : null
                                }

                                <div className={`colors-t-wrapper ${showColorMob ? "colors-t-wrapper__open" : ""}`}>
                                    <div className="colors-t">
                                        {
                                            isArray(isNewResume ? dataOther?.resumeActiveNew?.colors : dataOther?.resumeActive?.template?.colors) &&
                                            (isNewResume ? dataOther?.resumeActiveNew?.colors : dataOther?.resumeActive?.template?.colors).map((item, index) => (
                                                <div onClick={() => handleUpdateColor(isNewResume ? dataOther?.resumeActiveNew : dataOther?.resumeActive, item)} className={`color-it ${((isNewResume ? dataOther?.resumeActiveNew : dataOther?.resumeActive).template_class == item.class) ? "active" : ""}`} key={index} style={{ background: item.color }}></div>
                                            ))
                                        }
                                        {
                                            isArray(isNewResume ? dataOther?.resumeActiveNew?.colors : dataOther?.resumeActive?.template?.colors) && ((isNewResume ? dataOther?.resumeActiveNew?.colors : dataOther?.resumeActive?.template?.colors)?.length == 1) && (
                                                <SelectColor />
                                            )
                                        }
                                    </div>
                                </div>
                                {
                                    !isMode ? (
                                        <div className="ranges-row">
                                            <div className='item-range'>
                                                <CustomizedSlider
                                                    defaultValue={50}
                                                    value={isNewResume ? (+dataOther?.resumeActiveNew?.template_line_spacing || 0) : (+dataOther?.resumeActive?.template_line_spacing || 0)}
                                                    label="Line Spacing"
                                                    textLeft="50%"
                                                    textRight="150%"
                                                    onChange={(e) => handleFont(e, "template_line_spacing")}
                                                />
                                            </div>
                                            <div className='item-range'>
                                                <CustomizedSlider
                                                    defaultValue={50}
                                                    value={isNewResume ? (+dataOther?.resumeActiveNew?.template_text_size || 0) : (+dataOther?.resumeActive?.template_text_size || 0)}
                                                    label="Text size"
                                                    textLeft="12 pt"
                                                    textRight="48 pt"
                                                    onChange={(e) => handleFont(e, "template_text_size")}
                                                />
                                            </div>
                                        </div>
                                    ) : null
                                }
                                <div className="btns-tem">
                                    {
                                        isMode ? (
                                            <div className={`font-settings-wrap`}>
                                                <div className="font-settings" onClick={toggleTextSettings}>
                                                    {
                                                        showSettings ?
                                                            (
                                                                <SvgImage image={'close'} width={'11px'} height={'11px'} color={'#F63B3B'} />
                                                            ) :
                                                            (
                                                                <SvgImage image={'text'} width={'18px'} height={'16px'} color={'#838799'} />
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        ) : null
                                    }

                                    <LoadChildrenBtn isLoad={stateLoadDown}>
                                        <ButtonIcon
                                            isButton={true}
                                            icon={downloadIcon}
                                            label="Download PDF"
                                            className={`btn--blue ${showBtn ? "opacet" : ""}`}
                                            onHandle={() => chanbdegAutOrPlan(handleDownload)}
                                        />
                                    </LoadChildrenBtn>

                                    {
                                        isMode ? (
                                            <div className="color-it color-select color-it_select-mob" onClick={() => setShowColorMod(prev => !prev)}>
                                                <Icon svg={iconPlusColor} />
                                            </div>
                                        ) : (
                                            <div className={`menu-show-tem ab-menu menus-card ${showBtn ? "opacet" : ""}`}>
                                                <CButton
                                                    className='resume-footer__button'
                                                    color="secondary"
                                                    variant="outline"
                                                >
                                                    <Icon svg={dotsIcon} classNames={['icon-20']} />
                                                </CButton>
                                                <MenuButton isNew={isNewResume} handleChanbdegAutOrPlan={chanbdegAutOrPlan} />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Templates;