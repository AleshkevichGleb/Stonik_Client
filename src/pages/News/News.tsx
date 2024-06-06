import {FC, useEffect, useState} from 'react';
import {instance} from "../../api/axios.ts";
import {INews} from "../../types/types.ts";
import styles from "./News.module.scss";
import {Link} from "react-router-dom";
import sliceText from "../../helpers/sliceText.ts";
import loaderImage from "../../assets/images/loader-icon.svg";
import replaceLocalHost from "../../helpers/replaceLocalHost.ts";

    const News: FC = () => {
        const [news, setNews] = useState<INews[]>([]);
        const [isLoading, setIsLoading] = useState<boolean>(true);
        const getNews = async() => {
            setIsLoading(true)
            const {data} = await instance.get('/news');
            setNews(data);
            setIsLoading(false)
        }

        useEffect(() => {
            getNews()
        }, []);

        if(isLoading) {
            return (
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <img width={300} height={300} src={loaderImage} alt=""/>
                </div>
            )
        }

        return (
            <div className={styles.container}>
                {
                    (news.length > 0)
                        ?
                        <div className={styles.newsBlock}>
                            {news.map(newsItem =>
                                <Link to = {`/news/${newsItem.id}`} className={styles.newsItem} style={{backgroundImage: `url(${replaceLocalHost(newsItem.image)})`}} key={newsItem.id}>
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
                    :
                        <div style={{display: 'flex', justifyContent: 'center', padding: '100px 0'}}>
                           <h1>Нет новостей</h1>
                        </div>

                }
            </div>
        )
    };

export default News;