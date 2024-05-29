import { FC, useEffect, useState } from 'react';
import FAQMainImage from "../../assets/images/FAQMain.png";
import Title from '../../common/Title/Title';
import { IFAQ, accordionData } from '../../data/faq';
import Accordion from './Accordion/Accordion';
import styles from "./FAQ.module.scss";
import CheckMark from '../../common/CheckMark/CheckMark';

const FAQPage: FC = () => {
    const [accordionLeft, setAccordionLeft] = useState<IFAQ[]>([]);
    const [accordionRight, setAccordionRight] = useState<IFAQ[]>([]);

    const breakArrayOnTwo = (array: IFAQ[]) => {
        const arr1 = array.filter((_, i) => i + 1 < accordionData.length/2+1)
        const arr2 = array.filter((_, i) => i + 1 > accordionData.length/2)

        return [arr1, arr2];
    }

    useEffect(() => {
        setAccordionLeft(breakArrayOnTwo(accordionData)[0])
        setAccordionRight(breakArrayOnTwo(accordionData)[1])
    }, [])

    return (
        <div className={styles.container}>
            <Title title_p1='наши преимущеcтва -' title_p2='ваш результат' addStyles1={styles.styleForTitle}/>
            <div className={styles.accordion__container}>
                <Accordion 
                    accordionArr={accordionLeft} 
                    setAccordionArr={setAccordionLeft}
                />
                <img className = {styles.image} src = {FAQMainImage} alt= "bathroom"/>
                <Accordion 
                    accordionArr={accordionRight} 
                    setAccordionArr={setAccordionRight}
                    flag = 'right'
                />
            </div>
            <CheckMark/>
        </div>
      
    )
};

export default FAQPage;