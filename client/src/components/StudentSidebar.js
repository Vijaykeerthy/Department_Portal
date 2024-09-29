import React, { useState } from 'react';
import styles from '../css/index.module.css'; // Import the CSS module
import '@fortawesome/fontawesome-free/css/all.min.css';

const StudentSidebar = ({ loadContent }) => {
    const [isGrievanceDropdownOpen, setIsGrievanceDropdownOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling sidebar

    const toggleGrievanceDropdown = (e) => {
        e.preventDefault();
        setIsGrievanceDropdownOpen(!isGrievanceDropdownOpen);
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

            <a className={styles['sidebar-buttons']} href="#academicschedule" onClick={(e) => loadContent(e, 'AcademicSchedule')}>
                <i className="fas fa-tachometer-alt"></i> Academic Schedule
            </a>

            <a className={styles['sidebar-buttons']} href="#repository" onClick={(e) => loadContent(e, 'Repository')}>
                <i className="fas fa-folder"></i> Repository
            </a>
            <div className={styles['dropdown-s']}>
                <a className={styles['sidebar-buttons']} href="#page4" onClick={toggleGrievanceDropdown}>
                    <i className="fas fa-comments"></i> Grievances
                </a>
                {isGrievanceDropdownOpen && (
                    <div className={styles['dropdown-content-s']}>
                        <a href="#post-grievance" onClick={(e) => handleDropdownClick(e, 'Grievancesposting', setIsGrievanceDropdownOpen)}>Post Grievance</a>
                        <a href="#view-grievance" onClick={(e) => handleDropdownClick(e, 'ViewGrievances', setIsGrievanceDropdownOpen)}>View Grievances</a>
                    </div>
                )}
            </div>
            {/* <a className={styles['sidebar-buttons']} href="#page5" onClick={(e) => loadContent(e, 'page5')}>
                <i className="fas fa-check-circle"></i> Attendance
            </a> */}
            {/* Toggle Button */}
            <button className={styles['toggle-button']} onClick={toggleSidebar}>
                <i className={isSidebarOpen ? 'fas fa-chevron-left' : 'fas fa-chevron-right'}></i>
            </button>
        </div>
    );
}

export default StudentSidebar;
