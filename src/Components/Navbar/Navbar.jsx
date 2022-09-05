import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';
import UserNav from "./UserNav";

const Navbar = (props) => {
    return (
        <nav>
            <div className={s.linkBlock}>
                <NavLink to='/register' className={ navData => navData.isActive ? s.active : s.item }>
                    Регистрация
                </NavLink>
            </div>
            <div className={s.linkBlock}>
                <NavLink to='/login' className={ navData => navData.isActive ? s.active : s.item }>
                    Авторизация
                </NavLink>
            </div>
            <UserNav navigate={props.navigate} />
        </nav>
    );
}

export default Navbar;