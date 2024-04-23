import axios from 'axios';
import {FC, useEffect, useRef, useState} from 'react';
import {instance} from "../../api/axios.ts";
import {INews} from "../../types/types.ts";
import styles from "./News.module.scss";
import {Link} from "react-router-dom";
import sliceText from "../../helpers/sliceText.ts";

    const News: FC = () => {
        const [news, setNews] = useState<INews[]>([]);

        const ref = useRef<HTMLInputElement | null>(null);
        const ref2 = useRef<HTMLInputElement | null>(null);
        const addProduct = async() => {

            const formData = new FormData();
            formData.append('name', 'АААя vase');
            formData.append('description', 'Lor natus nulla odio odit officia optio perspiciatis provident quod quos repellendus sint tempore totam ullam vitae voluptate. Ad animi aperiam asperiores aspernatur blanditiis consequuntur cupiditate deserunt dolor dolorem dolores eius, enim eum impedit incidunt ipsa iste laboriosam, maiores mollitia odio odit provident quam quas quia ratione recusandae rerum sint sit sunt ut velit vitae voluptatem voluptates voluptatum. Ab accusantium ad animi asperiores beatae consectetur cupiditate dolorum ducimus eius error exercitationem explicabo facilis hic incidunt ipsum itaque iusto,Lor natus nulla odio odit officia optio perspiciatis provident quod quos repellendus sint tempore totam ullam vitae voluptate. Ad animi aperiam asperiores aspernatur blanditiis consequuntur cupiditate deserunt dolor dolorem dolores eius, enim eum impedit incidunt ipsa iste laboriosam, maiores mollitia odio odit provident quam quas quia ratione recusandae rerum sint sit sunt ut velit vitae voluptatem voluptates voluptatum. Ab accusantium ad animi asperiores beatae consectetur cupiditate dolorum ducimus eius error exercitationem explicabo facilis hic incidunt ipsum itaque iusto, laudantium maxime nam nesciunt non, optio pariatur porro provident quaerat quas quia quo recusandae repudiandae rerum saepe similique sunt ullam. Exercitationem libero nemo numquam placeat, unde ut voluptatum. A ab aspernatur blanditiis consectetur debitis ea, eligendi enim eos error et eum ex, explicabo facere magni maiores minima natus nihil nostrum omnis porro quaerat quam quo quos saepe');
            formData.append('price', '132.1');
            formData.append('type', 'Раковина')
            formData.append('info', JSON.stringify([{ title: "Тип камня", text: "600x2000, 700x2000, 800x2000, 900x2000 мм" }, {title: "Изделие", text: "38 мм"},{title: 'Месторождение', text: "Возможно изготовление нестандартных размеров (с удорожанием)"}]));

            formData.append('isSale', 'true');
            formData.append('salePrice', '100');
            formData.append('amount', '101');

            if (ref.current && ref.current.files && ref.current.files.length > 0) {
                formData.append('images', ref.current.files[0]);
            }
            if (ref2.current && ref2.current.files && ref2.current.files.length > 0) {
                formData.append('images', ref2.current.files[0]);
            }

            try {
                const response = await axios.post('http://localhost:5000/api/products', formData);
                console.log('Product added:', response.data);
            } catch (error) {
                console.error('Error adding product:', error);
            }
        }

        const getNews = async() => {
            const {data} = await instance.get('/news');
            setNews(data);
        }

        useEffect(() => {
            getNews()
        }, []);
        return (
            <div className={styles.container}>
                <div>
                    <div style={{display: 'flex', flexDirection: 'column', width: '300px'}}>
                        <input ref={ref} type="file" name="" id=""/>
                        <input ref={ref2} type="file" name="" id=""/>
                        <button onClick={addProduct}>Send</button>

                    </div>
                </div>

                {
                    news.length > 0
                    ?
                        <div className={styles.newsBlock}>
                            {news.map(newsItem =>
                                <Link to = {`/news/${newsItem.id}`} className={styles.newsItem} style={{backgroundImage: `url(${newsItem.image})`}} key={newsItem.id}>
                                    <span className={styles.newsDate}>
                                        {new Date(newsItem.createdAt).toLocaleDateString()}
                                    </span>
                                    <div className={styles.newsInfo}>
                                        <span className={styles.newsTitle}>{newsItem.title}</span>
                                        <span className={styles.newsDescription} dangerouslySetInnerHTML={{__html: sliceText( newsItem.description, 150)}}></span>
                                    </div>
                                </Link>
                                )
                            }
                        </div>
                    : <div className={styles.errorBlock}>
                            <h2>Нет новостей</h2>
                        </div>
                }
            </div>
        )
    };

export default News;