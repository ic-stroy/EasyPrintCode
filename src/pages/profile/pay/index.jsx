import React, { useEffect, useLayoutEffect, useState } from 'react'
import HeaderMain from '../../../components/header'
import AdvantageMain from '../../../components/advantage'
import FooterMain from '../../../components/footer'
import { ToastContainer, toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import 'react-toastify/dist/ReactToastify.css';
import '../main.css';
import ProfileHeader from '../../../components/profile_header';
import no_addres from '../../../layouts/icons/payment.svg';
import card from '../../../layouts/images/large_card.svg';
import axios from 'axios';

function ProfilePayment() {
  const [trashCardData, setTrashCardData] = useState([]);
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    cardDate: '',
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    document.title = 'Способ оплаты'
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('paymentDate', JSON.stringify(formData));
    toast.success('Kartangiz muvafaqiyatli saqlandi!');
  };

  // useEffect(() => {
  //   const savedFormData = JSON.parse(localStorage.getItem('paymentDate'));
  //   if (savedFormData) {
  //     setFormData(savedFormData);
  //   }
  // }, []);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("language", localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru');
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_TWO}/get-cards`, requestOptions)
      .then(response => response.json())
      .catch(error => toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!'));
  }, []);

  const address = JSON.parse(localStorage.getItem('paymentDate'))

  return (
    <>
      <HeaderMain trashCardData={trashCardData} />
      <ToastContainer />

      <div className="container mt-5 center">
        <div className="d-flex align-items-center justify-content-between" style={{width: '1200px'}}>
          <ProfileHeader />

          <div className='info_profile'>
            <h3 className='user_name'>Способ оплаты</h3>

            {address ? (
              <div>
                <div style={{height: '400px', overflow: 'scroll'}}>
                  <div className='d-flex'>
                    <div>
                      <div className="d-flex ms-4 mt-3">
                        <p className='payment_data_text'>Имя</p>

                        <div style={{marginLeft: '90px'}} className='input_profile_payment'>{address.cardName}</div>
                      </div>

                      <div className="d-flex ms-4">
                        <p className='payment_data_text'>Номер карты</p>

                        <div style={{marginLeft: '10px'}} className='input_profile_payment'>{address.cardNumber}</div>
                      </div>

                      <div className="d-flex ms-4">
                        <p className='payment_data_text'>Срок действия</p>

                        <div className='input_profile_payment'>{address.cardDate}</div>
                      </div>
                    </div>

                    <div>
                      <div style={{backgroundImage: `url(${card})`, padding: '24px', backgroundSize: 'cover', width: '311px', height: '184px', marginLeft: '48px', marginTop: '15px'}}>
                        <div style={{marginTop: '80px'}}>
                          <div className='payment_data_card_number'>
                            <span>{address.cardNumber.slice(0, 4)} </span>
                            <span>{address.cardNumber.slice(5, 9).replace(/./g, '*')} </span>
                            <span>{address.cardNumber.slice(9, 14).replace(/./g, '*')} </span>
                            <span>{address.cardNumber.slice(15, 20)}</span>
                          </div>

                          <div className='d-flex justify-content-between'>
                            <div className='payment_data_card_name'>
                              {address.cardName}
                            </div>
                            <div className='payment_data_card_date'>
                              {address.cardDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <button data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn_profile'>Добавить карту</button>
                </div>
              </div>
            ) : (
              <center style={{marginTop: '56px'}}>
                <img src={no_addres} alt="no_addres" />
                <p className='no_address_text'>Привяжите карту для оплаты товаров</p>
                <button className='no_address_button' data-bs-toggle="modal" data-bs-target="#exampleModal">Привязать карту</button>
              </center>
            )}

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header text-center d-flex justify-content-center" style={{borderBottom: 'none'}}>
                    <center>
                      <h1 className="modal-title modal_title" id="exampleModalLabel">Добавление карты</h1>
                    </center>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center ms-4">
                        <p className='address_modal_text'>Имя</p>

                        <input style={{marginLeft: '50px'}} type="text" className='input_profile' placeholder="Иван Иванов" onfocus="(this.type='date')" name="cardName" value={formData.cardName} onChange={handleChange} />
                      </div>

                      <div className="d-flex align-items-center ms-4">
                        <p style={{marginRight: '0px'}} className='address_modal_text'>Номер карты</p>

                        <InputMask 
                          mask='9999 9999 9999 9999' 
                          style={{marginRight: '40px'}}
                          className='input_profile'
                          placeholder="0000 0000 0000 0000"
                          value={formData.cardNumber} 
                          name="cardNumber"
                          onChange={handleChange}>
                        </InputMask>
                      </div>

                      <div className="d-flex align-items-center ms-4">
                        <p style={{marginRight: '0px'}} className='address_modal_text'>Срок действия</p>

                        <InputMask
                          mask='99 / 99 / 9999'
                          placeholder="00 / 00 / 0000"
                          className='input_profile'
                          value={formData.cardDate}
                          name="cardDate"
                          onChange={handleChange}>
                        </InputMask>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '138px' }}>
                        <button type="submit" className='btn_profile'>Добавить адрес</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdvantageMain />
      <FooterMain />
    </>
  );
}

export default ProfilePayment