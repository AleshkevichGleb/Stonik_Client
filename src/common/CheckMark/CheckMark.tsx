import { checkMark } from "../../data/checkMark";
import styles from "./CheckMark.module.scss";

const CheckMark = () => {
    return (
        <div className={styles.block}>
            {checkMark.map(item => 
                <div 
                    key={item.id}
                    className={styles.block__item}
                >
                    <div className={styles.block__title}>
                        <img src={item.image} alt="mark"/>
                        <h3>{item.title}</h3>
                    </div>
                    <div className={styles.line}></div>
                    <span className={styles.text}>{item.description}</span>
                </div>    
            )}
        </div>
    )
}

export default CheckMark;