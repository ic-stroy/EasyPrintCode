import React, { useEffect, useState } from 'react'
import './main.css'
import { NavLink } from 'react-router-dom';

function FooterInformationHeader() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const updateActiveTab = () => {
      const path = window.location.hash;

      if (path === '#/footer/delivery') {
        setIsActive(0);
      } else if (path === '#/footer/pay') {
        setIsActive(1);
      } else if (path === '#/footer/exchange') {
        setIsActive(2);
      } else if (path === '#/footer/order') {
        setIsActive(3);
      } else if (path === '#/footer/terms') {
        setIsActive(4);
      }
    };

    updateActiveTab();
  }, []);

  return (
    <div style={{width: '170px', position: 'relative', zIndex: '20'}} className='d-flex flex-column'>
      <h3 className='footer_inf_header_title'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Информация' : 'Ma`lumot'}</h3>
      <NavLink to={'/footer/delivery'} className='footer_inf_header_text' style={{color: isActive === 0 ? '#3C7CFB' : '#1A1A1A'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Доставка' : 'Yetkazib berish'}</NavLink>
      <NavLink to={'/footer/pay'} className='footer_inf_header_text' style={{color: isActive === 1 ? '#3C7CFB' : '#1A1A1A'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Оплата' : 'To`lov'}</NavLink>
      <NavLink to={'/footer/exchange'} className='footer_inf_header_text' style={{color: isActive === 2 ? '#3C7CFB' : '#1A1A1A'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Обмен и возврат' : 'Almashtirish va qaytarish'}</NavLink>
      <NavLink to={'/footer/order'} className='footer_inf_header_text' style={{color: isActive === 3 ? '#3C7CFB' : '#1A1A1A'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Как оформить заказ?' : 'Buyurtmani qanday joylashtirish mumkin?'}</NavLink>
      <NavLink to={'/footer/terms'} className='footer_inf_header_text' style={{color: isActive === 4 ? '#3C7CFB' : '#1A1A1A'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Пользовательское соглашение' : 'Foydalanuvchi shartnomasi'}</NavLink>
    </div>
  )
}

export default FooterInformationHeader