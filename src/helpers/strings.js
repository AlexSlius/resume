export const theFirstHeaderCharacter = (str) => {
    const firstChar = str.charAt(0);
    return str.replace(firstChar, firstChar.toUpperCase());
}

export const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;


export const capitalizeAll = (str) => {
    return str.replace(/(^|\s)\S/g, function (a) { return a.toUpperCase() })
}