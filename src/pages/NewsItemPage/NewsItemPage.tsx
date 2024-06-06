import styles from "./NewsItemPage.module.scss";
import {useEffect, useState} from "react";
import {INews} from "../../types/types.ts";
import {instance} from "../../api/axios.ts";
import {useParams} from "react-router-dom";
import {AxiosError} from "axios";
import BackLink from "../../common/BackLink/BackLink.tsx";
import replaceLocalHost from "../../helpers/replaceLocalHost.ts";
const NewsItemPage = () => {
    const [newsItem, setNewsItem] = useState<INews | null>(null);
    const [error, setError] = useState<string>('');
    const {id} = useParams();
    const getNews = async () => {
        try {
            const response =await instance.get(`/news/${id}`)
            setNewsItem(response.data);

        } catch (e) {
            if(e instanceof AxiosError) {
               setError(e.response?.data.message)
            }
        }
    }

    useEffect(() => {
        getNews();
    }, []);

    console.log(newsItem)
    return(
        <div className={styles.container}>
            <div className={styles.backLink}>
                <BackLink title={'Назад'}/>
            </div>
            {
                !error ? <>
                    <div className={styles.image} style={{backgroundImage: `url(${replaceLocalHost(newsItem?.image)})`}}>
                        <div className={styles.dateBlock}>
                            <span
                                className={styles.date}>{new Date(newsItem?.createdAt as string).toLocaleString()}
                            </span>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: (newsItem?.description) as string}}
                         className={styles.infoBlock}>

                    </div>
                </> : <div className={styles.errorBlock}>
                    <h2>{error}</h2>
                </div>
            }
        </div>
    )
}

export default NewsItemPage;