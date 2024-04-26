import {FC, useEffect, useState} from 'react';
import {instance} from "../../api/axios.ts";
import {INews} from "../../types/types.ts";
import styles from "./News.module.scss";
import {Link} from "react-router-dom";
import sliceText from "../../helpers/sliceText.ts";

    const News: FC = () => {
        const [news, setNews] = useState<INews[]>([]);

        const getNews = async() => {
            const {data} = await instance.get('/news');
            setNews(data);
        }

        useEffect(() => {
            getNews()
        }, []);
        return (
            <div className={styles.container}>

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