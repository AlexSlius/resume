import { isArray } from "lodash"

export const mathcesSelect = ({
    arrList = [],
    keyName,
    keyText,
    valueState,
    isOutDataObj,
    isSearch,
    isStaticData,
    keyNameDev
}) => {
    // то что вводим в поле, может быть как просто строка так и обект
    let textValue = isOutDataObj ? valueState[keyText] : valueState;

    if (!isArray(arrList) || !isSearch)
        return {
            data: arrList,
            marhIsAdd: false
        };

    let isMath = false;
    let textValueLowe = textValue.toLowerCase();

    let newArr = arrList.map((el => {
        let text = el[keyName];
        let textLove = text.toLowerCase();

        if (isStaticData)
            if ((textLove.indexOf(textValueLowe) == -1 || textLove.indexOf(textValueLowe) > 0) && (textValue?.length > 0)) {
                return {};
            }

        let positionInText = textValueLowe?.length > 0 && textLove.indexOf(textValueLowe) == 0;
        let textUpper = '';

        if (textLove !== textValueLowe) isMath = true;

        if (positionInText) {
            let lenghVal = textValueLowe.length;
            textUpper = `<i>${text.substr(0, lenghVal)}</i>${text.substr(lenghVal, text.length - 1)}`;
        }

        return {
            ...el,
            [keyNameDev]: positionInText ? textUpper : text,
        }
    }));

    if (arrList.length == 0 && textValue?.length > 0) {
        isMath = true;
    }

    return {
        data: newArr,
        marhIsAdd: isMath,
    };
}