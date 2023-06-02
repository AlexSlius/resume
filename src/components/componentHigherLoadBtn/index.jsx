import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { LoadChildrenBtn } from "../loadChildrenBtn"

export const ComponentHigherLoadBtn = ({ children, isLoad = false }) => {
    const router = useRouter();
    const [loadlBtn, setLoadBtn] = useState(false);

    useEffect(() => {
        setLoadBtn(false);
        router.events.on("routeChangeStart", () => {
            setLoadBtn(true);
        });

        router.events.on("routeChangeComplete", () => {
            setLoadBtn(false);
        });
    }, []);

    return (
        <LoadChildrenBtn isLoad={isLoad || loadlBtn}>
            {children}
        </LoadChildrenBtn>
    )
}