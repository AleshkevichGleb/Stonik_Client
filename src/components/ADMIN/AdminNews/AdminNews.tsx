import {useEffect, useRef, useState} from "react";
import {instance} from "../../../api/axios.ts";
import {INews} from "../../../types/types.ts";
import {Link} from "react-router-dom";
import styles from "./AdminNews.module.scss";
import sliceText from "../../../helpers/sliceText.ts";
import MyInput from "../../../common/Input/MyInput.tsx";
import {toast} from "react-toastify";
import Button from "../../../common/Button/Button.tsx";
import {AxiosError} from "axios";
const AdminNews = () => {
    const ref = useRef<HTMLInputElement | null>(null);
    const [news, setNews] = useState<INews[]>([]);
    const [newsItem, setNewsItem] = useState<{title: string, description: string}>({
        title: '',
        description: '',
    })

    const getNews = async() => {
        const {data} = await instance.get('/news');
        setNews(data);
    }

    const addNews = async() => {
        const formData = new FormData();

        formData.append('title', newsItem.title);
        formData.append('description', newsItem.description);

        if (ref.current && ref.current.files && ref.current.files.length > 0) {
            formData.append('image', ref.current.files[0]);
        }

        try {
            await instance.post('/news', formData);
            toast.success('Новость успешно добавлена!')
            setNewsItem({
                title: '',
                description: ''
            })
            if (ref.current) {
                ref.current.value = '';
            }
            getNews();
        } catch (error) {
            if(error instanceof AxiosError) {
                toast.error(error.response?.data.message)
            }
        }
    }

    const deleteNews = async(id: string) => {
        try {
            const {data} = await instance.delete(`/news/${id}`)
            toast.success(data.message)
            getNews();
        } catch (e) {
            if(e instanceof AxiosError) {
                toast.error(e.response?.data.message)
            }
            console.log(e)
        }
    }

    useEffect(() => {
        getNews()
    }, []);

    console.log(ref)
    
    return(
        <div className={styles.container}>
            <div className={styles.addNewsContainer}>
                <h2>Добавить новость</h2>
                <div className={styles.addNewsBlock}>
                    <input ref={ref} type="file" accept="image/*"/>
                    <MyInput
                        inputStyles={styles.inputStyles}
                        labelStyles={styles.labelStyles}
                        id={'title'}
                        placeholder={'Заголовок'}
                        onChange={(e) => setNewsItem({...newsItem, title: e.target.value })}
                        value={newsItem.title}
                        type={'text'}
                    />
                    <textarea maxLength={10000} className={styles.textArea} placeholder={'Описание (до 10000 символов)'} value={newsItem.description} onChange = {e => setNewsItem({...newsItem, description: e.target.value})}/>
                    <Button addStyles={styles.button} onClick={addNews}>Отправить</Button>
                </div>
            </div>
            {
                news.length > 0
                    ?
                    <div className={styles.newsBlock}>
                        {news.map(newsItem =>
                            <Link to = {`/news/${newsItem.id}`} className={styles.newsItem} style={{backgroundImage: `url(${newsItem.image})`}} key={newsItem.id}>
                                <div className={styles.newsAddInfo}>
                                    <Button onClick={async (e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        await deleteNews(String(newsItem.id))
                                    }} addStyles={styles.newsDelete}>
                                        Удалить новость
                                    </Button>
                                    <span className={styles.newsDate}>
                                        {new Date(newsItem.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className={styles.newsInfo}>
                                    <span className={styles.newsTitle}>{newsItem.title}</span>
                                    <span className={styles.newsDescription}
                                          dangerouslySetInnerHTML={{__html: sliceText(newsItem.description, 150)}}></span>
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
}

export default AdminNews;