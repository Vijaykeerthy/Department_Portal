import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting
import StudentSidebar from './StudentSidebar';
import StudentTopbar from './StudentTopbar';
import Dashboard from './Dashboard';
import GrievancesPosting from './GrievancesPosting';
import ViewGrievances from './StudentViewGrievances';
import styles from '../css/index.module.css';

const StudentHomePage = () => {
  const [content, setContent] = useState('dashboard'); // Default content
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Sidebar visibility state
  const [loading, setLoading] = useState(true); // Loading state to handle async checks
  const navigate = useNavigate(); // For programmatic navigation

  useEffect(() => {
    const checkSession = () => {
      const userId = localStorage.getItem('userId');
      const userType = localStorage.getItem('userType');

      if (userId && userType === 'student') {
        // Session is valid
        setLoading(false);
      } else {
        // Session is invalid
        navigate('/login/student');
      }
    };

    checkSession();
  }, [navigate]);

  const loadContent = (e, page) => {
    e.preventDefault();
    setContent(page);
  };

  const renderContent = () => {
    switch (content) {
      case 'Grievancesposting':
        return <GrievancesPosting />
      case 'ViewGrievances':
        return <ViewGrievances />;
        case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Render loading indicator while session check is in progress
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.main}>
      <StudentTopbar toggleSidebar={toggleSidebar} />
      <div className={styles.container}>
        <StudentSidebar loadContent={loadContent} isSidebarVisible={isSidebarVisible} />
        <div className={`${styles.mainContent} ${!isSidebarVisible ? styles.expandedContent : ''}`}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default StudentHomePage;
