import React, { useEffect } from 'react'
import HeaderMain from '../../../../components/header'
import FooterMain from '../../../../components/footer'
import FooterInformationHeader from '../../../../components/footer/information header'
import AdsSlider from '../../../../components/ads slider'
import Reveal from '../../../../animation'
import './main.css';

function FooterExchangePage() {
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

          <div style={{width: '1000px', marginLeft: '80px', marginBottom: '400px'}}>
            <Reveal>
              <h1 className='footer_delivery_title'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Обмен и возврат' : 'Almashtirish va qaytarish'}</h1>
            </Reveal>

            <Reveal>
              <p className='footer_delivery_text' style={{marginBottom: '6px', marginTop: '10px', fontFamily: 'Inter600'}}><b>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Если вы получили товар ненадлежащего качества:' : `Agar siz sifatsiz mahsulot olgan bo'lsangiz:`}</b></p>
            </Reveal>

            <Reveal>
              <p className='footer_delivery_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Мы приносим свои извинения и готовы обменять вам товар или вернуть деньги.' : `Biz uzr so'raymiz va mahsulotingizni almashtirishga yoki pulingizni qaytarishga tayyormiz.`}</p>
            </Reveal>

            <Reveal>
              <ul>
                <li className='exchange_item' style={{color: '#829D50'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Заполните форму' : `Shaklni to'ldiring`}</li>
                <li className='exchange_item'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'В течение 5 дней мы обязательно свяжемся с вами, заменим товар или вернем деньги.' : `Biz 5 kun ichida siz bilan bog'lanamiz va mahsulotni almashtiramiz yoki pulingizni qaytarib beramiz.`}</li>
                <li className='exchange_item'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Обращения принимаются в течение 14 дней с момента получения заказа.' : `Arizalar buyurtma olingan kundan boshlab 14 kun ichida qabul qilinadi.`}</li>
              </ul>
            </Reveal>

            <Reveal>
              <p className='footer_delivery_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Все расходы по обмену и возврату бракованного товара мы берем на себя.' : `Biz nuqsonli tovarlarni almashtirish va qaytarish uchun barcha xarajatlarni o'z zimmamizga olamiz.`}</p>
            </Reveal>

            <Reveal>
              <p className='footer_delivery_text' style={{marginBottom: '20px', marginTop: '24px', fontFamily: 'Inter600'}}><b>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Если вы ошиблись выбором:' : `Agar siz noto'g'ri tanlov qilsangiz:`}</b></p>
            </Reveal>

            <Reveal>
              <ul>
                <li className='exchange_item' style={{color: '#829D50'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Заполните форму' : `Shaklni to'ldiring`}</li>
                <li className='exchange_item'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'В течение 5 дней мы обязательно свяжемся с вами и согласуем процедуру обмена.' : `Biz 5 kun ichida siz bilan bog'lanamiz va almashish tartibini kelishib olamiz.`}</li>
                <li className='exchange_item'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Обращения принимаются в течение 7 дней с момента получения заказа.' : `Arizalar buyurtma olingan kundan boshlab 7 kun ichida qabul qilinadi.`}</li>
              </ul>
            </Reveal>

            <Reveal>
              <p className='footer_delivery_text' style={{marginBottom: '20px', marginTop: '24px', fontFamily: 'Inter600'}}><b>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Если вы передумали:' : `Agar fikringizni o'zgartirsangiz:`}</b></p>
            </Reveal>

            <Reveal>
              <ul>
                <li className='exchange_item'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Напишите нам в телеграм:' : `Bizga telegram orqali yozing:`} @<span style={{color: '#829D50'}}>easyprint.uz</span> {localStorage.getItem('selectedLanguage') === 'ru' ? 'и в теме письма укажите номер Вашего заказа' : `va mavzu satrida buyurtma raqamingizni ko'rsating`}</li>
                <li className='exchange_item'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Мы свяжемся с вами и вернем деньги.' : `Biz siz bilan bog'lanamiz va pulingizni qaytarib beramiz.`}</li>
                <li className='exchange_item'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Обращения принимаются в течение 7 дней с момента получения заказа.' : `Arizalar buyurtma olingan kundan boshlab 7 kun ichida qabul qilinadi.`}</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      <FooterMain />
    </div>
  )
}

export default FooterExchangePage