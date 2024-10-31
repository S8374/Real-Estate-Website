import { useEffect, useState } from 'react';
import './Cards.css';
import Card from '../Card/Card';

const Cards = () => {
    const [cardData, setCardData] = useState([]);  // State to hold card data

    useEffect(() => {
        // Fetch the card data
        fetch('https://raw.githubusercontent.com/S8374/MyAPI/refs/heads/main/ResidentailApi/ResidentailApi.json')
            .then(res => res.json())
            .then(data => setCardData(data))
            .catch(error => console.error("Error fetching card data:", error));
    }, []);

    return (
        <div className='mt-8'>
            <div className='flex text-container justify-between justify-center items-center px-14 '>
                <div className='text-bottom '>
                    <h1 className='text-black'>FIND A PROPERTY</h1>
                    <p className='text-black'>BROWSE OUR DREAM HOUSE</p>
                </div>
                <div>
                 
                </div>
            </div>

            <div className="flex items-center justify-center min-h-screen">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Render the card data */}
                    {cardData.map(card => (
                        <Card
                            key={card.id}
                            card={card}
                        // Pass the function to handle clicks
                        />
                    ))}
                </div>
            </div>

            <div className='flex justify-center mt-14 '>
                <button  className="bro px-7 py-4">Browse More Propertys</button>
            </div>
        </div>
    );
};

export default Cards;
