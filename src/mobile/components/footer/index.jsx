import React, { useState } from 'react'
import './main.css'
import Reveal from '../../animation'
import logo from '../../layouts/icons/logo.svg'
import { NavLink } from 'react-router-dom'
import manufacture_back from '../../../layouts/images/footer_modal/mobile/manufactur.svg'
import bloger_back from '../../../layouts/images/footer_modal/mobile/bloger.svg'
import corporative_back from '../../../layouts/images/footer_modal/mobile/corporative.svg'
import designer_back from '../../../layouts/images/footer_modal/mobile/designer.svg'
import manufacture_back_verifed from '../../../layouts/images/footer_modal/manufactur_verifed.svg'
import bloger_back_verifed from '../../../layouts/images/footer_modal/bloger_verifed.svg'
import corporative_back_verifed from '../../../layouts/images/footer_modal/corporative_verifed.svg'
import designer_back_verifed from '../../../layouts/images/footer_modal/designer_verifed.svg'

function FooterMainMobile() {
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
      <footer className='footer footer_mobile' style={{height: '733px'}}>
        <center>
          <Reveal>
            <img style={{marginTop: '32px'}} src={logo} alt="footer_text_mobile" />
          </Reveal>

          <Reveal>
            <ul style={{listStyle: 'none', width: '350px', padding: '0', justifyContent: 'space-between', display: 'flex', flexWrap: 'wrap'}}>
              <li style={{marginBottom: '64px', marginTop: '48px'}}>
                <h3 className='footer_title_mobile'>Информация</h3>
                <br />

                <ul style={{listStyle: 'none', padding: '0', width: '147px', display: 'flex', flexDirection: 'column'}}>
                  <NavLink to={'/mobile/footer/delivery'} className='footer_text_mobile'>Доставка</NavLink>
                  <NavLink to={'/mobile/footer/pay'} className='footer_text_mobile'>Оплата</NavLink>
                  <NavLink to={'/mobile/footer/exchange'} className='footer_text_mobile'>Обмен и возврат</NavLink>
                  <NavLink to={'/mobile/footer/order'} className='footer_text_mobile'>Как оформить заказ?</NavLink>
                  <NavLink to={'/mobile/footer/terms'} className='footer_text_mobile'>Пользовательское <br /> соглашение</NavLink>
                </ul>
              </li>

              <li style={{marginBottom: '64px', marginTop: '48px'}}>
                <h3 className='footer_title_mobile'>Сотрудничество</h3>
                <br />

                <ul style={{listStyle: 'none', padding: '0', width: '147px',}}>
                  <li className='footer_text_mobile' data-bs-toggle="modal" data-bs-target="#exampleModal200">Корпоративным клиентам</li>
                  <li className='footer_text_mobile' data-bs-toggle="modal" data-bs-target="#exampleModal400">Блогерам</li>
                  <li className='footer_text_mobile' data-bs-toggle="modal" data-bs-target="#exampleModal300">Дизайнерам</li>
                  <li className='footer_text_mobile' data-bs-toggle="modal" data-bs-target="#exampleModal100">Производителям</li>
                </ul>
              </li>

              <li>
                <h3 className='footer_title_mobile'>О компании</h3>
                <br />

                <ul style={{listStyle: 'none', padding: '0', width: '147px',}}>
                  <li className='footer_text_mobile'>О нас</li>
                  {/* <li className='footer_text_mobile'>Вакансии</li> */}
                  <li className='footer_text_mobile'>Блог EasyPrint</li>
                  {/* <li className='footer_text_mobile'>Контакты</li> */}
                </ul>
              </li>

              <li>
                <h3 className='footer_title_mobile'>Связаться с нами</h3>
                <br />

                <ul style={{listStyle: 'none', padding: '0', width: '147px',}}>
                  <li className='footer_text_mobile'><a href="mailto:easyprintuz@gmail.com">easyprintuz@gmail.com</a></li>
                  <li className='footer_text_mobile'><a href="tel:+998772778008">+998 77 277 80 08</a></li>
                  {/* <li className='footer_text_mobile'>г. Ташкент, Юкорыкаракамыш 2</li> */}
                  <li className='footer_text_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'г. Ташкент, Мирзо-Улугбекский район, Мустакиллик 88д' : 'Toshkent sh. Mirzo Ulug‘bek tumani, Mustaqillik 88d'}</li>
                </ul>
              </li>
            </ul>
          </Reveal>

          <Reveal>
            <div style={{marginTop: '33px'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
                <rect x="0.5" y="0.5" width="38" height="38" rx="19" stroke="#B3B3B3"/>
                <path d="M25.9021 26.1701C26.5112 23.0224 27.7111 16.2011 27.9873 13.3911C28.0579 12.6801 27.8492 11.9883 26.9807 12.0002C26.2872 12.012 25.2254 12.369 20.1112 14.4221C18.3206 15.142 14.7408 16.6306 9.37352 18.8881C8.50198 19.2229 8.04627 19.5503 8.00484 19.8702C7.92505 20.4835 8.84262 20.676 9.99495 21.0375C10.9355 21.3337 12.1999 21.6789 12.8566 21.6922C13.4535 21.7041 14.1194 21.467 14.8544 20.9797C19.8703 17.712 22.4589 16.0604 22.6215 16.0248C22.7351 15.9996 22.8931 15.9685 23.002 16.0604C23.111 16.1522 23.0987 16.327 23.088 16.3744C22.9959 16.7492 18.2853 20.8864 18.0137 21.1589C16.978 22.1973 15.7996 22.8328 17.6178 23.9897C19.1906 24.991 20.1066 25.6295 21.727 26.6545C22.7627 27.3092 23.5744 28.0869 24.6439 27.9921C25.1349 27.9491 25.6443 27.5033 25.9021 26.1701Z" fill="#829D50"/>
              </svg>

              <a href="https://www.instagram.com/easyprint.uz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                <svg style={{marginLeft: '16px'}} xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
                  <rect x="0.5" y="0.5" width="38" height="38" rx="19" stroke="#B3B3B3"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C10 15.1997 10 13.7996 10.545 12.73C11.0243 11.7892 11.7892 11.0243 12.73 10.545C13.7996 10 15.1997 10 18 10H22C24.8003 10 26.2004 10 27.27 10.545C28.2108 11.0243 28.9757 11.7892 29.455 12.73C30 13.7996 30 15.1997 30 18V22C30 24.8003 30 26.2004 29.455 27.27C28.9757 28.2108 28.2108 28.9757 27.27 29.455C26.2004 30 24.8003 30 22 30H18C15.1997 30 13.7996 30 12.73 29.455C11.7892 28.9757 11.0243 28.2108 10.545 27.27C10 26.2004 10 24.8003 10 22V18ZM20.0002 14.8652C17.1644 14.8652 14.8652 17.1644 14.8652 20.0002C14.8652 22.8361 17.1644 25.1352 20.0002 25.1352C22.8361 25.1352 25.1352 22.8361 25.1352 20.0002C25.1352 17.1644 22.8361 14.8652 20.0002 14.8652ZM20.0002 23.3336C18.1594 23.3336 16.6669 21.8411 16.6669 20.0002C16.6669 18.1594 18.1594 16.6669 20.0002 16.6669C21.8411 16.6669 23.3336 18.1594 23.3336 20.0002C23.3336 21.8411 21.8411 23.3336 20.0002 23.3336ZM26.5367 14.6609C26.5367 15.3237 25.9995 15.8609 25.3367 15.8609C24.674 15.8609 24.1367 15.3237 24.1367 14.6609C24.1367 13.9982 24.674 13.4609 25.3367 13.4609C25.9995 13.4609 26.5367 13.9982 26.5367 14.6609Z" fill="#829D50"/>
                </svg>
              </a>

              <svg style={{marginLeft: '16px'}} xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
                <rect x="0.5" y="0.5" width="38" height="38" rx="19" stroke="#B3B3B3"/>
                <path d="M30.5398 14.6705C30.2868 13.7181 29.5416 12.9673 28.5947 12.7125C26.8796 12.2505 20 12.2505 20 12.2505C20 12.2505 13.1204 12.2505 11.4044 12.7125C10.4584 12.9673 9.71317 13.7172 9.46017 14.6705C9 16.3975 9 20 9 20C9 20 9 23.6025 9.46017 25.3295C9.71317 26.2819 10.4584 27.0327 11.4053 27.2875C13.1204 27.7495 20 27.7495 20 27.7495C20 27.7495 26.8796 27.7495 28.5956 27.2875C29.5416 27.0327 30.2868 26.2828 30.5408 25.3295C31 23.6025 31 20 31 20C31 20 31 16.3975 30.5398 14.6705ZM17.7505 23.2716V16.7284L23.4998 20L17.7505 23.2716Z" fill="#829D50"/>
              </svg>
            </div>
          </Reveal>

          <Reveal>
            <hr style={{marginTop: '32px', width: '327px'}} />
          </Reveal>

          <Reveal>
            <p className='footer_text_mobile_copyright'>© {(new Date().getFullYear())} Easy Print, Все права защищены.</p>
          </Reveal>
        </center>
      </footer>

      <div className="modal fade" id="exampleModal100" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" style={{borderRadius: '20px'}}>
          <div className="modal-content" style={{borderRadius: '20px', backgroundColor: '#C9DA8F', overflow: 'hidden', height: 500}}>
            <div style={{padding: '16px'}} className="modal-body">
              <div style={{backgroundImage: `url(${manufacture_back})`, display: isManufactureSent ? 'none' : 'block', width: '100%', height: 483, position: 'absolute', backgroundRepeat: 'no-repeat', right: '-5%', zIndex: 100}}></div>

              <h2 className='modal_title_footer_mobile'>Производителям</h2>

              <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative', zIndex: 1000, marginBottom: 40 }}>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <center style={{position: 'relative', zIndex: 1000}}>
                <div id='sender_manufacture' style={{ display: isManufactureSent ? 'none' : 'block', marginTop: 41, marginBottom: 97, width: 346 }}>
                  <input id="manufacture_name" className='modal_footer_input' type="text" placeholder='Имя' />
                  <input id="manufacture_phone" className='modal_footer_input' type="text" placeholder='Номер телефона' />
                  <input id="manufacture_email" className='modal_footer_input' type="text" placeholder='E-mail' />
                  <textarea id="manufacture_comment" className='modal_footer_input' style={{ height: 120 }} placeholder='Комментарий'></textarea>
                  <button onClick={() => handleSend('manufacture')} style={{ backgroundColor: '#1C471F', color: '#FFFFFF' }} className='modal_footer_input_button'>Отправить</button>
                </div>

                <div id='send_manufacture' style={{ display: isManufactureSent ? 'flex' : 'none', justifyContent: 'center', alignContent: 'center', marginTop: 41, marginBottom: 97, width: 346, height: 370 }}>
                  <Reveal>
                    <img style={{width: 122, marginTop: 122}} src={manufacture_back_verifed} alt="manufacture_back_verifed" />
                  </Reveal>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModal200" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" style={{borderRadius: '20px'}}>
          <div className="modal-content" style={{borderRadius: '20px', backgroundColor: '#D1E6F4', overflow: 'hidden', height: 500}}>
            <div style={{padding: '16px'}} className="modal-body">
              <div style={{backgroundImage: `url(${corporative_back})`, display: isCorporateSent ? 'none' : 'block', width: '100%', height: 483, position: 'absolute', backgroundRepeat: 'no-repeat', right: '-5%', zIndex: 100}}></div>

              <h2 className='modal_title_footer_mobile'>Корпоративным клиентам</h2>

              <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative', zIndex: 1000, marginBottom: 40 }}>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <center style={{position: 'relative', zIndex: 1000}}>
                <div id='sender_corporative' style={{ display: isCorporateSent ? 'none' : 'block', marginTop: 41, marginBottom: 97, width: 346 }}>
                  <input id="corporative_name" className='modal_footer_input' type="text" placeholder='Имя' />
                  <input id="corporative_phone" className='modal_footer_input' type="text" placeholder='Номер телефона' />
                  <input id="corporative_email" className='modal_footer_input' type="text" placeholder='E-mail' />
                  <textarea id="corporative_comment" className='modal_footer_input' style={{ height: 120 }} placeholder='Комментарий'></textarea>
                  <button onClick={() => handleSend('corporative')} style={{ backgroundColor: '#184363', color: '#FFFFFF' }} className='modal_footer_input_button'>Отправить</button>
                </div>

                <div id='send_corporative' style={{ display: isCorporateSent ? 'flex' : 'none', justifyContent: 'center', alignContent: 'center', marginTop: 41, marginBottom: 97, width: 346, height: 370 }}>
                  <Reveal>
                    <img style={{width: 122, marginTop: 122}} src={corporative_back_verifed} alt="corporative_back_verifed" />
                  </Reveal>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModal300" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" style={{borderRadius: '20px'}}>
          <div className="modal-content" style={{borderRadius: '20px', backgroundColor: '#C3B2E7', overflow: 'hidden', height: 500}}>
            <div style={{padding: '16px'}} className="modal-body">
              <div style={{backgroundImage: `url(${designer_back})`, display: isDesignerSent ? 'none' : 'block', width: '100%', height: 483, position: 'absolute', backgroundRepeat: 'no-repeat', right: '-5%', zIndex: 100}}></div>

              <h2 className='modal_title_footer_mobile'>Дизайнерам</h2>

              <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative', zIndex: 1000, marginBottom: 40 }}>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <center style={{position: 'relative', zIndex: 1000}}>
                <div id='sender_designer' style={{ display: isDesignerSent ? 'none' : 'block', marginTop: 41, marginBottom: 97, width: 346 }}>
                  <input id="designer_name" className='modal_footer_input' type="text" placeholder='Имя' />
                  <input id="designer_phone" className='modal_footer_input' type="text" placeholder='Номер телефона' />
                  <input id="designer_email" className='modal_footer_input' type="text" placeholder='E-mail' />
                  <textarea id="designer_comment" className='modal_footer_input' style={{ height: 120 }} placeholder='Комментарий'></textarea>
                  <button onClick={() => handleSend('designer')} style={{ backgroundColor: '#52225E', color: '#FFFFFF' }} className='modal_footer_input_button'>Отправить</button>
                </div>

                <div id='send_designer' style={{ display: isDesignerSent ? 'flex' : 'none', justifyContent: 'center', alignContent: 'center', marginTop: 41, marginBottom: 97, width: 346, height: 370 }}>
                  <Reveal>
                    <img style={{width: 122, marginTop: 122}} src={designer_back_verifed} alt="designer_back_verifed" />
                  </Reveal>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModal400" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" style={{borderRadius: '20px'}}>
          <div className="modal-content" style={{borderRadius: '20px', backgroundColor: '#FEDF6F', overflow: 'hidden', height: 500}}>
            <div style={{padding: '16px'}} className="modal-body">
              <div style={{backgroundImage: `url(${bloger_back})`, display: isBlogerSent ? 'none' : 'block', width: '100%', height: 483, position: 'absolute', backgroundRepeat: 'no-repeat', right: '-5%', zIndex: 100}}></div>

              <h2 className='modal_title_footer_mobile'>Блогерам</h2>

              <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative', zIndex: 1000, marginBottom: 40 }}>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <center style={{position: 'relative', zIndex: 1000}}>
                <div id='sender_bloger' style={{ display: isBlogerSent ? 'none' : 'block', marginTop: 41, marginBottom: 97, width: 346 }}>
                  <input id="bloger_name" className='modal_footer_input' type="text" placeholder='Имя' />
                  <input id="bloger_phone" className='modal_footer_input' type="text" placeholder='Номер телефона' />
                  <input id="bloger_email" className='modal_footer_input' type="text" placeholder='E-mail' />
                  <textarea id="bloger_comment" className='modal_footer_input' style={{ height: 120 }} placeholder='Комментарий'></textarea>
                  <button onClick={() => handleSend('bloger')} style={{ backgroundColor: '#4A411E', color: '#FFFFFF' }} className='modal_footer_input_button'>Отправить</button>
                </div>

                <div id='send_bloger' style={{ display: isBlogerSent ? 'flex' : 'none', justifyContent: 'center', alignContent: 'center', marginTop: 41, marginBottom: 97, width: 346, height: 370 }}>
                  <Reveal>
                    <img style={{width: 122, marginTop: 122}} src={bloger_back_verifed} alt="bloger_back_verifed" />
                  </Reveal>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FooterMainMobile