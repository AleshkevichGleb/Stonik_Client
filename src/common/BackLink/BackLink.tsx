import { FC } from "react";
import {useNavigate} from "react-router-dom";
import styles from "./BackLink.module.scss"
interface BackLinkProps {
    title: string
}

const BackLink: FC<BackLinkProps> = ({title}) => {
    const navigate = useNavigate();

    return(
        <div>
            <span className={styles.back} onClick={() => navigate(-1)}>{title}</span>
        </div>
    )
}

export default BackLink;