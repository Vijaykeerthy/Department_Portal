import React, { useState } from 'react';
import axios from 'axios';
import styles from '../css/index.module.css'; // Import the CSS module

const CircularPosting = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);

        axios.post('http://localhost:5000/api/admin/circulars', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        })
        .then(response => {
            console.log('Circular saved:', response.data);
            window.alert('Circular posted successfully!');
            setTitle('');
            setImage(null);
            window.location.reload();
        })
        .catch(error => {
            console.error('There was an error saving the circular!', error);
        });
    };

    return (
        <div className={styles.content}>
            <div className={styles.circularform}>
            <h1>Post Announcements</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={handleTitleChange} required />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" onChange={handleImageChange} accept="image/*" required />
                </div>
                <br />
                <button type="submit">Submit</button>
            </form>
            </div>
        </div>
    );
};

export default CircularPosting;
 