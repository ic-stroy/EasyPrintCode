import React, { useState, useEffect } from 'react';
import HeaderMainMobile from '../../../../components/header';
import AdsSliderMobile from '../../../../components/ads slider';
import FooterMainMobile from '../../../../components/footer';
import FooterBarMobile from '../../../../components/footer bar';
import YandexLogo from '../../../../layouts/icons/yandex.svg';
import UzPostLogo from '../../../../layouts/icons/uzpost.svg';
import EasyLogo from '../../../../../layouts/icons/logo_delivery_mobile.svg';
import './main.css';
import Reveal from '../../../../animation';

function Delivermobile() {
  const [selectedRegion, setSelectedRegion] = useState('Toshkent'); // Default region

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  return (
    <div style={{backgroundColor: '#ffffff'}}>
      <div style={{position: 'relative', zIndex: '1000'}}>
        <HeaderMainMobile />
      </div>
      <div style={{position: 'relative', zIndex: '100'}}>
        <AdsSliderMobile /> 
      </div>

      <div style={{padding: '16px', position: 'relative', top: '-70px'}}>
        <Reveal>
          <h2 className='delivery_title_mobile'>Способы доставки EasyPrint</h2>
        </Reveal>

        <Reveal>
          <h3 className='delivery_title_mobile2'>Доставка</h3>
        </Reveal>

        <Reveal>
          <p className='delivery_text_mobile'>Доставка заказов осуществляется по всему миру. Вы можете указать адрес и выбрать способ доставки на этапе оформления заказа. Срок доставки складывается из времени необходимого на производство заказа (от двух дней) и выбранного способа доставки. Ниже вы можете проверить доступные методы доставки для вашего региона и сроки доставки.</p>
        </Reveal>

        <Reveal>
          <h3 className='delivery_title_mobile2 mt-3'>Ваш адрес</h3>
        </Reveal>

        <Reveal>
          <h3 className='delivery_title_mobile3 mt-3'>Города и регионы</h3>
        </Reveal>

        <Reveal>
          <select className='delivery_select_mobile' value={selectedRegion} onChange={handleRegionChange}>
            <option value='Toshkent'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Ташкент' : 'Toshkent'}</option>
            <option value='Toshkent viloyati'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Ташкентская область' : 'Toshkent viloyati'}</option>
            <option value='Samarqand'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Самарканд' : 'Samarqand'}</option>
            <option value='Andijon'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Андижан' : 'Andijon'}</option>
            <option value='Fargona'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Фергана' : `Farg'ona`}</option>
            <option value='Namangan'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Наманган' : 'Namangan'}</option>
            <option value='Buxoro'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Бухара' : 'Buxoro'}</option>
            <option value='Jizzax'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Джизак' : 'Jizzax'}</option>
            <option value='Navoiy'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Навоий' : 'Navoiy'}</option>
            <option value='Qashqadaryo'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Кашкадарья' : 'Qashqadaryo'}</option>
            <option value='Surxandaryo'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Сурхандарья' : 'Surxandaryo'}</option>
            <option value='Sirdaryo'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Сырдарья' : 'Sirdaryo'}</option>
            <option value='Xorazm'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Хорезм' : 'Xorazm'}</option>
          </select>
        </Reveal>

        <div id='without_tashkent' style={{ display: selectedRegion === 'Toshkent' ? 'none' : 'block' }}>
          <Reveal>
            <div style={{marginTop: '48px'}} className="delivery_fat_mobile">
              <h3 className='delivery_title_mobile2 mb-4'>Пункты выдачи и постаматы</h3>

              <div className="d-flex justify-content-around">
                <div>
                  <img style={{position: 'relative', left: '-8px'}} src={UzPostLogo} alt="UzPostLogo" />
                </div>

                <div style={{marginTop: '10px', position: 'relative', left: '-20px'}}>
                  <h2 className='delivery_text_mobile'>Отделения почты Узбекистана</h2>

                  <div className="d-flex justify-content-between">
                    <p className='delivery_text_mobile'>от 1 дней</p>
                    <p className='delivery_text_mobile'>25 000 </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div style={{marginTop: '20px'}} className="delivery_fat_mobile">
              <h3 className='delivery_title_mobile2 mb-4'>Курьеры</h3>

              <div className="d-flex justify-content-around">
                <div>
                  <img style={{position: 'relative', left: '-20px'}} src={UzPostLogo} alt="UzPostLogo" />
                </div>

                <div style={{marginTop: '10px', position: 'relative', left: '-26px'}}>
                  <h2 className='delivery_text_mobile'>Достака курьером UZPOST</h2>

                  <div className="d-flex justify-content-between">
                    <p style={{color: '#F19654'}} className='delivery_text_mobile'>от 1 дней</p>
                    <p className='delivery_text_mobile'>25 000 </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div style={{marginTop: '20px'}} className="delivery_fat_mobile">
              <h3 className='delivery_title_mobile2 mb-4'>Почта</h3>

              <div className="d-flex" style={{marginLeft: '10px'}}>
                <div>
                  <img style={{position: 'relative', left: '-8px'}} src={UzPostLogo} alt="UzPostLogo" />
                </div>

                <div style={{marginTop: '10px', position: 'relative', left: '14px'}}>
                  <h2 className='delivery_text_mobile'>Почта UZPOST</h2>

                  <div className="d-flex justify-content-between">
                    <p style={{color: '#F19654'}} className='delivery_text_mobile'>от 1 дней</p>
                    <p style={{marginLeft: '90px'}} className='delivery_text_mobile'>25 000 </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div id='with_tashkent' style={{ display: selectedRegion === 'Toshkent' ? 'block' : 'none' }}>
          <Reveal>
            <div style={{marginTop: '48px'}} className="delivery_fat_mobile">
              <h3 className='delivery_title_mobile2 mb-4'>Пункты выдачи и постаматы</h3>

              <div className="d-flex justify-content-around">
                <div>
                  <img style={{position: 'relative', left: '-8px'}} src={EasyLogo} alt="EasyLogo" />
                </div>

                <div style={{marginTop: '10px', position: 'relative', left: '-20px'}}>
                  <h2 className='delivery_text_mobile'>Отделения почты Узбекистана</h2>

                  <div className="d-flex justify-content-between">
                    <p className='delivery_text_mobile'>от 1 дней</p>
                    <p className='delivery_text_mobile'>25 000 </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div style={{marginTop: '20px'}} className="delivery_fat_mobile">
              <h3 className='delivery_title_mobile2 mb-4'>Курьеры</h3>

              <div className="d-flex justify-content-around">
                <div>
                  <img src={YandexLogo} alt="YandexLogo" />
                </div>

                <div style={{marginTop: '10px'}}>
                  <h2 className='delivery_text_mobile'>Достака курьером Яндекс GO</h2>

                  <div className="d-flex justify-content-between">
                    <p style={{color: '#F19654'}} className='delivery_text_mobile'>от 1 дней</p>
                    <p className='delivery_text_mobile'>25 000 </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <FooterMainMobile />
      <FooterBarMobile />
    </div>
  );
}

export default Delivermobile;