export const doNotTransmitEmptyData = (dataObj = {}) => {
    let obj = {};

    Object.keys(dataObj).map((itemKey) => {
        if (!!dataObj[itemKey] || dataObj[itemKey] === 0) {
            obj[itemKey] = dataObj[itemKey];
        }
    });

    return obj;
}