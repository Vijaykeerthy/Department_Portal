import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../css/index.module.css'; // Import the CSS module
import pdf from '../Assets/Images/pdf.webp';

const StudentAcademicSchedule = () => {
    const [schedules, setSchedules] = useState([]);
    const classGroup = localStorage.getItem('classgroup'); // Get classGroup from local storage
    const mxyear = localStorage.getItem('year'); // Get mxyear from local storage (e.g., 23)

    useEffect(() => {
        axios.get('http://localhost:5000/api/admin/view-academicschedule')
            .then(response => {
                const filteredSchedules = response.data.filter(schedule => {
                    // Extract last two digits of the schedule year and compare with mxyear
                    const scheduleYearLastTwo = schedule.year.toString().slice(-2);
                    return schedule.group === classGroup && scheduleYearLastTwo === mxyear;
                });
                setSchedules(filteredSchedules);
            })
            .catch(error => {
                console.error('There was an error fetching the schedules!', error);
            });
    }, [classGroup, mxyear]);

    const openPdfInNewTab = (pdfUrl) => {
        window.open(pdfUrl, '_blank').focus();
    };

    return (
        <div className={styles.content}>
            <h1 style={{ paddingLeft: 20 }}>Academic Schedules</h1>
            <div className={styles.cardcontainer}>
                {schedules.length > 0 ? (
                    schedules.map(schedule => (
                        <div className={styles.card} key={schedule._id}>
                            <div className={styles.cardPdf}>
                                <h2>{schedule.title}</h2>
                                <p className={styles.Classgroup}>Class {schedule.group}</p>
                                <p>{schedule.semester}</p>
                                <img 
                                    onClick={() => openPdfInNewTab(`http://localhost:5000/academic_schedules/${schedule.pdfFileName}`)} 
                                    style={{ height: 90, width: 120, margin: 20 }} 
                                    src={pdf} 
                                    alt="PDF"
                                />
                                <br />
                                <a 
                                    href={`http://localhost:5000/academic_schedules/${schedule.pdfFileName}`} 
                                    download={schedule.pdfFileName} 
                                    style={{ color: 'blue', cursor: 'pointer', padding: '10px', textAlign: 'center', textDecoration: 'none' }}
                                >
                                    Download PDF
                                </a>
                            </div>
                            <br />
                        </div>
                    ))
                ) : (
                    <p className={styles.empty}>Will Be Available Soon</p> // Message when no schedules are present
                )}
            </div>
        </div>
    );
};

export default StudentAcademicSchedule;
