import { isArray, isObject } from "lodash";

import { routersPages } from "../constants/next-routers";

export const nextofLink = (routerLinksAsideMenu, path) => {
    if (!isObject(routerLinksAsideMenu))
        return false;

    let arrkeys = Object.keys(routerLinksAsideMenu);
    let len = arrkeys.length - 1;
    let nextLink = undefined;
    let ind = 0;

    arrkeys.map((key, index) => {
        if (len != index) {
            let ln = routerLinksAsideMenu[key].link;

            if (path.includes(ln)) {
                let current = routerLinksAsideMenu[arrkeys[index + 1]];

                if (!!current?.status) {
                    nextLink = current?.link;
                }

                ind = index;
            }
        }
    });

    if (!nextLink && ind > 0) {
        for (let i = ind + 1; i < routerLinksAsideMenu.length; i++) {
            if (!!routerLinksAsideMenu[i]?.audit)
                if (!!routerLinksAsideMenu[i]?.status) {
                    nextLink = routerLinksAsideMenu[i]?.link;
                    break;
                }
        }
    }

    if (!nextLink) {
        nextLink = `/${routersPages['addSection']}`;
    }

    return nextLink;
}

export const prevOfLink = (routerLinksAsideMenu, path) => {
    if (!isObject(routerLinksAsideMenu))
        return false;

    let arrkeys = Object.keys(routerLinksAsideMenu);
    let prevLink = undefined;

    arrkeys.map((key, index) => {
        if (path.includes(routerLinksAsideMenu[key].link)) {
            if (index != 0)
                prevLink = routerLinksAsideMenu[arrkeys[index - 1]]?.link
        }
    });

    return prevLink;
}

export const isAllActive = (routerLinksAsideMenu) => {
    let status = false;

    if (isArray(routerLinksAsideMenu)) {
        let len = routerLinksAsideMenu.length;
        let numb = 0;

        for (let i = 0; i < routerLinksAsideMenu.length; i++) {
            if (!!routerLinksAsideMenu[i].status) {
                numb += 1;
            }
        }

        if (len == numb)
            status = true;

    }

    return status;
}