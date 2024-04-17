import styles from "./Filter.module.scss";
import {FC} from "react";
import {IFilter} from "../../types/types.ts";

interface FilterProps {
    filter: IFilter,
    setFilter: (filter: IFilter) => void,
}

const Filter: FC<FilterProps> = ({filter, setFilter}) => {
    return (
        <div className={styles.filter}>
            <div className={styles.typeBlock}>
                <span className={styles.filter__title}>Производитель</span>
                {/*{brandProducts.map((type, index) =>*/}
                    <div >
                        <input
                            type='checkbox'
                            // value={filter.isSale}
                            // onChange={test}
                        />
                        <label className={styles.filter__label} htmlFor=''>type</label>
                    </div>
                {/*)}*/}
            </div>
            <div className={styles.typeBlock}>
                    <div>
                        <input
                            type='checkbox'
                            id = 'sale'
                            checked={filter.isSale}
                            onChange={(e) => setFilter({...filter, isSale: e.target.checked})}
                        />
                        <label className={styles.filter__label} htmlFor='sale'>Скидка</label>
                    </div>
                {/*)}*/}
            </div>
            <div className={styles.filterBlock}>
                <span className={styles.filter__title}>Цена</span>
                <input
                    id = "startPrice"
                    className={styles.input}
                    placeholder="От"
                    // value={filter.price.startPrice || ''}
                    // onChange={handleFilterPrice}
                />
                <input
                    id = "lastPrice"
                    className={styles.input}
                    placeholder="До"
                    // value={filter.price.lastPrice || ''}
                    // onChange={handleFilterPrice}
                />
            </div>
        </div>
    )
}

export default Filter;