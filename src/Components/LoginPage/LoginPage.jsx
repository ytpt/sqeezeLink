import React, {useState} from 'react';
import Cookies from 'js-cookie';
import s from "../RegistrationPage/RegistrationPage.module.css";

import request from "../request";
import config from "../config";

const LoginPage = ({handleSubmit, navigate}) => {

    let messageElem = document.querySelector('#warnMessage');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const authorization = () => {
        request(
            'post',
            'login',
            {},
            {
                'username': username,
                'password': password
            }
        ).then(response => {
            if (response.access_token) {
                Cookies.set(config.cookie_name, response.access_token);
                navigate("/statistic");
            } else {
                messageElem.textContent = `Возникла ошибка: ${JSON.stringify(response.detail)}`;
            }
        })
    }

    return (
        <div className={s.loginBlock}>
            <h1>Вход</h1>
            <form onSubmit={handleSubmit}>
                <div className={s.loginBlock_login}>
                    <label>Логин</label>
                    <input type='text' name='login' placeholder='Введите логин'
                           value={username}
                           onChange={e => setUsername(e.target.value)}
                           required />
                </div>
                <div className={s.loginBlock_password}>
                    <label>Пароль</label>
                    <input type='password' name='password' placeholder='Введите пароль'
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                           required />
                </div>
                <button id={'loginBtn'} onClick={authorization}>Войти</button>
                <h2 id={'warnMessage'}/>
            </form>
        </div>
    )
}

export default LoginPage;