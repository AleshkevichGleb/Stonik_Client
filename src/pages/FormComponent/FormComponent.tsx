import {ChangeEvent, FC, useEffect, useState, MouseEvent} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/useReduceer.ts";
import {useValidate} from "../../hooks/useValidate.ts";
import {createPortal} from "react-dom";
import { TPersonDataField} from "../../types/types.ts";
import CheckDataPopUp from "./CheckDataPopUp/CheckDataPopUp.tsx";
import errorSendDataImg from "../../assets/images/errorSendData.png";
import sendDataImg from "../../assets/images/errorSendData.png";
import styles from "./FormComponent.module.scss"
import MyInput from "../../common/Input/MyInput.tsx";
import FormBlock from "./FormBlock/FormBlock.tsx";
import Button from "../../common/Button/Button.tsx";
import {Link} from "react-router-dom";
import {check_person_data, setPerson, setPersonValue} from "../../store/slices/person.slice.ts";
const FormComponent: FC = () => {

    const {user} = useAppSelector(state => state.user);
    const {person : personData} = useAppSelector(state => state.person);
    const dispatch = useAppDispatch();
    const {validate, error} = useValidate();
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [isShow, setIsShow] = useState<boolean>(false);

    const isValidPersonDataField = (key: string): key is TPersonDataField => {
        return ['name', 'phone', 'email', 'house', 'city', 'street', 'flat', 'agreement'].includes(key);
    };


    useEffect(() => {
        if (!(Object.values(user)[0].length && !personData.email)) {
            for (let key in user) {
                if (isValidPersonDataField(key) && user[key].length) {
                    dispatch(setPersonValue({ field: key as TPersonDataField, value: user[key]}));
                }
            }
        }
    }, []);

    useEffect(() => {
        const disabled = Object.values(error).find(el => el !== '') ||
            personData.name === '' || personData.phone === '' || personData.email === '' ||
            personData.city === '' || personData.street === '' || personData.house === '' || !personData.agreement;
        setIsDisabled(disabled as boolean)
    }, [error, personData.name, personData.phone, personData.email, personData.city,
        personData.street, personData.house, personData.agreement])

    const handlePersonData = (e: ChangeEvent<HTMLInputElement>) => {
        const {id, value, checked, name} = e.currentTarget;
        if(name === 'payment') e.preventDefault();

        validate(id, value)
        dispatch(setPerson({
            id: (id as TPersonDataField), value, checked, name
        }))
    }

    const sendData = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsShow(true);
        if(!isDisabled)  {
            dispatch(check_person_data());
        //     console.log(personData);
        //     dispatch(clear_basket());
        //     dispatch(calc_cart_count());
        }
    }

    return (
        <>
            {
                isShow && createPortal(
                    isDisabled
                        ? <CheckDataPopUp
                            isDisabled={isDisabled}
                            setIsShow={setIsShow}
                            img = {errorSendDataImg}
                            title = 'Ошибка'
                            text = 'Проверьте поля на заполненность правильность ввода'
                        />
                        : <CheckDataPopUp
                            isDisabled={isDisabled}
                            setIsShow={setIsShow}
                            img = {sendDataImg}
                            title = 'Ожидайте'
                            text = 'Ваш заказ отправлен на обработу'
                        />
                    , document.body)
            }
            <div className="main">
                <form className={styles.form}>
                    <FormBlock title = "1. Контактная информация">
                        <div className={styles.form__inputBlock}>
                            <MyInput
                                addStyles={styles.input__block}
                                labelStyles={styles.label}
                                inputStyles={styles.input}
                                value = {personData.name}
                                onChange={handlePersonData}
                                type = "text"
                                id = "name"
                                placeholder='Ваше имя*'
                            />
                            {error && <span className={styles.error}>{error.name}</span>}
                        </div>
                        <div className={styles.form__inputBlock}>
                            <MyInput
                                addStyles={styles.input__block}
                                labelStyles={styles.label}
                                inputStyles={styles.input}
                                value = {personData.phone}
                                onChange={handlePersonData}
                                type = "tel"
                                id = "phone"
                                placeholder='Ваш телефон*'
                            />
                            {error && <span className={styles.error}>{error.phone}</span>}
                        </div>

                        <div className={styles.form__inputBlockBig}>
                            <MyInput
                                labelStyles={styles.label}
                                inputStyles={styles.input}
                                value = {personData.email}
                                onChange={handlePersonData}
                                type = "email"
                                id = "email"
                                placeholder='Ваш электронный адрес'
                            />
                            {error && <span className={styles.error}>{error.email}</span>}
                        </div>
                    </FormBlock>
                    <FormBlock title="2. Местоположение">
                        <div className={styles.form__inputBlock}>
                            <MyInput
                                addStyles={styles.input__block}
                                labelStyles={styles.label}
                                inputStyles={styles.input}
                                value = {personData.city}
                                onChange={handlePersonData}
                                type = "text"
                                id = "city"
                                placeholder='Ваш город*'
                            />
                            {error && <span className={styles.error}>{error.city}</span>}
                        </div>
                        <div className={styles.form__inputBlock}>
                            <MyInput
                                addStyles={styles.input__block}
                                labelStyles={styles.label}
                                inputStyles={styles.input}
                                value = {personData.street}
                                onChange={handlePersonData}
                                type = "text"
                                id = "street"
                                placeholder='Улица*'
                            />
                            {error && <span className={styles.error}>{error.street}</span>}
                        </div>
                        <div className={styles.form__inputBlock}>
                            <MyInput
                                addStyles={styles.input__block}
                                labelStyles={styles.label}
                                inputStyles={styles.input}
                                value = {personData.house}
                                onChange={handlePersonData}
                                type = "text"
                                id = "house"
                                placeholder='Дом*'
                            />
                            {error && <span className={styles.error}>{error.house}</span>}
                        </div>
                        <div className={styles.form__inputBlock}>
                            <MyInput
                                addStyles={styles.input__block}
                                labelStyles={styles.label}
                                inputStyles={styles.input}
                                value = {personData.flat}
                                onChange={handlePersonData}
                                type = "text"
                                id = "flat"
                                placeholder='Квартира'
                            />
                            {error && <span className={styles.error}>{error.flat}</span>}
                        </div>

                    </FormBlock>
                    <FormBlock title='3. Оплата'>
                        <div className={styles.payment}>
                            <div className={styles.payment__btnBlock}>
                                <Button
                                    onClick={handlePersonData}
                                    addStyles={personData.payment.type === 'online' ? styles.button__payment_active : styles.button__payment}
                                    name="payment"
                                    id = "type"
                                    value="online"
                                >
                                    Онлайн
                                </Button>
                                <Button
                                    onClick={handlePersonData}
                                    addStyles={personData.payment.type === 'card' ? styles.button__payment_active : styles.button__payment}
                                    name="payment"
                                    id = "type"
                                    value="card"
                                >
                                    Картой
                                </Button>
                                <Button
                                    onClick={handlePersonData}
                                    addStyles={personData.payment.type === 'cash' ? styles.button__payment_active : styles.button__payment}
                                    name="payment"
                                    id = "type"
                                    value="cash"
                                >
                                    Наличными
                                </Button>
                            </div>
                            {personData.payment.type === 'cash' &&
                                <div className={styles.payment__input}>
                                    <MyInput
                                        addStyles={styles.input__block}
                                        labelStyles={styles.label}
                                        inputStyles={styles.input}
                                        name = "payment"
                                        id = "surrender_of_money"
                                        value = {personData.payment.surrender_of_money}
                                        placeholder='Сдача с'
                                        onChange={handlePersonData}
                                        type='text'
                                    />
                                </div>
                            }
                        </div>
                    </FormBlock>
                    <FormBlock>
                        <div className={styles.form__agreementBlock}>
                            <div className={styles.form__agreemenCheckBox}>
                                <input
                                    checked = {personData.agreement}
                                    onChange={handlePersonData}
                                    className={styles.checkBox}
                                    type='checkbox'
                                    name="agreement"
                                    id="agreement"
                                />
                                <label className={styles.form__agreementText} htmlFor="agreement">
                                    Я согласен на обработку моих перс. данных в соответствии с <Link className={styles.form__agreemenLink} to = '/data'>Условиями</Link>
                                </label>
                            </div>
                            <Button
                                addStyles={styles.button}
                                onClick={sendData}
                            >
                                Оформить заказ
                            </Button>
                        </div>
                    </FormBlock>
                </form>
                <pre>
                    {JSON.stringify(personData)}
                </pre>
            </div>
        </>
    )
};

export default FormComponent;