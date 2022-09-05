import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';
import Cookies from 'js-cookie';
import config from "../config";

const UserNav = (props) => {
    const token = Cookies.get(config.cookie_name);
    if (token){
        const logout = () => {
            Cookies.remove(config.cookie_name);
            {props.navigate("/login")}
        }

        return (
                <div>
                    <div className={s.linkBlock}>
                        <NavLink to='/statistic' className={ navData => navData.isActive ? s.active : s.item }>Статистика</NavLink>
                    </div>
                    <div className={s.linkBlockExit}>
                        <a onClick={logout}>Выйти</a>
                    </div>

                </div>
        );
    } else {
        return '';
    }
}

export default UserNav;