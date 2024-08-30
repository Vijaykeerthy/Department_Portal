import React, { useState } from 'react';
import styles from '../css/index.module.css'; // Import the CSS module
import '@fortawesome/fontawesome-free/css/all.min.css';

const AdminSidebar = ({ loadContent }) => {
    const [isAcademicDropdownOpen, setIsAcademicDropdownOpen] = useState(false);
    const [isRepositoryDropdownOpen, setIsRepositoryDropdownOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling sidebar

    const toggleAcademicDropdown = (e) => {
        e.preventDefault();
        setIsAcademicDropdownOpen(!isAcademicDropdownOpen);
    };

    const toggleRepositoryDropdown = (e) => {
        e.preventDefault();
        setIsRepositoryDropdownOpen(!isRepositoryDropdownOpen);
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
                        <a href="#first-year" onClick={(e) => handleDropdownClick(e, 'firstYear', setIsAcademicDropdownOpen)}>First Year</a>
                        <a href="#second-year" onClick={(e) => handleDropdownClick(e, 'secondYear', setIsAcademicDropdownOpen)}>Second Year</a>
                    </div>
                )}
            </div>
            <div className={styles['dropdown-s']}>
                <a className={styles['sidebar-buttons']} href="#page3" onClick={toggleRepositoryDropdown}>
                    <i className="fas fa-folder"></i> Repository
                </a>
                {isRepositoryDropdownOpen && (
                    <div className={styles['dropdown-content-s']}>
                        <a href="#repo1" onClick={(e) => handleDropdownClick(e, 'repo1', setIsRepositoryDropdownOpen)}>First Year</a>
                        <a href="#repo2" onClick={(e) => handleDropdownClick(e, 'repo2', setIsRepositoryDropdownOpen)}>Second Year</a>
                    </div>
                )}
            </div>
            <a className={styles['sidebar-buttons']} href="#page4" onClick={(e) => loadContent(e, 'respondgrievance')}>
                <i className="fas fa-comments"></i> Grievances
            </a>
            <a className={styles['sidebar-buttons']} href="#page5" onClick={(e) => loadContent(e, 'page5')}>
                <i className="fas fa-check-circle"></i> Attendance
            </a>

            {/* Toggle Button */}
            <button className={styles['toggle-button']} onClick={toggleSidebar}>
                <i className={isSidebarOpen ? 'fas fa-chevron-left' : 'fas fa-chevron-right'}></i>
            </button>
        </div>
    );
};

export default AdminSidebar;
