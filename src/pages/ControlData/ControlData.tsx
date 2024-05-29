import { FC } from 'react';
import style from "./ControlData.module.scss";
import BackLink from "../../common/BackLink/BackLink.tsx";

const ControlData: FC = () => {

    return (
        <div className={style.container}>
            <BackLink title={'Назад'}/>
            <h1>Условия обработки персональных данных</h1>
            <p>Мы ценим вашу конфиденциальность и стремимся обеспечить максимальную защиту ваших персональных данных. Ниже приведены условия, регулирующие сбор, использование и защиту ваших персональных данных при использовании нашего веб-сайта [адрес вашего веб-сайта] и связанных с ним услуг.</p>
            <h2 className={style.supTitle}>Сбор персональных данных</h2>
            <div>
                <p>Мы собираем следующие виды персональных данных:</p>
                <ul>
                    <li>Имя</li>
                    <li>Адрес</li>
                    <li>Адрес электронной почты</li>
                    <li>ругие данные, предоставленные вами в процессе использования наших услуг.</li>
                </ul>
            </div>
            <p>Эти данные могут быть собраны через формы на нашем веб-сайте, файлы cookie и другие технологии
                отслеживания, а также через внешние сервисы аналитики.</p>
            <h2 className={style.supTitle}>Использование персональных данных</h2>
            <div>
                <p>Мы используем ваши персональные данные для следующих целей:</p>
                <ul>
                    <li>Обработка ваших заказов и запросов.</li>
                    <li>Обеспечение вам доступа к нашим услугам и функциям.</li>
                    <li>Отправка вам информации о наших продуктах, услугах и акциях.</li>
                    <li>Предоставление вам поддержки и решение ваших вопросов.</li>
                    <li>Улучшение качества наших услуг и развитие новых продуктов и функций.</li>
                </ul>
            </div>
            <h2 className={style.supTitle}>Защита персональных данных</h2>
            <p>Мы принимаем меры для обеспечения безопасности ваших персональных данных, включая защиту от несанкционированного доступа, утечек и других угроз. Мы регулярно анализируем наши системы на предмет уязвимостей и обновляем их для обеспечения максимальной защиты данных.</p>
            <h2 className={style.supTitle}>Согласие</h2>
            <p>Продолжая использование нашего веб-сайта или приложения, вы соглашаетесь с этими условиями обработки персональных данных.</p>
        </div>
    )
};

export default ControlData;