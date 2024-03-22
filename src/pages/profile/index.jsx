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
    // var myHeaders = new Headers();
    // myHeaders.append("language", `${localStorage.getItem('selectedLanguage')}`);
    // myHeaders.append("Accept", "application/json");
    // myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("first_name", formData.name ? formData.name : '');
    formdata.append("last_name", formData.lastName ? formData.lastName : '');
    formdata.append("phone_number", formData.phoneNumber ? formData.phoneNumber : '');
    formdata.append("gender", formData.gender ? formData.gender : 1);
    formdata.append("email", formData.email ? formData.email : '');
    formdata.append("birth_date", formData.birthDate ? formData.birthDate : '');

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

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: formdata,
    //   redirect: 'follow',
    // };

    // console.log(formData);

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

  return (
    <>
      <HeaderMain trashCardData={trashCardData} />

      <div className="container center" style={{marginTop: '120px'}}>
        <div className="d-flex align-items-center justify-content-between" style={{width: '1200px'}}>
          <ProfileHeader />

          <div className='info_profile'>
            <h3 className='user_name'>Личная информация</h3>

            <div className="d-flex" v-if="data != undefined">
              <img
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                }}
                src={formData.imageUrl ? formData.imageUrl : no_image}
                alt={formData.name ? `${formData.name} ${formData.lastName}` : 'no_image'}
              />

              <label>
                <input type="file" style={{ display: 'none' }} onChange={handleImageChange} accept="image/*" />
                <img style={{ marginLeft: '34px', cursor: 'pointer', marginTop: '40px' }} src={edit_image} alt="edit_image" />
              </label>
            </div>

            <form onSubmit={(e) => { handleSubmit(e); handleUpdateBackend();}}>
              <div className="d-flex">
                <div>
                  <input type="text" className='input_profile' placeholder='Имя' name="name" value={formData.name} onChange={handleChange} />
                  <InputMask mask='99.99.9999' placeholder="Дата рождения" className='input_profile' value={formData.birthDate} name="birthDate" onChange={handleChange}></InputMask>
                  <InputMask mask='+999 (99) 999-99-99' placeholder="Номер телефона" className='input_profile' value={formData.phoneNumber} name="phoneNumber" onChange={handleChange}></InputMask>
                </div>

                <div>
                  <input type="text" className='input_profile' placeholder='Фамилия' name="lastName" value={formData.lastName} onChange={handleChange} />
                  <select name="gender" className='input_profile' value={formData.gender} onChange={handleChange}>
                    <option disabled hidden value="">Пол</option>
                    <option value="1" selected={formData.gender === 1}>Мужской</option>
                    <option value="2" selected={formData.gender === 2}>Женский</option>
                  </select>
                  <input type="mail" className='input_profile' placeholder='E-mail' name='email' value={formData.email !== null ? formData.email : ''} onChange={handleChange} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '138px' }}>
                <button type="submit" className='btn_profile'>Изменить</button>
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