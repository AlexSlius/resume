import { useState } from 'react';

// Libraries
import { isArray } from 'lodash';

// Components
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Styles
import style from "./Style.module.scss";

export const AccordionComponent = ({
    arr = [],
    defaultStart = false
}) => {
    const [expanded, setExpanded] = useState(defaultStart ? `panel${defaultStart}` : false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={`${style.wr}`}>
            {
                isArray(arr) && arr.map((item, index) => (
                    <Accordion
                        key={index}
                        className={`${style.accordeon}`}
                        id={`additional-${index}`}
                        expanded={expanded === `panel${index}`}
                        onChange={handleChange(`panel${index}`)}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <div className={`${style.accordeon_title} title-accord`}>{item.title}</div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={`${style.accordeon_text}`} dangerouslySetInnerHTML={{ __html: item.text }}></div>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </div>
    )
}