import React, { useEffect, useState } from 'react';
import { getAiData } from './ai.js';
import { Facts } from './sections/facts.js';
import { Quotes } from './sections/quotes.js';
import { Born } from './sections/born.js';
import { Died } from './sections/died.js';

const x = React.createElement.bind(React);

const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const STORAGE_KEY = 'today_pw';

export const Dashboard = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(async () => {
        let password = window.localStorage.getItem(STORAGE_KEY);
        if (password === null) {
            password = prompt('Password');
        }

        let response;
        try {
            response = await getAiData(password, getToday());
        } catch (error) {
            window.localStorage.removeItem(STORAGE_KEY);
            setError(error.message);
            return;
        }
        window.localStorage.setItem(STORAGE_KEY, password);
        setData(response);
    }, []);

    if (error) {
        return x(
            "div",
            null,
            'Error: ',
            error
        );
    }

    if (data === null) {
        return x(
            "div",
            null,
            "Loading..."
        );
    }

    return x(
        "div",
        null,
        x(
            "div",
            { className: "date-header" },
            data.RequestedInputDay,
        ),
        x(
            "div",
            { className: "content" },
            x(
                Facts,
                { data: data.InterestingFacts }
            ),
            x(
                Quotes,
                { data: data.MotivationalQuotes }
            ),
            x(
                Born,
                { data: data.BornToday }
            ),
            x(
                Died,
                { data: data.DiedToday }
            ),
        )
    );
};
