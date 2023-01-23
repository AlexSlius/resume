import { isObject } from "lodash"
import Router, { useRouter } from 'next/router'

import { Tab } from "./Tab"

import style from "./Style.module.scss"

export const Tabs = ({
    obj = {},

}) => {
    const router = useRouter();

    const handleOnClick = (dTab) => {
        Router.push({
            pathname: `${router.route}`,
            query: { tab: dTab.link },
        })
    }

    return (
        <div className={`${style.row}`}>
            {
                isObject(obj) && Object.keys(obj).map((key, index) => {
                    let isActive = false

                    if ((index == 0) && !(router.query?.tab)) {
                        isActive = true;
                    } else {
                        isActive = obj[key].link == router.query.tab;
                    }

                    return (
                        <Tab
                            key={index}
                            label={obj[key].label}
                            isActive={isActive}
                            data={obj[key]}
                            onClick={handleOnClick}
                        />
                    )
                })
            }
        </div>
    )
}