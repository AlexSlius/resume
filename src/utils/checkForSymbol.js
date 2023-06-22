export const checkForSymbol = (obj) => {
    console.log(obj);
    let isData = 0;
    obj.forEach(element => {
        if (element) {
            isData++;
        }
    });
    if (isData) {
        return true;
    } else {
        return false;
    }
}