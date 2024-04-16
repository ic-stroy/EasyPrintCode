import React, { useEffect } from 'react'
import HeaderMain from '../../../../components/header'
import FooterMain from '../../../../components/footer'
import FooterInformationHeader from '../../../../components/footer/information header'
import AdsSlider from '../../../../components/ads slider'
import Reveal from '../../../../animation'
import './main.css';

function FooterPayPage() {
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
              <h1 className='footer_delivery_title'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Способы оплаты на EasyPrint' : `Easy Print to'lov usuli`}</h1>
            </Reveal>

            <Reveal>
              <p className='footer_delivery_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Вы можете воспользоваться несколькими способамим оплаты на EasyPrint' : `EasyPrint-da bir nechta to'lov usullaridan foydalanishingiz mumkin`}</p>
            </Reveal>

            <Reveal>
              <h4 className='footer_delivery_subtitle mt-4'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Банковские карты' : 'Bank kartalari'}</h4>
              <p className='footer_delivery_text'>
                {localStorage.getItem('selectedLanguage') === 'ru' ? 'К оплате принимаются банковские карты платежных систем UZCARD и HUMO.' : 'Toʻlov uchun UZCARD va HUMO toʻlov tizimlarining bank kartalari qabul qilinadi.'} 
                <br /> <br /> 
                {localStorage.getItem('selectedLanguage') === 'ru' ? 'Чтобы оплатить заказ банковской картой выберите способ “Оплатить онлайн при помощи банковской карты” на этапе оформления заказа. Чтобы перейти к этапу оплаты заполните все поля отмеченные звездочкой и нажмите на кнопку “Оформить заказ”.' : `Buyurtmani bank kartasi bilan to'lash uchun buyurtmani joylashtirishda "Bank kartasi yordamida onlayn to'lov" usulini tanlang. To'lov bosqichiga o'tish uchun yulduzcha bilan belgilangan barcha maydonlarni to'ldiring va "Buyurtma berish" tugmasini bosing.`} 
                <br /> <br />  
                {localStorage.getItem('selectedLanguage') === 'ru' ? 'Оплата происходит на специальной странице банка. На этой странице вы увидите общую сумму платежа и сможете указать сведения вашей карты. Данные будут сообщены только на авторизационный сервер банка по защищенному каналу. EasyPrint.uz не имеет доступа к данным вашей карты.' : `To'lov bankning maxsus sahifasida amalga oshiriladi. Ushbu sahifada siz to'lovning umumiy miqdorini ko'rasiz va kartangiz ma'lumotlarini kiritishingiz mumkin. Ma'lumotlar faqat xavfsiz kanal orqali bankning avtorizatsiya serveriga xabar qilinadi. EasyPrint.uz sizning kartangiz ma'lumotlariga kirish huquqiga ega emas.`}
              </p>
            </Reveal>

            <Reveal>
              <h4 className='footer_delivery_subtitle mt-4'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Оплата наличными при получении' : `Qabul qilgandan keyin naqd pulda to'lash`}</h4>
            </Reveal>

            <Reveal>
              <p className='footer_delivery_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Для заказов суммой до 700 000 сум возможна оплата наличными при получении. Такой способ оплаты возможен только при доставке через почту Uzpost. Обратите внимание, что не все пункты самовывоза поддерживают оплату при получении. Возможность оплаты при получении отображается при выборе конкретного пункта самовывоза на этапе оформления заказа.' : `700 000 so'mgacha bo'lgan buyurtmalar uchun to'lovni qabul qilgandan keyin naqd pulda amalga oshirish mumkin.  E'tibor bering, hamma qabul qilish joylari etkazib berishda to'lovni qo'llab-quvvatlamaydi. Qabul qilgandan keyin to'lash imkoniyati to'lov bosqichida ma'lum bir qabul qilish nuqtasini tanlashda ko'rsatiladi.`}</p>
            </Reveal>
          </div>
        </div>
      </div>

      <FooterMain />
    </div>
  )
}

export default FooterPayPage