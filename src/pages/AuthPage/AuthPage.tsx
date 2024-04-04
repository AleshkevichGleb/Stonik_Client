import {FC, useEffect} from 'react';
import styles from "./AuthPage.module.scss";
import Auth from '../../components/Auth/Auth';
import {useAppSelector} from "../../hooks/useReduceer.ts";
import {useNavigate} from "react-router-dom";

const AuthPage: FC = () => {
    const {isAuth} = useAppSelector(state =>state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuth) navigate('/profile')
    }, []);

    return (
        <div className={styles.container}>
            <Auth/>
        </div>
    )
};

export default AuthPage;