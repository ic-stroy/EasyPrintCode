import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import design1 from '../../layouts/images/boxing.svg'
import design2 from '../../layouts/images/kiikii.svg'
import design3 from '../../layouts/images/original.svg'
import design4 from '../../layouts/images/underland.svg'
import bag from '../../layouts/icons/active_bag_icon.svg'

function CardFour({ addToBasket }) {
  const [trashCardData, setTrashCardData] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [count, setCount] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedSize, setSelectedSize] = useState('s');
  const [selectedColor, setSelectedColor] = useState('#D9CCC6');

  function handleCardClick(imageSrc, name, price, selectedSize, selectedColor) {
    const currentTime = new Date();
    const clickedCardData = {
      id: idCounter,
      count: count,
      imageSrc,
      selectedSize,
      selectedColor,
      name,
      price,
      timestamp: currentTime.toString(),
    };

    addToBasket({ imageSrc, name, price, selectedSize, selectedColor });
  
    if (count > 1) {
      setCount(count - 1);
    }
  
    setIdCounter((prevId) => prevId + 1);
  
    setTrashCardData((prevData) => [...prevData, clickedCardData]);
  
    localStorage.setItem('trashCard', JSON.stringify([...trashCardData, clickedCardData]));
  
    toast.success(`${name} в корзину`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  }  

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  function openModal(cardData) {
    setSelectedCard(cardData);
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  return (
    <>
      <ToastContainer />
      
      <section className='container' style={{marginTop: '-50px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap'}}>
          <div className="cards mt-5" onClick={() => openModal({imageSrc: design2, name: 'Мужская футболка Kiikii', price: '120 000'})} data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div className="clothes_fat">
              <div className="image-container" style={{position: 'relative'}}>
                <img style={{borderRadius: '20px'}} src={design2} alt="your_design" />
                <div className="image-overlay">
                  <div className="detail_back">
                    <p className="overlay-text">Посмотреть детали</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex">
              <div>
                <p className='t-shirt_name'>Мужская футболка Kiikii</p>
                <p className='t-shirt_price'>120 000 {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}</p>
              </div>

              <div onClick={() => handleCardClick(design2, 'Мужская футболка Kiikii', '120 000')}>
                <button className='add_to_basket'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <g clip-path="url(#clip0_2381_4754)">
                      <path d="M17.5 5H15C15 3.67392 14.4732 2.40215 13.5355 1.46447C12.5979 0.526784 11.3261 0 10 0C8.67392 0 7.40215 0.526784 6.46447 1.46447C5.52678 2.40215 5 3.67392 5 5H2.5C1.83696 5 1.20107 5.26339 0.732233 5.73223C0.263392 6.20107 0 6.83696 0 7.5L0 15.8333C0.00132321 16.938 0.440735 17.997 1.22185 18.7782C2.00296 19.5593 3.062 19.9987 4.16667 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333V7.5C20 6.83696 19.7366 6.20107 19.2678 5.73223C18.7989 5.26339 18.163 5 17.5 5ZM10 1.66667C10.8841 1.66667 11.7319 2.01786 12.357 2.64298C12.9821 3.2681 13.3333 4.11594 13.3333 5H6.66667C6.66667 4.11594 7.01786 3.2681 7.64298 2.64298C8.2681 2.01786 9.11594 1.66667 10 1.66667ZM18.3333 15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H4.16667C3.50363 18.3333 2.86774 18.0699 2.3989 17.6011C1.93006 17.1323 1.66667 16.4964 1.66667 15.8333V7.5C1.66667 7.27899 1.75446 7.06702 1.91074 6.91074C2.06702 6.75446 2.27899 6.66667 2.5 6.66667H5V8.33333C5 8.55435 5.0878 8.76631 5.24408 8.92259C5.40036 9.07887 5.61232 9.16667 5.83333 9.16667C6.05435 9.16667 6.26631 9.07887 6.42259 8.92259C6.57887 8.76631 6.66667 8.55435 6.66667 8.33333V6.66667H13.3333V8.33333C13.3333 8.55435 13.4211 8.76631 13.5774 8.92259C13.7337 9.07887 13.9457 9.16667 14.1667 9.16667C14.3877 9.16667 14.5996 9.07887 14.7559 8.92259C14.9122 8.76631 15 8.55435 15 8.33333V6.66667H17.5C17.721 6.66667 17.933 6.75446 18.0893 6.91074C18.2455 7.06702 18.3333 7.27899 18.3333 7.5V15.8333Z" fill="white"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_2381_4754">
                        <rect width="20" height="20" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>

                  <svg style={{marginLeft: '-8px', marginRight: '2px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13.3333 8.33334H8.66666V3.66666C8.66666 3.29847 8.36819 3 8 3C7.63181 3 7.33334 3.29847 7.33334 3.66666V8.33331H2.66666C2.29847 8.33334 2 8.63181 2 9C2 9.36819 2.29847 9.66666 2.66666 9.66666H7.33331V14.3333C7.33331 14.7015 7.63178 15 7.99997 15C8.36816 15 8.66662 14.7015 8.66662 14.3333V9.66666H13.3333C13.7015 9.66666 13.9999 9.36819 13.9999 9C14 8.63181 13.7015 8.33334 13.3333 8.33334Z" fill="white"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="cards mt-5" onClick={() => openModal({imageSrc: design4, name: 'Мужская футболка UNDRGRAUND', price: '120 000'})} data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div className="clothes_fat">
              <div className="image-container" style={{position: 'relative'}}>
                <img style={{borderRadius: '20px'}} src={design4} alt="your_design" />
                <div className="image-overlay">
                  <div className="detail_back">
                    <p className="overlay-text">Посмотреть детали</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex">
              <div>
                <p className='t-shirt_name'>Мужская футболка UNDRGRAUND</p>
                <p className='t-shirt_price'>120 000 {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}</p>
              </div>

              <div onClick={() => handleCardClick(design2, 'Мужская футболка UNDRGRAUND', '120 000')}>
                <button className='add_to_basket'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <g clip-path="url(#clip0_2381_4754)">
                      <path d="M17.5 5H15C15 3.67392 14.4732 2.40215 13.5355 1.46447C12.5979 0.526784 11.3261 0 10 0C8.67392 0 7.40215 0.526784 6.46447 1.46447C5.52678 2.40215 5 3.67392 5 5H2.5C1.83696 5 1.20107 5.26339 0.732233 5.73223C0.263392 6.20107 0 6.83696 0 7.5L0 15.8333C0.00132321 16.938 0.440735 17.997 1.22185 18.7782C2.00296 19.5593 3.062 19.9987 4.16667 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333V7.5C20 6.83696 19.7366 6.20107 19.2678 5.73223C18.7989 5.26339 18.163 5 17.5 5ZM10 1.66667C10.8841 1.66667 11.7319 2.01786 12.357 2.64298C12.9821 3.2681 13.3333 4.11594 13.3333 5H6.66667C6.66667 4.11594 7.01786 3.2681 7.64298 2.64298C8.2681 2.01786 9.11594 1.66667 10 1.66667ZM18.3333 15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H4.16667C3.50363 18.3333 2.86774 18.0699 2.3989 17.6011C1.93006 17.1323 1.66667 16.4964 1.66667 15.8333V7.5C1.66667 7.27899 1.75446 7.06702 1.91074 6.91074C2.06702 6.75446 2.27899 6.66667 2.5 6.66667H5V8.33333C5 8.55435 5.0878 8.76631 5.24408 8.92259C5.40036 9.07887 5.61232 9.16667 5.83333 9.16667C6.05435 9.16667 6.26631 9.07887 6.42259 8.92259C6.57887 8.76631 6.66667 8.55435 6.66667 8.33333V6.66667H13.3333V8.33333C13.3333 8.55435 13.4211 8.76631 13.5774 8.92259C13.7337 9.07887 13.9457 9.16667 14.1667 9.16667C14.3877 9.16667 14.5996 9.07887 14.7559 8.92259C14.9122 8.76631 15 8.55435 15 8.33333V6.66667H17.5C17.721 6.66667 17.933 6.75446 18.0893 6.91074C18.2455 7.06702 18.3333 7.27899 18.3333 7.5V15.8333Z" fill="white"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_2381_4754">
                        <rect width="20" height="20" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>

                  <svg style={{marginLeft: '-8px', marginRight: '2px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13.3333 8.33334H8.66666V3.66666C8.66666 3.29847 8.36819 3 8 3C7.63181 3 7.33334 3.29847 7.33334 3.66666V8.33331H2.66666C2.29847 8.33334 2 8.63181 2 9C2 9.36819 2.29847 9.66666 2.66666 9.66666H7.33331V14.3333C7.33331 14.7015 7.63178 15 7.99997 15C8.36816 15 8.66662 14.7015 8.66662 14.3333V9.66666H13.3333C13.7015 9.66666 13.9999 9.36819 13.9999 9C14 8.63181 13.7015 8.33334 13.3333 8.33334Z" fill="white"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="cards mt-5" onClick={() => openModal({imageSrc: design1, name: 'Мужская футболка Boxing', price: '120 000'})} data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div className="clothes_fat">
              <div className="image-container" style={{position: 'relative'}}>
                <img style={{borderRadius: '20px'}} src={design1} alt="your_design" />
                <div className="image-overlay">
                  <div className="detail_back">
                    <p className="overlay-text">Посмотреть детали</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex">
              <div>
                <p className='t-shirt_name'>Мужская футболка Boxing</p>
                <p className='t-shirt_price'>120 000 {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}</p>
              </div>

              <div onClick={() => handleCardClick(design2, 'Мужская футболка Boxing', '120 000')}>
                <button className='add_to_basket'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <g clip-path="url(#clip0_2381_4754)">
                      <path d="M17.5 5H15C15 3.67392 14.4732 2.40215 13.5355 1.46447C12.5979 0.526784 11.3261 0 10 0C8.67392 0 7.40215 0.526784 6.46447 1.46447C5.52678 2.40215 5 3.67392 5 5H2.5C1.83696 5 1.20107 5.26339 0.732233 5.73223C0.263392 6.20107 0 6.83696 0 7.5L0 15.8333C0.00132321 16.938 0.440735 17.997 1.22185 18.7782C2.00296 19.5593 3.062 19.9987 4.16667 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333V7.5C20 6.83696 19.7366 6.20107 19.2678 5.73223C18.7989 5.26339 18.163 5 17.5 5ZM10 1.66667C10.8841 1.66667 11.7319 2.01786 12.357 2.64298C12.9821 3.2681 13.3333 4.11594 13.3333 5H6.66667C6.66667 4.11594 7.01786 3.2681 7.64298 2.64298C8.2681 2.01786 9.11594 1.66667 10 1.66667ZM18.3333 15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H4.16667C3.50363 18.3333 2.86774 18.0699 2.3989 17.6011C1.93006 17.1323 1.66667 16.4964 1.66667 15.8333V7.5C1.66667 7.27899 1.75446 7.06702 1.91074 6.91074C2.06702 6.75446 2.27899 6.66667 2.5 6.66667H5V8.33333C5 8.55435 5.0878 8.76631 5.24408 8.92259C5.40036 9.07887 5.61232 9.16667 5.83333 9.16667C6.05435 9.16667 6.26631 9.07887 6.42259 8.92259C6.57887 8.76631 6.66667 8.55435 6.66667 8.33333V6.66667H13.3333V8.33333C13.3333 8.55435 13.4211 8.76631 13.5774 8.92259C13.7337 9.07887 13.9457 9.16667 14.1667 9.16667C14.3877 9.16667 14.5996 9.07887 14.7559 8.92259C14.9122 8.76631 15 8.55435 15 8.33333V6.66667H17.5C17.721 6.66667 17.933 6.75446 18.0893 6.91074C18.2455 7.06702 18.3333 7.27899 18.3333 7.5V15.8333Z" fill="white"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_2381_4754">
                        <rect width="20" height="20" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>

                  <svg style={{marginLeft: '-8px', marginRight: '2px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13.3333 8.33334H8.66666V3.66666C8.66666 3.29847 8.36819 3 8 3C7.63181 3 7.33334 3.29847 7.33334 3.66666V8.33331H2.66666C2.29847 8.33334 2 8.63181 2 9C2 9.36819 2.29847 9.66666 2.66666 9.66666H7.33331V14.3333C7.33331 14.7015 7.63178 15 7.99997 15C8.36816 15 8.66662 14.7015 8.66662 14.3333V9.66666H13.3333C13.7015 9.66666 13.9999 9.36819 13.9999 9C14 8.63181 13.7015 8.33334 13.3333 8.33334Z" fill="white"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="cards mt-5" onClick={() => openModal({imageSrc: design3, name: 'Мужская футболка Kiikii', price: '120 000'})} data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div className="clothes_fat">
              <div className="image-container" style={{position: 'relative'}}>
                <img style={{borderRadius: '20px'}} src={design3} alt="your_design" />
                <div className="image-overlay">
                  <div className="detail_back">
                    <p className="overlay-text">Посмотреть детали</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex">
              <div>
                <p className='t-shirt_name'>Мужская футболка Kiikii</p>
                <p className='t-shirt_price'>120 000 {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}</p>
              </div>

              <div onClick={() => handleCardClick(design2, 'Мужская футболка Kiikii', '120 000')}>
                <button className='add_to_basket'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <g clip-path="url(#clip0_2381_4754)">
                      <path d="M17.5 5H15C15 3.67392 14.4732 2.40215 13.5355 1.46447C12.5979 0.526784 11.3261 0 10 0C8.67392 0 7.40215 0.526784 6.46447 1.46447C5.52678 2.40215 5 3.67392 5 5H2.5C1.83696 5 1.20107 5.26339 0.732233 5.73223C0.263392 6.20107 0 6.83696 0 7.5L0 15.8333C0.00132321 16.938 0.440735 17.997 1.22185 18.7782C2.00296 19.5593 3.062 19.9987 4.16667 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333V7.5C20 6.83696 19.7366 6.20107 19.2678 5.73223C18.7989 5.26339 18.163 5 17.5 5ZM10 1.66667C10.8841 1.66667 11.7319 2.01786 12.357 2.64298C12.9821 3.2681 13.3333 4.11594 13.3333 5H6.66667C6.66667 4.11594 7.01786 3.2681 7.64298 2.64298C8.2681 2.01786 9.11594 1.66667 10 1.66667ZM18.3333 15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H4.16667C3.50363 18.3333 2.86774 18.0699 2.3989 17.6011C1.93006 17.1323 1.66667 16.4964 1.66667 15.8333V7.5C1.66667 7.27899 1.75446 7.06702 1.91074 6.91074C2.06702 6.75446 2.27899 6.66667 2.5 6.66667H5V8.33333C5 8.55435 5.0878 8.76631 5.24408 8.92259C5.40036 9.07887 5.61232 9.16667 5.83333 9.16667C6.05435 9.16667 6.26631 9.07887 6.42259 8.92259C6.57887 8.76631 6.66667 8.55435 6.66667 8.33333V6.66667H13.3333V8.33333C13.3333 8.55435 13.4211 8.76631 13.5774 8.92259C13.7337 9.07887 13.9457 9.16667 14.1667 9.16667C14.3877 9.16667 14.5996 9.07887 14.7559 8.92259C14.9122 8.76631 15 8.55435 15 8.33333V6.66667H17.5C17.721 6.66667 17.933 6.75446 18.0893 6.91074C18.2455 7.06702 18.3333 7.27899 18.3333 7.5V15.8333Z" fill="white"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_2381_4754">
                        <rect width="20" height="20" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>

                  <svg style={{marginLeft: '-8px', marginRight: '2px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13.3333 8.33334H8.66666V3.66666C8.66666 3.29847 8.36819 3 8 3C7.63181 3 7.33334 3.29847 7.33334 3.66666V8.33331H2.66666C2.29847 8.33334 2 8.63181 2 9C2 9.36819 2.29847 9.66666 2.66666 9.66666H7.33331V14.3333C7.33331 14.7015 7.63178 15 7.99997 15C8.36816 15 8.66662 14.7015 8.66662 14.3333V9.66666H13.3333C13.7015 9.66666 13.9999 9.36819 13.9999 9C14 8.63181 13.7015 8.33334 13.3333 8.33334Z" fill="white"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content" style={{borderRadius: '0px'}}>
            <div className="modal-body" style={{padding: '0'}}>
              {selectedCard && (
                <div className='d-flex'>
                  <div style={{padding: '80px 32px 0px 32px'}}>
                    <p className='modal_name'>{selectedCard.name}</p>
                    <p className='modal_info'>{selectedCard.name} с круглым вырезом и с принтом Kiikii</p>
                    <p className='modal_price'>{selectedCard.price} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}</p>

                    <div className="d-flex justify-content-between" style={{marginTop: '57px'}}>
                      <div class="dropdown">
                        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Размер <span style={{textTransform: 'uppercase', marginLeft: '12px'}}>{selectedSize} <span className='ms-1' style={{fontSize: '12px', marginTop: '-5px'}}>▼</span></span>
                        </button>
                        <ul class="dropdown-menu">
                          <li className='d-flex'><div class="dropdown-item" style={{textTransform: 'uppercase'}} onClick={() => setSelectedSize('xxs')}>xxs</div> <div class="dropdown-item" style={{textTransform: 'uppercase'}} onClick={() => setSelectedSize('xs')}>xs</div></li>
                          <li className='d-flex'><div class="dropdown-item" style={{textTransform: 'uppercase'}} onClick={() => setSelectedSize('s')}>s</div> <div class="dropdown-item" style={{textTransform: 'uppercase'}} onClick={() => setSelectedSize('m')}>m</div></li>
                          <li className='d-flex'><div class="dropdown-item" style={{textTransform: 'uppercase'}} onClick={() => setSelectedSize('l')}>l</div> <div class="dropdown-item" style={{textTransform: 'uppercase'}} onClick={() => setSelectedSize('xl')}>xl</div></li>
                          <li className='d-flex'><div class="dropdown-item" style={{textTransform: 'uppercase'}} onClick={() => setSelectedSize('xl')}>xl</div> <div class="dropdown-item" style={{textTransform: 'uppercase'}} onClick={() => setSelectedSize('3xl')}>3xl</div></li>
                        </ul>
                      </div>

                      <div class="dropdown">
                        <button class="btn dropdown-toggle d-flex" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Цвет <div style={{width: '23px', height: '23px', borderRadius: '50%', border: '0.5px solid #CCC', marginLeft: '12px', marginRight: '12px', backgroundColor: selectedColor}}> <span style={{fontSize: '12px', marginTop: '-5px', marginLeft: '30px'}}>▼</span></div>
                        </button>
                        <ul class="dropdown-menu w-100 color_size">
                          <li className='d-flex'><div class="dropdown-item m-2" style={{width: '23px', height: '23px', borderRadius: '50%', border: '0.5px solid #CCC', backgroundColor: '#0D0D0D'}} onClick={() => setSelectedColor('#0D0D0D')}></div> <div style={{width: '23px', height: '23px', borderRadius: '50%', border: '0.5px solid #CCC', backgroundColor: '#FFF'}} onClick={() => setSelectedColor('#FFF')} class="dropdown-item m-2"></div></li>
                          <li className='d-flex'><div class="dropdown-item m-2" style={{width: '23px', height: '23px', borderRadius: '50%', border: '0.5px solid #CCC', backgroundColor: '#666'}} onClick={() => setSelectedColor('#666')}></div> <div style={{width: '23px', height: '23px', borderRadius: '50%', border: '0.5px solid #CCC', backgroundColor: '#0EB5EB'}} onClick={() => setSelectedColor('#0EB5EB')} class="dropdown-item m-2"></div></li>
                          <li className='d-flex'><div class="dropdown-item m-2" style={{width: '23px', height: '23px', borderRadius: '50%', border: '0.5px solid #CCC', backgroundColor: '#D30808'}} onClick={() => setSelectedColor('#D30808')}></div> <div style={{width: '23px', height: '23px', borderRadius: '50%', border: '0.5px solid #CCC', backgroundColor: '#FAC817'}} onClick={() => setSelectedColor('#FAC817')} class="dropdown-item m-2"></div></li>
                          <li className='d-flex'><div class="dropdown-item m-2" style={{width: '23px', height: '23px', borderRadius: '50%', border: '0.5px solid #CCC', backgroundColor: '#1DB223'}} onClick={() => setSelectedColor('#1DB223')}></div> <div style={{width: '23px', height: '23px', borderRadius: '50%', border: '0.5px solid #CCC', backgroundColor: '#9747FF'}} onClick={() => setSelectedColor('#9747FF')} class="dropdown-item m-2"></div></li>
                        </ul>
                      </div>
                    </div>

                    <hr style={{color: '#CCCCCC'}} />

                    <div className="d-flex justify-content-between">
                      <div className='basket_card_plus_minus' style={{backgroundColor: 'transparent', color: '#000', cursor: 'pointer'}} onClick={() => setCount(count - 1)}>-</div>
                        <input
                          type='number'
                          style={{border: 'none', color: '#000', outline: 'none', width: '40px', textAlign: 'center'}}
                          value={count}
                          onChange={(e) => {
                            const newValue = parseInt(e.target.value, 10);
                            if (!isNaN(newValue)) {
                              setCount(newValue);
                            }
                          }}
                        />
                      <div className='basket_card_plus_minus' style={{backgroundColor: 'transparent', color: '#000', cursor: 'pointer'}} onClick={() => setCount(count + 1)}>+</div>
                    </div>

                    <div style={{marginTop: '50px'}}  className="d-flex">
                      <div onClick={() => handleCardClick(selectedCard.imageSrc, selectedCard.name, selectedCard.price, selectedSize, selectedColor)}>
                        <button className='add_to_basket'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <g clip-path="url(#clip0_2381_4754)">
                              <path d="M17.5 5H15C15 3.67392 14.4732 2.40215 13.5355 1.46447C12.5979 0.526784 11.3261 0 10 0C8.67392 0 7.40215 0.526784 6.46447 1.46447C5.52678 2.40215 5 3.67392 5 5H2.5C1.83696 5 1.20107 5.26339 0.732233 5.73223C0.263392 6.20107 0 6.83696 0 7.5L0 15.8333C0.00132321 16.938 0.440735 17.997 1.22185 18.7782C2.00296 19.5593 3.062 19.9987 4.16667 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333V7.5C20 6.83696 19.7366 6.20107 19.2678 5.73223C18.7989 5.26339 18.163 5 17.5 5ZM10 1.66667C10.8841 1.66667 11.7319 2.01786 12.357 2.64298C12.9821 3.2681 13.3333 4.11594 13.3333 5H6.66667C6.66667 4.11594 7.01786 3.2681 7.64298 2.64298C8.2681 2.01786 9.11594 1.66667 10 1.66667ZM18.3333 15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H4.16667C3.50363 18.3333 2.86774 18.0699 2.3989 17.6011C1.93006 17.1323 1.66667 16.4964 1.66667 15.8333V7.5C1.66667 7.27899 1.75446 7.06702 1.91074 6.91074C2.06702 6.75446 2.27899 6.66667 2.5 6.66667H5V8.33333C5 8.55435 5.0878 8.76631 5.24408 8.92259C5.40036 9.07887 5.61232 9.16667 5.83333 9.16667C6.05435 9.16667 6.26631 9.07887 6.42259 8.92259C6.57887 8.76631 6.66667 8.55435 6.66667 8.33333V6.66667H13.3333V8.33333C13.3333 8.55435 13.4211 8.76631 13.5774 8.92259C13.7337 9.07887 13.9457 9.16667 14.1667 9.16667C14.3877 9.16667 14.5996 9.07887 14.7559 8.92259C14.9122 8.76631 15 8.55435 15 8.33333V6.66667H17.5C17.721 6.66667 17.933 6.75446 18.0893 6.91074C18.2455 7.06702 18.3333 7.27899 18.3333 7.5V15.8333Z" fill="white"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_2381_4754">
                                <rect width="20" height="20" fill="white"/>
                              </clipPath>
                            </defs>
                          </svg>

                          <svg style={{marginLeft: '-8px', marginRight: '2px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13.3333 8.33334H8.66666V3.66666C8.66666 3.29847 8.36819 3 8 3C7.63181 3 7.33334 3.29847 7.33334 3.66666V8.33331H2.66666C2.29847 8.33334 2 8.63181 2 9C2 9.36819 2.29847 9.66666 2.66666 9.66666H7.33331V14.3333C7.33331 14.7015 7.63178 15 7.99997 15C8.36816 15 8.66662 14.7015 8.66662 14.3333V9.66666H13.3333C13.7015 9.66666 13.9999 9.36819 13.9999 9C14 8.63181 13.7015 8.33334 13.3333 8.33334Z" fill="white"/>
                          </svg>
                        </button>
                      </div>

                      <div onClick={() => handleCardClick(selectedCard.imageSrc, selectedCard.name, selectedCard.price, selectedSize, selectedColor)}>
                        <button className='order_now'>Заказать сейчас →</button>
                      </div>
                    </div>
                  </div>

                  <div className='modal_image_fat'>
                    <img src={selectedCard.imageSrc} alt="your_design" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardFour