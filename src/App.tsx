import {useEffect, useState} from 'react';
import './App.css';

const App: React.FC = () => {
    const DayList = ['SUN', 'MON', 'THU', 'WED', 'TUE', 'FRI', 'SAT'];

    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [date, setDate] = useState('');
    const [day, setDay] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [second, setSecond] = useState('');

    useEffect(() => {
        const timerId = setInterval(() => {
            tick();
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    });

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

    return (
        <div className='App'>
            <div className='clock'>
                <div className='date'>
                    {year} / {month} / {date} ({day})
                </div>
                <div className='time'>
                    {hour} : {minute}
                    <span className='second'>{second}</span>
                </div>
            </div>
        </div>
    );
};

export default App;
