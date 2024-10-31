import React, { useState } from 'react';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiCategory } from "react-icons/bi";
import { MdOutlineCrisisAlert } from "react-icons/md";
import './Card.css';
import { NavLink } from 'react-router-dom';

const Card = ({ card }) => {
    const { img, price, estate_title, status, location, description, id } = card;
    const [currentIndex, setCurrentIndex] = useState(0);

    // Ensure img array exists and has multiple images
    const hasMultipleImages = img && img.length > 1;

    const nextSlide = (e) => {
        e.stopPropagation(); // Prevent navigation when clicking next button
        if (hasMultipleImages) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % img.length);
        }
    };

    const prevSlide = (e) => {
        e.stopPropagation(); // Prevent navigation when clicking prev button
        if (hasMultipleImages) {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? img.length - 1 : prevIndex - 1
            );
        }
    };

    // Function to limit words in estate_title
    const limitWords = (title, wordLimit) => {
        const words = title.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : title;
    };

    return (
       
            <div className="tooltip">
                <div className="card bg-base-100 w-full max-w-md shadow-xl rounded-lg overflow-hidden">
                    <div className="slider-cont">
                        <div className="slid">
                            <img src={img[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
                        </div>

                        {/* Only show buttons if multiple images are present */}
                        {hasMultipleImages && (
                            <>
                                <button id="bt" className="prev" onClick={prevSlide}>
                                    &#10094;
                                </button>
                                <button id="bt" className="next" onClick={nextSlide}>
                                    &#10095;
                                </button>
                            </>
                        )}

                        {/* Indicators for multiple images */}
                        {hasMultipleImages && (
                            <div className="indicators">
                                {img.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`indicator ${currentIndex === index ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent navigation on indicator click
                                            setCurrentIndex(index);
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <NavLink to={`/details/${id}`} className="card-body ">
                        <h2 className="card-title link link-hover">
                            {limitWords(estate_title, 8)} {/* Limit to 8 words */}
                            <div className="badge badge-secondary">{status}</div>
                        </h2>
                        <div className="flex items-center mb-2">
                            <HiOutlineLocationMarker className="icon-size" />
                            <p className="ml-2">{location}</p>
                        </div>
                        <div className="flex items-center mb-2">
                            <BiCategory className="icon-size" />
                            <p className="ml-2">{description}</p>
                        </div>
                        <div className="card-actions flex justify-between items-center mt-4">
                            <div className="badge badge-outline">
                                <MdOutlineCrisisAlert /> Price: {price}
                            </div>
                            <div className="see px-7 py-2">See Details</div>
                        </div>
                    </NavLink>
                </div>

                {/* Tooltip */}
                <span className="tooltiptext">Click! See More Details</span>
            </div>
       

    );
};

export default Card;
