import {useLocation} from "react-router-dom";
import {useEffect} from "react";

export function AlwaysScrollToTop() {
    const {pathname} = useLocation();

    useEffect(() => {
        scrollToTop();
    }, [pathname]);

    return null;
}

export function scrollToTop() {
    const appRoot = document.getElementById('Operations_WebApp_IntegrationBadges');
    const offsetLeft = appRoot.offsetLeft;
    const offsetTop = appRoot.offsetTop;
    window.scrollTo(offsetLeft, offsetTop);
}
