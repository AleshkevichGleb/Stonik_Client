import styles from "./Filter.module.scss";
import {FC, useEffect, useState} from "react";
import {IFilter, ProductType} from "../../types/types.ts";
import Button from "../../common/Button/Button.tsx";
import {instance} from "../../api/axios.ts";
import {useAppDispatch} from "../../hooks/useReducer.ts";
import {setFilter} from "../../store/slices/productFilter.slice.ts";
import Slider from '@mui/material/Slider';

interface FilterProps {
    filter: IFilter,
    isChooseFilter: boolean,
    setIsChooseFilter: (isChooseFilter: boolean) => void,
}

const Filter: FC<FilterProps> = ({filter, setIsChooseFilter, isChooseFilter}) => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState([+filter.startPrice, +filter.lastPrice]);

    // const [maxPrice, setMaxPrice] = useState<number>(+filter.lastPrice);
    const handleChange = (_: any, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            setValue(newValue);
            dispatch(setFilter({
                ...filter,
                page: 1,
                startPrice: newValue[0].toString(),
                lastPrice: newValue[1].toString()
            }));
        }
    };
    const [types, setTypes] = useState<ProductType[]>([])
    const getTypes = async() =>  {
        try {
            const {data} = await instance.get('/products/types')

            setValue([+filter.startPrice, +data.maxPrice]);

            setTypes(data.uniqueTypes);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getTypes();
    }, []);
    const getValidType = (filterType: ProductType[], type: ProductType)=> {
        let typesArray:ProductType[];

        if(filterType.length) {
            typesArray = filterType;
            if(filterType.includes(type)) typesArray = typesArray.filter(typeFilter =>  typeFilter !== type)
            else typesArray = [...typesArray, type]
        } else {
            typesArray = [type]
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
                            checked={filter.type.includes(type as ProductType)}
                            onChange={() => {
                                dispatch(setFilter({...filter, page: 1, type: getValidType(filter.type, type)}));
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
                            onChange={(e) => dispatch(setFilter({...filter,page: 1, isSale: e.target.checked}))}
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
                        if (/^\d*$/.test(value)) {
                            dispatch(setFilter({
                                ...filter,
                                page: 1,
                                startPrice: value,
                            }));
                            setValue([+value, +filter.startPrice])
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
                        if (/^\d*$/.test(value)) {
                            dispatch(setFilter({
                                ...filter,
                                page: 1,
                                lastPrice: value
                            }));
                            setValue([+filter.startPrice, +value])
                        }
                    }}
                />
                <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={filter.maxPrice}
                    step = {10}
                    aria-labelledby="range-slider"
                    sx={{
                        color: '#28553F', // Зеленый цвет ползунка
                        '& .MuiSlider-track': {
                            backgroundColor: '#28553F' // Зеленый цвет трека
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