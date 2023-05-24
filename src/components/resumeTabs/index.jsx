import Icon from "../Icon";

import iconAll from "/public/images/icons/icon-btn-all.svg?sprite";
import iconCreative from "/public/images/icons/icon-creative.svg?sprite";
import iconSimple from "/public/images/icons/icon-simple.svg?sprite";
import iconProfessional from "/public/images/icons/icon-professional.svg?sprite";
import iconModern from "/public/images/icons/icon-modern.svg?sprite";

export const ResumeTabs = ({
    category,
    handleCategory = () => { },
}) => {
    return (
        <div className="resumes-tabs">
            <div className="resumes-tab">
                <button type="button" className={`resumes-tab-btn ${(category === undefined || category === "all") ? 'active' : ''}`} onClick={() => handleCategory("all")}>
                    <Icon svg={iconAll} />
                    <span>All templates</span>
                </button>
            </div>
            <div className="resumes-tab">
                <button type="button" className={`resumes-tab-btn ${category === 'Creative' ? 'active' : ''}`} onClick={() => handleCategory('Creative')}>
                    <Icon svg={iconCreative} />
                    <span>Creative</span>
                </button>
            </div>
            <div className="resumes-tab">
                <button type="button" className={`resumes-tab-btn ${category === 'Simple' ? 'active' : ''}`} onClick={() => handleCategory('Simple')}>
                    <Icon svg={iconSimple} />
                    <span>Simple</span>
                </button>
            </div>
            <div className="resumes-tab">
                <button type="button" className={`resumes-tab-btn ${category === 'Professional' ? 'active' : ''}`} onClick={() => handleCategory('Professional')}>
                    <Icon svg={iconProfessional} />
                    <span>Professional</span>
                </button>
            </div>
            <div className="resumes-tab">
                <button type="button" className={`resumes-tab-btn ${category === 'Modern' ? 'active' : ''}`} onClick={() => handleCategory('Modern')}>
                    <Icon svg={iconModern} />
                    <span>Modern</span>
                </button>
            </div>
        </div>
    )
}