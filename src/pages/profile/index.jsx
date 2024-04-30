import React, { useEffect, useState } from 'react'
import HeaderMain from '../../components/header'
import AdvantageMain from '../../components/advantage'
import FooterMain from '../../components/footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './main.css';
import ProfileHeader from '../../components/profile_header';
import no_image from '../../layouts/images/user.svg';
import edit_image from '../../layouts/icons/edit_iamge.svg';
import axios from 'axios';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import Reveal from '../../animation';
import ReactInputDateMask from 'react-input-date-mask';

function Profile() {
  const [trashCardData, setTrashCardData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    birthDate: '',
    lastName: '',
    email: '',
    gender: ''
  });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Личная информация'
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // localStorage.setItem('formData', JSON.stringify(formData));
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_TWO}/personal-information`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          language: localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
        },
      })
      .then((response) => {
        const responseData = response.data.data;
  
        setFormData({
          name: responseData.first_name,
          lastName: responseData.last_name,
          phoneNumber: responseData.phone_number,
          gender: responseData.gender,
          birthDate: responseData.birth_date,
          imageUrl: responseData.image,
          email: responseData.email,
        });

        localStorage.setItem('user_image', responseData.image);
        console.log(response);
        localStorage.setItem('user_phone_number', responseData.phone_number);
        localStorage.setItem('user_last_name', responseData.last_name);
        localStorage.setItem('user_name', responseData.first_name);
      })
      .catch((error) => {
        toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
      });
  }, [token]);

  const handleUpdateBackend = () => {
    var formdata = new FormData();
    formdata.append("first_name", formData.name || formData.name === null || formData.name || formData.name === '' === 'null' ? '' : formData.name);
    formdata.append("last_name", formData.lastName || formData.lastName === null || formData.lastName === 'null' || formData.lastName === '' ? '' : formData.lastName);
    formdata.append("phone_number", formData.phoneNumber || formData.phoneNumber === null || formData.phoneNumber === 'null' || formData.phoneNumber === '' ? '' : formData.phoneNumber);
    formdata.append("gender", formData.gender || formData.gender === null || formData.gender === 'null' || formData.gender === '' ? '' : formData.gender);
    formdata.append("email", formData.email || formData.email === null || formData.email === 'null' || formData.email === '' ? '' : formData.email);
    formdata.append("birth_date", formData.birthDate || formData.birthDate === null || formData.birthDate === 'null' || formData.birthDate === '' ? '' : formData.birthDate);

    if (formData.img instanceof Blob) {
      formdata.append("image", formData.img);
    }

    // console.log("first_name", formData.name ? formData.name : '');
    // console.log("last_name", formData.lastName ? formData.lastName : '');
    // console.log("phone_number", formData.phoneNumber ? formData.phoneNumber : '');
    // console.log("gender", formData.gender ? formData.gender : 1);
    // console.log("email", formData.email ? formData.email : '');
    // console.log("birth_date", formData.birthDate ? formData.birthDate : '');
    // console.log(formdata.append("image", formData.img));

    localStorage.setItem('user_name', formData.name);
    localStorage.setItem('user_image', formData.image);

    axios.post(`${process.env.REACT_APP_TWO}/personal-information`, formdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          lang: localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
        },
      }
    )
    .then((response) => {
      if (response.data.status === true) {
        window.location.reload();
      }
    })
    .catch((error) => {
      console.log('error:', error);
    });
  };  

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
  
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
  
      setFormData((prevFormData) => ({
        ...prevFormData,
        img: imageFile,
        imageUrl: imageUrl,
      }));
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const path = window.location.pathname;
  
  //   if (!token && (path.startsWith('/profile') || path === '/profile/addres' || path === '/profile/checkout' || path === '/profile/payment')) {
  //     navigate('/');
  //   } else if (!token && (path.startsWith('/mobile/profile') || path === '/mobile/profile/addres' || path === '/mobile/profile/checkout' || path === '/mobile/checkout')) {
  //     navigate('/mobile/auth');
  //   } else if (path.startsWith('/checkout')) {
  //     navigate('/');
  //   } else {
  //     navigate('/');
  //   }
  // }, []);

  return (
    <>
      <HeaderMain trashCardData={trashCardData} />

      <div className="container mt-5 center">
        <div className="d-flex align-items-center justify-content-between" style={{width: '1200px'}}>
          <ProfileHeader />

          <div className='info_profile'>
            <h3 className='user_name'>Личная информация</h3>

            <Reveal>
              <div className="d-flex" v-if="data != undefined">
                <img style={{ width: '100px', height: '100px', borderRadius: '50%', }} src={formData.imageUrl ? formData.imageUrl : no_image} alt={formData.name ? `${formData.name} ${formData.lastName}` : 'no_image'} />
                {/* <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundImage: formData.imageUrl ? formData.imageUrl : no_image, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}></div> */}

                <label>
                  <input type="file" style={{ display: 'none' }} onChange={handleImageChange} accept="image/*" />
                  <img style={{ marginLeft: '34px', cursor: 'pointer', marginTop: '40px' }} src={edit_image} alt="edit_image" />
                </label>
              </div>
            </Reveal>

            <form onSubmit={(e) => { handleSubmit(e); handleUpdateBackend();}}>
              <div className="d-flex">
                <div>
                  <Reveal>
                    <input type="text" className='input_profile' placeholder='Имя' name="name" value={formData.name} onChange={handleChange} />
                  </Reveal>

                  <Reveal>
                    <InputMask mask='99.99.9999' placeholder="Дата рождения" className='input_profile' value={formData.birthDate} name="birthDate" onChange={handleChange}></InputMask>
                    {/* <ReactInputDateMask  mask='dd/mm/yyyy' className='input_profile' value={formData.birthDate} name="birthDate" onChange={handleChange} /> */}
                  </Reveal>

                  <Reveal>
                    <InputMask mask='+999 (99) 999-99-99' placeholder="Номер телефона" className='input_profile' value={formData.phoneNumber} name="phoneNumber" onChange={handleChange}></InputMask>
                  </Reveal>
                </div>

                <div>
                  <Reveal>
                    <input type="text" className='input_profile' placeholder='Фамилия' name="lastName" value={formData.lastName} onChange={handleChange} />
                  </Reveal>

                  <Reveal>
                    <select name="gender" className='input_profile' value={formData.gender} onChange={handleChange}>
                      <option disabled hidden value="">Пол</option>
                      <option value="1" selected={formData.gender === 1}>Мужской</option>
                      <option value="2" selected={formData.gender === 2}>Женский</option>
                    </select>
                  </Reveal>

                  <Reveal>
                    <input type="mail" className='input_profile' placeholder='E-mail' name='email' value={formData.email !== null ? formData.email : ''} onChange={handleChange} />
                  </Reveal>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '138px' }}>
                <Reveal>
                  <button type="submit" className='btn_profile'>Изменить</button>
                </Reveal>
              </div>
            </form>
          </div>
        </div>
      </div>

      <AdvantageMain />
      <FooterMain />
    </>
  );
}

export default Profile