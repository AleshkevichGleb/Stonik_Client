import styles from "./Filter.module.scss";
import {FC, useEffect, useState} from "react";
import {IFilter, ProductType} from "../../types/types.ts";
import Button from "../../common/Button/Button.tsx";
import {instance} from "../../api/axios.ts";

interface FilterProps {
    filter: IFilter,
    setFilter: (filter: IFilter) => void,
    isChooseFilter: boolean,
    setIsChooseFilter: (isChooseFilter: boolean) => void,
}

const Filter: FC<FilterProps> = ({filter, setFilter, setIsChooseFilter, isChooseFilter}) => {
    const [types, setTypes] = useState<string[]>([])
    const getTypes = async() =>  {
        try {
            const {data} = await instance.get('/products/types')

            const types = data.map((type: any) => {
                if(type === 'Подоконник') return type + 'и';
                return (type).slice(0, -1) + 'ы';
            })
            setTypes(types);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getTypes();
    }, []);
    const getValidType = (filterType: ProductType[], type: string)=> {
        let typesArray:ProductType[];
        let validType;
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
                {types.map((type) =>
                    <div key={type}>
                        <input
                            id = {type}
                            type='checkbox'
                            value={type}
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
                <Button onClick={() => setIsChooseFilter(!isChooseFilter)} addStyles={styles.button}>
                    Применить
                </Button>
            </div>
        </div>
    )
}

export default Filter;