import { FC } from 'react';
import styles from "./AuthPage.module.scss";
import Auth from '../../components/Auth/Auth';

const AuthPage: FC = () => {

    return (
        <div className={styles.container}>
            <Auth/>
        </div>
    )
};

export default AuthPage;