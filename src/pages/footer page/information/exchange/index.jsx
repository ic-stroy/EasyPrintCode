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

  [].forEach.call(document.querySelectorAll('#phone'), function (input) {
    let keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      let pos = this.selectionStart;
      if (pos < 3) event.preventDefault()
      let matrix = "+998 (__) ___-__-__",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          newValue = matrix.replace(/[_\d]/g, function (a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
      i = newValue.indexOf("_");
      if (i != -1) {
          i < 5 && (i = 3);
          newValue = newValue.slice(0, i);
      }
      let reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function (a) {
              return "\\d{1," + a.length + "}";
          }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = newValue;
      if (event.type == "blur" && this.value.length < 5) this.value = "";
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
    input.addEventListener('mouseup', event => {
      event.preventDefault()
      if (input.value.length < 4) {
        input.setSelectionRange(4, 4)
      } else {
        input.setSelectionRange(input.value.length, input.value.length)
      }
    })
  });

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
                <li className='exchange_item' data-bs-toggle="modal" data-bs-target="#exampleModal500" style={{color: '#829D50'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Заполните форму' : `Shaklni to'ldiring`}</li>
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
                <li className='exchange_item' data-bs-toggle="modal" data-bs-target="#exampleModal500" style={{color: '#829D50'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Заполните форму' : `Shaklni to'ldiring`}</li>
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

      <div className="modal fade flaap_modal" id="exampleModal500" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ width: 800, backgroundColor: 'white', height: 620, marginLeft: '-150px', borderRadius: 20, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
            <div className="modal-body" style={{ width: 800, padding: '16px 16px 24px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <h2 className='complain_modal_center'>Обмен и возврат</h2>

              <div className="d-flex" style={{marginTop: 32, justifyContent: 'space-around'}}>
                <div>
                  <input style={{border: '1px solid #E6E6E6', marginBottom: 14}} className='modal_footer_input' type="text" placeholder='ФИО*' />
                  <input style={{border: '1px solid #E6E6E6', marginBottom: 14}} className='modal_footer_input' type="text" placeholder='Номер заказа' />

                  <select style={{border: '1px solid #E6E6E6', marginBottom: 14}} className='modal_footer_input'>
                    <option selected hidden>Выберите тему обращения</option>
                    <option>Не соответствует таблице размеров</option>
                    <option>Не качественное изделие</option>
                    <option>Пришло не то изделие</option>
                    <option>Ошибся с размером - Мало</option>
                    <option>Ошибся с размером - Велико</option>
                    <option>Не пришло изделие</option>
                    <option>Не понравилось качество</option>
                  </select>

                  <p className='complain_modal_center_text' style={{marginTop: 60, width: 300}}>Если вам не подошёл размер, представьте пожалуйста фотографии изделия с приложенной размерной линейкой в ширину (на уровне груди от шва до шва в области подмышек) и в длину (длина измеряется от середины горловины спинки до низа изделия), и фото ярлыка изделия.</p>
                </div>

                <div style={{marginLeft: 50}}>
                  <div id='sender_corporative' style={{ display: 'block', marginBottom: 97}}>
                    <input id='phone' style={{border: '1px solid #E6E6E6', marginBottom: 14}} className='modal_footer_input' type="text" placeholder='Номер телефона*' />
                    <input style={{border: '1px solid #E6E6E6', marginBottom: 14}} className='modal_footer_input' type="text" placeholder='E-mail' />
                    <textarea className='modal_footer_input' style={{ height: 80, border: '1px solid #E6E6E6', marginBottom: 14 }} placeholder='Сообщение'></textarea>

                    <label style={{border: '1px solid #E6E6E6', marginBottom: 120, marginTop: 26}} className={`modal_footer_input`}>
                      <input type="file" accept="image/*" style={{ display: 'none', }} />

                      <div>
                        Загрузите изображения
                      </div>
                    </label>

                    <button style={{ backgroundColor: '#C9DA8F', color: '#1C471F' }} className='modal_footer_input_button'>Отправить</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterMain />
    </div>
  )
}

export default FooterExchangePage