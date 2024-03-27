import { FC } from "react";
import "./Menu.css";

interface MenuProps {
    onClick: (e: any) => void;
    isActiveMenu: boolean;
}

const Menu:FC<MenuProps> = ({onClick, isActiveMenu}) => {
    return (
        <div className={isActiveMenu ? 'burger active' : 'burger'} onClick={onClick}>
            <span className='burger__center'></span>
        </div>
    )
}

export default Menu;
