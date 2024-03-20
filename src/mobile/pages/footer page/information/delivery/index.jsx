import React, { useEffect } from 'react'
import HeaderMainMobile from '../../../../components/header';
import AdsSliderMobile from '../../../../components/ads slider';
import FooterMainMobile from '../../../../components/footer'
import FooterBarMobile from '../../../../components/footer bar'
import YandexLogo from '../../../../layouts/icons/yandex.svg';
import UzPostLogo from '../../../../layouts/icons/uzpost.svg';
import './main.css'

function Delivermobile() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <div style={{backgroundColor: '#ffffff'}}>
      <HeaderMainMobile />
      <AdsSliderMobile />

      <div style={{padding: '16px', position: 'relative', top: '-70px'}}>
        <h2 className='delivery_title_mobile'>Способы доставки EasyPrint</h2>
        <h3 className='delivery_title_mobile2'>Доставка</h3>
        <p className='delivery_text_mobile'>Доставка заказов осуществляется по всему миру. Вы можете указать адрес и выбрать способ доставки на этапе оформления заказа. Срок доставки складывается из времени необходимого на производство заказа (от двух дней) и выбранного способа доставки. Ниже вы можете проверить доступные методы доставки для вашего региона и сроки доставки.</p>
        <h3 className='delivery_title_mobile2 mt-3'>Ваш адрес</h3>
        <h3 className='delivery_title_mobile3 mt-3'>Область</h3>

        <select className='delivery_select_mobile'>
          <option value="Ташкентская область">Ташкентская область</option>
          <option value="Ташкентская область">Ташкентская область</option>
          <option value="Ташкентская область">Ташкентская область</option>
        </select>

        <h3 className='delivery_title_mobile3 mt-3'>Город</h3>

        <select className='delivery_select_mobile'>
          <option value="Ташкент">Ташкент</option>
          <option value="Ташкент">Ташкент</option>
          <option value="Ташкент">Ташкент</option>
        </select>

        <div style={{marginTop: '48px'}} className="delivery_fat_mobile">
          <h3 className='delivery_title_mobile2 mb-4'>Пункты выдачи и постаматы</h3>

          <div className="d-flex justify-content-around">
            <div>
              <img style={{position: 'relative', left: '-8px'}} src={UzPostLogo} alt="UzPostLogo" />
            </div>

            <div style={{marginTop: '10px', position: 'relative', left: '-20px'}}>
              <h2 className='delivery_text_mobile'>Отделения почты Узбекистана</h2>

              <div className="d-flex justify-content-between">
                <p className='delivery_text_mobile'>от 2 дней</p>
                <p className='delivery_text_mobile'>25 000 </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{marginTop: '20px'}} className="delivery_fat_mobile">
          <h3 className='delivery_title_mobile2 mb-4'>Пункты выдачи и постаматы</h3>

          <div className="d-flex justify-content-around">
            <div>
              <img style={{position: 'relative', left: '-20px'}} src={UzPostLogo} alt="UzPostLogo" />
            </div>

            <div style={{marginTop: '10px', position: 'relative', left: '-26px'}}>
              <h2 className='delivery_text_mobile'>Достака курьером UZPOST</h2>

              <div className="d-flex justify-content-between">
                <p style={{color: '#F19654'}} className='delivery_text_mobile'>от 2 дней</p>
                <p className='delivery_text_mobile'>25 000 </p>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-around">
            <div>
              <img src={YandexLogo} alt="YandexLogo" />
            </div>

            <div style={{marginTop: '10px'}}>
              <h2 className='delivery_text_mobile'>Достака курьером Яндекс GO</h2>

              <div className="d-flex justify-content-between">
                <p style={{color: '#F19654'}} className='delivery_text_mobile'>от 2 дней</p>
                <p className='delivery_text_mobile'>25 000 </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{marginTop: '20px'}} className="delivery_fat_mobile">
          <h3 className='delivery_title_mobile2 mb-4'>Почта</h3>

          <div className="d-flex" style={{marginLeft: '10px'}}>
            <div>
              <img style={{position: 'relative', left: '-8px'}} src={UzPostLogo} alt="UzPostLogo" />
            </div>

            <div style={{marginTop: '10px', position: 'relative', left: '14px'}}>
              <h2 className='delivery_text_mobile'>Почта UZPOST</h2>

              <div className="d-flex justify-content-between">
                <p style={{color: '#F19654'}} className='delivery_text_mobile'>от 2 дней</p>
                <p style={{marginLeft: '90px'}} className='delivery_text_mobile'>25 000 </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterMainMobile />
      <FooterBarMobile />
    </div>
  )
}

export default Delivermobile