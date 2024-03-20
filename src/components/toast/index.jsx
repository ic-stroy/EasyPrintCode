import React from 'react';
import { NavLink } from 'react-router-dom';
import './main.css'

const ToastComponent = ({ image, title, description, link, linkText, onClose }) => (
  <div className='d-flex' style={{width: '710px'}}>
    <div>
      {image && <img style={{width: '78px', height: '90px'}} src={image} alt="Toast" />}
    </div>

    <div style={{marginLeft: '12px'}}>
      <h3 className='toast_title'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Товар добавлен в корзину' : `Mahsulot savatga qo'shildi`}</h3>
      <p className='toast_description'>{title}</p>
    </div>

    <div className='d-flex flex-column justify-content-between align-items-end' style={{position: 'relative', right: localStorage.getItem('selectedLanguage') === 'ru' ? '-64px' : '-114px'}}>
      <button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M11.1784 9.99991L16.4227 4.75624C16.7482 4.4307 16.7482 3.90291 16.4227 3.5774C16.0971 3.25187 15.5694 3.25187 15.2438 3.5774L10.0001 8.82162L4.75648 3.5774C4.43095 3.25187 3.90315 3.25187 3.57765 3.5774C3.25214 3.90294 3.25211 4.43073 3.57765 4.75624L8.82186 9.99991L3.57765 15.2436C3.25211 15.5691 3.25211 16.0969 3.57765 16.4224C3.90318 16.7479 4.43097 16.748 4.75648 16.4224L10.0001 11.1782L15.2438 16.4224C15.5694 16.748 16.0971 16.748 16.4227 16.4224C16.7482 16.0969 16.7482 15.5691 16.4227 15.2436L11.1784 9.99991Z" fill="#17262B"/>
        </svg>
      </button>
      {link && <NavLink className='toast_link' to={link}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Перейти в корзину' : `Savatga o'tish`}</NavLink>}
    </div>
  </div>
);

export default ToastComponent;