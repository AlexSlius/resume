import { setCookie, parseCookies, destroyCookie } from "nookies"

export const cookieSet = ({ ctx = null, key = null, data = null }) => {
    if (key === null)
        return {
            error: true,
            message: 'not key'
        }


    return setCookie(ctx, key, data, {
        path: "/",
    });
}

export const cookieParse = ({ ctx = null }) => {
    return parseCookies(ctx)
}

export const cookieDestroy = async ({ ctx = null, key = null }) => {
    if (key === null)
        return {
            error: true,
            message: 'not key'
        }

    await destroyCookie(ctx, key);
}


