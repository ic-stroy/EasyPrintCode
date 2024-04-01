import React, { useEffect } from 'react'
import HeaderMainMobile from '../../../../components/header';
import AdsSliderMobile from '../../../../components/ads slider';
import FooterMainMobile from '../../../../components/footer'
import FooterBarMobile from '../../../../components/footer bar'
import OrderImage1 from '../../../../layouts/images/order_1.svg'
import OrderImage2 from '../../../../layouts/images/order_2.svg'
import OrderImage3 from '../../../../layouts/images/order_3.svg'
import OrderImage4 from '../../../../layouts/images/order_4.svg'
import OrderImage5 from '../../../../layouts/images/order_5.svg'
import OrderImage6 from '../../../../layouts/images/order_6.svg'
import OrderImage7 from '../../../../layouts/images/order_7.svg'
import OrderImage8 from '../../../../layouts/images/order_8.svg'
import OrderImage9 from '../../../../layouts/images/order_9.svg'

function OrderMobileFooter() {
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
        <h2 style={{marginBottom: '20px'}} className='delivery_title_mobile'>Как оформить заказ?</h2>
        <center>
          <img style={{marginBottom: '32px', width: '100%'}} src={OrderImage1} alt="OrderImage1" />
          <img style={{marginBottom: '32px', width: '100%'}} src={OrderImage2} alt="OrderImage2" />
          <img style={{marginBottom: '32px', width: '100%'}} src={OrderImage3} alt="OrderImage3" />
          <img style={{marginBottom: '32px', width: '100%'}} src={OrderImage4} alt="OrderImage4" />
          <img style={{marginBottom: '32px', width: '100%'}} src={OrderImage5} alt="OrderImage5" />
          <img style={{marginBottom: '32px', width: '100%'}} src={OrderImage6} alt="OrderImage6" />
          <img style={{marginBottom: '32px', width: '100%'}} src={OrderImage7} alt="OrderImage7" />
          <img style={{marginBottom: '32px', width: '100%'}} src={OrderImage8} alt="OrderImage8" />
          <img style={{width: '100%'}} src={OrderImage9} alt="OrderImage9" />
        </center>
      </div>

      <FooterMainMobile />
      <FooterBarMobile />
    </div>
  )
}

export default OrderMobileFooter