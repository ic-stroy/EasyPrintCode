import React, { useEffect, useState } from 'react'
import './main.css'
import logo from '../../layouts/icons/logo.svg'
import search from '../../layouts/icons/search.svg'
import bag from '../../layouts/icons/bag.svg'
import user from '../../layouts/icons/User.svg'
import language from '../../layouts/icons/language.svg'
import register_image from '../../layouts/images/43.svg'
import verifed from '../../layouts/images/green_verifed.svg'
import language_verifed from '../../layouts/icons/language_verifed.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Placeholder from 'react-placeholder-loading';
import { ToastContainer, toast } from 'react-toastify'
import CodeVerificationInputLaptop from '../code verifed'

function HeaderMain({ trashCardData }) {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const token = localStorage.getItem('token');
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || '');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [activeLinkId, setActiveLinkId] = useState(null);
  const [isPhoneNumberEntered, setIsPhoneNumberEntered] = useState(false);
  const [isCodeEntered, setIsCodeEntered] = useState(false);
  const [isRegisterEntered, setIsRegisterEntered] = useState(false);
  const [isLoginEntered, setIsLoginEntered] = useState(false);
  const [bascent, setBascent] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFirstEntered, setIsFirstEntered] = useState(false);
  const [isSuccesEntered, setIsSuccesEntered] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [position, setPosition] = useState(window.pageYOffset)
  const [visible, setVisible] = useState(true) 
  const [registrationData, setRegistrationData] = useState({
    name: '',
    password: '',
    passwordConfirmation: '',
  });
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkScreenSize = () => {
  //     if (window.screen.width < 800) {
  //       navigate('/mobile');
  //     }
  //   };

  //   checkScreenSize();

  //   window.addEventListener('resize', checkScreenSize);

  //   return () => {
  //     window.removeEventListener('resize', checkScreenSize);
  //   };
  // }, []);

  useEffect(()=> {
      const handleScroll = () => {
        let moving = window.pageYOffset
        
        setVisible(position > moving);
        setPosition(moving)
      };

      window.addEventListener("scroll", handleScroll);
      return(() => {
        window.removeEventListener("scroll", handleScroll);
      })
  })

  const cls = visible ? "visible" : "hidden";

  let docTitle = document.title;

  window.addEventListener('blur', () => {
    document.title = localStorage.getItem('selectedLanguage') === 'ru' ? 'Вернуться снова! 🤗' : `Yana ko'rishguncha! 🤗`;
  });

  window.addEventListener('focus', () => {
    document.title = docTitle;
  });

  if (!localStorage.getItem('selectedLanguage')) {
    localStorage.setItem('selectedLanguage', 'ru')
  }

  const handleSubmitLogin = (evt) => {
    evt.preventDefault();
  
    const { user_email, user_password } = evt.target.elements;
  
    fetch(`${process.env.REACT_APP_TWO}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: user_email.value.trim(),
        password: user_password.value.trim(),
      }),
    })
      .then(response => response.json())
      .then(result => {
        localStorage.setItem('token', result.data.token);
        setIsSuccesEntered(true); 
        setIsLoginEntered(false)
        setPasswordsMatch(true);
      })
      .catch(error => {toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!'); setIsSuccesEntered(false); setIsLoginEntered(true); setPasswordsMatch(false);});
  };  

  const handleSubmitRegister = (evt) => {
    evt.preventDefault();
  
    const { phone } = evt.target.elements;

    const cleanedPhone = phone.value.replace(/\D/g, '');

    setPhoneNumber(cleanedPhone);

    var myHeaders = new Headers();
    myHeaders.append("language", "uz");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "laravel_session=y1Jx3e0YpgmZNhomT4H7G6IVj79Tj7OxleBR5Hl2");

    var formdata = new FormData();
    formdata.append("phone", cleanedPhone);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_TWO}/phone-register`, requestOptions)
      .then(response => response.text())
      .then(result => {setIsCodeEntered(true); setIsPhoneNumberEntered(false);})
      .catch(error => {toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!'); setIsCodeEntered(false); setIsPhoneNumberEntered(true);});
  }

  const handleOpenCodeVerificationModal = (evt) => {
    evt.preventDefault();
  
    const { code_verify } = evt.target.elements;

      fetch(`${process.env.REACT_APP_TWO}/phone-verify`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          verify_code: localStorage.getItem('phone_code_verify'),
        }),
      })
        .then(response => response.json())
        .then(result => {localStorage.setItem('token', result.data.token); setIsCodeEntered(false); setIsSuccesEntered(false); setIsRegisterEntered(true);})
        .catch(error => {toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!'); setIsCodeEntered(true); setIsSuccesEntered(false); setIsRegisterEntered(false);});
  };

  const handleOpenRegisterModal = (evt) => {
    evt.preventDefault();
    setIsSuccesEntered(false);

    if (registrationData.password !== registrationData.passwordConfirmation) {
      setPasswordsMatch(false);
      return;
    }

    setPasswordsMatch(true);
  
    var myHeaders = new Headers();
    myHeaders.append("language", "uz");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
    myHeaders.append("Cookie", "laravel_session=y1Jx3e0YpgmZNhomT4H7G6IVj79Tj7OxleBR5Hl2");
  
    var formdata = new FormData();
    formdata.append("name", registrationData.name);
    formdata.append("surname", localStorage.getItem('user_last_name'));
    formdata.append("password", registrationData.password);
    formdata.append("password_confirmation", registrationData.passwordConfirmation);
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
  
    fetch(`${process.env.REACT_APP_TWO}/register`, requestOptions)
      .then(response => response.json())
      .then(result => {
        localStorage.setItem('user_name', result.data.user.first_name);
        setIsRegisterEntered(false);
        setIsSuccesEntered(true);
        // console.log(result);
      })
      .catch(error => {
        toast.error('Регистрация не была оформлена.');
        console.log(error);
      });
  };

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
      setBascent(response.data.data.basket_count)
      const basket_number = response.data.data.basket_count;
      localStorage.setItem('counterValue', basket_number.toString());
      setData(response.data)
      setIsLoading(false);
    }).catch((error) => {
      toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    })
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
      setCategory(response.data)
    }).catch((error) => {
      toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    })

    setIsFirstEntered(true);
  }, []);

  const handleLanguageChange = (event) => {
    const selectedLang = event;
    setSelectedLanguage(selectedLang);
    localStorage.setItem('selectedLanguage', selectedLang);
    toggleLanguageDropdown();
    window.location.reload();
  };  

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

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

  const clickDisableAll = () => {
    setIsFirstEntered(true);
    setIsSuccesEntered(false);
    setIsPhoneNumberEntered(false);
    setIsCodeEntered(false);
    setIsRegisterEntered(false);
    setIsLoginEntered(false);
  }

  return (
    <header style={{backgroundColor: '#ffffff'}}>
      {isLoading ? (
        <div className='container pt-4 pb-4'>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap'}}>
            <div>
              <Placeholder 
                shape="rect"
                width={198} 
                height={40} 
                animation="wave" 
                style={{ marginBottom: '20px' }}
              />
            </div>

            <div className='d-flex'>
              <div style={{marginRight: '32px'}}>
                <Placeholder 
                  shape="rect"
                  width={126} 
                  height={44} 
                  animation="wave" 
                  style={{ marginBottom: '20px' }}
                />
              </div>

              <div style={{marginRight: '32px'}}>
                <Placeholder 
                  shape="rect"
                  width={126} 
                  height={44} 
                  animation="wave" 
                  style={{ marginBottom: '20px' }}
                />
              </div>

              <div style={{marginRight: '32px'}}>
                <Placeholder 
                  shape="rect"
                  width={126} 
                  height={44} 
                  animation="wave" 
                  style={{ marginBottom: '20px' }}
                />
              </div>

              <div>
                <Placeholder 
                  shape="rect"
                  width={126} 
                  height={44} 
                  animation="wave" 
                  style={{ marginBottom: '20px' }}
                />
              </div>
            </div>

            <div>
              <Placeholder 
                  shape="rect"
                  width={200} 
                  height={44} 
                  animation="wave" 
                  style={{ marginBottom: '20px' }}
                />
            </div>

            <div className='d-flex'>
              <div style={{marginRight: '24px'}}>
                <Placeholder 
                  shape="circle"
                  width={32} 
                  height={32} 
                  animation="wave" 
                  style={{ marginBottom: '20px' }}
                />
              </div>

              <div style={{marginRight: '24px'}}>
                <Placeholder 
                  shape="circle"
                  width={32} 
                  height={32} 
                  animation="wave" 
                  style={{ marginBottom: '20px' }}
                />
              </div>

              <div style={{marginRight: '6px'}}>
                <Placeholder 
                  shape="circle"
                  width={32} 
                  height={32} 
                  animation="wave" 
                  style={{ marginBottom: '20px' }}
                />
              </div>

              <div style={{marginTop: '2px'}}>
                <Placeholder 
                  shape="rect"
                  width={52} 
                  height={20} 
                  animation="wave" 
                  style={{ marginBottom: '20px' }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <center style={{textAlign: 'left'}} className="d-flex align-items-center justify-content-center">
          <NavLink title="EasyPrint Home" to={'/'}>
            <img className='header_logo' style={{marginTop: '3.1553398058252426vh', marginBottom: '3.1553398058252426vh'}} src={logo} alt="logo" />
          </NavLink>

          <ul className="d-flex" style={{ marginLeft: '6.067961165048544vh', marginTop: '2.368932038834951vh', listStyle: 'none', fontFamily: 'Inter' }}>
            {category.data && category.data.length > 0 && category.data[0].map((data2) => (
              <li title={data2.name} key={data2.id} className="nav-item ms-3 me-3">
                <NavLink to={`/categories/${data2.id}/${data2.name}`} className={`nav-link ${activeLinkId === data2.id ? 'active' : ''}`} onMouseEnter={() => setActiveLinkId(data2.id)} onMouseLeave={() => setActiveLinkId(null)}>
                  {data2.name}
                </NavLink>

                {Array.isArray(data2.sub_category) && data2.sub_category.length > 0 ? (
                  <div className={`language_list language_list_${data2.id} ${activeLinkId === data2.id ? 'active' : ''}`}>
                    {data2.sub_category.map((data3) => (
                      <NavLink title={data3.name} to={`/categories/${data3.id}/${data3.name}`} className='language_item' key={data3.id}>
                        {data3.name}
                      </NavLink>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="d-flex">
            <div style={{marginLeft: '12.135922330097088vh'}} className='header_search'>
              <center>
                <input className="header_search_input" type="search" placeholder="Поиск..." aria-label="Поиск..." />
                <img className='header_search_icon' src={search} alt="search" />
              </center>
            </div>

            <div className="d-flex">
              <button title="Change language" onClick={toggleLanguageDropdown} style={{backgroundColor: 'transparent', border: 'none', position: 'relative', zIndex: '100'}}>
                <img className='language_icon' style={{marginTop: '-0.24271844660194175vh'}} onClick={toggleLanguageDropdown} src={language} alt="user" />
              </button>

              <div onClick={toggleLanguageDropdown} style={{position: 'absolute', display: showLanguageDropdown === true ? 'block' : 'none', background: 'transparent', width: '100%', height: '100vh', top: '0', left: '0'}} className="color_background"></div>

              {showLanguageDropdown && (
                <div value={selectedLanguage} style={{border: 'none',backgroundColor: 'white',position: 'absolute',top: '8.495145631067961vh', right: '22.33009708737864vh',boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.05)',zIndex: '1000000000'}}>
                  {data.data && data.data.language && data.data.language.map((lang) => (
                      <div title={lang.name} onClick={() => handleLanguageChange(lang.code)} value={lang.code} className='language_item' key={lang.id}>
                        {lang.name}
                        {lang.code === localStorage.getItem('selectedLanguage') ? <img style={{width: '2.4271844660194173vh', height: '2.4271844660194173vh'}} src={language_verifed} alt="language_verifed" /> : null}
                      </div>
                    ))}
                </div>
              )}

              <NavLink title="Basket" to={'/basket'} style={{paddingTop: localStorage.getItem('counterValue') === '0' ? '9px' : 'none'}} className='basket_counter_father'>
                <div title="Basket counter" className='basket_counter' style={{display: localStorage.getItem('counterValue') === '0' ? 'none' : 'block'}}>{localStorage.getItem('counterValue')}</div>
                <button style={{backgroundColor: 'transparent', border: 'none', position: 'absolute', zIndex: '1', marginTop: '-4px', marginLeft: '6px'}}>
                  <img className='language_icon' src={bag} alt="bag" />
                </button>
              </NavLink>

              {localStorage.getItem('token') ? (
                <NavLink title="Profile" to={'/profile'} style={{marginTop: '1.6990291262135921vh', textDecoration: 'none'}}>
                  <button style={{backgroundColor: 'transparent', position: 'absolute', marginLeft: '-1.2135922330097086vh', border: 'none', display: 'flex', marginTop: '0.4854368932038835vh',}}>
                    <img className='language_icon' src={user} alt="user" />
                    <p className='user_name_text'>{localStorage.getItem('user_name')}</p>
                  </button>
                </NavLink>
              ) : (
                <button title="Login or Register" style={{backgroundColor: 'transparent', border: 'none'}} data-bs-target="#exampleModalToggle" data-bs-toggle="modal">
                  <img className='language_icon' src={user} alt="user" />
                </button>
              )}
            </div>
          </div>
        </center>
      )}

      <div style={{position: 'relative', zIndex: '1000000'}}>
        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex={1}>
          <div className="modal-dialog modal-dialog-centered" style={{borderRadius: '12px', border: 'none'}}>
            <div className="modal-content" style={{borderRadius: '12px', border: 'none'}}>
              <div className="modal-body get_phonenumber" id='get_phonenumber' style={{padding: '32px', display: isPhoneNumberEntered ? 'block' : 'none', position: 'relative', zIndex: '10000000'}}>
                <form onSubmit={(evt) => { handleSubmitRegister(evt) }}>
                  <center>
                    <h2 className='register_title'>Введите номер телефона</h2>
                  </center>

                  <p className='register_text' style={{textAlign: 'left', marginTop: '32px'}}>Мы отправим 6-значный СМС-код безопасности на ваш номер</p>

                  <label style={{ width: '100%', display: 'grid', marginTop: '32px' }}>
                    <p className='register_in_text'>Номер телефона</p>

                    <input name='phone' id='phone' className='register_input' type="text" placeholder='+998' />
                  </label>

                  <button type='submit' className='register'>Подтвердить</button>
                </form>
              </div>

              <div className="modal-body get_code" id='get_code' style={{padding: '32px', display: isCodeEntered ? 'block' : 'none', position: 'relative', zIndex: '10000000'}}>
                <form onSubmit={(evt) => { handleOpenCodeVerificationModal(evt) }}>
                  <center>
                    <h2 className='register_title'>Введите код подтверждения</h2>
                  </center>

                  <p className='register_text' style={{textAlign: 'left', marginTop: '32px'}}>Мы отправили 6-значный СМС-код безопасности на ваш номер</p>

                  <label style={{ width: '100%', display: 'grid', marginTop: '32px' }}>
                    <p className='register_in_text'>Код подтверждения</p>

                    {/* <input name='phone' id='code_verify' className='register_input' type="text" placeholder='_ _ _ _ _ _' /> */}
                    <div className='center'>
                      <CodeVerificationInputLaptop length={6} name='phone' id='code_verify' />
                    </div>
                  </label>

                  <button className='register'>Подтвердить</button>
                </form>
              </div>

              <div className="modal-body" id='get_register' style={{padding: '32px', display: isRegisterEntered ? 'block' : 'none', position: 'relative', zIndex: '10000000'}}>
                <form onSubmit={(evt) => { handleOpenRegisterModal(evt) }} action="">
                  <center>
                    <h2 className='register_title'>Регистация</h2>
                    <p className='register_text'>Введите свои данные</p>
                  </center>

                  <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                    <p className='register_in_text'>Имя</p>
                    <input
                      name='name'
                      className='register_input'
                      type="text"
                      placeholder='Введите имя'
                      onChange={(e) =>
                        setRegistrationData({
                          ...registrationData,
                          name: e.target.value,
                        })
                      }
                    />
                  </label>

                  <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                    <p className='register_in_text'>Фамилия</p>
                    <input
                      name='surname'
                      className='register_input'
                      type="text"
                      placeholder='Ведите фамилию'
                      onChange={(e) =>
                        localStorage.setItem(
                          'user_last_name',
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                    <p className='register_in_text'>Пароль</p>
                    <input
                      name='password'
                      className={`register_input ${!passwordsMatch ? 'password-error' : ''}`}
                      type="password"
                      placeholder='Введите пароль'
                      onChange={(e) =>
                        setRegistrationData({
                          ...registrationData,
                          password: e.target.value,
                        })
                      }
                    />
                  </label>

                  <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                    <p className='register_in_text'>Подтвердите пароль</p>
                    <input
                      name='passwordConfirmation'
                      className={`register_input ${!passwordsMatch ? 'password-error' : ''}`}
                      type="password"
                      placeholder='Подтвердите пароль'
                      onChange={(e) =>
                        setRegistrationData({
                          ...registrationData,
                          passwordConfirmation: e.target.value,
                        })
                      }
                    />
                  </label>

                  {passwordsMatch ? null : (
                    <p className='register_text_no_password' style={{color: 'red'}}>Пароли не совпадают</p>
                  )}

                  <button className='register'>
                    Регистрация
                  </button>
                </form>
              </div>

              <div className="modal-body" id='get_login' style={{padding: '32px', display: isLoginEntered ? 'block' : 'none', position: 'relative', zIndex: '10000000'}}>
                <form onSubmit={handleSubmitLogin} action="">
                  <center>
                    <h2 className='register_title'>Авторизация</h2>
                    <p className='register_text'>Введите свои данные</p>
                  </center>

                  <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                    <p className='register_in_text'>E-mail или номер телефона</p>
                    <input name='user_email' className={`register_input ${!passwordsMatch ? 'password-error' : ''}`} type="text" placeholder='Введите адрес электронной почты' />
                  </label>

                  <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                    <p className='register_in_text'>Пароль</p>
                    <input name='user_password' className={`register_input ${!passwordsMatch ? 'password-error' : ''}`} type="password" placeholder='Введите пароль' />
                  </label>

                  <p className='register_text_no_password'></p>

                  <div style={{textAlign: 'right'}}>
                    <p className='register_text_no_password'>Забыли пароль?</p>
                  </div>

                  {passwordsMatch ? null : (
                    <p className='register_text_no_password' style={{color: 'red'}}>Аккаунт не найден :(</p>
                  )}

                  <button className='register'>Войти</button>
                </form>
              </div>

              <div className="modal-body" id='get_first' style={{padding: '32px', display: isFirstEntered ? 'block' : 'none', position: 'relative', zIndex: '10000000'}}>
                <center>
                  <h2 className='register_title'>Регистрация</h2>
                  <p className='register_text'>Зарегистрируйтесь если вы тут впервые</p>

                  <img src={register_image} alt={register_image} />
                </center>

                  <button onClick={() => { setIsPhoneNumberEntered(true); setIsFirstEntered(false); }} className='register'>Регистрация</button>
                  <button onClick={() => { setIsLoginEntered(true); setIsFirstEntered(false); }} className='login'>Войти в существующий</button>
              </div>

              <div className="modal-body" id='get_success' style={{padding: '32px', display: isSuccesEntered ? 'block' : 'none', position: 'relative', zIndex: '10000000'}}>
                <center>
                  <h2 className='register_title'>Отлично!</h2>
                  <p className='register_text'>Вы вошли в свой личный кабинет</p>
                  <img src={verifed} alt="verifed" />
                </center>

                <button className='register' data-bs-dismiss="modal">Назад на главную</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderMain