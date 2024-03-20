import React from 'react'
import './main.css'

import blueVerifed from '../../layouts/icons/blue_verifed.svg'
import blueBuds from '../../layouts/icons/operator.svg'
import blueTruck from '../../layouts/icons/truck.svg'

function AdvantageMain() {
  return (
    <div>
      <center style={{marginTop: '120px'}}>
        <div className="container">
          <h3 className='advantage_main_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Наше преимущество' : 'Bizning ustunligimiz'}</h3>

          <div className='d-flex justify-content-between' style={{width: '1200px'}}>
            <div className='advantage_cards'>
              <img src={blueVerifed} alt="blueVerifed" />

              <h3 className='advantage_theme'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Гарантия качества' : 'Sifat kafolati'}</h3>
              <p className='advantage_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? `Качественные экологичные материалы` : `Yuqori sifatli ekologik toza materiallar`}</p>
            </div>

            <div className='advantage_cards' style={{padding: '40px 35px'}}>
              <img src={blueTruck} alt="blueVerifed" />

              <h3 className='advantage_theme'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Быстрая доставка' : 'Tez yetkazib berish'}</h3>
              <p className='advantage_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? `Доставка по всему Узбекистану` : `O'zbekiston bo'ylab yetkazib berish`}</p>
            </div>

            <div className='advantage_cards'>
              <img src={blueBuds} alt="blueVerifed" />

              <h3 className='advantage_theme'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Сервис' : 'Xizmat'}</h3>
              <p className='advantage_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? `Лёгкий процесс оплаты, обмена и возврата` : `Oson to'lov, almashtirish va qaytarish jarayoni`}</p>
            </div>
          </div>
        </div>
      </center>
    </div>
  )
}

export default AdvantageMain