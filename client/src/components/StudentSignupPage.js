import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/loginsignup.module.css'; // Adjust path as needed

const StudentSignupPage = () => {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [rollNumberError, setRollNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(value)) {
      setNameError('Please enter a valid name (letters and spaces only).');
    } else {
      setNameError('');
    }
  };

  const handleRollNumberChange = (e) => {
    const value = e.target.value;
    setRollNumber(value);
    const regex = /^\d{2}mx\d{3}$/i;
    if (!regex.test(value)) {
      setRollNumberError('Roll number should be in the format: 12mx345');
    } else {
      setRollNumberError('');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const regex = /^\d{2}mx\d{3}@psgtech\.ac\.in$/;
    if (!regex.test(value)) {
      setEmailError('Please enter official email address.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(value)) {
      setPasswordError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError('Passwords do not match.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!nameError && !rollNumberError && !emailError && !passwordError && !confirmPasswordError) {
      try {
        const response = await fetch('http://localhost:5000/api/student/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, rollNumber, email, password }),
        });

        if (response.ok) {
          // Redirect to student login page upon successful signup
          alert('Signup Successful.');
          navigate('/login/student');
        } else {
          alert('Signup failed. Please try again.');
        }
      } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className={styles.outercontainer}>
    <div className={styles.container}>
      <div className={styles['left-section']}>
        <h1>Student Signup</h1>
        <a href="/login/student" className={styles.user}>Student Login, Click Here</a>
      </div>
      <div className={styles['right-section']}>
        <form onSubmit={handleSignup}>
          <div className={styles['input-group']}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
              required
            />
            {nameError && <span className={styles['error-message']}>{nameError}</span>}
          </div>
          <div className={styles['input-group']}>
            <input
              type="text"
              id="rollnumber"
              name="rollnumber"
              placeholder="Roll Number"
              value={rollNumber}
              onChange={handleRollNumberChange}
              required
            />
            {rollNumberError && <span className={styles['error-message']}>{rollNumberError}</span>}
          </div>
          <div className={styles['input-group']}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <span className={styles['error-message']}>{emailError}</span>}
          </div>
          <div className={styles['input-group']}>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {passwordError && <span className={styles['error-message']}>{passwordError}</span>}
          </div>
          <div className={styles['input-group']}>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {confirmPasswordError && <span className={styles['error-message']}>{confirmPasswordError}</span>}
          </div>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default StudentSignupPage;
