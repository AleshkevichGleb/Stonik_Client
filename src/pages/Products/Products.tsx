import {ChangeEvent, FC, useEffect, useState} from 'react';
import Title from '../../common/Title/Title';
import styles from "./Products.module.scss";
import {IFilter, IProduct} from "../../types/types.ts";
import ProductService from "../../services/productService.ts";
import ProductItem from "../../components/ProductItem/ProductItem.tsx";
import {TSort, useSortProducts} from "../../hooks/useSearchProducts.ts";
import MySelect from '../../components/MySelect/MySelect.tsx';
import Filter from "../../components/Filter/Filter.tsx";
import Button from "../../common/Button/Button.tsx";
import scrollToTop from "../../helpers/scrollToTop.ts";

const Products: FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState<IFilter>({
        sort: 'default',
        searchValue: '',
        isSale: false,
        type: [],
        startPrice: '',
        lastPrice: ''
    })
    const searchProducts = useSortProducts(
        products,
        filter.sort,
    );

    const [pagesArray, setPagesArray] = useState<number[]>([])
    const [viewsSettings, setViewsSettings] = useState<{limit: number, page: number}>({
        limit: 9,
        page: 1,
    })
    const fetchProducts = async() => {
        setIsLoading(true);
        const products = await ProductService.getProducts(
            viewsSettings.limit,
            viewsSettings.page,
            filter.type,
            filter.searchValue,
            filter.isSale,
            filter.startPrice,
            filter.lastPrice,
        );
        setProducts(products.rows);

        const arrLength = Math.ceil(products.count / viewsSettings.limit);
        console.log(arrLength)
        const pagesArray = Array.from({ length: arrLength }, (_, index) => index + 1)
        setPagesArray(pagesArray)

        setIsLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    }, [viewsSettings, filter]);

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
                                value = {filter.searchValue}
                                onChange = {(e) => setFilter({...filter, searchValue: e.target.value})}
                             />
                            <MySelect
                                value={filter.sort}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilter({...filter, sort: e.target.value as TSort})}
                                options={[
                                    {value: 'default', name: 'Сортировка по'},
                                    {value: 'type', name: 'Виду изделия'},
                                    {value: 'name', name: 'Названию'},
                                    {value: 'price', name: 'Цене'}
                                ]}
                            />
                            <MySelect
                                value={filter.sort}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => setViewsSettings({page: 1, limit: +e.target.value})}
                                options={[
                                    {value: '9', name: `Показывать по ${viewsSettings.limit}`},
                                    {value: '9', name: '9'},
                                    {value: '12', name: '12'},
                                    {value: '15', name: '15'}
                                ]}
                            />
                        </div>
                    </div>
                    <div className={styles.products__block}>
                        <div className={styles.filterBlock}>
                            <Filter
                                filter={filter}
                                setFilter={setFilter}
                            />
                        </div>
                        <div className={styles.products__list}>
                            {
                                // isLoading
                                //     ? <div className={styles.loadContainer}>
                                //         <img className={styles.image} src={loadImage} alt="loader"/>
                                //     </div> :
                                    searchProducts.length
                                        ? searchProducts.map(product =>
                                            <ProductItem key={  product.id} product={product}/>
                                        )
                                        : <h2>Ничего не найдено</h2>
                            }
                        </div>
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
                        pagesArray.map(page =>
                            <Button
                                onClick={() => {
                                    setViewsSettings({...viewsSettings, page: page});
                                    scrollToTop();
                                }}
                                addStyles = {+viewsSettings.page === +page ? styles.active_page : styles.page}
                                key = {page}
                                id = {String(page)}
                            >
                                {page}
                            </Button>
                        )
                    }
                    </div>
                </div>
        </div>
    )
};

export default Products;