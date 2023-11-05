export const formatDataCardDash = (dateUpdate) => {
    let dat = new Date(dateUpdate).setHours((new Date().getTimezoneOffset() / 60));
    let cuer = new Date(dat);

    let month = cuer.getMonth(),
        year = cuer.getFullYear(),
        day = cuer.getDate(),
        hour = cuer.getHours(),
        minute = cuer.getMinutes(),
        second = cuer.getSeconds();

    return `${year}-${("0"+month).slice(-2)}-${("0"+day).slice(-2)} ${("0"+hour).slice(-2)}:${("0"+minute).slice(-2)}:${("0"+second).slice(-2)}`;
}