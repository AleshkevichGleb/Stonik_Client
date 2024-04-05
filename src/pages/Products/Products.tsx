import { FC, useEffect, useState } from 'react';
import Title from '../../common/Title/Title';
import styles from "./Products.module.scss";
import {IProduct} from "../../types/types.ts";
import ProductService from "../../services/productService.ts";
import ProductItem from "../../components/ProductItem/ProductItem.tsx";

const Products: FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const fetchProducts = async() => {
        setIsLoading(true);
        const products = await ProductService.getProducts(999,1,'');
        setProducts(products.rows)
        setIsLoading(false);
    }


    useEffect(() => {
        fetchProducts();
    }, []);


    return (
        <div className={styles.products}>
            <div className={styles.products__container}>
                    <div className={styles.sort}>
                        <Title 
                            addStyles1={styles.productsTitle}
                            title_p1='Изделия из ' 
                            title_p2='натурального камня'
                        />
                        <div className={styles.sortBlock}>
                             <input
                                className={styles.searchInput}
                                placeholder="Поиск"
                                // value = {filter.query}
                                // onChange={e => setFilter({...filter, query: e.target.value})}
                             />
                            {/*<MySelect */}
                            {/*    value={'sdfsdf'}*/}
                            {/*    onChange={e => console.log(e)}*/}
                            {/*    defaultValue='Сортировка по'*/}
                            {/*    options={[*/}
                            {/*        {value: 'default', name: 'Сортировка по'},*/}
                            {/*        {value: 'type', name: 'Производителю'},*/}
                            {/*        {value: 'title', name: 'Названию'},*/}
                            {/*        {value: 'price', name: 'Цене'}*/}
                            {/*    ]}*/}
                            {/*/>*/}
                        </div>
                    </div>
                    <div className={styles.products__block}>
                        {
                           isLoading
                            ? <h2>Loading</h2>
                            : products.map(pr =>
                               <ProductItem key = {pr.id} product={pr}/>
                            )
                        }
                        {/*<Filter filter= {filter} setFilter = {setFilter} dispatch = {dispatch}/>*/}
                        {
                            // !filter.query.length &&
                            // !Object.keys(filter.price).length &&
                            // !Object.keys(filter.brand).length &&
                            // !Object.keys(filter.color).length &&
                            // !Object.keys(filter.mm).length
                            //     ?<SortProducts
                            //         searchProducts = {FilterAndSearchedProducts}
                            //         pagesArray = {pagesArray}
                            //         subArray = {subArray}
                            //         currentPage = {currentPage}
                            //         dispatch = {dispatch}
                            //     />
                            //
                            //     :<>
                            //         {
                            //             !subArray.length
                            //             ?   <h3 className={styles.empty}>Ничего не найдено</h3>
                            //             :   <FilterProducts
                            //                     products={FilterAndSearchedProducts}
                            //                     subArray = {subArray}
                            //                     currentPage = {currentPage}
                            //                 />
                            //         }
                            //     </>
                        }
                    </div>
                    <div className={styles.pages}>
                    {
                        // pagesArray.map(page =>
                        //     <Button
                        //         onClick={changeCurrentPage}
                        //         addStyles = {+currentPage === +page ? styles.active_page : styles.page}
                        //         key = {page}
                        //         id = {page}
                        //     >
                        //         {page}
                        //     </Button>
                        // )
                    }
                    </div>
                </div>
        </div>
    )
};

export default Products;