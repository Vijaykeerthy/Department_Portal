import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../css/index.module.css';

const RemindersMarquee = () => {
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        // Fetch reminders from the backend
        axios.get('http://localhost:5000/api/admin/remindersmarquee')
            .then(response => {
                setReminders(response.data);  // Assuming reminders are returned as an array
            })
            .catch(error => {
                console.error('Error fetching reminders:', error);
            });
    }, []);

    return (
        <div className={styles.remindermarq}>
            {reminders.length > 0 ? (
                <marquee behavior="scroll" direction="left" scrollamount="10">
                {reminders.map((reminder) => (
                        <span key={reminder._id}>
                            <b>{reminder.title}</b> for [{reminder.year.toString().slice(-2)}MX] {reminder.subject} on {new Date(reminder.date).toDateString()} at {reminder.time} | &nbsp;
                        </span>
                    ))}
                </marquee>
            ) : (
                <marquee behavior="scroll" direction="left" scrollamount="10">
                <p>No reminders available.</p>
                </marquee>
            )}
        </div>
    );
};

export default RemindersMarquee;
