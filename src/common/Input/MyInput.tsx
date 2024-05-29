import { ChangeEvent, FocusEvent, FC } from 'react';
import styles from "./MyInput.module.scss";

interface MyInputProps {
    id: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void
    value: string,
    addStyles?: string, 
    inputStyles?: string, 
    labelStyles?: string, 
    type: string,
    name?: string,
    max?: number,
    isNotHtmlFor?: boolean,
}

const MyInput: FC<MyInputProps> = ({
    id, 
    placeholder, 
    onChange,
    onBlur,
    value, 
    addStyles, 
    inputStyles, 
    labelStyles, 
    type, 
    name,
    max,
    isNotHtmlFor,
}) => {

    return (
        <div className={addStyles ? `${styles.inputBlock} ${addStyles}` : styles.inputBlock}>
            <input
                className={`${styles.input} ${inputStyles}`}
                placeholder=" "
                id={id}
                type={type}
                name={name}
                onChange={onChange}
                value={value}
                maxLength={max}
                onBlur={onBlur}
            />
            <label className={`${styles.label} ${labelStyles}`} htmlFor={isNotHtmlFor ? '' : id}>{placeholder}</label>
        </div>
    )
};

export default MyInput;
