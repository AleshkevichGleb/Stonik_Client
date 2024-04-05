import {FC, PropsWithChildren} from "react";
import styles from "./FormBlock.module.scss";
interface FormBlockProps {
    title?: string
}

const FormBlock: FC<PropsWithChildren<FormBlockProps>> = ({title, children}) => {

    return (
        <div className={styles.container}>
            {
                title && <span className={styles.title}>{title}</span>
            }
            <div className={styles.contentBlock}>
                {children}
            </div>
        </div>
    )
}

export default FormBlock;