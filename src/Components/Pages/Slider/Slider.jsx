import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation'; // Import navigation styles

import './Slider.css';

// Import required modules
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';

const Slider = () => {
    const swiperRef = useRef(null); // Create a reference to the swiper instance

    return (
        <div className="slider-container">
            <Swiper
                ref={swiperRef} // Assign the reference to the Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true} // Enable navigation buttons
                modules={[Autoplay, Pagination, EffectFade, Navigation]} // Include Navigation module
                effect="fade" // Set the effect to fade
                speed={1000} // Set the transition speed
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src="https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/list-half-map-image-1-841x533.jpg" alt="Slide 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/main-home-img-1.jpg" alt="Slide 2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/property-standard-img-2-841x533.jpg" alt="Slide 3" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/property-standard-img-1-841x533.jpg" alt="Slide 4" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/list-sidebar-img-1.jpg" alt="Slide 5" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/pine-forest-bung04-600x473.jpg" alt="Slide 6" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/main-home-property.jpg" alt="Slide 7" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/south-sun-house03.jpg" alt="Slide 8" />
                </SwiperSlide>
            
            </Swiper>
            <div className="sticky-text">NOW IT'S EASY TO FIND YOUR FUTURE HOME</div>

            <div className="bottom-sticky-text">
                <form>
                    <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="search" className="block bg-[#00000080] p-4 ps-10 text-sm text-white border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Slider;
