import React, { useEffect } from 'react'
import HeaderMainMobile from '../../../../components/header';
import AdsSliderMobile from '../../../../components/ads slider';
import FooterMainMobile from '../../../../components/footer'
import FooterBarMobile from '../../../../components/footer bar'
import Reveal from '../../../../animation';

function ExchangeMobile() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

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
          <h2 className='delivery_title_mobile'>Обмен и возврат</h2>
        </Reveal>

        <Reveal>
          <p className='delivery_text_mobile mt-2 mb-2' style={{fontFamily: 'Inter600'}}>Если вы получили товар ненадлежащего качества:</p>
        </Reveal>

        <Reveal>
          <p className='delivery_text_mobile mt-2 mb-3'>Мы приносим свои извинения и готовы обменять вам товар или вернуть деньги.</p>
        </Reveal>

        <Reveal>
          <div className="d-flex">
            <div>
              <p className='delivery_text_mobile me-2'>•</p>
            </div>
            <div>
              <p style={{color: '#829D50'}} className='delivery_text_mobile'>Заполните форму</p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="d-flex" style={{marginTop: '-10px'}}>
            <div>
              <p className='delivery_text_mobile me-2'>•</p>
            </div>
            <div>
              <p className='delivery_text_mobile'>В течение 5 дней мы обязательно свяжемся с вами, заменим товар или вернем деньги.</p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="d-flex" style={{marginTop: '-10px'}}>
            <div>
              <p className='delivery_text_mobile me-2'>•</p>
            </div>
            <div>
              <p className='delivery_text_mobile'>Обращения принимаются в течение 14 дней с момента получения заказа.</p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <h3 className='delivery_title_mobile2 mt-2 mb-1'>Если вы ошиблись выбором:</h3>
        </Reveal>

        <Reveal>
          <div className="d-flex">
            <div>
              <p className='delivery_text_mobile me-2'>•</p>
            </div>
            <div>
              <p style={{color: '#829D50'}} className='delivery_text_mobile'>Заполните форму</p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="d-flex" style={{marginTop: '-10px'}}>
            <div>
              <p className='delivery_text_mobile me-2'>•</p>
            </div>
            <div>
              <p className='delivery_text_mobile'>В течение 5 дней мы обязательно свяжемся с вами, заменим товар или вернем деньги.</p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="d-flex" style={{marginTop: '-10px'}}>
            <div>
              <p className='delivery_text_mobile me-2'>•</p>
            </div>
            <div>
              <p className='delivery_text_mobile'>Обращения принимаются в течение 14 дней с момента получения заказа.</p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <h3 className='delivery_title_mobile2 mt-2 mb-1'>Если вы передумали:</h3>
        </Reveal>

        <Reveal>
          <div className="d-flex">
            <div>
              <p className='delivery_text_mobile me-2'>•</p>
            </div>
            <div>
              <p style={{color: '#829D50'}} className='delivery_text_mobile'>Заполните форму</p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="d-flex" style={{marginTop: '-10px'}}>
            <div>
              <p className='delivery_text_mobile me-2'>•</p>
            </div>
            <div>
              <p className='delivery_text_mobile'>В течение 5 дней мы обязательно свяжемся с вами, заменим товар или вернем деньги.</p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="d-flex" style={{marginTop: '-10px'}}>
            <div>
              <p className='delivery_text_mobile me-2'>•</p>
            </div>
            <div>
              <p className='delivery_text_mobile'>Обращения принимаются в течение 14 дней с момента получения заказа.</p>
            </div>
          </div>
        </Reveal>
      </div>

      <FooterMainMobile />
      <FooterBarMobile />
    </div>
  )
}

export default ExchangeMobile