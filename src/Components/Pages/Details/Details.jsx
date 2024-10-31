import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Details.css';
import { CiStar, CiShare2 } from "react-icons/ci";
import PropertyFeturs from '../PropertyFeturs/PropertyFeturs';

const Details = () => {
    const { id } = useParams();
    const [cardDetails, setCardDetails] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        // Fetch the specific card details using the id
        fetch('https://raw.githubusercontent.com/S8374/MyAPI/refs/heads/main/ResidentailApi/ResidentailApi.json')
            .then(res => res.json())
            .then(data => {
                const card = data.find(item => item.id === parseInt(id));
                setCardDetails(card);
            })
            .catch(error => console.error("Error fetching card data:", error));
    }, [id]);

    useEffect(() => {
        // Auto-slide images every 3 seconds
        const interval = setInterval(() => {
            handleNextImage();
        }, 3000);

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [currentImageIndex]);

    useEffect(() => {
        // Update the document title dynamically based on the property title
        if (cardDetails) {
            document.title = `${cardDetails.estate_title} - Property Details`;
        }
    }, [cardDetails]);

    if (!cardDetails) {
        return <p>Loading...</p>;
    }

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === cardDetails.img.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? cardDetails.img.length - 1 : prevIndex - 1
        );
    };

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    return (
        <div className="details-container ">
            <div className='mt-20'>
                <div className='flex justify-between text-3xl text-yellow-200 '>
                    <h1 className='link link-hover text-black'>{cardDetails.estate_title}</h1>
                    <h2 className='text-black'>Price <span>{cardDetails.price} </span></h2>
                </div>
                <div className='flex justify-between property-info'>
                    <div className='flex '>
                        <p>{cardDetails.segment_name}</p>
                        <p >{cardDetails.status}</p>
                        <p  >PropertyID : <span>{cardDetails.id}</span></p>
                    </div>
                    <div className='flex wishlist-share'>
                        <p className='flex hover-text'>  <CiStar /> Add WishList</p>
                        <CiShare2 className='ml-10 hover-text' />
                    </div>
                </div>
            </div>
            <div>
                {/* Main Image Slider */}
                <div className="main-image-slider">
                    <button onClick={handlePrevImage}>Prev</button>
                    <img
                        src={cardDetails.img[currentImageIndex]}
                        alt={cardDetails.estate_title}
                        className="slider-image"
                        onClick={toggleZoom}
                    />
                    <button onClick={handleNextImage}>Next</button>
                </div>

                {/* Zoom Modal */}
                {isZoomed && (
                    <div className="zoom-modal" onClick={toggleZoom}>
                        <img
                            src={cardDetails.img[currentImageIndex]}
                            alt={cardDetails.estate_title}
                            className="zoomed-image"
                        />
                    </div>
                )}

                {/* Bottom Sliding Images */}
                <div className="bottom-image-slider">
                    {cardDetails.img.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={cardDetails.estate_title}
                            className={`thumbnail-image ${currentImageIndex === index ? 'active' : ''}`}
                            onClick={() => setCurrentImageIndex(index)} // Change image on thumbnail click
                        />
                    ))}
                </div>
            </div>
            <PropertyFeturs cardDetails={cardDetails}></PropertyFeturs>
            <div className="relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
                <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
                    <svg
                        className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                        preserveAspectRatio="none slice"
                    >
                        <path d="M50 0H100L50 100H0L50 0Z" />
                    </svg>
                    <img
                        className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
                        src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                        alt=""
                    />
                </div>
                <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
                    <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
                        <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                            Brand new
                        </p>
                        <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                            Everything you
                            <br className="hidden md:block" />
                            can imagine{' '}
                            <span className="inline-block text-deep-purple-accent-400">
                                is real
                            </span>
                        </h2>
                        <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                            quae. explicabo.
                        </p>
                        <div className="flex items-center">
                        
                            <a
                                href="/"
                                aria-label=""
                                className=" see px-7 py-2 inline-flex items-center font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700"
                            >
                                Learn more
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
