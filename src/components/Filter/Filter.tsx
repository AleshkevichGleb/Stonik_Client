import styles from "./Filter.module.scss";
import {FC} from "react";
import {IFilter, IProduct, ProductType} from "../../types/types.ts";
import {getProductTypes} from "../../data/productTypes.ts";

interface FilterProps {
    products: IProduct[]
    filter: IFilter,
    setFilter: (filter: IFilter) => void,
}

const Filter: FC<FilterProps> = ({filter, setFilter, products}) => {
    const productTypes = getProductTypes(products);
    const getValidType = (filterType: ProductType[], type: string)=> {
        let typesArray:ProductType[];
        let validType: ProductType = 'Ваза';
        if(type === 'Подоконники') validType =  type.slice(0, -1) as ProductType
        else validType = type.slice(0, -1) + 'а'

        if(filterType.length) {
            typesArray = filterType;
            if(filterType.includes(validType as ProductType)) typesArray = typesArray.filter(typeFilter =>  typeFilter !== validType)
            else typesArray = [...typesArray, validType as ProductType]
        } else {
            typesArray = [validType as ProductType]
        }

        return typesArray;
    }
    return (
        <div className={styles.filter}>
            <div className={styles.typeBlock}>
                <span className={styles.filter__title}>Тип изделия</span>
                {productTypes.map((type) =>
                    <div key={type}>
                        <input
                            id = {type}
                            type='checkbox'
                            value={filter.type}
                            onChange={() => {
                                setFilter({...filter, type: getValidType(filter.type, type)})
                            }}
                        />
                        <label className={styles.filter__label} htmlFor={type}>{type}</label>
                    </div>
                )}
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
            </div>
            <div className={styles.filterBlock}>
                <span className={styles.filter__title}>Цена</span>
                <input
                    id = "startPrice"
                    className={styles.input}
                    placeholder="От"
                    value={filter.startPrice || ''}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) { // Проверка на наличие только цифр
                            setFilter({
                                ...filter,
                                startPrice: value
                            });
                        }
                    }}
                />
                <input
                    id = "lastPrice"
                    className={styles.input}
                    placeholder="До"
                    value={filter.lastPrice || ''}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) { // Проверка на наличие только цифр
                            setFilter({
                                ...filter,
                                lastPrice: value
                            });
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default Filter;