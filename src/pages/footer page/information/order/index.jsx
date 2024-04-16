import React, { useEffect } from 'react'
import HeaderMain from '../../../../components/header'
import FooterMain from '../../../../components/footer'
import FooterInformationHeader from '../../../../components/footer/information header'
import AllInstructor from '../../../../layouts/images/all_ins.svg'
import AdsSlider from '../../../../components/ads slider'
import './main.css';
import Reveal from '../../../../animation'

function FooterOrderPage() {
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
              <h1 className='footer_delivery_title'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Как оформить заказ?' : 'Buyurtmani qanday joylashtirish mumkin?'}</h1>
            </Reveal>

            <Reveal>
              <img style={{position: 'relative', left: '-240px', marginTop: '46px', zIndex: '10'}} src={AllInstructor} alt="AllInstructor" />
            </Reveal>
          </div>
        </div>
      </div>

      <FooterMain />
    </div>
  )
}

export default FooterOrderPage