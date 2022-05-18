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

    useEffect(() => {
        const DayList = ['SUN', 'MON', 'THU', 'WED', 'TUE', 'FRI', 'SAT'];
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
        };

        const getGeolocation = () => {
            navigator.geolocation.getCurrentPosition((possition) => {
                console.log(possition);

                const lat = possition.coords.latitude;
                const lon = possition.coords.longitude;

                Axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Config.openWeatherMapApiKey}`)
                    .then((response) => {
                        console.log(response.data);
                        const main = response.data.main;
                        const weather = response.data.weather;

                        const weatherText = response.data.weather[0].main;
                        const icon = response.data.weather[0].icon;

                        console.log(weatherText);
                        console.log(icon);

                        setWeatherText(weatherText);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
        };

        tick();
        getGeolocation();

        const timerId = setInterval(() => {
            tick();
        }, 1000);

        const geolocationTimerId = setInterval(() => {
            getGeolocation();
        }, 600000);

        return () => {
            clearInterval(timerId);
            clearInterval(geolocationTimerId);
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
                <div className='weather-text'>{weatherText}</div>
            </div>
        </div>
    );
};

export default App;
