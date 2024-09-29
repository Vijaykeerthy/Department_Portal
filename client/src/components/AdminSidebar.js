import React, { useState } from 'react';
import styles from '../css/index.module.css'; // Import the CSS module
import '@fortawesome/fontawesome-free/css/all.min.css';

const AdminSidebar = ({ loadContent }) => {
    const [isAcademicDropdownOpen, setIsAcademicDropdownOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling sidebar

    const toggleAcademicDropdown = (e) => {
        e.preventDefault();
        setIsAcademicDropdownOpen(!isAcademicDropdownOpen);
    };

    const handleDropdownClick = (e, page, setDropdownOpen) => {
        e.preventDefault();
        setDropdownOpen(false);
        loadContent(e, page);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={`${styles.sidebar} ${isSidebarOpen ? styles['sidebar-open'] : ''}`}>
            <a className={styles['sidebar-dept-logo']} href="#page1" onClick={(e) => loadContent(e, 'page1')}>
                <img src="/images/logo.png" alt="Logo" />
            </a>
            <a className={styles['sidebar-buttons']} href="#page1" onClick={(e) => loadContent(e, 'page1')}>
                <i className="fas fa-tachometer-alt"></i> Dashboard
            </a>
            <a className={styles['sidebar-buttons']} href="#circularposting" onClick={(e) => loadContent(e, 'circularposting')}>
                <i className="fas fa-bullhorn"></i> Post Circular
            </a>

            <div className={styles['dropdown-s']}>
                <a className={styles['sidebar-buttons']} href="#page2" onClick={toggleAcademicDropdown}>
                    <i className="fas fa-calendar-alt"></i> Academic Schedule
                </a>
                {isAcademicDropdownOpen && (
                    <div className={styles['dropdown-content-s']}>
                        <a href="#post" onClick={(e) => handleDropdownClick(e, 'schedulepost', setIsAcademicDropdownOpen)}>Post Schedule</a>
                        <a href="#view" onClick={(e) => handleDropdownClick(e, 'scheduleview', setIsAcademicDropdownOpen)}>View Schedule</a>
                    </div>
                )}
            </div>
            <a className={styles['sidebar-buttons']} href="#setreminder" onClick={(e) => loadContent(e, 'setreminder')}>
                <i className="fas fa-bullhorn"></i> Set Reminders
            </a>
            <a className={styles['sidebar-buttons']} href="#repository" onClick={(e) => loadContent(e, 'Repository')}>
                <i className="fas fa-folder"></i> Repository
            </a>
            <a className={styles['sidebar-buttons']} href="#page4" onClick={(e) => loadContent(e, 'respondgrievance')}>
                <i className="fas fa-comments"></i> Grievances
            </a>
            {/* <a className={styles['sidebar-buttons']} href="#page5" onClick={(e) => loadContent(e, 'page5')}>
                <i className="fas fa-check-circle"></i> Attendance
            </a> */}

            {/* Toggle Button */}
            <button className={styles['toggle-button']} onClick={toggleSidebar}>
                <i className={isSidebarOpen ? 'fas fa-chevron-left' : 'fas fa-chevron-right'}></i>
            </button>
        </div>
    );
};

export default AdminSidebar;
