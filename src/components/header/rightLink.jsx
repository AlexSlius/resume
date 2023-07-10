import Link from "next/link";

import { routersPages } from "../../constants/next-routers";

export const RightLink = () => {
    return (
        <>
            <Link href={`/${routersPages['login']}`} className="logins">Account</Link>
            <Link href={`/${routersPages['resumeBuilderNew']}`} className="get-startend">
                <span>Get started</span>
                <i></i>
            </Link>
        </>
    )
}