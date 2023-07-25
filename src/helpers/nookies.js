import { setCookie, parseCookies, destroyCookie } from "nookies"

export const cookieSet = ({ ctx = null, key = null, data = null, accessExpiresIn = 17280000 }) => {
    if (key === null)
        return {
            error: true,
            message: 'not key'
        }


    return setCookie(ctx, key, data, {
        path: "/",
        maxAge: accessExpiresIn,
    });
}

export const cookieParse = ({ ctx = null }) => {
    return parseCookies(ctx)
}

export const cookieDestroy = ({ ctx = null, key = null }) => {
    if (key === null)
        return {
            error: true,
            message: 'not key'
        }

    destroyCookie(ctx, key);
}

export const deleteCookie = (key) => {
    setCookie(null, key, "", {
        path: "/",
        maxAge: -1,
    });
}


