import React, {useEffect} from 'react';
import Cookies from 'js-cookie';
import request from "../request";
import s from './MainPage.module.css'
import config from "../config";

const MainPage = ({handleSubmit, navigate}) => {

    useEffect(() => {
        const token = Cookies.get(config.cookie_name);

        let messageElem = document.querySelector('#warnMessage');
        let paginationBackElem = document.querySelector('#paginationBack');
        let paginationForwardElem = document.querySelector('#paginationForward');
        let tableBodyElem = document.getElementById('tableBodyElem');

        let statsOffset = 0;
        let statsLimit = config.pagination_limit;
        let orderBy = 'desc_counter';

        const squeeze = () => {
            request(
                'post',
                'squeeze',
                {
                    'link': document.querySelector('#longLink').value
                },
                {}
            ).then(response => {
                {
                    response.id
                        ? (messageElem.textContent = 'Ссылка успешно добавлена.') && updateStatistics()
                        : (messageElem.textContent = `Возникла ошибка: ${JSON.stringify(response.detail)}`)
                }
            })
        }

        const updateStatistics = () => {
            request(
                'get',
                'statistics',
                {
                    order: orderBy,
                    offset: statsOffset,
                    limit: statsLimit,
                }
            ).then(response => {
                if (typeof response !== 'undefined' && response.length > 0) {
                    messageElem.textContent = '';
                    loadTableData(response);
                } else {
                    messageElem.textContent = 'Данные не найдены.';
                }
            })
        };

        const loadTableData = (items) => {
            tableBodyElem.innerHTML = '';
            items.forEach(item => {
                let row = tableBodyElem.insertRow();

                let id = row.insertCell(0);
                id.innerHTML = item.id;

                let counter = row.insertCell(1);
                counter.innerHTML = item.counter;

                let short = row.insertCell(2);
                short.innerHTML = `<a href="${config.api_base_url}s/${item.short}" target="_blank">${item.short}</a>`;

                let target = row.insertCell(3);
                target.innerHTML = item.target;
            });
        }

        const paginationBack = () => {
            {
                paginationBackElem && (statsOffset -= config.pagination_limit)
            }

            if (statsOffset < 1) {
                statsOffset = 0;
            }
            updateStatistics();
        }

        const paginationForward = () => {
            {
                paginationForwardElem && (statsOffset += config.pagination_limit)
            }
            updateStatistics();
        }

        document.getElementById('squeezeBtn').addEventListener('click', squeeze);
        paginationBackElem.addEventListener('click', paginationBack);
        paginationForwardElem.addEventListener('click', paginationForward);

        if (!token) {
            navigate("/login");
        } else {
            updateStatistics();
        }

        document.querySelector('#sortBy').addEventListener('change', function() {
            orderBy = this.value;
            updateStatistics();
        })
    });

    return (
        <div className={s.statsBlock}>
            <form onSubmit={handleSubmit}>
                <label>Ссылка</label>
                <input type="text" name="longLink" placeholder={'Ваша ссылка'}
                       id={'longLink'}
                       className={s.inputBody}
                       required />
                <button id={'squeezeBtn'}>Сократить</button>
            </form>
            <h1>Ваша статистика</h1>
            <label className={s.sortByLabel} htmlFor="sortBy">Сортировка</label>
            <select id={'sortBy'} name={'sortBy'}>
                <option value="asc_counter">Просмотры ↓</option>
                <option value="asc_short">Короткая ссылка ↓</option>
                <option value="asc_target">Оригинальная ссылка ↓</option>
                <option value="desc_counter" selected="selected">Просмотры ↑</option>
                <option value="desc_short">Короткая ссылка ↑</option>
                <option value="desc_target">Оригинальная ссылка ↑</option>
            </select>
            <table id={'statsTable'}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th data-sort="counter">Просмотры</th>
                    <th data-sort="short">Короткая ссылка</th>
                    <th data-sort="target">Оригинальная ссылка</th>
                </tr>
                </thead>
                <tbody id="tableBodyElem" />
            </table>
            <div className={s.paginationBlock}>
                <button id={'paginationBack'}>Назад</button>
                <button id={'paginationForward'}>Вперёд</button>
            </div>

            <h2 id={'warnMessage'}>Загрузка данных</h2>
        </div>
    )
}

export default MainPage;