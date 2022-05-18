import {useEffect, useState} from 'react';
import Axios from 'axios';
import Config from './config';
import './App.css';

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

    useEffect(() => {
        const DayList = ['SUN', 'MON', 'THU', 'WED', 'TUE', 'FRI', 'SAT'];

        let count = 0;

        const getGeolocation = () => {
            navigator.geolocation.getCurrentPosition((possition) => {
                const lat = possition.coords.latitude;
                const lon = possition.coords.longitude;

                Axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${Config.openWeatherMapApiKey}`)
                    .then((response) => {
                        const main = response.data.main;
                        const weather = response.data.weather;

                        const weatherText = weather[0].main;
                        const icon = `${process.env.PUBLIC_URL}/weather_icons/${weather[0].icon}.png`;
                        const temp = main.temp;

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
            const month = ('00' + (currentDate.getMonth() + 1)).slice(-2);
            const date = ('00' + currentDate.getDate()).slice(-2);
            setYear(year);
            setMonth(month);
            setDate(date);

            const day = DayList[currentDate.getDay()];
            setDay(day);

            const hour = ('00' + currentDate.getHours()).slice(-2);
            const minute = ('00' + currentDate.getMinutes()).slice(-2);
            const second = ('00' + currentDate.getSeconds()).slice(-2);

            setHour(hour);
            setMinute(minute);
            setSecond(second);

            if (count > 600) {
                getGeolocation();
                count = 0;
            }

            count++;
        };

        const timerId = setInterval(() => {
            tick();
        }, 1000);

        getGeolocation();

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
            <div className='weather'>
                <div className='weather-text'>{temp} ℃</div>
                <div className='weather-icon'>
                    <img src={weatherIcon} alt={weatherText}></img>
                </div>
            </div>
        </div>
    );
};

export default App;
