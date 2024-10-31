import React, { useEffect, useState } from 'react';
import './Property.css';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { AiOutlineExpand } from 'react-icons/ai'; // Import full-screen icon

const Property = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const itemsPerPage = 4;

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDHG7pjUPLRNvfeo_XHishVbwOG-tLacfA',
    });

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/S8374/MyAPI/refs/heads/main/ResidentailApi/MoreProperties.json')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const startIndex = (page - 1) * itemsPerPage;
    const currentProperties = data.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleCardClick = (property) => {
        setSelectedProperty(property);
        document.getElementById('my_modal_5').showModal();
    };

    return (
        <div>
            <div className="mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl" style={{ marginTop: '62px' }}>
                <div className="max-w-xl sm:mx-auto lg:max-w-2xl px-8 py-5">
                    <div className="flex flex-col sm:text-center sm:mb-0">
                        <div className="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-black sm:text-4xl md:mx-auto">
                                <span className="relative inline-block">
                                    <span className="relative">The</span>
                                </span>{' '}
                                quick, brown fox jumps over a lazy dog
                            </h2>
                            <p className="text-base text-black md:text-lg">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                accusantium doloremque rem aperiam, eaque ipsa quae.
                            </p>
                        </div>
                        <div>
                            <a
                                href="/"
                                className="inline-flex items-center justify-center h-12 px-6 font-semibold tracking-wide text-teal-900 transition duration-200 rounded shadow-md hover:text-deep-purple-900 bg-teal-accent-400 hover:bg-deep-purple-accent-100 focus:shadow-outline focus:outline-none"
                            >
                                Get started
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="property-container flex justify-center flex-col lg:flex-row mt-10">
                {/* Left Column: Property Cards */}
                <div className="property-cards w-full lg:w-1/2 p-4">
                    <div className="property-grid">
                        {currentProperties.length > 0 ? (
                            currentProperties.map((property) => (
                                <div key={property.id} className="property-item mb-6">
                                    <div className="property-card" onClick={() => handleCardClick(property)}>
                                        <div className="autoImgSliding">
                                            <CustomSlider images={property.img} />
                                        </div>
                                        <div className="card__content text-white">
                                            <p className="card__title">{property.estate_title}</p>
                                            <p className="card__description">{property.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Loading properties...</p>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="pagination-container mt-4">
                        <Stack spacing={2}>
                            <Pagination
                                count={Math.ceil(data.length / itemsPerPage)}
                                page={page}
                                onChange={handlePageChange}
                                renderItem={(item) => (
                                    <PaginationItem
                                        slots={{ previous: AiOutlineArrowLeft, next: AiOutlineArrowRight }}
                                        {...item}
                                    />
                                )}
                            />
                        </Stack>
                    </div>
                </div>

                {/* Right Column: Google Map */}
                <div className="google-map-container w-full lg:w-1/2 p-4">
                    {isLoaded ? (
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '500px' }}
                            center={{ lat: 37.7749, lng: -122.4194 }}
                            zoom={12}
                        >
                            {currentProperties.map((property) => (
                                <Marker
                                    key={property.id}
                                    position={{ lat: property.lat || 37.7749, lng: property.lng || -122.4194 }}
                                />
                            ))}
                        </GoogleMap>
                    ) : (
                        <p>Loading map...</p>
                    )}
                </div>

                {/* Modal for property details */}
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle bg-black">
                    <div className="modal-box bg-white">
                        {selectedProperty && (
                            <>
                                <h3 className="font-bold text-lg text-black">{selectedProperty.estate_title}</h3>
                                <CustomSlider images={selectedProperty.img} /> {/* Use CustomSlider in the modal */}
                                <div className="property-details mt-4">
                                    <p><strong>Price:</strong> {selectedProperty.price}</p>
                                    <p><strong>Status:</strong> {selectedProperty.status}</p>
                                    <p><strong>Area:</strong> {selectedProperty.area}</p>
                                    <p><strong>Location:</strong> {selectedProperty.location}</p>
                                    <p><strong>Bedrooms:</strong> {selectedProperty.bedrooms}</p>
                                    <p><strong>Bathrooms:</strong> {selectedProperty.bathrooms}</p>
                                    <p><strong>Garage:</strong> {selectedProperty.garage}</p>
                                    <p><strong>Facilities:</strong> {selectedProperty.facilities.join(', ')}</p>
                                </div>
                            </>
                        )}
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

const CustomSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [images.length]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const toggleFullScreen = () => {
        const imgElement = document.getElementById('fullscreen-image');
        if (imgElement) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                imgElement.requestFullscreen();
            }
        }
    };

    return (
        <div className="custom-slider">
            <img
                id="fullscreen-image"
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="slider-image"
            />
            {/* Navigation controls */}
            <div className='flex justify-between'>
                <button onClick={handlePrev} className="see slider-control-prev">Previous</button>
                <button onClick={handleNext} className="see slider-control-next">Next</button>
            </div>
            {/* Full-screen button, only shown in the modal */}
            <button onClick={toggleFullScreen} className="fullscreen-button">
                <AiOutlineExpand size={20} />
            </button>
        </div>
    );
};

export default Property;
