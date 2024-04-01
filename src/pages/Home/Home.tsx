import { FC } from 'react';
import styles from "./Home.module.scss";
import HomeCatalog from '../../components/HomeCatalog/HomeCatalog';
import Prewiew from '../../components/Preview/Preview';

const Home: FC = () => {

    return (
        <div className={styles.home}>
            <Prewiew/>
            <HomeCatalog/>
        </div>
    )
};

export default Home;