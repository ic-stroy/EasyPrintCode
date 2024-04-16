import React, { useEffect } from 'react'
import HeaderMain from '../../../../components/header'
import Reveal from '../../../../animation'
import FooterMain from '../../../../components/footer'
import FooterInformationHeader from '../../../../components/footer/information header'
import AdsSlider from '../../../../components/ads slider'
import YandexLogo from '../../../../layouts/icons/yandex.svg'
import UzPostLogo from '../../../../layouts/icons/uzpost.svg'
import './main.css';

function FooterDeliveryPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <div style={{backgroundColor: '#ffffff'}}>
      <HeaderMain />

      <AdsSlider />

      <div className="container">
        <div className="d-flex">
          <div>
            <FooterInformationHeader />
          </div>

          <div style={{width: '1000px', marginLeft: '80px'}}>
            <Reveal>
              <h1 className='footer_delivery_title'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Способы доставки EasyPrint' : 'Easy Print Yetkazib berish usuli'}</h1>
            </Reveal>

            <Reveal>
              <h4 className='footer_delivery_subtitle mt-4'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Доставка' : 'Yetkazib berish'}</h4>
            </Reveal>

            <Reveal>
              <p className='footer_delivery_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? `Доставка заказов осуществляется по всему миру. Вы можете указать адрес и выбрать способ доставки на этапе оформления заказа. Срок доставки складывается из времени необходимого на производство заказа (от двух дней) и выбранного способа доставки. Ниже вы можете проверить доступные методы доставки для вашего региона и сроки доставки.` : `Buyurtmalarni yetkazib berish butun Oʻzbekiston boʻylab amalga oshiriladi. To‘lov vaqtida manzilingizni kiritishingiz va yetkazib berish usulini tanlashingiz mumkin. Yetkazib berish muddati buyurtmani ishlab chiqarish uchun zarur bo'lgan vaqtdan (ikki kundan boshlab) va tanlangan etkazib berish usulidan iborat. Quyida manzilingiz va yetkazib berish vaqtlari uchun mavjud etkazib berish usullarini tekshirishingiz mumkin.`}</p>
            </Reveal>

            <Reveal>
              <h4 className='footer_delivery_subtitle mt-5 mb-3'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Ваш адрес' : 'Sizning manzilingiz'}</h4>
            </Reveal>

            <div className="d-flex">
              <Reveal>
                <h4 className='footer_delivery_subtitle_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Область' : 'Viloyat/Tuman'}</h4>

                <select className='footer_delivery_select'>
                  <option>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Ташкентская область' : 'Toshkent viloyati'}</option>
                  <option>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Ташкентская область' : 'Toshkent viloyati'}</option>
                  <option>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Ташкентская область' : 'Toshkent viloyati'}</option>
                  <option>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Ташкентская область' : 'Toshkent viloyati'}</option>
                </select>
              </Reveal>

              <Reveal>
                <div style={{marginLeft: '80px'}}>
                  <h4 className='footer_delivery_subtitle_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Город' : 'Shahar'}</h4>

                  <select className='footer_delivery_select'>
                    <option>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Ташкент' : 'Toshkent shahri'}</option>
                    <option>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Ташкент' : 'Toshkent shahri'}</option>
                    <option>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Ташкент' : 'Toshkent shahri'}</option>
                    <option>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Ташкент' : 'Toshkent shahri'}</option>
                  </select>
                </div>
              </Reveal>
            </div>

            <Reveal>
              <div className="delivery" style={{marginTop: '36px'}}>
                <h5 className='footer_delivery_subtitle_text_delivery'>Пункты выдачи и постаматы</h5>

                <div className="d-flex align-items-center" style={{height: '60px', marginTop: '25px'}}>
                  <div>
                    <img style={{width: '120px', marginRight: '33px'}} src={UzPostLogo} alt="UzPostLogo" />
                  </div>

                  <div className='mt-3' style={{marginRight: localStorage.getItem('selectedLanguage') === 'ru' ? '150px' : '121px'}}>
                    <p className='delivery_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Отделения почты Узбекистана' : `O'zbekiston pochta bo'limlari`}</p>
                  </div>

                  <div className='mt-3' style={{marginRight: '121px'}}>
                    <p className='delivery_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'от 2 дней' : `2 kundan boshlab`}</p>
                  </div>

                  <div className='mt-3'>
                    <p className='delivery_text'>25 000</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="delivery" style={{marginTop: '36px'}}>
                <h5 className='footer_delivery_subtitle_text_delivery'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Курьер' : `Kuryer`}</h5>

                <div className="d-flex align-items-center" style={{height: '60px', marginTop: '25px'}}>
                  <div>
                    <img style={{width: '120px', marginRight: '33px'}} src={UzPostLogo} alt="UzPostLogo" />
                  </div>

                  <div className='mt-3' style={{marginRight: localStorage.getItem('selectedLanguage') === 'ru' ? '150px' : '40px'}}>
                    <p className='delivery_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Отделения почты Узбекистана' : `UZPOST kuryeri orqali yetkazib berish`}</p>
                  </div>

                  <div className='mt-3' style={{marginRight: '121px'}}>
                    <p className='delivery_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'от 2 дней' : `2 kundan boshlab`}</p>
                  </div>

                  <div className='mt-3'>
                    <p className='delivery_text'>25 000</p>
                  </div>
                </div>

                <div className="d-flex align-items-center" style={{height: '60px', marginTop: '25px'}}>
                  <div>
                    <img style={{width: '64px', marginRight: '60px', marginLeft: '32px'}} src={YandexLogo} alt="UzPostLogo" />
                  </div>

                  <div className='mt-3' style={{marginRight: localStorage.getItem('selectedLanguage') === 'ru' ? '144px' : '15px'}}>
                    <p className='delivery_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Доставка курьером Яндекс GO' : `Yandex GO kuryeri orqali yetkazib berish`}</p>
                  </div>

                  <div className='mt-3' style={{marginRight: '121px'}}>
                    <p className='delivery_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'от 2 дней' : `2 kundan boshlab`}</p>
                  </div>

                  <div className='mt-3'>
                    <p className='delivery_text'>25 000</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="delivery" style={{marginTop: '36px', marginBottom: '400px'}}>
                <h5 className='footer_delivery_subtitle_text_delivery'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Пункты выдачи и постаматы' : `Pochta`}</h5>

                <div className="d-flex align-items-center" style={{height: '60px', marginTop: '25px'}}>
                  <div>
                    <img style={{width: '120px', marginRight: '33px'}} src={UzPostLogo} alt="UzPostLogo" />
                  </div>

                  <div className='mt-3' style={{marginRight: localStorage.getItem('selectedLanguage') === 'ru' ? '384px' : '233px'}}>
                    <p className='delivery_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Почта' : `Pochta UZPOST`}</p>
                  </div>

                  <div className='mt-3' style={{marginRight: '121px'}}>
                    <p className='delivery_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'от 2 дней' : `2 kundan boshlab`}</p>
                  </div>

                  <div className='mt-3'>
                    <p className='delivery_text'>25 000</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <FooterMain />
    </div>
  )
}

export default FooterDeliveryPage