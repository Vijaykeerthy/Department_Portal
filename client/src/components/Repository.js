import React, { useState } from 'react';
import styles from '../css/index.module.css'; 
import folder from '../Assets/Images/folder.png';

// Import your semester components
import Semester1 from './Semester1';
import Semester2 from './Semester2';
import Semester3 from './Semester3';
import Semester4 from './Semester4';

const Repository = () => {
    const [selectedSemester, setSelectedSemester] = useState(null); // Track selected semester

    const semesters = [
        { id: 1, title: 'Semester 1', component: <Semester1 /> },
        { id: 2, title: 'Semester 2', component: <Semester2 /> },
        { id: 3, title: 'Semester 3', component: <Semester3 /> },
        { id: 4, title: 'Semester 4', component: <Semester4 /> }
    ];

    const handleCardClick = (semesterId) => {
        setSelectedSemester(semesterId); // Set selected semester on card click
    };

    const handleBackClick = () => {
        setSelectedSemester(null); // Go back to the main card view
    };

    return (
        <div className={styles.content}>
            <h1 style={{ paddingLeft: 20 }}>Repository</h1>
            <br />

            {selectedSemester === null ? (
                // Display cards when no semester is selected
                <div className={styles.cardcontainer}>
                    {semesters.map((semester) => (
                        <div 
                            className={styles.card} 
                            key={semester.id}
                            onClick={() => handleCardClick(semester.id)} // Handle card click
                            style={{ cursor: 'pointer' }}
                        >
                            <img 
                                src={folder}
                                alt="Folder" 
                                className={styles.cardImage} 
                                style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                            />
                            <h2>{semester.title}</h2>
                        </div>
                    ))}
                </div> 
            ) : (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center'}}>
                        <button onClick={handleBackClick} style={{ width: 250 }}>Back to Repository</button>
                    </div>
                    {semesters.find(sem => sem.id === selectedSemester)?.component}
                </div>
            
            )}
        </div>
    );
};

export default Repository;
