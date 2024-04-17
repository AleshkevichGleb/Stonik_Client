import { ChangeEvent, FC } from "react";
import styles from "./MySelect.module.scss";

interface MySelectProps {
    options: {value: string, name: string}[],
    value: string,
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void,
}

const MySelect: FC<MySelectProps> = ({options, value, onChange}) => {
    return(
        <div className={styles.selectBox}>
            <select className={styles.select} value={value} onChange={onChange}>
                {options.map(option => 
                    <option className={styles.option} key={option.name} value={option.value}>
                        {option.name}
                    </option>
                )}
            </select>
        </div>
    )
}

export default MySelect;