import { FC, MouseEvent, PropsWithChildren } from 'react';
import styles from "./Button.module.scss";

interface ButtonProps {
    addStyles?: string,
    onClick?: (e?: MouseEvent<HTMLButtonElement> | any) => void,
    id?: string,
    name?: string,
    value?: string,
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({children, addStyles, onClick, id, name, value}) => {

   return   <button
                id = {id}
                onClick={onClick}
                name= {name}
                value = {value}
                className={addStyles ? `${styles.button} ${addStyles}` : `${styles.button}`}
            >
                {children}
            </button>
};

export default Button;