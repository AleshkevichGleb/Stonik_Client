import markImage from "../assets/images/checkMark.svg";


export interface ICheckMark {
    id: number,
    title: string,
    description: string,
    image: string,
}

export const checkMark: ICheckMark[] = [
    {
        id: 1,
        title: 'Оплата',
        description: 'Возможны любые виды оплаты. Безналичный расчет для юридических и физических лиц.',
        image: markImage,
    },
    {
        id: 2,
        title: 'Доставка',
        description: 'Стоимость доставки зависит от месторождения камня и соответствует действующим тарифам на грузоперевозки авто и ж/д транспорта. Уточняйте у менеджеров.',
        image: markImage,
    },
    {
        id: 3,
        title: 'Гарантия качества',
        description: 'Вся гарантийная продукция соответствует ГОСТам 32018-2012,23342-2012,9480-2012. Это характеризует наш гранит как продукцию высочайшего качества.',
        image: markImage,
    },
]