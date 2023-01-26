import { isArray } from "lodash"

export const newPosition = (arr = []) => {
    if (!isArray(arr))
        return 0;

    let len = arr.length;

    if (len == 0)
        return 1;

    return len + 1;
}

export const arrPositionUpdateItem = (arr) => {
    let newArr = [];

    arr.forEach((element, index) => {
        let newObj = { ...element };
        newObj.position = (index + 1);
        newArr.push(newObj);
    });

    return newArr;
}