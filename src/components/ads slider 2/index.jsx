import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function AdsSlider2() {
  const [slider, setSlider] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/get-advertising`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
        token: token
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
      <div style={{ width: '100%', marginTop: '80px' }}>
        <div className="slide-container" style={{ textAlign: 'center' }}>
          <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false">
            <div className="carousel-inner">
              {slider.map((slideImage, index) => (
                <div style={{marginBottom: '80px', marginTop: '0px'}} className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index} data-index={index}>
                  <NavLink target='_blank' to={`https://${slideImage.url}`}>
                    <center>
                      <div style={{backgroundImage: `url(${slideImage.image})`, backgroundSize: 'cover', width: '100%', height: '260px', borderRadius: '0', backgroundRepeat: 'no-repeat'}}></div>
                    </center>
                  </NavLink>
                </div>
              ))}
            </div>
            <button style={{top: '-50px'}} className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button style={{top: '-50px'}} className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </center>
  );
}

export default AdsSlider2;