import {useEffect, useState} from 'react';
import React from 'react';
import Axios from 'axios';
import Config from './config';
import './App.css';
import {openReverseGeocoder} from '@geolonia/open-reverse-geocoder';

const App: React.FC = () => {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [date, setDate] = useState('');
    const [day, setDay] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [second, setSecond] = useState('');

    const [weatherText, setWeatherText] = useState('');
    const [weatherIcon, setWeatherIcon] = useState('');
    const [temp, setTemp] = useState('');

    const [lon, setLon] = useState(0);
    const [lat, setLat] = useState(0);
    const [city, setCity] = useState('');

    /**
     * 指定した数字を2桁までの0で埋めます。
     * @param value ゼロ埋めをする数字を指定します。
     * @returns ゼロ埋めをした数字を文字列として返します。
     */
    const zeroPadding = (value: number) => {
        const ret = ('00' + value).slice(-2);

        return ret;
    };

    useEffect(() => {
        const DayList = ['SUN', 'MON', 'THU', 'WED', 'TUE', 'FRI', 'SAT'];

        let count = 0;

        const getLocationWeather = () => {
            navigator.geolocation.getCurrentPosition((possition) => {
                const lat = possition.coords.latitude;
                const lon = possition.coords.longitude;

                setLat(lat);
                setLon(lon);

                if (lat != null && lon != null) {
                    openReverseGeocoder([lon, lat])
                        .then((result) => {
                            setCity(result.city);
                        })
                        .catch((reason) => {
                            console.error(reason);
                        });
                }

                Axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${Config.openWeatherMapApiKey}`)
                    .then((response) => {
                        const main = response.data.main;
                        const weather = response.data.weather;

                        const weatherText = weather[0].main;
                        const icon = `${process.env.PUBLIC_URL}/weather_icons/${weather[0].icon}.png`;
                        let temp = main.temp;
                        temp = Math.round(temp * 10) / 10;

                        setWeatherText(weatherText);
                        setWeatherIcon(icon);
                        setTemp(temp);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
        };

        const tick = () => {
            const currentDate = new Date();

            const year = currentDate.getFullYear().toString();
            const month = zeroPadding(currentDate.getMonth() + 1);
            const date = zeroPadding(currentDate.getDate());
            setYear(year);
            setMonth(month);
            setDate(date);

            const day = DayList[currentDate.getDay()];
            setDay(day);

            const hour = zeroPadding(currentDate.getHours());
            const minute = zeroPadding(currentDate.getMinutes());
            const second = zeroPadding(currentDate.getSeconds());

            setHour(hour);
            setMinute(minute);
            setSecond(second);

            if (count > 600) {
                getLocationWeather();
                count = 0;
            }

            count++;
        };

        const timerId = setInterval(() => {
            tick();
        }, 1000);

        getLocationWeather();

        return () => {
            clearInterval(timerId);
        };
    }, []);

    return (
        <div className='App'>
            <div className='content'>
                <div className='clock'>
                    <div className='date'>
                        {year}/{month}/{date} ({day})
                    </div>
                    <div className='time'>
                        {hour}:{minute}
                        <span className='second'>{second}</span>
                    </div>
                </div>
            </div>
            <footer>
                <div className='location'>{city}</div>
                <div className='weather'>
                    <div className='weather-text'>{temp} ℃</div>
                    <div className='weather-icon'>
                        <img src={weatherIcon} alt={weatherText}></img>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
