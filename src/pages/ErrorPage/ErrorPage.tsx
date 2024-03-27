import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import errorImage from "../../assets/images/errorPage.png";
import Button from '../../common/Button/Button';
import styles from "./ErrorPage.module.scss";

const ErrorPage: FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.errorBlock}>
            <img className = {styles.image} src = {errorImage} alt = "errorImage"/>
            <h1 className={styles.title}>СТРАНИЦА НЕ НАЙДЕНА</h1>
            <Button addStyles={styles.button} onClick={() => navigate('/')}>
                НА ГЛАВНУЮ
            </Button>
        </div>
    )
};

export default ErrorPage;