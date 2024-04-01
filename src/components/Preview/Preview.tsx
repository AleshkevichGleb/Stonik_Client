import { Link } from "react-router-dom";
import imgSL1 from "../../assets/images/slider-bath2.jpg";
import imgSl3 from "../../assets/images/slider-stone3.jpeg";
import imgSl2 from "../../assets/images/sllder-bath.jpg";
import Button from "../../common/Button/Button";
import Title from "../../common/Title/Title";
import Slider from "../Slider/Slider";
import styles from "./Preview.module.scss";

const Prewiew = () => {
    const handleScroll = () => {
        const body = document.body;
        const html = document.documentElement;
        const height = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
        window.scroll({
            top: height,
            left: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div className={styles.prewiew}>
            <div className={styles.prewiew__container}>
                <div className={styles.slider__container}>
                    <div className={styles.add__container}>
                        <div className={styles.add}>
                            <span className={styles.supTitle}>Камень с душой</span>
                            <Title addStyles1={styles.titleContainer} title_p1='Каменные изделия' title_p2='для вашего дома'/>
                            <div className={styles.buttons__container}>
                                <Link to = '/products'>
                                    <Button addStyles={styles.button}>СМОТРЕТЬ</Button>
                                </Link>
                                <Button onClick={handleScroll} addStyles={styles.button_black}>СВЯЗАТЬСЯ С НАМИ</Button>
                            </div>
                        </div>
                    </div>
                    <Slider 
                        addStyles = {{dots: styles.addStyleDots, 
                                        dot: styles.addStyleDot, 
                                        addSlider: styles.slider, 
                                        prevButton: styles.prevButton, 
                                        nextButton: styles.nextButton
                                    }}
                    >
                        <div className={styles.image} style={{backgroundImage: `url(${imgSL1})`}}></div>
                        <div className={styles.image} style={{backgroundImage: `url(${imgSl2})`}}></div>
                        <div className={styles.image} style={{backgroundImage: `url(${imgSl3})`}}></div>
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Prewiew;