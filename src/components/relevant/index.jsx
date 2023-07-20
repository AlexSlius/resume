import Icon from "../Icon";

import iconCou from "/public/images/icons/icon_relevant-1.svg?sprite";
import iconEmpl from "/public/images/icons/icon_relevant-2.svg?sprite";
import iconCon from "/public/images/icons/icon_relevant-3.svg?sprite";
import iconEduc from "/public/images/icons/icon_relevant-4.svg?sprite";
import iconInter from "/public/images/icons/icon_relevant-5.svg?sprite";
import iconExtra from "/public/images/icons/icon_relevant-6.svg?sprite";
import iconRefe from "/public/images/icons/icon_relevant-7.svg?sprite";
import iconSoc from "/public/images/icons/icon_relevant-8.svg?sprite";
import iconLang from "/public/images/icons/icon_relevant-9.svg?sprite";
import iconSkil from "/public/images/icons/icon_relevant-10.svg?sprite";
import iconHobb from "/public/images/icons/icon_relevant-11.svg?sprite";
import iconCerti from "/public/images/icons/icon_relevant-12.svg?sprite";


export const SectionRelevant = () => {
    return (
        <section className="relevant mt-180">
            <div className="containers">
                <div className="relevant__row">
                    <div className="relevant__left">
                        <div className="relev-item">
                            <i>
                                <Icon svg={iconCou} />
                            </i>
                            <span>Courses</span>
                        </div>
                        <div className="relev-item light_green">
                            <i>
                                <Icon svg={iconEmpl} />
                            </i>
                            <span>Employment</span>
                        </div>
                        <div className="relev-item ligh_yellow">
                            <i>
                                <Icon svg={iconCon} />
                            </i>
                            <span>Contact</span>
                        </div>
                        <div className="relev-item light_blue">
                            <i>
                                <Icon svg={iconEduc} />
                            </i>
                            <span>Education</span>
                        </div>
                        <div className="relev-item light_orange">
                            <i>
                                <Icon svg={iconInter} />
                            </i>
                            <span>Internship</span>
                        </div>
                        <div className="relev-item light_purple">
                            <i>
                                <Icon svg={iconExtra} />
                            </i>
                            <span>Extra-curricular activities</span>
                        </div>
                        <div className="relev-item light_purple">
                            <i>
                                <Icon svg={iconRefe} />
                            </i>
                            <span>References</span>
                        </div>
                        <div className="relev-item">
                            <i>
                                <Icon svg={iconSoc} />
                            </i>
                            <span>Social Links & Hobbies</span>
                        </div>
                        <div className="relev-item light_red">
                            <i>
                                <Icon svg={iconLang} />
                            </i>
                            <span>Languages</span>
                        </div>
                        <div className="relev-item light_fil">
                            <i>
                                <Icon svg={iconSkil} />
                            </i>
                            <span>Skills</span>
                        </div>
                        <div className="relev-item light_ored">
                            <i>
                                <Icon svg={iconHobb} />
                            </i>
                            <span>Hobbies</span>
                        </div>
                        <div className="relev-item">
                            <i>
                                <Icon svg={iconCerti} />
                            </i>
                            <span>Certifications</span>
                        </div>
                    </div>
                    <div className="relevant__right">
                        <h2 className="h2 font-600">Relevant resume categories</h2>
                        <p className="relevant__des">We have made customized categories for every possible need, crafted in a user-friendly way, to ensure an excellent experience.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}