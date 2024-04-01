import { ChangeEvent, FC } from "react";
import styles from "./MySelect.module.scss";

interface MySelectProps {
    options: {value: string, name: string}[], 
    defaultValue?: string, 
    value: string, 
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void,
}

const MySelect: FC<MySelectProps> = ({options, defaultValue, value, onChange}) => {
    return(
        <div className={styles.selectBox}>
            <select className={styles.select} value={value}>
                {options.map(option => 
                    <option className={styles.option} key={option.value} value={option.value}>
                        {option.name}
                    </option>
                )}
            </select>
        </div>
    )
}

export default MySelect;