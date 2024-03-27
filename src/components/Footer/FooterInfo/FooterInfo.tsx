import { FC } from 'react';
import Logo from '../../../common/Logo/Logo';
import styles from "./FooterInfo.module.scss";
import FooterMenu from './FooterMenu/FooterMenu';

const FooterInfo: FC = () => {

    return(
        <div className={styles.footer}>
            <div className={styles.footer__container}>
                <Logo addStyles={styles.logo} text = 'КАМЕНЬ С ДУШОЙ'/>
                <FooterMenu/>
                {/* <FooterWeather/> */}
            </div>
        </div>
    )
};

export default FooterInfo;