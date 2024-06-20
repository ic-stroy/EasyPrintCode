import React, { useEffect, useState } from 'react'
import './main.css'
import authImage from '../../layouts/images/43.svg'
import {NavLink, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import CodeVerificationInput from '../../components/code verifed'
import Reveal from '../../animation'

function AuthPageMobile() {
  const token = localStorage.getItem('token');
  const [first, setFirst] = useState(true);
  const [register, setRegister] = useState(false);
  const [phone_confirm, setPhone_confirm] = useState(false);
  const [password, setPassword] = useState(false);
  const [login, setLogin] = useState(false);
  const [success_reg, setSuccess_reg] = useState(false);
  const [success_login, setSuccess_login] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [registrationData, setRegistrationData] = useState({
    name: '',
    password: '',
    passwordConfirmation: '',
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const navigate = useNavigate();

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
      .then(result => {setPhone_confirm(true); setRegister(false);})
      .catch(error => {toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!'); setPhone_confirm(false); setRegister(true);});
  }

  const handleOpenCodeVerification = (evt) => {
    evt.preventDefault();
  
    const { code_verify } = localStorage.getItem('phone_code_verify')
    // console.log(localStorage.getItem('phone_code_verify'));

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
      .then(result => {localStorage.setItem('token', result.data.token); setPassword(true); setPhone_confirm(false); localStorage.removeItem('phone_code_verify');})
      .catch(error => {toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!'); setPassword(false); setPhone_confirm(true)});
  };

  const handleAddPasword = (evt) => {
    evt.preventDefault();

    if (registrationData.password !== registrationData.passwordConfirmation) {
      setPasswordsMatch(false);
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("language", "uz");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
    myHeaders.append("Cookie", "laravel_session=y1Jx3e0YpgmZNhomT4H7G6IVj79Tj7OxleBR5Hl2");
  
    var formdata = new FormData();
    formdata.append("name", registrationData.name);
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
        // localStorage.setItem('user_name', result.data.user.first_name);
        // console.log(result);
        setPassword(false); navigate('/mobile');
      })
      .catch(error => {
        toast.error('Регистрация не была оформлена.');
        console.log(error);
        setSuccess_reg(false); setPassword(true)
      });
  };

  const handleSubmitLogin = (evt) => {
    evt.preventDefault();
  
    const { user_email, user_password } = evt.target.elements;

    const cleanedPhone = user_email.value.replace(/\D/g, '');
  
    fetch(`${process.env.REACT_APP_TWO}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: cleanedPhone,
        password: user_password.value.trim(),
      }),
    })
      .then(response => response.json())
      .then(result => {
        localStorage.setItem('token', result.data.token);
        setLogin(false); navigate('/mobile');
      })
      .catch(error => {toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!'); setSuccess_login(false); setLogin(true);});
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

  [].forEach.call(document.querySelectorAll('#user_email'), function (input) {
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

  return (
    <div style={{backgroundColor: '#FFFFFF', height: '100vh'}}>
      <div style={{backgroundColor: '#CCCCCC', position: 'absolute', top: 0, width: '100%'}}>
        <center style={{display: first ? 'block' : 'none', backgroundColor: '#FFFFFF', borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}} id='first'>
          <NavLink to={'/mobile'}>
            <svg style={{position: 'absolute', left: '20px', top: '50px'}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NavLink>

          <div style={{position: 'relative', top: '32px'}}>
            <Reveal>
              <h2 className='auth_title' style={{marginTop: '100px'}}>Регистрация</h2>
              <p className='auth_text'>Зарегистрируйтесь если вы тут впервые</p>
              <img style={{width: '360px', height: '360px'}} src={authImage} alt="authImage" />
              <div className="center flex-column">
                <button onClick={() => {setRegister(true); setFirst(false)}} style={{marginTop: '0'}} className='auth_button_reg'>Регистрация</button>
                <button onClick={() => {setLogin(true); setFirst(false)}} className='auth_button_log'>Войти в существующий</button>
              </div>
            </Reveal>
          </div>
        </center>
      </div>

      <div style={{backgroundColor: '#CCCCCC', position: 'absolute', top: 0, width: '100%'}}>
        <center style={{display: register ? 'block' : 'none', marginTop: '100px', backgroundColor: '#FFFFFF', borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}} id='register'>
          <div onClick={() => {setRegister(false); setFirst(true)}} style={{display: 'flex', width: '343px', marginTop: '32px', position: 'absolute', top: '10px', left: '18px', marginBottom: '-32px', justifyContent: 'flex-start'}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <Reveal>
            <form style={{position: 'relative', top: '32px'}} onSubmit={(evt) => { handleSubmitRegister(evt) }}>
              <h2 style={{width: '343px'}} className='auth_title'>Ведите номер телефона</h2>
              <p style={{width: '343px', textAlign: 'left'}} className='auth_text'>Мы отправим 6-значный СМС-код безопасности на ваш номер</p>
              <label style={{width: '343px', display: 'grid', marginTop: '64px'}}>
                <p className='register_in_text' style={{textAlign: 'left', marginLeft: '5px'}}>Номер телефона</p>
                {/* <input name='phone' id='phone' className='register_input' type="text" placeholder='Введите номер телефона' /> */}
                <input name='phone' id='phone' className='register_input' type="text" placeholder='Введите номер телефона' />
              </label>

              <button className='auth_button_reg' style={{marginTop: '280px', marginBottom: '74px'}}>Получить код</button>
            </form>
          </Reveal>
        </center>
      </div>

      <div style={{backgroundColor: '#CCCCCC', position: 'absolute', top: 0, width: '100%'}}>
        <center style={{display: phone_confirm ? 'block' : 'none', marginTop: '100px', backgroundColor: '#FFFFFF', borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}} id='phone_confirm'>
          <div onClick={() => {setPhone_confirm(false); setRegister(true)}} style={{display: 'flex', width: '343px', position: 'absolute', top: '10px', left: '18px', marginTop: '32px', marginBottom: '-32px', justifyContent: 'flex-start'}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <Reveal>
            <form style={{position: 'relative', top: '32px'}} onSubmit={(evt) => { handleOpenCodeVerification(evt) }}>
              <h2 style={{width: '343px', marginBottom: '48px'}} className='auth_title'>Введите код подтверждения</h2>
              <p style={{width: '343px', textAlign: 'left'}} className='auth_text'>Мы отправили 6-значный СМС-код безопасности на ваш номер</p>
              <div style={{width: '343px', display: 'grid', marginTop: '64px'}}>
                <p className='register_in_text' style={{textAlign: 'left', marginLeft: '5px'}}>Код подтверждения</p>
                <CodeVerificationInput length={6} name='phone' id='code_verify' />
              </div>

              <button className='auth_button_reg' style={{marginTop: '240px', marginBottom: '74px'}}>Подтвердить</button>
            </form>
          </Reveal>
        </center>
      </div>

      <div style={{backgroundColor: '#CCCCCC', position: 'absolute', top: 0, width: '100%'}}> 
        <center style={{display: password ? 'block' : 'none', marginTop: '73px', backgroundColor: '#FFFFFF', borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}} id='password'>
          <div onClick={() => {setPassword(false); setRegister(true)}} style={{display: 'flex', width: '343px', position: 'absolute', top: '10px', left: '18px', marginTop: '32px', marginBottom: '-32px', justifyContent: 'flex-start'}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <div style={{position: 'relative', top: '32px'}}>
            <Reveal>
              <h2 className='auth_title'>Регистрация</h2>
              <p className='auth_text' style={{marginTop: '-12px'}}>Введите свои данные</p>

              <form onSubmit={(evt) => { handleAddPasword(evt) }}>
                <label style={{width: '90%', display: 'grid'}}>
                  <p className='register_in_text' style={{textAlign: 'left', marginLeft: '5px'}}>Имя</p>
                  <input name='name' onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})} className='register_input' type="text" placeholder='Введите имя' />
                </label>

                <label style={{width: '90%', display: 'grid', marginTop: '16px'}}>
                  <p className='register_in_text' style={{textAlign: 'left', marginLeft: '5px'}}>Фамилия</p>
                  <input name='name' onChange={(e) => localStorage.setItem('user_last_name', e.target.value)} className='register_input' type="text" placeholder='Введите фамилию' />
                </label>

                <label style={{width: '90%', display: 'grid', marginTop: '16px'}}>
                  <p className='register_in_text' style={{textAlign: 'left', marginLeft: '5px'}}>Пароль</p>
                  <input name='password' onChange={(e) => setRegistrationData({...registrationData, password: e.target.value})} className='register_input' type="password" placeholder='Придумайте надёжный пароль' />
                </label>

                <label style={{width: '90%', display: 'grid', marginTop: '16px'}}>
                  <p className='register_in_text' style={{textAlign: 'left', marginLeft: '5px'}}>Подтвердите пароль</p>
                  <input name='passwordConfirmation' onChange={(e) => setRegistrationData({...registrationData,passwordConfirmation: e.target.value,})} className='register_input' type="password" placeholder='Подтвердите пароль' />
                </label>

                {passwordsMatch ? null : (
                  <p className='register_text_no_password' style={{color: 'red'}}>Пароли не совпадают</p>
                )}

                <div className="d-flex" style={{marginTop: '20px', marginLeft: '26px'}}>
                  <input style={{marginTop: '5px'}} type="checkbox" />
                  <p style={{marginLeft: '20px'}}>Я согласен с <span style={{color: '#829D50'}}>условиями пользования</span></p>
                </div>

                <button className='auth_button_reg' style={{marginTop: '26px', marginBottom: '120px'}}>Зарегистрироваться</button>
              </form>
            </Reveal>
          </div>
        </center>
      </div>

      <div style={{backgroundColor: '#CCCCCC', position: 'absolute', top: 0, width: '100%'}}>
        <center style={{display: login ? 'block' : 'none', marginTop: '100px', backgroundColor: '#FFFFFF', borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}} id='login'>
          <div onClick={() => {setLogin(false); setFirst(true)}} style={{display: 'flex', width: '343px', position: 'absolute', top: '10px', left: '18px', marginTop: '32px', marginBottom: '-32px', justifyContent: 'flex-start'}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <Reveal>
            <form style={{position: 'relative', top: '32px'}} onSubmit={handleSubmitLogin}>
              <h2 className='auth_title'>Авторизация</h2>
              <p className='auth_text'>Введите свои данные</p>
              <label style={{width: '90%', display: 'grid', marginTop: '64px'}}>
                <p className='register_in_text' style={{textAlign: 'left', marginLeft: '5px'}}>Номер телефона</p>
                {/* <input type="text" placeholder='' /> */}
                <input name='user_email' id='user_email' className={`register_input ${!passwordsMatch ? 'password-error' : ''}`} type="text" placeholder='Введите номер телефона' />
              </label>

              <label style={{width: '90%', display: 'grid', marginTop: '32px'}}>
                <p className='register_in_text' style={{textAlign: 'left', marginLeft: '5px'}}>Пароль</p>
                <input name='user_password' className={`register_input ${!passwordsMatch ? 'password-error' : ''}`} type="password" placeholder='Введите пароль' />
              </label>

              <div style={{display: 'flex', justifyContent: 'right', marginRight: '26px', marginTop: '20px'}}>
                <p>Забыли пароль?</p>
              </div>

              {passwordsMatch ? null : (
                <p className='register_text_no_password' style={{color: 'red'}}>Аккаунт не найден :(</p>
              )}

              <button className='auth_button_reg' style={{marginTop: '85px', marginBottom: '90px'}}>Войти</button>
            </form>
          </Reveal>
        </center>
      </div>
    </div>
  )
}

export default AuthPageMobile