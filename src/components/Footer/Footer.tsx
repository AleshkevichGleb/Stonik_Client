import { ChangeEvent, FC, FormEvent, useState } from 'react';
import Button from '../../common/Button/Button';
import MyInput from '../../common/Input/MyInput';
import Title from '../../common/Title/Title';
import styles from "./Footer.module.scss";
import FooterInfo from './FooterInfo/FooterInfo';

const Footer: FC = () => {

    const [personInfo, setPersonInfo] = useState({
        name: '',
        phone: '',
    })

    const handlePersonInfo = (event: ChangeEvent<HTMLInputElement>) => {
        const {id, value} = event.target;
        if(id === 'phone') setPersonInfo({...personInfo, [id]: value.replace(/\s|[a-zA-Zа-яА-Я]/g,"")})
        else {
            setPersonInfo({...personInfo, [id]: value})
        }
    }

    const sendData =  async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/history', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(personInfo)
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }

    return (
        <footer className={styles.footer}>
             <form onSubmit={sendData} className={styles.footer__form}>
                <div className={styles.footer__formContainer}>
                    <div className={styles.footer__formTitles}>
                        <Title 
                            title_p1='Остались вопросы?' 
                            title_p2='свяжитесь с нами, мы вам поможем!'
                            addStyles1={styles.addStylesForBlock}
                            addStyles2={styles.addStylesForTitle}
                        />
                        <span className={styles.footer__formSuptitle}>Заполните форму и мы свяжемся с Вами в ближайшее время</span>
                    </div>
                    <div className={styles.footer__formSubmit}>
                        <MyInput 
                            addStyles={styles.addStylesForInput}
                            id = "name" 
                            type = "text" 
                            placeholder = "Ваше имя" 
                            onChange={handlePersonInfo} 
                            value={personInfo.name}
                        />
                        <MyInput 
                            addStyles={styles.addStylesForInput}
                            id = "phone" 
                            type = "text" 
                            placeholder = "Ваше телефон" 
                            onChange={handlePersonInfo} 
                            value={personInfo.phone}
                        />

                        <Button 
                            addStyles={styles.addStylesForButton}
                        >
                            Отправить
                        </Button>
                    </div>
                    <div className={styles.footer__formCheckData}>
                        <input
                            id = "data"
                            className={styles.checkbox}
                            type = "checkbox"
                        />
                        <label htmlFor="data" className={styles.checkboxText}>Согласен на обработку персональных данных</label>
                    </div>
                </div>
            </form>
            <FooterInfo/>
            <div className={styles.hr}></div>
            <span className={styles.footer__agree}>All rights reserved, 2023 - {new Date().getFullYear()}</span>
        </footer>
    )
};

export default Footer;