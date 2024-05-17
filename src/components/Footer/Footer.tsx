import { ChangeEvent, FC, FormEvent, useState } from 'react';
import Button from '../../common/Button/Button';
import MyInput from '../../common/Input/MyInput';
import Title from '../../common/Title/Title';
import styles from "./Footer.module.scss";
import FooterInfo from './FooterInfo/FooterInfo';
import {instance} from "../../api/axios.ts";
import {toast} from "react-toastify";

const Footer: FC = () => {

    const [personInfo, setPersonInfo] = useState({
        name: '',
        email: '',
    })

    const handlePersonInfo = (event: ChangeEvent<HTMLInputElement>) => {
        const {id, value} = event.target;
        let newValue = value;
        if (id === 'email') {
            const lastTypedChar = value.charAt(value.length - 1);
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~@]$/;
            if (!emailRegex.test(lastTypedChar)) {
                newValue = value.slice(0, -1);
            }
        }
        setPersonInfo({...personInfo, [id]: newValue});
    }

    const sendData =  async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!/^[a-zA-Za-яА-Я]{2,16}$/.test(personInfo.name)){
            return toast.error('Введите свое настоящее имя')
        }
        if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(personInfo.email)) {
            return  toast.error('Введите свой настоящий email')
        }
        try {
            instance.post('/questions', personInfo)
                .then(() => {
                    toast.success('Сообщение успешно отрпавленно!')
                    setPersonInfo({email:'', name: ''})
                })
                .catch(error => {
                    toast.error('Ошибка, попробуйте позже')
                    console.error('There was an error sending the email!', error);
                });
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
                            inputStyles={styles.inputStyles}
                            id = "email"
                            type = "email"
                            placeholder = "Ваша почта"
                            onChange={handlePersonInfo} 
                            value={personInfo.email}
                        />

                        <Button 
                            addStyles={styles.addStylesForButton}
                            onClick = {sendData}
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