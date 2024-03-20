import React, { useEffect, useState } from 'react'
import './main.css';
import FooterHomeIconNoActive from '../../layouts/icons/footer_bar_home_no_active.svg'
import FooterHomeIcon from '../../layouts/icons/footer_bar_home.svg'
import FooterBasketIcon from '../../layouts/icons/footer_bar_bag.svg'
import FooterBasketIconActive from '../../layouts/icons/footer_bar_bag_active.svg'
import FooterProfileIcon from '../../layouts/icons/footer_bar_profile.svg'
import FooterProfileIconActive from '../../layouts/icons/footer_bar_profile_active.svg'
import FooterYourDesignIcon from '../../layouts/icons/footer_bar_your_design.svg'
import FooterYourDesignIconActive from '../../layouts/icons/footer_bar_design_active.svg'
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function FooterBarMobile() {
  const [active, setActive] = useState('');
  const [activeId, setActiveId] = useState();
  const [activeName, setActiveName] = useState();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const path = window.location.hash;
    setActive(path);
    setActiveId(localStorage.getItem('idActive'));
    setActiveName(localStorage.getItem('nameActive'));
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/profile-info`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
        token: token
      }
    }).then((response) => {
      const basket_number = response.data.data.basket_count;
      localStorage.setItem('counterValue', basket_number.toString());
      // console.log(response.data.data.basket_count);
    }).catch((error) => {
      console.log(error);
    })
  }, []);

  return (
    <div className='footer_bar'>
      <NavLink to={'/mobile'} style={{textDecoration: 'none'}} className='center flex-column'>
        {active === '#/mobile' || active === '#/mobile/404' || active === `#/mobile/show/detail/${activeId}/${activeName}` ? <img src={FooterHomeIcon} alt="FooterHomeIconActive" /> : <img src={FooterHomeIconNoActive} alt="FooterHomeIconNoActive" />}
        {active === '#/mobile' || active === '#/mobile/404' || active === `#/mobile/show/detail/${activeId}/${activeName}` ? <p className='footer_bar_text_active'>Главная</p> : <p className='footer_bar_text'>Главная</p>}
      </NavLink>

      <NavLink to={'/mobile/yourDesign'} style={{textDecoration: 'none'}} className='center flex-column'>
        {active === '#/mobile/yourDesign' ? <img src={FooterYourDesignIconActive} alt="FooterYourDesignIcon" /> : <img src={FooterYourDesignIcon} alt="FooterYourDesignIcon" />}
        {active === '#/mobile/yourDesign' ? <p className='footer_bar_text_active'>Дизайн</p> : <p className='footer_bar_text'>Дизайн</p>}
      </NavLink>

      <NavLink to={'/basket/mobile'} style={{textDecoration: 'none'}} onClick={() => localStorage.setItem('trueVerifed', true)} className='center flex-column'>
        {active === '#/basket/mobile' || active === '#/mobile/checkout' ? 
        <div>
          <p className='footer_bar_text_count' style={{position: 'absolute', right: '130px', display: localStorage.getItem('counterValue') === '0' ? 'none' : 'flex'}}>{localStorage.getItem('counterValue') ? localStorage.getItem('counterValue') : 0}</p>
          <img src={FooterBasketIconActive} alt="FooterBasketIcon" />
        </div> :  
        <div>
          <p className='footer_bar_text_count' style={{position: 'absolute', right: '130px', display: localStorage.getItem('counterValue') === '0' ? 'none' : 'flex'}}>{localStorage.getItem('counterValue') ? localStorage.getItem('counterValue') : 0}</p>
          <img src={FooterBasketIcon} alt="FooterBasketIcon" />
        </div>}
        {active === '#/basket/mobile' || active === '#/mobile/checkout' ? <p className='footer_bar_text_active'>Корзина</p> : <p className='footer_bar_text'>Корзина</p>}
      </NavLink>

      <NavLink to={localStorage.getItem('token') ? '/mobile/profile' : '/mobile/auth'} style={{textDecoration: 'none'}} className='center flex-column'>
        {active === '#/mobile/profile' || active === '#/mobile/profile/addres' || active === '#/mobile/profile/checkout' ?<img src={FooterProfileIconActive} alt="FooterBasketIcon" /> : <img src={FooterProfileIcon} alt="FooterProfileIcon" />}
        {active === '#/mobile/profile' || active === '#/mobile/profile/addres' || active === '#/mobile/profile/checkout' ? <p className='footer_bar_text_active'>Профиль</p> : <p className='footer_bar_text'>Профиль</p>}
      </NavLink>
    </div>
  )
}

export default FooterBarMobile