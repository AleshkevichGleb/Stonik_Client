import { Link } from "react-router-dom";
import { footerImages, navLinks } from "../../../../constants/links";
import styles from "./FooterMenu.module.scss";

const FooterMenu = () => {
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <span className={styles.menu__title}>Меню</span>
                {navLinks.map(link => 
                    <Link key = {link.path} className={styles.menu__link} to = {`${link.path}`}>{link.title}</Link>
                )}
            </div>
            <div className={styles.menu}> 
                <span className={styles.menu__title}>Get in touch</span>
                <div className={styles.getInTouch}>
                    <span className={styles.getInTouch__title}>Call:</span>
                    <a href = "tel:+375292015656" className={styles.getInTouch__text}>(29)-201-56-56</a>
                </div>
                <div className={styles.getInTouch}>
                    <span className={styles.getInTouch__title}>Email:</span>
                    <a href = "mailto:aleshkevichgleb05@gmail.com" className={styles.getInTouch__text}>aleshkevichgleb05@gmail.com</a>
                </div>
                <div className={styles.images}>
                    {footerImages.map(image => 
                        <a target="_blank" href = {image.url} key = {image.id} className={styles.image}>
                            <img src={image.img} alt="image" />  
                        </a>  
                    )}
                </div>
            </div>
        </div>
    )
}

export default FooterMenu;