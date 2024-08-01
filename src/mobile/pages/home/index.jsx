import React, { useEffect, useState } from 'react'
import HeaderMainMobile from '../../components/header'
import HeroMainMobile from '../../components/hero'
import FooterMainMobile from '../../components/footer'
import FooterBarMobile from '../../components/footer bar'
import blueVerifed from '../../layouts/icons/blue_verifed.svg'
import blueBuds from '../../layouts/icons/operator.svg'
import blueTruck from '../../layouts/icons/truck.svg'
import your_design from '../../../layouts/images/shirt.svg'
import Reveal from '../../animation/index'
import axios from 'axios';
import './main.css';
import { NavLink, useNavigate } from 'react-router-dom'

function HomePageMobile() {
  const [data, setData] = useState(0);
  const token = localStorage.getItem('token');
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedItems, setDisplayedItems] = useState(11);

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

  useEffect(() => {
    if (data.data && data.data.product_list) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.data.product_list.length);
      }, 10000);

      return () => clearInterval(intervalId);
    }
  }, [data.data]);

  const currentProduct = data.data && data.data.product_list ? data.data.product_list[currentIndex] : null;

  localStorage.setItem('currentProduct', JSON.stringify(currentProduct));

  const handleShowMore = () => {
    if (data.data && data.data.warehouse_product_list.length > displayedItems) {
      setDisplayedItems((prevDisplayedItems) => prevDisplayedItems + 12);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_TWO}/get-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            language: localStorage.getItem('selectedLanguage') || 'ru',
          },
        });
  
        if (response.data.status === true) {
          return;
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user_last_name');
          localStorage.removeItem('user_name');
          localStorage.removeItem('user_phone_number');
          localStorage.removeItem('grant_total');
          localStorage.removeItem('selectedCategory');
          localStorage.removeItem('currentProduct');
          localStorage.removeItem('selectedSubCategory');
          localStorage.removeItem('paymentDate');
          localStorage.removeItem('trueVerifed');
          localStorage.removeItem('basketData');
          localStorage.removeItem('trashCard');
          localStorage.removeItem('selectedCategoryId');
          localStorage.removeItem('basket');
          localStorage.removeItem('price');
          localStorage.removeItem('discount_price');
          localStorage.removeItem('user_image');
        }
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user_last_name');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_phone_number');
        localStorage.removeItem('grant_total');
        localStorage.removeItem('selectedCategory');
        localStorage.removeItem('currentProduct');
        localStorage.removeItem('selectedSubCategory');
        localStorage.removeItem('paymentDate');
        localStorage.removeItem('trueVerifed');
        localStorage.removeItem('basketData');
        localStorage.removeItem('trashCard');
        localStorage.removeItem('selectedCategoryId');
        localStorage.removeItem('basket');
        localStorage.removeItem('price');
        localStorage.removeItem('discount_price');
        localStorage.removeItem('user_image');
      }
    };
  
    if (token) {
      checkUser();
    }
  }, [token]);

  return (
    <div style={{backgroundColor: '#ffffff'}}>
      <HeaderMainMobile />
      <Reveal style={{backgroundColor: 'white'}}>
        {category && category.map((item, index) => (
          <NavLink to={`/mobile/categories/${item.id}/${item.name}`} className='header_button_mobile' key={index}>{item.name}</NavLink>
        ))}
      </Reveal>
      <HeroMainMobile />

      <center>
        <h2 className='home_card_title_mobile'>Хиты Продаж</h2>

        <div className="d-flex" style={{width: '344px', flexWrap: 'wrap', justifyContent: 'space-between'}}>

        <Reveal>
          <NavLink to={`/mobile/yourDesign`} style={{textDecoration: 'none', marginBottom: '12px'}}>
            <div className="clothes_fat" style={{borderRadius: '6px'}}>
              <div className="image-container" style={{position: 'relative', borderRadius: '6px', zIndex: '200'}}>
                <div>
                  <div style={{width: '162px', height: '190px', backgroundImage: `url(${your_design})`, borderRadius: '6px', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
                </div>
              </div>
            </div>

            <div className="d-flex">
              <div>
                <p className='home_card_price'>От 120 000 {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}</p>
                <p className='home_card_title hiided_text' title='Одежда с вашим дизайном'>Одежда с вашим дизайном</p>
              </div>
            </div>
          </NavLink>
        </Reveal>

          {data.data ? data.data.warehouse_product_list.map((data2) => (
            <Reveal>
              <NavLink onClick={() => {localStorage.setItem('idActive', data2.id); localStorage.setItem('nameActive', data2.name)}} to={`/mobile/show/detail/${data2.id}/${data2.name}`} style={{textDecoration: 'none', marginBottom: '12px'}}>
                <div className="clothes_fat" style={{borderRadius: '6px'}}>
                  <div className="image-container" style={{position: 'relative', borderRadius: '6px', zIndex: '200'}}>
                    <div>
                      <div style={{width: '162px', height: '190px', backgroundImage: `url(${data2.images[0]})`, borderRadius: '6px', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
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
            </Reveal>
          )): null}
        </div>

        {data.data && data.data.warehouse_product_list.length > displayedItems && (
          <center className='mt-5'>
            <button className='show_detail_button' onClick={handleShowMore}>Показать еще</button>
          </center>
        )}
      </center>

      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h3 className='advantage_main_text_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Наше преимущество' : 'Bizning ustunligimiz'}</h3>

        <div className='d-flex justify-content-between flex-column'>
          <Reveal>
            <div style={{backgroundColor: '#F8F8F8', padding: '40px 25px', width: '280px', height: '259px'}} className='advantage_cards'>
              <img src={blueVerifed} alt="blue verifed icon" />

              <h3 className='advantage_theme_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Гарантия качества' : 'Sifat kafolati'}</h3>
              <p className='advantage_text_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? `Качественные экологичные материалы` : `Yuqori sifatli ekologik toza materiallar`}</p>
            </div>
          </Reveal>

          <Reveal>
            <div style={{backgroundColor: '#F8F8F8', padding: '40px 25px', width: '280px', height: '259px', marginTop: '-50px'}} className='advantage_cards'>
              <img src={blueTruck} alt="blue truck icon" />

              <h3 className='advantage_theme_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Быстрая доставка' : 'Tez yetkazib berish'}</h3>
              <p className='advantage_text_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? `Доставка по всему Узбекистану` : `O'zbekiston bo'ylab yetkazib berish`}</p>
            </div>
          </Reveal>

          <Reveal>
            <div style={{backgroundColor: '#F8F8F8', padding: '40px 25px', width: '280px', height: '259px', marginTop: '-50px'}} className='advantage_cards'>
              <img src={blueBuds} alt="blue buds icon" />

              <h3 className='advantage_theme_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Сервис' : 'Xizmat'}</h3>
              <p className='advantage_text_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? `Лёгкий процесс оплаты, обмена и возврата` : `Oson to'lov, almashtirish va qaytarish jarayoni`}</p>
            </div>
          </Reveal>
        </div>
      </div>

      <FooterMainMobile />
      <FooterBarMobile />
    </div>
  )
}

export default HomePageMobile