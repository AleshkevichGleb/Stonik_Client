import Carousel from "nuka-carousel";
import { FC, PropsWithChildren } from "react";
import styles from "./Slider.module.scss";

interface SliderProps {
    addStyles: any,
}

const Slider: FC<PropsWithChildren<SliderProps>> = ({addStyles, children}) => {
    return (
        <div className={styles.slider}>
            <Carousel 
                className={addStyles.addSlider}
                autoplay = {true}
                wrapAround = {true}
                cellSpacing={0}
                adaptiveHeight = {true}
                speed={1500}
                slidesToShow={addStyles.toShow}
                adaptiveHeightAnimation = {true}
                autoplayInterval = {5000}

                defaultControlsConfig={{
                    nextButtonStyle: {display:'none'},
                    prevButtonStyle: {display: 'none'},
                    pagingDotsContainerClassName: addStyles.dots,
                    pagingDotsClassName: addStyles.dot,
                }}
                >
                    {children}
            </Carousel>
        </div>
    )
}

export default Slider;