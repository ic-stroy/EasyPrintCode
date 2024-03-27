import React, { useEffect, useState } from 'react'
import HeaderMainMobile from '../../components/header'
import HeroMainMobile from '../../components/hero'
import FooterMainMobile from '../../components/footer'
import FooterBarMobile from '../../components/footer bar'
import blueVerifed from '../../layouts/icons/blue_verifed.svg'
import blueBuds from '../../layouts/icons/operator.svg'
import blueTruck from '../../layouts/icons/truck.svg'
import axios from 'axios';
import './main.css';
import { NavLink, useNavigate } from 'react-router-dom'

function HomePageMobile() {
  const [data, setData] = useState(0);
  const token = localStorage.getItem('token');
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/get-warehouses`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
      }
    }).then((response) => {
      // console.log(response.data.data.warehouse_product_list);
      setData(response.data);
    }).catch((error) => {
      console.log(error);
    });    
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/get-categories`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
      }
    }).then((response) => {
      setCategory(response.data.data[0]);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.screen.width < 800) {
        navigate('/mobile');
      }
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <div style={{backgroundColor: '#ffffff'}}>
      <HeaderMainMobile />
      <div style={{backgroundColor: 'white'}}>
        {category && category.map((item, index) => (
          <NavLink to={`/mobile/categories/${item.id}/${item.name}`} className='header_button_mobile' key={index}>{item.name}</NavLink>
        ))}
      </div>
      <HeroMainMobile />

      <center>
        <h2 className='home_card_title_mobile'>Рекомендуем вам:</h2>

        <div className="d-flex" style={{width: '344px', flexWrap: 'wrap', justifyContent: 'space-between'}}>
          {data.data ? data.data.warehouse_product_list.slice(3).map((data2) => (
            <NavLink onClick={() => {localStorage.setItem('idActive', data2.id); localStorage.setItem('nameActive', data2.name)}} to={`/mobile/show/detail/${data2.id}/${data2.name}`} style={{textDecoration: 'none', marginBottom: '12px'}}>
              <div className="clothes_fat" style={{borderRadius: '6px'}}>
                <div className="image-container" style={{position: 'relative', borderRadius: '6px', zIndex: '200'}}>
                  <div>
                    <div style={{width: '162px', height: '190px', backgroundImage: `url(${data2.images[0]})`, borderRadius: '6px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
                  </div>
                </div>
              </div>

              <div className="d-flex">
                <div>
                  <p className='home_card_price'>{Number(data2.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}</p>
                  <p className='home_card_title hiided_text' title={data2.name}>{data2.name}</p>
                </div>
              </div>
            </NavLink>
          )): null}
        </div>
      </center>

      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h3 className='advantage_main_text_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Наше преимущество' : 'Bizning ustunligimiz'}</h3>

        <div className='d-flex justify-content-between flex-column'>
          <div style={{backgroundColor: '#F8F8F8', padding: '40px 25px', width: '280px', height: '259px'}} className='advantage_cards'>
            <img src={blueVerifed} alt="blue verifed icon" />

            <h3 className='advantage_theme_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Гарантия качества' : 'Sifat kafolati'}</h3>
            <p className='advantage_text_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? `Качественные экологичные материалы` : `Yuqori sifatli ekologik toza materiallar`}</p>
          </div>

          <div style={{backgroundColor: '#F8F8F8', padding: '40px 25px', width: '280px', height: '259px', marginTop: '-50px'}} className='advantage_cards'>
            <img src={blueTruck} alt="blue truck icon" />

            <h3 className='advantage_theme_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Быстрая доставка' : 'Tez yetkazib berish'}</h3>
            <p className='advantage_text_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? `Доставка по всему Узбекистану` : `O'zbekiston bo'ylab yetkazib berish`}</p>
          </div>

          <div style={{backgroundColor: '#F8F8F8', padding: '40px 25px', width: '280px', height: '259px', marginTop: '-50px'}} className='advantage_cards'>
            <img src={blueBuds} alt="blue buds icon" />

            <h3 className='advantage_theme_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Сервис' : 'Xizmat'}</h3>
            <p className='advantage_text_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? `Лёгкий процесс оплаты, обмена и возврата` : `Oson to'lov, almashtirish va qaytarish jarayoni`}</p>
          </div>
        </div>
      </div>

      <FooterMainMobile />
      <FooterBarMobile />
    </div>
  )
}

export default HomePageMobile