import loaderImage from "../../assets/images/loader-icon.svg";
import styles from "./Loader.module.scss"
const Loader = () => {
    return (
        <div className={styles.loader}>
            <img src={loaderImage} alt="loader"/>
        </div>
    )
}

export default Loader;