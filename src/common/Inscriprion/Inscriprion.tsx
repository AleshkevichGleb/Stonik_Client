import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Inscriprion.module.scss";

interface InscriprionProps {
    text: string,
    src:string,
    url?: string,
    addStyles: string,
}

const Inscriprion: FC<InscriprionProps> = ({text, src, url = '/', addStyles}) => {
    return (
        <Link to = {url}>
            <div className={`${styles.arrow} ${addStyles}`}>
                <span className={styles.arrow__text}>{text}</span>
                {src && 
                    <img className={styles.image} src = {src} alt = ""/>
                }
            </div>
        </Link>
    )
}

export default Inscriprion;