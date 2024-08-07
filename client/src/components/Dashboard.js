import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../css/index.module.css'; // Import the CSS module

const Dashboard = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/admin/circulars')
            .then(response => {
                setCards(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the circulars!', error);
            });
    }, []);

    const openImageInNewTab = (imageUrl) => {
        window.open(imageUrl, '_blank').focus();
    };

    return (
        <div className={styles.content}> {/* Use styles object */}
            {/* <h1>Circular</h1> */}
            <br />
            <div className={styles.cardcontainer}> {/* Use styles object */}
                {cards.map(card => (
                    <div className={styles.card} key={card._id}> {/* Use styles object */}
                        <img 
                            src={`http://localhost:5000/${card.image}`} 
                            alt={card.title} 
                            className={styles.cardImage} 
                            onClick={() => openImageInNewTab(`http://localhost:5000/${card.image}`)} // Add onClick event
                            style={{ cursor: 'pointer' }} // Change cursor to pointer to indicate clickability
                        />
                        <h2>{card.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
