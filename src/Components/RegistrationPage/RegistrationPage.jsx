import React, {useState} from 'react';
import s from './RegistrationPage.module.css';
import request from "../request";

const RegistrationPage = ({handleSubmit, navigate}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const registration = () => {
        let messageElem = document.querySelector('#warnMessage');

        request(
            'post',
            'register',
            {
                'username': username,
                'password': password
            }
        ).then(response => {
            {
                response.username
                    ? navigate("/login")
                    : messageElem.textContent = `Пользователь ${username} уже существует!`;
            }
        })
    }

    return (
        <div className={s.loginBlock}>
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit}>
                <div className={s.loginBlock_login}>
                    <label>Логин</label>
                    <input type="text" name="login" placeholder="Введите логин"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required />
                </div>
                <div className={s.loginBlock_password}>
                    <label>Пароль</label>
                    <input type="password" name="password" placeholder="Введите пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required />
                </div>
                <button onClick={registration}>Регистрация</button>
                <h2 id={'warnMessage'}/>
            </form>
        </div>
    )
}

export default RegistrationPage;