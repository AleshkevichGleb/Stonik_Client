import { ChangeEvent, FC } from 'react';
import styles from "./MyInput.module.scss";

interface MyInputProps {
    id: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    value: string,
    addStyles?: string, 
    inputStyles?: string, 
    labelStyles?: string, 
    type: string,
    name?: string,
    max?: number,
}

const MyInput: FC<MyInputProps> = ({
    id, 
    placeholder, 
    onChange, 
    value, 
    addStyles, 
    inputStyles, 
    labelStyles, 
    type, 
    name,
    max,
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
            />
            <label className={`${styles.label} ${labelStyles}`} htmlFor={id}>{placeholder}</label>
        </div>
    )
};

export default MyInput;
