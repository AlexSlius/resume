import { StepContent } from "../../../components/stepContent";
import { BtnContinue } from "../component/btnContinue";
import { Checked } from "../../../components/uis/checked"

const listCheck = [
    "Analytical",
    "Communication",
    "Creative thinking",
    "Critical thinking",
    "Interpersonal",
    "Language",
    "Leadership",
    "Management",
    "Multitasking",
    "Organizational",
    "Persuasion",
    "Planning",
    "Problem-solving",
    "Research",
    "Service",
    "Teamwork",
    "Technical",
    "Writing",
]

export const StepSeven = ({
    handleUpdateField = () => { },
    handleClicQuery = () => { },
    StepsName,
    coverDataObj,
    dispatch,
}) => {
    const handleClickBtn = async () => {
        await handleClicQuery(StepsName["describes"]);
    }

    const onHanleUpdate = (value) => {
        let arr = [];

        if (!!coverDataObj.skillSet) {
            arr = coverDataObj.skillSet.split(',');
            let index = arr.findIndex((el) => el == value);

            if (index != -1) {
                arr.splice(index, 1);
            } else {
                arr.push(value);
            }
        } else {
            arr = [value];
        }

        handleUpdateField({ name: "skillSet", value: arr.join(",") });
    }

    return (
        <div className="step-wr">
            <StepContent
                icon="/images/cover/icon-cover-6.svg"
                title="What are your greatest skills?"
                label="Choose two or three skills you have demonstrated in the past"
            />
            <div className="wr-form-cover">
                <div className="cover-checks">
                    {
                        listCheck.map((item, index) => (
                            <Checked
                                key={index}
                                id={`check${index}`}
                                label={item}
                                isBold={true}
                                checkbox={coverDataObj?.skillSet?.includes(item) ? true : false}
                                onChange={() => onHanleUpdate(item)}
                            />
                        ))
                    }
                </div>
            </div>

            <BtnContinue isButton={true} onHanleBtn={handleClickBtn} />
        </div>
    )
}