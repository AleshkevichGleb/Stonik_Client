import {ChangeEvent, useRef, useState} from "react";
// import axios from "axios";
import {IProductSend, ProductType} from "../../../types/types.ts";
import MyInput from "../../../common/Input/MyInput.tsx";
import styles from "./AdminProducts.module.scss";
// import productService from "../../../services/productService.ts";
// import {getCorrectProductTypes} from "../../../data/productTypes.ts";
import Button from "../../../common/Button/Button.tsx";
import {toast} from "react-toastify";
import {instance} from "../../../api/axios.ts";
import {AxiosError} from "axios";

const AdminProducts = () => {
    const ref = useRef<HTMLInputElement | null>(null);
    const ref2 = useRef<HTMLInputElement | null>(null);
    const ref3 = useRef<HTMLInputElement | null>(null);
    const ref4 = useRef<HTMLInputElement | null>(null);

    const types:ProductType[] = ['Ваза', 'Раковина', 'Подоконник', 'Столешница'];
    const [product, setProduct] = useState<IProductSend>({
        name: '',
        description: '',
        type: 'Подоконник',
        isSale: false,
        price: 0,
        rating: 0,
        salePrice: 0,
        info: [
            {title: 'Тип камня', text: '600x2000, 700x2000, 800x2000, 900x2000, 1000x2000, 1200x2200, 1400x2400, 1600x2400, 1800x2600 мм'},
            {title: 'Изделие', text: '38 мм'},
            {title: 'Месторождение', text: 'Возможно изготовление нестандартных размеров (с удорожанием)'},
            {title: '', text: ''},
            {title: '', text: ''},
        ],
        amount: 1000,
    })

    const removeEmptyObjects = (arr: any[]) => {
        return arr.filter(item => item.title.trim() !== '' || item.text.trim() !== '');
    }

    const addProduct = async() => {
        const cleanedInfo = removeEmptyObjects(product.info);
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', String(product.price));
        formData.append('type', product.type)
        formData.append('info', JSON.stringify(cleanedInfo));
        formData.append('isSale', String(product.isSale));
        formData.append('salePrice', String(product.salePrice));
        formData.append('amount', String(product.amount));

        if (ref.current && ref.current.files && ref.current.files.length > 0) {
            formData.append('images', ref.current.files[0]);
        }
        if (ref2.current && ref2.current.files && ref2.current.files.length > 0) {
            formData.append('images', ref2.current.files[0]);
        }
        if (ref3.current && ref3.current.files && ref3.current.files.length > 0) {
            formData.append('images', ref3.current.files[0]);
        }   if (ref4.current && ref4.current.files && ref4.current.files.length > 0) {
            formData.append('images', ref4.current.files[0]);
        }

        try {
            await instance.post('/products', formData);
            toast.success('Товар успешно добавлен')
        } catch (error) {
            if(error instanceof AxiosError) {
                toast.error(error.response?.data.error)
            }
        }
    }

    const changeProduct = async(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name,type , value} = e.target;

        if (name === "price" && /\D/.test(value) || name === "salePrice" && /\D/.test(value) || name === "amount" && /\D/.test(value)) {
            return;
        }

        const setValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        // if(name === 'price' || name === 'salePrice' || name === 'amount') {
        //     return setProduct({...product, [name]: +value});
        // }

        setProduct({...product, [name]: setValue});
        // if(setValue === false) setProduct({...product, salePrice: 0})
    }

    const changeInfo = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const { info } = product;
        const index = parseInt(name.split('-')[1]);

        const newInfo = [...info];
        if (name.includes('title')) {
            newInfo[index].title = value;
        } else if (name.includes('text')) {
            newInfo[index].text = value;
        }

        setProduct({ ...product, info: newInfo });


    }

    return(
        <div className={styles.container}>
            <div className={styles.productField}>
                <div className={styles.product__images}>
                    <input ref={ref} type="file" name="" id=""/>
                    <input ref={ref2} type="file" name="" id=""/>
                    <input ref={ref3} type="file" name="" id=""/>
                    <input ref={ref4} type="file" name="" id=""/>
                </div>
                <div className={styles.productText}>
                    <MyInput labelStyles={styles.labelStyles} inputStyles={styles.inputStyles} name = 'name' id={'Название'} placeholder={'Название'} onChange={changeProduct} value={product.name} type={'text'}/>
                    <textarea name ='description' className={styles.textArea} placeholder={'Описание (до 2000 символов)'} maxLength={1999} value={product.description} onChange={changeProduct}/>
                    <h3>Тип</h3>
                    <select className={styles.select} value={product.type} onChange={(e) => setProduct({...product, type: e.target.value as ProductType})}>
                        {
                            types.map(type =>
                                <option key={type} value={type}>{type}</option>
                            )
                        }
                    </select>
                    <div className={styles.priceBlock}>
                        <MyInput labelStyles={styles.labelStyles} inputStyles={styles.inputStyles} max={5} name = 'price' id={'Цена (в рублях)'} placeholder={'Цена'} onChange={changeProduct} value={String(product.price)} type={'text'}/>
                        <label className={styles.label} htmlFor='isSale'>
                            Скидка
                            <input type="checkbox" id={'isSale'} checked={product.isSale} name='isSale' onChange={changeProduct}/>
                        </label>
                        <MyInput labelStyles={styles.labelStyles} inputStyles={styles.inputStyles} name = 'salePrice' id={'Скидка (в рублях)'} max={5} placeholder={'Скидка (в рублях)'} onChange={product.isSale ? changeProduct : () => {}} value={String(product.salePrice)} type={'text'}/>
                        <MyInput labelStyles={styles.labelStyles} inputStyles={styles.inputStyles} name = 'amount' id={'Количество на складе'} max={5} placeholder={'Количество на складе'} onChange={changeProduct} value={String(product.amount)} type={'text'}/>
                    </div>
                    <div className={styles.infoBlock}>
                        <h3>Характеристики</h3>
                        {product.info.map((information, index) =>
                            <div className={styles.infoItem} key={index}>
                                <MyInput labelStyles={styles.labelStyles} inputStyles={styles.inputStyles} name = {`title-${index}`} id={'Название'} placeholder={'Название'} onChange={changeInfo} value={information.title} type={'text'}/>
                                <MyInput addStyles={styles.input} labelStyles={styles.labelStyles} inputStyles={styles.inputStyles} name = {`text-${index}`} id={'Описание'} placeholder={'Описание'} onChange={changeInfo} value={information.text} type={'text'}/>
                            </div>
                        )}
                    </div>
                </div>

                <Button addStyles={styles.button} onClick={addProduct}>Создать</Button>
            </div>
        </div>
    )
}

export default AdminProducts;