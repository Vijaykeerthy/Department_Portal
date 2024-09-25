import React from 'react';
import styles from '../css/index.module.css'; // Import the CSS module
import RemindersMarquee from './ReminderMarquee';


const AdminTopbar = () => {
    const userName = localStorage.getItem('userName'); // Get the user name from local storage

    const handleLogout = async () => {
        try {
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            localStorage.removeItem('userType');
            window.location.href = '/'; // Redirect to login page or handle UI update
        } catch (error) {
            console.error('Logout failed', error);
            // Handle error, e.g., show a notification to the user
        }
    };

    return (
        <div className={styles.topbar}>
            <div className={styles.title}>
                <h2>MCA ACADEMIC PORTAL</h2>
            </div>
            <div className={styles.profile}>
                 <span className={styles.userName}>{userName}</span>
                <img src="/images/profile.png" alt="Profile" />
                <div className={styles['dropdown-content']}>
                    <a href="#profile">Profile</a>
                    <a href="#logout" onClick={handleLogout}>Logout</a>
                </div>
            </div>
            < RemindersMarquee />
        </div>
    );
}

export default AdminTopbar;
