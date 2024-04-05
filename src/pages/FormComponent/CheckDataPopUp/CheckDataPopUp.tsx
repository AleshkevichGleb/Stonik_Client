import {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./CheckDataPopUp.module.scss";
interface CheckDataPopUpProps {
    setIsShow: (isShow: boolean) => void,
    isDisabled: boolean,
    img: string,
    title: string,
    text: string,
}

const CheckDataPopUp: FC<CheckDataPopUpProps> = ({isDisabled, setIsShow, text, title, img}) => {
    const navigate = useNavigate();

    const closePopUp = () => {
        setIsShow(false);
        if(!isDisabled) {
            navigate('/basket');
        }
    }

    const closePopUpForEscape = (e: any) => {
        if(e.key === 'Escape') {
            setIsShow(false);
            if(!isDisabled)  {
                navigate('/basket');
            }
        }
    }

    useEffect
    (() => {
        window.addEventListener('keyup', closePopUpForEscape);
        return () => {
            window.removeEventListener('keyup', closePopUpForEscape);
        }
    }, [])
    return (
        <div className={styles.container} onClick={closePopUp}>
            <div className={styles.block} onClick={(e) => e.stopPropagation()}>
                <span onClick={closePopUp} className={styles.close}>&#10006;</span>
                <div className={styles.image__container}>
                    <img src={img} alt=""/>
                </div>
                <span className={styles.title}>{title}</span>
                <span className={styles.text}>{text}</span>
            </div>
        </div>
    )
}

export default CheckDataPopUp;