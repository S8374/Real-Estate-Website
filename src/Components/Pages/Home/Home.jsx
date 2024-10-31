import React, { useState } from 'react';
import Slider from '../Slider/Slider';
import Cards from '../Cards/Cards';
import Faver from '../Faver/Faver';
import Details from '../Details/Details';
import Feturs from '../Feturs/Feturs';
import CardSlider from '../CardSlider/CardSlider';


const Home = () => {
   
    
    return (
        <div >
            <Slider></Slider>
            <Cards></Cards>
            <Faver></Faver>
            <Feturs></Feturs>
            <CardSlider></CardSlider>
        </div>
    );
};

export default Home;