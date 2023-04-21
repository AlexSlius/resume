import { CButton } from '@coreui/react'
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
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

import {
    getCoverLetterById
} from "../../controllers/cover/personalize";
import { SelectColor } from '../../components/selectColor';

import { updateActiveResumeNew } from "../../slices/resumeData";
import { updateActiveCoverNew } from "../../slices/cover/coverData";

import { routersPages } from "../../constants/next-routers";

import {
    fetchGetResumeData,
    getResumeActive,
    setUpdateResumeActive,
    getResumesTemplates
} from "../../controllers/resumeData";

import {
    getCoverDataActive,
    setUpdateCoverDataActive,
    getCoverTemplates,
} from "../../controllers/cover/coverData";
import { MenuButton } from '../../components/menuButton';
import { useScaleResumePageShare } from '../../hooks/custom-hooks';

import { statusLoaded, statusLoader } from '../../constants/statuses';

import downloadIcon from '/public/images/icons/download-white.svg?sprite'
import dotsIcon from '/public/images/icons/dots.svg?sprite'
import iconPlusColor from "/public/images/icons/plus-color.svg?sprite";
import iconDotMenuH from "/public/images/icons/dot-menu-h.svg?sprite";

const Templates = ({
    isCover = false,
    isPageView = false,
}) => {
    const refIdTimeout = useRef(undefined);
    const refWr = useRef(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(false);
    const [stateLineSpacing, setStateLIneSpacig] = useState(50);
    const [stateFontSize, setStateFontSize] = useState(50);

    const [pagesPag, setPagesPag] = useState(1);
    const [pagePagCurrent, setPagePagCurrent] = useState(1);
    const [showSettings, setShowSettings] = useState(false);
    const [showColorMob, setShowColorMod] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();
    const { idCv, type = "new", slug = "001-CV" } = router.query;
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
        resumeData,
        coverData,
        coverDataForm,
        contacts: {
            contactObj,
            contactObjNew,
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
        firstName: coverDataForm.coverDataObjNew.firstName,
        lastName: coverDataForm.coverDataObjNew.lastName,
        email: coverDataForm.coverDataObjNew.email,
        phone: coverDataForm.coverDataObjNew.phone,
        country: coverDataForm.coverDataObjNew.country,
        city: coverDataForm.coverDataObjNew.city,
        zipCode: coverDataForm.coverDataObjNew.zipCode,
        state: coverDataForm.coverDataObjNew.state,
        coverGenerateDate: null,
    };

    // update resume
    const handleResume = (item) => {
        if (!isCover) {
            if (idCv != "new") {
                dispatch(setUpdateResumeActive({ idCv, data: { cv_template_id: item.id }, isGet: true }));
            } else {
                dispatch(updateActiveResumeNew({ slug: item.slug, id: item.id, colors: item.colors }))
            }
        } else {
            if (idCv != "new") {
                dispatch(setUpdateCoverDataActive({ idCv, data: { cover_template_id: item.id }, isGet: true }));
            } else {
                dispatch(updateActiveCoverNew({ slug: item.slug, id: item.id, colors: item.colors }))
            }
        }
    }

    const handleLineSpacing = (e) => {
        setStateLIneSpacig(e.target.value);
    }

    const handleFontSize = (e) => {
        setStateFontSize(e.target.value);
    }

    const handleUpdateServer = async (index) => {
        if (refIdTimeout.current) {
            clearTimeout(refIdTimeout.current);
        }

        refIdTimeout.current = setTimeout(async () => {
            if (idCv != "new") {
                const isResumeActive = dataOther?.resumeActive?.template_id;
                if (!isCover) {
                    dispatch(setUpdateResumeActive({
                        idCv, data: {
                            cv_template_id: isResumeActive,
                            template_line_spacing: stateLineSpacing,
                            template_text_size: stateFontSize,
                        }, isGet: false
                    }));
                } else {
                    dispatch(setUpdateCoverDataActive({
                        idCv, data: {
                            cover_template_id: isResumeActive,
                            template_line_spacing: stateLineSpacing,
                            template_text_size: stateFontSize,
                        }, isGet: false
                    }));
                }
            }

            clearTimeout(refIdTimeout.current);
        }, 1000);
    }

    const handleScroll = async (e) => {
        if (e.target.scrollHeight - (e.target.offsetHeight + e.target.scrollTop) < 100) {
            setFetching(true);
        }
    }

    const handleUpdateColor = (dataResume, value) => {
        if (!isCover) {
            if (idCv != "new") {
                dispatch(setUpdateResumeActive({ idCv, data: { cv_template_id: dataResume.template_id, template_class: value?.class || "" }, isGet: true }));
            } else {
                dispatch(updateActiveResumeNew({ slug: dataResume.slug, id: dataResume.template_id, template_class: value?.class || "" }))
            }
        } else {
            if (idCv != "new") {
                dispatch(setUpdateCoverDataActive({ idCv, data: { cv_template_id: dataResume.template_id, template_class: value?.class || "" }, isGet: true }));
            } else {
                dispatch(updateActiveCoverNew({ slug: dataResume.slug, id: dataResume.template_id, template_class: value?.class || "" }))
            }
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
    }

    const toggleTextSettings = () => {
        console.log('click');
        setShowSettings(!showSettings);
    }

    useEffect(() => {
        if (!isPageView) {
            async function start() {
                const isNextPage = dataOther?.list?.count_pages > currentPage;
                if (!isCover) {
                    if (fetching && isNextPage) {
                        let res = await dispatch(getResumesTemplates({ page: currentPage + 1 }));

                        if (res?.payload?.items) {
                            setCurrentPage(prev => prev + 1);
                            setFetching(false);
                        }
                    }
                } else {
                    if (fetching && isNextPage) {
                        let res = await dispatch(getCoverTemplates({ page: currentPage + 1 }));

                        if (res?.payload?.items) {
                            setCurrentPage(prev => prev + 1);
                            setFetching(false);
                        }
                    }
                }
            }
            start();
        }
    }, [fetching, dataOther.data, dataOther.resumeActive]);

    useEffect(() => {
        if (!isPageView) {
            if (typeof window != "undefined") {
                if (!!reportTemplateRef.current) {
                    let devPages = reportTemplateRef.current.querySelectorAll('.cv-body.cv-body-visible');

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
        }
    }, [pagePagCurrent, dataOther.data, dataOther.resumeActive]);

    useEffect(() => {
        if (!isPageView) {
            if (idCv != "new") {
                handleUpdateServer();
            }
        }
    }, [stateLineSpacing, stateFontSize]);

    useEffect(() => {
        const activeResume = dataOther?.resumeActive;
        setStateLIneSpacig(activeResume?.template_line_spacing ? +activeResume?.template_line_spacing : 50);
        setStateFontSize(activeResume?.template_text_size ? +activeResume?.template_text_size : 50);
    }, [dataOther]);

    useEffect(() => {
        if (!isPageView) {
            if (idCv != "new") {
                if (!isCover) {
                    // get resume
                    dispatch(fetchGetResumeData({ idCv }));
                    dispatch(getResumeActive({ idCv }));
                } else {
                    // get cover 
                    dispatch(getCoverLetterById(idCv));
                    dispatch(getCoverDataActive({ idCv }));
                }
            }

            !!refWr.current && refWr.current.addEventListener('scroll', handleScroll);

            return () => {
                !!refWr.current && refWr.current.addEventListener('scroll', handleScroll);
            }
        }
    }, []);

    useEffect(() => {
        if (!isPageView) {
            setPagePagCurrent(1);
        }
    }, [dataOther.resumeActive]);

    useEffect(() => {
        if (!isPageView) {
            if (typeof window != "undefined") {
                function start() {
                    if (!!reportTemplateRef.current) {
                        let devPages = reportTemplateRef.current.querySelectorAll('.cv-body.cv-body-visible');

                        setPagesPag(!!devPages.length ? devPages.length : 1);
                    } else {
                        setPagesPag(1);
                    }
                }

                start();

                setTimeout(() => {
                    start();
                }, 1000);
            }
        }
    }, [dataOther?.data, dataOther.resumeActive]);

    useEffect(() => {
        if (!isPageView) {
            if (!isCover) {
                if (isNewResume) {
                    dispatch(updateActiveResumeNew({ colors: templatesItems[0]?.colors || [] }));
                }
            } else {
                if (isNewResume) {
                    dispatch(updateActiveCoverNew({ colors: templatesItems[0]?.colors || [] }));
                }
            }
        }
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
                                    ['sm', 'xs', 'md'].includes(currentResolution) && (
                                        <>
                                            <div className="pt_h-logo">
                                                <img src="/images/page/logo.svg" alt='logo' />
                                            </div>
                                            <div className="pt_h-menu ab-menu menus-card">
                                                <button type='button'>
                                                    <Icon svg={iconDotMenuH} />
                                                </button>
                                                <MenuButton />
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            <div className="pt-ts scroll-style" ref={refWr}>
                                {
                                    ['sm', 'xs', 'md'].includes(currentResolution) ? (
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
                                !['sm', 'xs', 'md'].includes(currentResolution) ? (
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

                    <div className="ptr-c scroll-style">
                        <div className="ptr-c__content">
                            <div className="body-template-resume" style={{ transform: `scale(${useScaleResumePageShare()})` }}>
                                {
                                    !isCover && (
                                        <TemplatesSelect
                                            status={dataOther?.status}
                                            stateLineSpacing={stateLineSpacing}
                                            stateFontSize={stateFontSize}
                                            reportTemplateRef={reportTemplateRef}

                                            resumeData={dataOther}
                                            data={isNewResume ? dataResumeTemplate : dataOther?.data}
                                            resumeActive={isNewResume ? dataOther?.resumeActiveNew?.slug : dataOther?.resumeActive?.template_slug}
                                            statusResumeActive={dataOther?.statusResumeActive}
                                        />
                                    )
                                }

                                {
                                    isCover && (
                                        <TemplatesSelectCover
                                            status={dataOther?.status}
                                            stateLineSpacing={stateLineSpacing}
                                            stateFontSize={stateFontSize}
                                            reportTemplateRef={reportTemplateRef}

                                            resumeData={dataOther}
                                            data={isNewResume ? dataCoverLetterTemplate : { ...coverDataForm.coverDataObj, coverGenerateDate: coverDataForm.coverGenerateDate }}
                                            resumeActive={isNewResume ? dataOther?.resumeActiveNew?.slug : dataOther?.resumeActive?.template_slug}
                                            statusResumeActive={dataOther?.statusResumeActive}
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
                                    ['sm', 'xs', 'md'].includes(currentResolution) ? (
                                        <div className="ranges-row">
                                            <div className='item-range'>
                                                <CustomizedSlider
                                                    defaultValue={50}
                                                    value={stateLineSpacing}
                                                    label="Line Spacing"
                                                    textLeft="50%"
                                                    textRight="150%"
                                                    onChange={handleLineSpacing}
                                                />
                                            </div>
                                            <div className='item-range'>
                                                <CustomizedSlider
                                                    defaultValue={50}
                                                    value={stateFontSize}
                                                    label="Text size"
                                                    textLeft="12 pt"
                                                    textRight="48 pt"
                                                    onChange={handleFontSize}
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
                                                <div onClick={() => handleUpdateColor(isNewResume ? dataOther?.resumeActiveNew : dataOther?.resumeActive, item)} className={`color-it ${(dataOther?.resumeActive.template_class == item.class) ? "active" : ""}`} key={index} style={{ background: item.color }}></div>
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
                                    !['sm', 'xs', 'md'].includes(currentResolution) ? (
                                        <div className="ranges-row">
                                            <div className='item-range'>
                                                <CustomizedSlider
                                                    defaultValue={50}
                                                    value={stateLineSpacing}
                                                    label="Line Spacing"
                                                    textLeft="50%"
                                                    textRight="150%"
                                                    onChange={handleLineSpacing}
                                                />
                                            </div>
                                            <div className='item-range'>
                                                <CustomizedSlider
                                                    defaultValue={50}
                                                    value={stateFontSize}
                                                    label="Text size"
                                                    textLeft="12 pt"
                                                    textRight="48 pt"
                                                    onChange={handleFontSize}
                                                />
                                            </div>
                                        </div>
                                    ) : null
                                }
                                <div className="btns-tem">
                                    {
                                        ['sm', 'xs', 'md'].includes(currentResolution) ? (
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
                                    <ButtonIcon
                                        isButton={true}
                                        icon={downloadIcon}
                                        label="Download PDF"
                                        className="btn--blue"
                                    // onHandle={handleGeneratePdf}
                                    />
                                    {
                                        ['sm', 'xs', 'md'].includes(currentResolution) ? (
                                            <div className="color-it color-select color-it_select-mob" onClick={() => setShowColorMod(prev => !prev)}>
                                                <Icon svg={iconPlusColor} />
                                            </div>
                                        ) : (
                                            <div className="menu-show-tem ab-menu menus-card">
                                                <CButton
                                                    className='resume-footer__button'
                                                    color="secondary"
                                                    variant="outline"
                                                >
                                                    <Icon svg={dotsIcon} classNames={['icon-20']} />
                                                </CButton>
                                                <MenuButton />
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