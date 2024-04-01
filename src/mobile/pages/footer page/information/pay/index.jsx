import React, { useEffect } from 'react'
import HeaderMainMobile from '../../../../components/header';
import AdsSliderMobile from '../../../../components/ads slider';
import FooterMainMobile from '../../../../components/footer'
import FooterBarMobile from '../../../../components/footer bar'

function PayMobile() {
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
        <h2 className='delivery_title_mobile'>Способы оплаты на EasyPrint</h2>
        <p className='delivery_text_mobile mt-2 mb-3'>Вы можете воспользоваться несколькими способамим оплаты на EasyPrint</p>
        <h3 className='delivery_title_mobile2'>Банковские карты</h3>
        <p className='delivery_text_mobile'>К оплате принимаются банковские карты платежных систем <b>UZCARD</b> и <b>HUMO</b>.</p>
        <p className='delivery_text_mobile'>Чтобы оплатить заказ банковской картой выберите способ “Оплатить онлайн при помощи банковской карты” на этапе оформления заказа. Чтобы перейти к этапу оплаты заполните все поля отмеченные звездочкой и нажмите на кнопку “Оформить заказ”.</p>
        <p className='delivery_text_mobile'>Оплата происходит на специальной странице банка. На этой странице вы увидите общую сумму платежа и сможете указать сведения вашей карты. Данные будут сообщены только на авторизационный сервер банка по защищенному каналу. EasyPrint.uz не имеет доступа к данным вашей карты.</p>
        <h3 className='delivery_title_mobile2'>Оплата наличными при получении</h3>
        <p className='delivery_text_mobile'>Для заказов суммой до 700 000 сум возможна оплата наличными при получении. Такой способ оплаты возможен только при доставке через почту Uzpost. Обратите внимание, что не все пункты самовывоза поддерживают оплату при получении. Возможность оплаты при получении отображается при выборе конкретного пункта самовывоза на этапе оформления заказа.</p>
      </div>

      <FooterMainMobile />
      <FooterBarMobile />
    </div>
  )
}

export default PayMobile