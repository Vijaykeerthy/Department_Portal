import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../css/index.module.css'; // Import the CSS module
import pdf from '../Assets/Images/pdf.webp'

const AcademicScheduleView = () => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/admin//view-academicschedule')
            .then(response => {
                setSchedules(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the schedules!', error);
            });
    }, []);

    const openPdfInNewTab = (pdfUrl) => {
        window.open(pdfUrl, '_blank').focus();
    };

    return (
        <div className={styles.content}> {/* Use styles object */}
            <h1 style={{ paddingLeft: 20,}}>Academic Schedules</h1>
           <div className={styles.cardcontainer}>
            {schedules.map(schedule => (
            <div className={styles.card} key={schedule._id}>
                <div className={styles.cardPdf}>
                    <h2>{schedule.title}</h2>
                    <p>Class {schedule.group}</p>
                    <p> {schedule.semester}</p>
                    <img onClick={() => openPdfInNewTab(`http://localhost:5000/academic_schedules/${schedule.pdfFileName}`)} style={{ height: 90, width: 120 , margin:20}} src={pdf}>
                    </img>
                    <br/>
                    <a 
                    href={`http://localhost:5000/academic_schedules/${schedule.pdfFileName}`} 
                    download 
                    style={{ color: 'blue', cursor: 'pointer', padding: '10px', textAlign: 'center', textDecoration: 'none'}}
                    >
                    Download PDF
                    </a>                
                    </div>
        </div>
    ))}
</div>

        </div>
    );
}

export default AcademicScheduleView;
