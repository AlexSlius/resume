export const doNotTransmitEmptyData = (dataObj = {}) => {
    let obj = {};

    Object.keys(dataObj).map((itemKey) => {
        if (dataObj[itemKey]?.length == 0 || dataObj[itemKey] === 0 || dataObj[itemKey] === null || dataObj[itemKey] == "null") {
            obj[itemKey] = '';
        } else {
            obj[itemKey] = dataObj[itemKey];
        }
    });

    return obj;
}