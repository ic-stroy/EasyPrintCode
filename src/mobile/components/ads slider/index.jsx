import React, { useEffect, useState } from 'react';
import Reveal from '../../animation';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import bannerImage from '../../../layouts/images/banner.svg'

function AdsSliderMobile() {
  const [slider, setSlider] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/get-advertising`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
        // token: token
      }
    }).then((response) => {
      // console.log(response.data.data);
      setSlider(response.data.data);
    }).catch((error) => {
      console.log(error);
    })
  }, []);
  
  useEffect(() => {
    const carouselInterval = setInterval(() => {
      const carousel = document.getElementById('carouselExampleControlsNoTouching');
      if (carousel) {
        const currentIndex = parseInt(carousel.querySelector('.carousel-inner .active').dataset.index);
        const nextIndex = currentIndex === carousel.querySelectorAll('.carousel-item').length - 1 ? 0 : currentIndex + 1;
        const indicator = carousel.querySelector(`.carousel-indicators [data-bs-target="#carouselExampleControlsNoTouching"][data-bs-slide-to="${nextIndex}"]`);
        if (indicator) {
          indicator.click();
        }
      }
    }, 3000);

    return () => clearInterval(carouselInterval);
  }, []);

  return (
    <center>
      <div style={{ width: '94%' }}>
        <div className="slide-container" style={{ textAlign: 'center' }}>
          <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false">
            <div className="carousel-inner">
              {slider.map((slideImage, index) => (
                <div style={{marginBottom: '80px', marginTop: '20px'}} className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index} data-index={index}>
                  <NavLink target='_blank' to={`https://${slideImage.url}`}>
                    <center>
                      <Reveal>
                        <div style={{backgroundImage: `url(${bannerImage})`, backgroundSize: 'cover', width: '98%', height: '100px', borderRadius: '20px', backgroundRepeat: 'no-repeat'}}></div>
                      </Reveal>
                    </center>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </center>
  );
}

export default AdsSliderMobile;