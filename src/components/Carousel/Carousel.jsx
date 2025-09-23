import React from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Carousel.css'
import {img} from '../../data';




const CustomCarousel =() => {

    return (
        <div >
            <Carousel
                showArrows={true}
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                interval={3000}
            >
                {img.map((item, index) => (
                    <div key={index}>
                        <img className='carousel__image' src={item} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default CustomCarousel;
