import React, { useState } from 'react'
import './main.css'
import Reveal from '../../animation'
import logo from '../../layouts/icons/logo.svg'
import { NavLink } from 'react-router-dom'
import manufacture_back from '../../layouts/images/footer_modal/manufactur.svg'
import bloger_back from '../../layouts/images/footer_modal/bloger.svg'
import corporative_back from '../../layouts/images/footer_modal/corporative.svg'
import designer_back from '../../layouts/images/footer_modal/designer.svg'
import manufacture_back_verifed from '../../layouts/images/footer_modal/manufactur_verifed.svg'
import bloger_back_verifed from '../../layouts/images/footer_modal/bloger_verifed.svg'
import corporative_back_verifed from '../../layouts/images/footer_modal/corporative_verifed.svg'
import designer_back_verifed from '../../layouts/images/footer_modal/designer_verifed.svg'

function FooterMain() {
  const [isManufactureSent, setIsManufactureSent] = useState(false);
  const [isCorporateSent, setIsCorporateSent] = useState(false);
  const [isDesignerSent, setIsDesignerSent] = useState(false);
  const [isBlogerSent, setIsBlogerSent] = useState(false);

  const handleSend = (type) => {
    let isValid = false;

    if (type === 'manufacture') {
      const name = document.getElementById('manufacture_name').value;
      const phone = document.getElementById('manufacture_phone').value;
      const email = document.getElementById('manufacture_email').value;
      const comment = document.getElementById('manufacture_comment').value;
      isValid = name && phone && email && comment;
      if (isValid) setIsManufactureSent(true);
    }

    if (type === 'corporative') {
      const name = document.getElementById('corporative_name').value;
      const phone = document.getElementById('corporative_phone').value;
      const email = document.getElementById('corporative_email').value;
      const comment = document.getElementById('corporative_comment').value;
      isValid = name && phone && email && comment;
      if (isValid) setIsCorporateSent(true);
    }

    if (type === 'designer') {
      const name = document.getElementById('designer_name').value;
      const phone = document.getElementById('designer_phone').value;
      const email = document.getElementById('designer_email').value;
      const comment = document.getElementById('designer_comment').value;
      isValid = name && phone && email && comment;
      if (isValid) setIsDesignerSent(true);
    }

    if (type === 'bloger') {
      const name = document.getElementById('bloger_name').value;
      const phone = document.getElementById('bloger_phone').value;
      const email = document.getElementById('bloger_email').value;
      const comment = document.getElementById('bloger_comment').value;
      isValid = name && phone && email && comment;
      if (isValid) setIsBlogerSent(true);
    }

    if (!isValid) {
      alert(localStorage.getItem('selectedLanguage') === 'ru' ? 'Обязательно заполните всю информацию.' : `Barcha ma'lumotlarni to'ldirganingizga ishonch hosil qiling.`);
    }
  };

  return (
    <>
      <footer className='footer'>
        <Reveal>
          <ul style={{listStyle: 'none', display: 'flex', justifyContent: 'space-between', margin: '0 120px 0 120px', paddingTop: '60px'}}>
            <li>
              <h3 className='footer_title'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Информация' : 'Ma`lumot'}</h3>
              <br />

              <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column'}}>
                <NavLink to={'/footer/delivery'} className='footer_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Доставка' : 'Yetkazib berish'}</NavLink>
                <NavLink to={'/footer/pay'} className='footer_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Оплата' : 'To`lov'}</NavLink>
                <NavLink to={'/footer/exchange'} className='footer_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Обмен и возврат' : 'Almashtirish va qaytarish'}</NavLink>
                <NavLink to={'/footer/order'} className='footer_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Как оформить заказ?' : 'Buyurtmani qanday joylashtirish mumkin?'}</NavLink>
                <NavLink to={'/footer/terms'} className='footer_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Пользовательское соглашение' : 'Foydalanuvchi shartnomasi'}</NavLink>
              </ul>
            </li>

            <li>
              <h3 className='footer_title'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Сотрудничество' : 'Hamkorlik'}</h3>
              <br />

              <ul style={{listStyle: 'none'}}>
                <li data-bs-toggle="modal" data-bs-target="#exampleModal200" className='footer_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Корпоративным клиентам' : 'Korporativ mijozlarga'}</li>
                <li data-bs-toggle="modal" data-bs-target="#exampleModal400" className='footer_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Блогерам' : 'Blogerlar uchun'}</li>
                <li data-bs-toggle="modal" data-bs-target="#exampleModal300" className='footer_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Дизайнерам' : 'Dizaynerlar uchun'}</li>
                <li data-bs-toggle="modal" data-bs-target="#exampleModal100" className='footer_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Производителям' : 'Ishlab chiqaruvchilar uchun'}</li>
              </ul>
            </li>

            <li>
              <h3 className='footer_title'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'О нас' : 'Biz haqimizda'}</h3>
              <br />

              <ul style={{listStyle: 'none'}}>
                <li className='footer_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'О нас' : 'Biz haqimizda'}</li>
                {/* <li className='footer_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Вакансии' : `Bo'sh ish o'rinlari`}</li> */}
                <li className='footer_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Блог EasyPrint' : `EasyPrint blogi`}</li>
                {/* <li className='footer_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Контакты' : 'Kontaktlar'}</li> */}
              </ul>
            </li>

            <li>
              <h3 className='footer_title'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Связаться с нами' : `Biz bilan bog'lanish`}</h3>
              <br />

              <ul style={{listStyle: 'none'}}>
                <li className='footer_text'><a href="mailto:easyprintuz@gmail.com">easyprintuz@gmail.com</a></li>
                <li className='footer_text'><a href="tel:+998772778008">+998 77 277 80 08</a></li>
                <li className='footer_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'г. Ташкент, Мирзо-Улугбекский' : 'Toshkent sh. Mirzo Ulug‘bek'} <br /> {localStorage.getItem('selectedLanguage') === 'ru' ? 'район, Мустакиллик 88д' : 'tumani, Mustaqillik 88d'}</li>
              </ul>
            </li>
          </ul>
        </Reveal>

        <Reveal>
          <center>
            <hr style={{marginTop: '76px', width: '1074px'}} />
          </center>
        </Reveal>

        <Reveal>
          <ul style={{listStyle: 'none', height: '141px', display: 'flex', justifyContent: 'space-between', margin: '0 120px 0 120px', alignItems: 'center', paddingTop: '0'}}>
            <li>
              <img src={logo} alt="footer_text" />
            </li>

            <li className='footer_text_data'>
              © {(new Date().getFullYear())} Easy Print, {localStorage.getItem('selectedLanguage') === 'ru' ? 'Все права защищены' : 'Barcha huquqlar himoyalangan'}
            </li>

            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
                <rect x="0.5" y="0.5" width="38" height="38" rx="19" stroke="#B3B3B3"/>
                <path d="M25.9021 26.1701C26.5112 23.0224 27.7111 16.2011 27.9873 13.3911C28.0579 12.6801 27.8492 11.9883 26.9807 12.0002C26.2872 12.012 25.2254 12.369 20.1112 14.4221C18.3206 15.142 14.7408 16.6306 9.37352 18.8881C8.50198 19.2229 8.04627 19.5503 8.00484 19.8702C7.92505 20.4835 8.84262 20.676 9.99495 21.0375C10.9355 21.3337 12.1999 21.6789 12.8566 21.6922C13.4535 21.7041 14.1194 21.467 14.8544 20.9797C19.8703 17.712 22.4589 16.0604 22.6215 16.0248C22.7351 15.9996 22.8931 15.9685 23.002 16.0604C23.111 16.1522 23.0987 16.327 23.088 16.3744C22.9959 16.7492 18.2853 20.8864 18.0137 21.1589C16.978 22.1973 15.7996 22.8328 17.6178 23.9897C19.1906 24.991 20.1066 25.6295 21.727 26.6545C22.7627 27.3092 23.5744 28.0869 24.6439 27.9921C25.1349 27.9491 25.6443 27.5033 25.9021 26.1701Z" fill="#829D50"/>
              </svg>

              <a target='_blank' href="https://www.instagram.com/easyprint.uz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                <svg style={{marginLeft: '16px'}} xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
                  <rect x="0.5" y="0.5" width="38" height="38" rx="19" stroke="#B3B3B3"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C10 15.1997 10 13.7996 10.545 12.73C11.0243 11.7892 11.7892 11.0243 12.73 10.545C13.7996 10 15.1997 10 18 10H22C24.8003 10 26.2004 10 27.27 10.545C28.2108 11.0243 28.9757 11.7892 29.455 12.73C30 13.7996 30 15.1997 30 18V22C30 24.8003 30 26.2004 29.455 27.27C28.9757 28.2108 28.2108 28.9757 27.27 29.455C26.2004 30 24.8003 30 22 30H18C15.1997 30 13.7996 30 12.73 29.455C11.7892 28.9757 11.0243 28.2108 10.545 27.27C10 26.2004 10 24.8003 10 22V18ZM20.0002 14.8652C17.1644 14.8652 14.8652 17.1644 14.8652 20.0002C14.8652 22.8361 17.1644 25.1352 20.0002 25.1352C22.8361 25.1352 25.1352 22.8361 25.1352 20.0002C25.1352 17.1644 22.8361 14.8652 20.0002 14.8652ZM20.0002 23.3336C18.1594 23.3336 16.6669 21.8411 16.6669 20.0002C16.6669 18.1594 18.1594 16.6669 20.0002 16.6669C21.8411 16.6669 23.3336 18.1594 23.3336 20.0002C23.3336 21.8411 21.8411 23.3336 20.0002 23.3336ZM26.5367 14.6609C26.5367 15.3237 25.9995 15.8609 25.3367 15.8609C24.674 15.8609 24.1367 15.3237 24.1367 14.6609C24.1367 13.9982 24.674 13.4609 25.3367 13.4609C25.9995 13.4609 26.5367 13.9982 26.5367 14.6609Z" fill="#829D50"/>
                </svg>
              </a>

              <svg style={{marginLeft: '16px'}} xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
                <rect x="0.5" y="0.5" width="38" height="38" rx="19" stroke="#B3B3B3"/>
                <path d="M30.5398 14.6705C30.2868 13.7181 29.5416 12.9673 28.5947 12.7125C26.8796 12.2505 20 12.2505 20 12.2505C20 12.2505 13.1204 12.2505 11.4044 12.7125C10.4584 12.9673 9.71317 13.7172 9.46017 14.6705C9 16.3975 9 20 9 20C9 20 9 23.6025 9.46017 25.3295C9.71317 26.2819 10.4584 27.0327 11.4053 27.2875C13.1204 27.7495 20 27.7495 20 27.7495C20 27.7495 26.8796 27.7495 28.5956 27.2875C29.5416 27.0327 30.2868 26.2828 30.5408 25.3295C31 23.6025 31 20 31 20C31 20 31 16.3975 30.5398 14.6705ZM17.7505 23.2716V16.7284L23.4998 20L17.7505 23.2716Z" fill="#829D50"/>
              </svg>
            </li>
          </ul>
        </Reveal>
      </footer>

      <div className="modal fade flaap_modal" id="exampleModal100" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ backgroundImage: `url(${manufacture_back})`, width: 800, marginLeft: '-150px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
            <div className="modal-body" style={{ width: 800 }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div id='sender_manufacture' style={{ display: isManufactureSent ? 'none' : 'block', marginTop: 41, marginBottom: 97, width: 346 }}>
                <input id="manufacture_name" className='modal_footer_input' type="text" placeholder='Имя' />
                <input id="manufacture_phone" className='modal_footer_input' type="text" placeholder='Номер телефона' />
                <input id="manufacture_email" className='modal_footer_input' type="text" placeholder='E-mail' />
                <textarea id="manufacture_comment" className='modal_footer_input' style={{ height: 120 }} placeholder='Комментарий'></textarea>
                <button onClick={() => handleSend('manufacture')} style={{ backgroundColor: '#1C471F', color: '#FFFFFF' }} className='modal_footer_input_button'>Отправить</button>
              </div>

              <div id='send_manufacture' style={{ display: isManufactureSent ? 'flex' : 'none', justifyContent: 'center', alignContent: 'center', marginTop: 41, marginBottom: 97, width: 346, height: 370 }}>
                <Reveal>
                  <img style={{width: 122, marginTop: 122, transform: 'scale(1.5)'}} src={manufacture_back_verifed} alt="manufacture_back_verifed" />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade flaap_modal" id="exampleModal200" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ backgroundImage: `url(${corporative_back})`, width: 800, marginLeft: '-150px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
            <div className="modal-body" style={{ width: 800 }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div id='sender_corporative' style={{ display: isCorporateSent ? 'none' : 'block', marginTop: 41, marginBottom: 97, width: 346 }}>
                <input id="corporative_name" className='modal_footer_input' type="text" placeholder='Имя' />
                <input id="corporative_phone" className='modal_footer_input' type="text" placeholder='Номер телефона' />
                <input id="corporative_email" className='modal_footer_input' type="text" placeholder='E-mail' />
                <textarea id="corporative_comment" className='modal_footer_input' style={{ height: 120 }} placeholder='Комментарий'></textarea>
                <button onClick={() => handleSend('corporative')} style={{ backgroundColor: '#184363', color: '#FFFFFF' }} className='modal_footer_input_button'>Отправить</button>
              </div>

              <div id='send_corporative' style={{ display: isCorporateSent ? 'flex' : 'none', justifyContent: 'center', alignContent: 'center', marginTop: 41, marginBottom: 97, width: 346, height: 370 }}>
                <Reveal>
                  <img style={{width: 122, marginTop: 122, transform: 'scale(1.5)'}} src={corporative_back_verifed} alt="corporative_back_verifed" />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade flaap_modal" id="exampleModal300" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ backgroundImage: `url(${designer_back})`, width: 800, marginLeft: '-150px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
            <div className="modal-body" style={{ width: 800 }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div id='sender_designer' style={{ display: isDesignerSent ? 'none' : 'block', marginTop: 41, marginBottom: 97, width: 346 }}>
                <input id="designer_name" className='modal_footer_input' type="text" placeholder='Имя' />
                <input id="designer_phone" className='modal_footer_input' type="text" placeholder='Номер телефона' />
                <input id="designer_email" className='modal_footer_input' type="text" placeholder='E-mail' />
                <textarea id="designer_comment" className='modal_footer_input' style={{ height: 120 }} placeholder='Комментарий'></textarea>
                <button onClick={() => handleSend('designer')} style={{ backgroundColor: '#52225E', color: '#FFFFFF' }} className='modal_footer_input_button'>Отправить</button>
              </div>

              <div id='send_designer' style={{ display: isDesignerSent ? 'flex' : 'none', justifyContent: 'center', alignContent: 'center', marginTop: 41, marginBottom: 97, width: 346, height: 370 }}>
                <Reveal>
                  <img style={{width: 122, marginTop: 122, transform: 'scale(1.5)'}} src={designer_back_verifed} alt="designer_back_verifed" />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade flaap_modal" id="exampleModal400" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ backgroundImage: `url(${bloger_back})`, width: 800, marginLeft: '-150px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
            <div className="modal-body" style={{ width: 800 }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div id='sender_bloger' style={{ display: isBlogerSent ? 'none' : 'block', marginTop: 41, marginBottom: 97, width: 346 }}>
                <input id="bloger_name" className='modal_footer_input' type="text" placeholder='Имя' />
                <input id="bloger_phone" className='modal_footer_input' type="text" placeholder='Номер телефона' />
                <input id="bloger_email" className='modal_footer_input' type="text" placeholder='E-mail' />
                <textarea id="bloger_comment" className='modal_footer_input' style={{ height: 120 }} placeholder='Комментарий'></textarea>
                <button onClick={() => handleSend('bloger')} style={{ backgroundColor: '#4A411E', color: '#FFFFFF' }} className='modal_footer_input_button'>Отправить</button>
              </div>

              <div id='send_bloger' style={{ display: isBlogerSent ? 'flex' : 'none', justifyContent: 'center', alignContent: 'center', marginTop: 41, marginBottom: 97, width: 346, height: 370 }}>
                <Reveal>
                  <img style={{width: 122, marginTop: 122, transform: 'scale(1.5)'}} src={bloger_back_verifed} alt="bloger_back_verifed" />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FooterMain