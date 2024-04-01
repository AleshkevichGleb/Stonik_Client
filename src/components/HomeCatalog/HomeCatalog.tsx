import arrowImage from "../../assets/images/arrow-right.svg";
import topsImg from "../../assets/images/countertops.jpg";
import panels from "../../assets/images/panels.jpg";
import shells from "../../assets/images/shells.jpg";
import sillsImg from "../../assets/images/sills.jpg";
import Inscriprion from "../../common/Inscriprion/Inscriprion";
import Title from "../../common/Title/Title";
// import Inscriprion from "../../common/inscriprion/Inscriprion";
import styles from "./HomeCatalog.module.scss";


const HomeCatalog = () => {
    return (
        <div className={styles.home__container}>
            <Title
                addStyles1={styles.titleContainer}
                title_p1='Изделия из '
                title_p2='натурального камня'
            />
            <Inscriprion 
                addStyles = {styles.inscriprion}
                url="/products"
                text='СМОТРЕТЬ ВСЕ'
                src={arrowImage}
            />

            <div className={styles.photos}>
                <div className={styles.photos__block}>
                    <div className={styles.photos__photo}>
                        <span className={styles.photos__title}>подоконники</span>
                        <img className={styles.photos__image} src={sillsImg} alt="" />
                    </div>
                    <div className={styles.photos__photo__small}> 
                        <span className={styles.photos__title}>столешницы</span>
                        <img className={styles.photos__image} src={topsImg} alt="" />
                    </div>
                </div>
                <div className={styles.photos__block}>
                    <div className={styles.photos__photo__small}>
                        <span  className={styles.photos__title}>панно</span>
                        <img className={styles.photos__image} src={panels} alt="" />   
                    </div>
                    <div className={styles.photos__photo}>
                        <span className={styles.photos__title}>раковины</span>
                        <img className={styles.photos__image} src={shells} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeCatalog;