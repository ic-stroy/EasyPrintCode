import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Image404 from '../../layouts/images/404.svg'
import HeaderMainMobile from '../../components/header';
import FooterMainMobile from '../../components/footer';
import FooterBarMobile from '../../components/footer bar';
import blueVerifed from '../../layouts/icons/blue_verifed.svg'
import blueBuds from '../../layouts/icons/operator.svg'
import blueTruck from '../../layouts/icons/truck.svg'

function MobileNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.screen.width < 800) {
        // navigate('/404');
      }
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <div>
      <HeaderMainMobile />

      <center>
        <img style={{marginTop: '94px'}} src={Image404} alt="Image404" />

        <h2 className='mt-5'>Уупс - что-то пошло не так!</h2>
        <p>К сожалению мы не нашли нужную вам страницу.</p>

        <NavLink to={'/'} style={{textDecoration: 'none'}} className='notWorkingButton'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Назад на главную' : 'Orqaga qaytish'}</NavLink>
      </center>

      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h3 className='advantage_main_text_mobile' style={{marginBottom: '-10px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Наше преимущество' : 'Bizning ustunligimiz'}</h3>

        <div className='d-flex justify-content-between flex-column'>
          <div style={{padding: '40px 25px', width: '280px', height: '259px'}} className='advantage_cards'>
            <img src={blueVerifed} alt="blueVerifed" />

            <h3 className='advantage_theme_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Гарантия качества' : 'Sifat kafolati'}</h3>
            <p className='advantage_text_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? `Качественные экологичные материалы` : `Yuqori sifatli ekologik toza materiallar`}</p>
          </div>

          <div style={{padding: '40px 25px', width: '280px', height: '259px', marginTop: '-50px'}} className='advantage_cards'>
            <img src={blueTruck} alt="blueVerifed" />

            <h3 className='advantage_theme_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Быстрая доставка' : 'Tez yetkazib berish'}</h3>
            <p className='advantage_text_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? `Доставка по всему Узбекистану` : `O'zbekiston bo'ylab yetkazib berish`}</p>
          </div>

          <div style={{padding: '40px 25px', width: '280px', height: '259px', marginTop: '-50px'}} className='advantage_cards'>
            <img src={blueBuds} alt="blueVerifed" />

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

export default MobileNotFound