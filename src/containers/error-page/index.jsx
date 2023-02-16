
import React from "react";

import { ButtonIcon } from "../../components/uis/buttonIcon";

import iconArrHome from "/public/images/icons/arrow-left-square.svg?sprite"

export const ErrorPage = () => {
    return (
        <section className="contact-page">
            <div className="container text-center">
                <h1 className="h1">
                    Sorry! Page not foun<span className="icon-right-top">d</span>
                </h1>
                <p className="bottom-text">
                    The page you are looking for might have been removed had
                    its name changed or is temporarily unavailable
                </p>
                <div className="error-page-404">
                    <img src="/images/page/img-404.svg" alt="img 404" />
                </div>
                <div className="btn-centers-w mtw-2">
                    <ButtonIcon icon={iconArrHome} href="/" label="Go Home" className="btn--blue" />
                </div>
            </div>
        </section>
    )
}

