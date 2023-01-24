import DP from "react-datepicker"
import moment from "moment";

export const DatePicker = ({ onChange, selected, ...others }) => {
    return (
        <DP
            selected={selected ? new Date(selected) : new Date()}
            onChange={(date) => onChange(moment(date).format())}
            calendarClassName="custom-datepicker"
            wrapperClassName="custom-datepicker-wrapper"
            dateFormat="dd/MM/yyyy"
            showMonthDropdown
            showYearDropdown
            yearDropdownItemNumber={100}
            scrollableYearDropdown
            showPopperArrow={false}
            useShortMonthInDropdown={true}
            {...others}
        />
    )
}