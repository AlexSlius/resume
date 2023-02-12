import Link from 'next/link';
import React from 'react';

import Icon from '../Icon';
import { ButtonIcon } from "../uis/buttonIcon";

import { routersPages } from '../../constants/next-routers';

import { localStorageGet, localStorageSet } from '../../helpers/localStorage';

import iconCookie from "/public/images/icons/cookie.svg?sprite";
import iconOk from "/public/images/icons/icon-ok.svg?sprite"
import iconDecine from "/public/images/icons/icon-x-d.svg?sprite"


export const Cookies = () => {
    const [stateCooking, setStateCooking] = React.useState(false);

    React.useEffect(() => {
        let local = localStorageGet('isCooking');

        if (!local)
            setStateCooking(true);
    }, []);

    const handleAllow = () => {
        setStateCooking(false);
        localStorageSet('isCooking', true);
    }

    const handleDecline = () => {
        setStateCooking(false);
    }

    if (!stateCooking)
        return <></>;

    return (
        <div className="cookies-c">
            <div className="containers">
                <div className="cookies-c__row">
                    <div className="cookies-c__l">
                        <div className="cookies-c__icon">
                            <Icon svg={iconCookie} />
                        </div>
                        <div className="cookies-c__t">This website uses cookies to ensure you get the best experience
                            on our website. By using our site you consent cookies. <Link href={routersPages['privacyPolicy']}>Learn more</Link></div>
                    </div>
                    <div className="cookies-c__r">
                        <ButtonIcon
                            icon={iconDecine}
                            label="Decline"
                            className="btn--grey"
                            isButton={true}
                            onHandle={handleDecline}
                        />
                        <ButtonIcon
                            icon={iconOk}
                            label="Allow cookies"
                            className="btn--blue"
                            isButton={true}
                            onHandle={handleAllow}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}