import React, { useEffect, useState } from 'react'
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './main.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Reveal from '../../animation';
import HeaderMainMobile from '../../components/header';
import AdsSliderMobile from '../../components/ads slider';
import FooterMainMobile from '../../components/footer'
import FooterBarMobile from '../../components/footer bar'

function AuthorPageMobile() {
  const [trashCardData, setTrashCardData] = useState([]);
  const [data, setData] = useState([]);
  const params = useParams()
  const token = localStorage.getItem('token');
  const [author, setAuthor] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/get-company-products?id=${params.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
      }
    }).then((response) => {
      // console.log(response.data.data[0]);
      setIsLoading(false);
      setAuthor(response.data.data[0]);
    }).catch((error) => {
      setIsLoading(false);
      toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    });    
  }, []);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedCategory', params.id);
  })

  useEffect(() => {
    document.title = 'Страница автора';
  }, []);

  if (params.id !== localStorage.getItem('selectedCategory')) {
    window.location.reload();
  }

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
      toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    });    
  }, []);

  return (
    <div>
      <HeaderMainMobile />
      <AdsSliderMobile />

      <div style={{padding: '24px', position: 'relative', top: '-70px'}}>
        <div className='author_inf_mobile'>
          <Reveal>
            <button style={{background: 'transparent', border: 'none', position: 'absolute', top: '38px', right: '35px'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="#829D50"/>
              </svg>
            </button>
          </Reveal>

          <Reveal>
            {author.avatar ? (
              <img className='user_avatar_mobile' src={author.avatar} alt={localStorage.getItem('user_name')} />
            ) : (
              <div className='user_avatar_mobile'></div>
            )}
          </Reveal>

          <Reveal>
            <h3 className='author_item_mobile' style={{fontFamily: 'Inter600', fontWeight: '600', marginTop: '16px'}}>{author.full_name}</h3>
          </Reveal>

          <Reveal>
            <p className='author_country'>{author.country === 'Uzbekistan' ? '🇺🇿' : ''} {author.country}</p>
          </Reveal>

          <Reveal>
            <h3 className='author_item_mobile' style={{marginTop: '24px', marginBottom: '26px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Информация' : 'Ma`lumot'}</h3>
          </Reveal>

          <Reveal>
            <p className='author_list'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Всего принтов' : 'Jami nashrlar'}</p>
          </Reveal>

          <Reveal>
            <p className='author_item'>{Number(author.total_prints).toLocaleString('ru-RU')}</p>
          </Reveal>

          <Reveal>
            <p className='author_list'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Продано товаров' : 'Sotilgan mahsulotlar'}</p>
          </Reveal>

          <Reveal>
            <p className='author_item'>{Number(author.total_solds).toLocaleString('ru-RU')}</p>
          </Reveal>

          <Reveal>
            <p className='author_list'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Дата регистрации' : `Ro'yxatga olingan sana`}</p>
          </Reveal>

          <Reveal>
            <p className='author_item'>{author.registration_date}</p>
          </Reveal>

          <Reveal>
            <button style={{marginTop: '36px', marginBottom: '16px'}} className='author_button'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Пожаловаться' : 'Shikoyat'}</button>
          </Reveal>
        </div>
      </div>

      <center style={{position: 'relative', top: '-70px'}}>
        <Reveal>
          <h2 style={{marginLeft: '-250px'}} className='home_card_title_mobile'>Товары:</h2>
        </Reveal>

        <div className="d-flex" style={{width: '344px', flexWrap: 'wrap', justifyContent: 'space-between'}}>
          {data.data ? data.data.warehouse_product_list.slice(3).map((data2) => (
            <Reveal>
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
            </Reveal>
          )): null}
        </div>
      </center>

      <FooterMainMobile />
      <FooterBarMobile />
    </div>
  )
}

export default AuthorPageMobile