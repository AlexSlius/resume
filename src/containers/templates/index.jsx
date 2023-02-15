import { CButton } from '@coreui/react'

import Icon from "../../components/Icon";
import { ButtonIcon } from "../../components/uis/buttonIcon";
import TemplateHead from "../../components/templateHead/TemplateHead";
import { ButtonBack } from "../../components/uis/buttonBack"
import { Buttonhelp } from "../../components/uis/buttonHelp"

import { routersPages } from "../../constants/next-routers";

import iconPlusColor from "/public/images/icons/plus-color.svg?sprite";
import downloadIcon from '/public/images/icons/download-white.svg?sprite'
import dotsIcon from '/public/images/icons/dots.svg?sprite'

const Templates = () => {
    return (
        <div className="page-templates">
            <div className="page-templates__row">
                <div className="page-templates__left">
                    <div className="pt_h pt_h-l plr-30">
                        <div className="pt_h-btn-back">
                            <ButtonBack text="Back to editor" />
                        </div>
                    </div>
                    <div className="pt-ts scroll-style">
                        <div className="it-t">
                            <img src="/images/page/item-t.png" alt="image template" />
                            <div className="item-card-resum__types">
                                <div className="item-type type-ptf">PDF</div>
                                <div className="item-type type-docx">DOCX</div>
                            </div>
                        </div>
                        <div className="it-t">
                            <img src="/images/page/item-t.png" alt="image template" />
                            <div className="item-card-resum__types">
                                <div className="item-type type-ptf">PDF</div>
                            </div>
                        </div>
                        <div className="it-t">
                            <img src="/images/page/item-t.png" alt="image template" />
                            <div className="item-card-resum__types">
                                <div className="item-type type-ptf">PDF</div>
                                <div className="item-type type-docx">DOCX</div>
                            </div>
                        </div>
                        <div className="it-t">
                            <img src="/images/page/item-t.png" alt="image template" />
                            <div className="item-card-resum__types">
                                <div className="item-type type-ptf">PDF</div>
                            </div>
                        </div>
                        <div className="it-t active">
                            <img src="/images/page/item-t.png" alt="image template" />
                            <div className="item-card-resum__types">
                                <div className="item-type type-ptf">PDF</div>
                                <div className="item-type type-docx">DOCX</div>
                            </div>
                        </div>
                        <div className="it-t">
                            <img src="/images/page/item-t.png" alt="image template" />
                            <div className="item-card-resum__types">
                                <div className="item-type type-ptf">PDF</div>
                            </div>
                        </div>
                        <div className="it-t">
                            <img src="/images/page/item-t.png" alt="image template" />
                            <div className="item-card-resum__types">
                                <div className="item-type type-ptf">PDF</div>
                            </div>
                        </div>
                        <div className="it-t">
                            <img src="/images/page/item-t.png" alt="image template" />
                            <div className="item-card-resum__types">
                                <div className="item-type type-ptf">PDF</div>
                                <div className="item-type type-docx">DOCX</div>
                            </div>
                        </div>
                        <div className="it-t">
                            <img src="/images/page/item-t.png" alt="image template" />
                            <div className="item-card-resum__types">
                                <div className="item-type type-ptf">PDF</div>
                                <div className="item-type type-docx">DOCX</div>
                            </div>
                        </div>
                    </div>
                    <div className="pt_b-l plr-30">
                        <div className="pt_b-l_help">
                            <Buttonhelp isBlack={true} href={`/${routersPages['contactUs']}`} />
                        </div>
                    </div>
                </div>
                <div className="page-templates__right">
                    <div className="pt_h pt_h-r">
                        <TemplateHead />
                    </div>
                    <div className="ptr-c scroll-style">
                        <div className="ptr-c__content">
                            <img src="/images/page/temapl-all.png" alt="img item templates" />
                        </div>
                    </div>
                    <div className="pt_b-r plr">
                        <div className="colors-t">
                            <div className="color-it" style={{ background: "#36F0AB" }}></div>
                            <div className="color-it" style={{ background: "#F0E208" }}></div>
                            <div className="color-it" style={{ background: "#63E1FF" }}></div>
                            <div className="color-it" style={{ background: "#FFC85E" }}></div>
                            <div className="color-it" style={{ background: "#FE8484" }}></div>
                            <div className="color-it color-select">
                                <Icon svg={iconPlusColor} />
                            </div>
                        </div>
                        <div className="btns-tem">
                            <ButtonIcon isButton={true} icon={downloadIcon} label="Download PDF" className="btn--blue" />
                            <CButton
                                className='resume-footer__button'
                                color="secondary"
                                variant="outline"
                            >
                                <Icon svg={dotsIcon} classNames={['icon-20']} />
                            </CButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Templates;