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

        let replaceText = positionInText ?
            textLove.replace(textValueLowe, `<i>${textValueLowe.charAt(0).toUpperCase() + textValueLowe.slice(1)}</i>`) :
            text;
        let textUpper = replaceText;

        if (textLove !== textValueLowe) isMath = true;

        if (positionInText)
            textUpper = replaceText.split(/\s+/).map((word, index) => {
                if (index > 0) {
                    return (word[0] ? word[0] : '').toUpperCase() + word.substring(1);
                }

                return word;
            }).join(' ');

        return {
            ...el,
            [keyNameDev]: textUpper,
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