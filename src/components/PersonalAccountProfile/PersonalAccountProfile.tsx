import {useAppSelector} from "../../hooks/useReduceer.ts";
import styles from "./PersonalAccountProfile.module.scss"
const PersonalAccountProfile = () => {
    const {user} = useAppSelector(state => state.user);
    const date = new Date(user.createdAt).toLocaleDateString();
    return(
        <div className={styles.container}>
            <div className={styles.user}>
                <div className={styles.info}>
                    <span className={styles.user__title}>Имя:</span>
                    <span className={styles.user__text}>{user.name}</span>
                </div>
                <div className={styles.info}>
                    <span className={styles.user__title}>Фамилия:</span>
                    <span className={styles.user__text}>{user.surname}</span>
                </div>
                <div className={styles.info}>
                    <span className={styles.user__title}>Электронная почта:</span>
                    <span className={styles.user__text}>{user.email}</span>
                </div>
                <div className={styles.info}>
                    <span className={styles.user__title}>Город:</span>
                    <span className={styles.user__text}>{user.city}</span>
                </div>
                <div className={styles.info}>
                    <span className={styles.user__title}>Дата создания аккаунта:</span>
                    <span className={styles.user__text}>{date}</span>
                </div>
            </div>
            <div>
                <img src={user.image} alt=""/>
            </div>
        </div>
    )
}

export default PersonalAccountProfile;