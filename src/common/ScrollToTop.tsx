import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useAppDispatch} from "../hooks/useReducer.ts";
import {clearFilter} from "../store/slices/productFilter.slice.ts";

const ScrollToTop = (): any => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            // behavior: 'smooth'
        })

        if(!pathname.includes('/products')) {
            dispatch(clearFilter());
        }
    }, [pathname]);
}

export default ScrollToTop;