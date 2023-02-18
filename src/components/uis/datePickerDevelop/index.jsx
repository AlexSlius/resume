// import React, { Component } from 'react';
// import moment from 'moment';
// import { CFormInput } from "@coreui/react"
// import { DatetimePickerTrigger } from 'rc-datetime-picker';

// export const DatePicker = ({
//     onChange,
//     selected,
//     floatingLabel,
//     placeholderText,
//     name
// }) => {
//     const useWrCal = React.useRef(undefined);
//     const useOneStart = React.useRef(false);
//     const useUpdates = React.useRef(false);
//     const [calState, setCalState] = React.useState(selected ? moment(new Date(selected)) : moment());

//     const handle = (mom) => {
//         setCalState(mom);
//     }

//     React.useEffect(() => {
//         if (useOneStart.current) {
//             onChange(calState.format());
//         } else {
//             useOneStart.current = true;
//         }
//     }, [useUpdates.current]);

//     React.useEffect(() => {
//         if (!!useWrCal.current) {
//             let index = 0;
//             let dPick = useWrCal.current.querySelector('.datetime-picker');
//             let dDays = useWrCal.current.querySelector('.calendar-days');
//             let dMonth = useWrCal.current.querySelector('.calendar-months');
//             let dYears = useWrCal.current.querySelector('.calendar-years');

//             index += 1;

//             dYears.style.display = "block";
//             dMonth.style.display = "none";
//             dDays.style.display = "none";

//             const handledYears = () => {
//                 dYears.style.display = "none";
//                 dMonth.style.display = "block";
//             }

//             const handledMonth = () => {
//                 dMonth.style.display = "none";
//                 dDays.style.display = "block";
//             }

//             const handledDays = () => {
//                 dYears.style.display = "block";
//                 dMonth.style.display = "none";
//                 dDays.style.display = "none";
//                 dPick.style.display = "none";
//                 useUpdates.current = `updae${index}`;
//             }

//             dDays.querySelectorAll('td').forEach(element => {
//                 element.addEventListener('click', handledDays);
//             });

//             dMonth.querySelectorAll('td').forEach(element => {
//                 element.addEventListener('click', handledMonth);
//             });

//             dYears.querySelectorAll('td').forEach(element => {
//                 element.addEventListener('click', handledYears);
//             });


//             return () => {
//                 !!dDays && dDays.querySelectorAll('td').forEach(element => {
//                     element.addEventListener('click', handledDays);
//                 });

//                 !!dMonth && dMonth.querySelectorAll('td').forEach(element => {
//                     element.addEventListener('click', handledMonth);
//                 });

//                 !!dYears && dYears.querySelectorAll('td').forEach(element => {
//                     element.addEventListener('click', handledYears);
//                 });
//             }
//         }
//     }, []);

//     return (
//         <div className='wt-cal' ref={useWrCal}>
//             <DatetimePickerTrigger
//                 showTimePicker={false}
//                 format="dd/MM/yyyy"
//                 moment={calState}
//                 onChange={handle}
//             >
//                 <CFormInput
//                     name={name}
//                     value={selected ? moment(new Date(selected)).format('MMM, YYYY') : ""}
//                     floatingLabel={floatingLabel}
//                     placeholder={placeholderText}
//                 />
//             </DatetimePickerTrigger>
//         </div>
//     )
// }