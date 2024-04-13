import {useEffect} from "react";
import {useLocation} from "react-router-dom";

const ScrollToTop = (): any => {
    // Extracts pathname property(key) from an object
    const { pathname } = useLocation();

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }, [pathname]);
}

export default ScrollToTop;