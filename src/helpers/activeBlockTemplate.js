import { isArray } from "lodash"

export const activeTemplateBlock = (list, tab) => {
    if (!isArray(list))
        return null;

    let res = {};

    for (let i = 0; i < list.length; i++) {
        let item = list[i];

        res[item.key] = !!item.link.includes(tab)
    }

    return res;
}