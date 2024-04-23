import {ChangeEvent, FC, useEffect, useState, MouseEvent} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/useReducer.ts";
import {useValidate} from "../../hooks/useValidate.ts";
import {createPortal} from "react-dom";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {TPersonDataField} from "../../types/types.ts";
import CheckDataPopUp from "./CheckDataPopUp/CheckDataPopUp.tsx";
import errorSendDataImg from "../../assets/images/errorSendData.png";
import sendDataImg from "../../assets/images/sendData.svg";
import styles from "./FormComponent.module.scss"
import MyInput from "../../common/Input/MyInput.tsx";
import FormBlock from "./FormBlock/FormBlock.tsx";
import Button from "../../common/Button/Button.tsx";
import {Link} from "react-router-dom";
import {setPerson, setPersonValue} from "../../store/slices/person.slice.ts";
import basketService from "../../services/basketService.ts";
import {AxiosError} from "axios";
import {clearBasket} from "../../store/slices/basket.slice.ts";
import Cards from 'react-credit-cards-2';
const FormComponent: FC = () => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs().add(3, 'day'));
    const [cardFocus, setCardFocus] = useState<{ focus: "name" | "number" | "expiry" | "cvc" | "" | undefined }>({ focus: undefined });
    const handleInputFocus = (evt: any) => {
        setCardFocus((prev) => ({ ...prev, focus: evt.target.name }));
    }

    const {user} = useAppSelector(state => state.user);
    const {person : personData} = useAppSelector(state => state.person);
    const dispatch = useAppDispatch();
    const {validate, error} = useValidate();
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [errorSend, setErrorSend] = useState<string>('');


    const handleDateChange = (date: Dayjs | null) => {
        setSelectedDate(date);
    };
    const isValidPersonDataField = (key: string): key is TPersonDataField => {
        return ['name','email', 'city'].includes(key);
    };



    useEffect(() => {
        if (!(Object.values(user)[0].length && !personData.email)) {
            for (let key in user) {
                if (isValidPersonDataField(key) && (user[key as string] as any).length) {
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

    const sendData = async(e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            console.log(personData)
            await basketService.sendOrder();
            dispatch(clearBasket());
        } catch (e) {
            if(e instanceof AxiosError) {
                setErrorSend(e.response?.data.message)
            }
        } finally {
            setIsShow(true);
        }
    }

    return (
        <>
            {
                isShow && createPortal(
                    isDisabled
                        ? <CheckDataPopUp
                            isActiveModal={isShow}
                            isDisabled={isDisabled}
                            setIsShow={setIsShow}
                            img = {errorSendDataImg}
                            title = 'Ошибка'
                            text = 'Проверьте поля на заполненность и правильность ввода'
                        />
                        : <CheckDataPopUp
                            isActiveModal={isShow}
                            isDisabled={isDisabled}
                            setIsShow={setIsShow}
                            img = {errorSend.length ? errorSendDataImg : sendDataImg}
                            title = {errorSend.length ? 'Ошибка' : 'Ожидайте'}
                            text = {errorSend.length ? errorSend : 'Ваш заказ отправлен на обработу'}
                        />
                    , document.body)
            }
            <div className="main">
                <form className={styles.form}>
                    <FormBlock title="1. Контактная информация">
                        <div className={styles.form__inputBlock}>
                            <MyInput
                                addStyles={styles.input__block}
                                labelStyles={styles.label}
                                inputStyles={styles.input}
                                value={personData.name}
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
                            {
                                personData.payment.type === 'online' &&
                                <div className={styles.cardContainer}>
                                    <Cards
                                        number={personData.payment.number}
                                        expiry={personData.payment.expiry}
                                        cvc={personData.payment.cvc}
                                        name={personData.payment.name}
                                        focused={cardFocus.focus}
                                    />
                                    <div className={styles.cardFieldsContainer}>
                                        <input
                                            id = "payment"
                                            type="text"
                                            name="number"
                                            placeholder="Номер"
                                            value={personData.payment.number}
                                            onChange={handlePersonData}
                                            onFocus={handleInputFocus}
                                            maxLength={19}
                                            className={styles.cardInput}
                                        />
                                        <input
                                            id = "payment"
                                            type="text"
                                            name="name"
                                            placeholder="Имя"
                                            value={personData.payment.name}
                                            onChange={handlePersonData}
                                            onFocus={handleInputFocus}
                                            maxLength={20}
                                            className={styles.cardInput}
                                        />
                                        <input
                                            id = 'payment'
                                            type="text"
                                            name="expiry"
                                            placeholder="Срок действия"
                                            value={personData.payment.expiry}
                                            pattern="\d\d/\d\d"
                                            onChange={handlePersonData}
                                            onFocus={handleInputFocus}
                                            maxLength={5}
                                            className={styles.cardInput}
                                        />
                                        <input
                                            id = "payment"
                                            type="text"
                                            name="cvc"
                                            placeholder="CVC"
                                            pattern="\d{3,4}"
                                            value={personData.payment.cvc}
                                            onChange={handlePersonData}
                                            onFocus={handleInputFocus}
                                            maxLength={3}
                                            className={styles.cardInput}
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                    </FormBlock>
                    <FormBlock title={'4. Дата'}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                className={styles.date}
                                value={selectedDate}
                                onChange={handleDateChange}
                                minDateTime={dayjs().add(2, 'day')}
                                maxDateTime={dayjs().add(21, 'day')}
                            />
                        </LocalizationProvider>
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