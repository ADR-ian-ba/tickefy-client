/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const CountDownTimer = ({ targetDate, targetTime }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const target = new Date(`${targetDate}T${targetTime}:00`); // Combine date and time

            const difference = target - now;

            if (difference > 0) {
                // Calculate time left
                let days = Math.floor(difference / (1000 * 60 * 60 * 24));
                let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                let minutes = Math.floor((difference / 1000 / 60) % 60);
                let seconds = Math.floor((difference / 1000) % 60);

                // Format time left
                days = days < 10 ? '0' + days : days;
                hours = hours < 10 ? '0' + hours : hours;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                seconds = seconds < 10 ? '0' + seconds : seconds;

                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            } else {
                // If the countdown is over
                setTimeLeft("00:00:00");
            }
        };

        const intervalId = setInterval(updateCountdown, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [targetDate, targetTime]);

    return (
        <div>
            <h1>{timeLeft}</h1>
        </div>
    );
}

export default CountDownTimer;
