import React, { useEffect, useState } from 'react'
import HeaderMainMobile from '../../components/header'
import FooterMainMobile from '../../components/footer'
import FooterBarMobile from '../../components/footer bar'
import ProfileHeader from '../../components/profile header'
import './main.css'
import { NavLink, useNavigate } from 'react-router-dom'
import no_image from '../../layouts/images/user.svg'
import { toast } from 'react-toastify'
import InputMask from 'react-input-mask';
import Reveal from '../../animation'
import axios from 'axios'

function ProfileMobile() {
  const token = localStorage.getItem('token');
  const [isActive, setIsActive] = useState(false);
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    birthDate: '',
    lastName: '',
    email: '',
    gender: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const toggleActive = (itemIndex) => {
    setIsActive(itemIndex);
  };

  const user_name = localStorage.getItem('user_name');
  const user_last_name = localStorage.getItem('user_last_name');
  const user_image = localStorage.getItem('user_image');

  useEffect(() => {
    const updateActiveTab = () => {
      const path = window.location.hash;

      if (path === '#/mobile/profile') {
        setIsActive(0);
      } else if (path === '#/mobile/profile/addres') {
        setIsActive(1);
      } else if (path === '#/mobile/profile/checkout') {
        setIsActive(2);
      } else if (path === '#/mobile/profile/payment') {
        setIsActive(3);
      }
    };

    updateActiveTab();
  }, []);

  const handleLogout = () => {
    toast.success('Выход из вашей учетной записи успешно завершен!');
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user_image');
      localStorage.removeItem('user_phone_number');
      localStorage.removeItem('user_last_name');
      localStorage.setItem('counterValue', '0');
      localStorage.removeItem('user_name');
      navigate('/mobile');
    }, 1000);
  };

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
        localStorage.setItem('user_phone_number', responseData.phone_number);
        localStorage.setItem('user_last_name', responseData.last_name);
        setUserName(responseData.first_name);
        setUserLastName(responseData.last_name);
      })
      .catch((error) => {
        toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
      });
  }, [token]);

  const handleUpdateBackend = () => {
    var myHeaders = new Headers();
    myHeaders.append("language", `${localStorage.getItem('selectedLanguage')}`);
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("first_name", formData.name === null || formData.name === '' === 'null' ? '' : formData.name);
    formdata.append("last_name", formData.lastName === null || formData.lastName === 'null' || formData.lastName === '' ? '' : formData.lastName);
    formdata.append("phone_number", formData.phoneNumber === null || formData.phoneNumber === 'null' || formData.phoneNumber === '' ? '' : formData.phoneNumber);
    formdata.append("gender", formData.gender === null || formData.gender === 'null' || formData.gender === '' ? '' : formData.gender);
    formdata.append("email", formData.email === null || formData.email === 'null' || formData.email === '' ? '' : formData.email);
    formdata.append("birth_date", formData.birthDate === null || formData.birthDate === 'null' || formData.birthDate === '' ? '' : formData.birthDate);

    if (formData.img instanceof Blob) {
      formdata.append("image", formData.img);
    }

    localStorage.setItem('user_name', formData.name);
    localStorage.setItem('user_image', formData.image);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

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
  //     navigate('/mobile/auth');
  //   }
  // }, []);

  return (
    <div>
      <HeaderMainMobile />
      <center>
        <div className='profile_page'>
          <div>
            <div style={{textDecoration: 'none'}} className="d-flex">
              <Reveal>
                <label>
                  <input type="file" style={{ display: 'none' }} onChange={handleImageChange} accept="image/*" />
                  <div style={{backgroundImage: `url(${formData.imageUrl ? formData.imageUrl : no_image})`, borderRadius: '50%', backgroundSize: 'cover'}} className='user_image'>
                    <svg style={{position: 'relative', left: '20px', top: '30px'}} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="1" width="20" height="20" rx="10" fill="#829D50"/>
                      <rect x="1" y="1" width="20" height="20" rx="10" stroke="white"/>
                      <g clip-path="url(#clip0_3382_6805)">
                      <path d="M14 9.99991L12 7.99991M6.25 15.7499L7.94218 15.5619C8.14893 15.5389 8.2523 15.5274 8.34892 15.4961C8.43465 15.4684 8.51622 15.4292 8.59144 15.3796C8.67623 15.3237 8.74977 15.2501 8.89686 15.103L15.5 8.49991C16.0523 7.94762 16.0523 7.05219 15.5 6.49991C14.9477 5.94762 14.0523 5.94762 13.5 6.49991L6.89686 13.103C6.74977 13.2501 6.67623 13.3237 6.62032 13.4085C6.57072 13.4837 6.53151 13.5653 6.50376 13.651C6.47248 13.7476 6.46099 13.851 6.43802 14.0577L6.25 15.7499Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_3382_6805">
                      <rect width="12" height="12" fill="white" transform="translate(5 5)"/>
                      </clipPath>
                      </defs>
                    </svg>
                  </div>
                </label>
              </Reveal>

              <Reveal>
                <h3 className='user_name_mobile'>{userName ? `${userName} ${userLastName === null || userLastName === 'null' ? '' : userLastName}` : 'Без имени фамилия'}</h3>
              </Reveal>
            </div>

            <div style={{marginLeft: '16px'}}>
              <Reveal>
                <NavLink to={'/mobile/profile'} onClick={() => toggleActive(0)} className={`d-flex profile_item ${isActive == 0 ? 'active' : ''}`} style={{marginTop: '29px', textDecoration: 'none'}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                    <g clipPath="url(#clip0_654_2396)">
                      <path d="M17.5 20.0003H15.8333V15.7978C15.8327 15.1445 15.5728 14.5181 15.1109 14.0561C14.6489 13.5942 14.0225 13.3343 13.3692 13.3337H6.63083C5.9775 13.3343 5.35111 13.5942 4.88914 14.0561C4.42716 14.5181 4.16733 15.1445 4.16667 15.7978V20.0003H2.5V15.7978C2.50132 14.7027 2.93696 13.6527 3.71135 12.8783C4.48575 12.104 5.53567 11.6683 6.63083 11.667H13.3692C14.4643 11.6683 15.5143 12.104 16.2886 12.8783C17.063 13.6527 17.4987 14.7027 17.5 15.7978V20.0003Z" fill={isActive === 0 ? '#18356D' : '#666666'}  />
                      <path d="M10 10C9.0111 10 8.0444 9.70676 7.22215 9.15735C6.39991 8.60794 5.75904 7.82705 5.3806 6.91342C5.00217 5.99979 4.90315 4.99446 5.09608 4.02455C5.289 3.05465 5.76521 2.16373 6.46447 1.46447C7.16373 0.765206 8.05465 0.289002 9.02455 0.0960758C9.99446 -0.0968503 10.9998 0.00216643 11.9134 0.380605C12.827 0.759043 13.6079 1.39991 14.1573 2.22215C14.7068 3.0444 15 4.0111 15 5C14.9987 6.32568 14.4715 7.59668 13.5341 8.53407C12.5967 9.47147 11.3257 9.99868 10 10ZM10 1.66667C9.34073 1.66667 8.69627 1.86217 8.1481 2.22844C7.59994 2.59471 7.1727 3.1153 6.9204 3.72439C6.66811 4.33348 6.6021 5.0037 6.73072 5.6503C6.85934 6.29691 7.1768 6.89085 7.64298 7.35703C8.10915 7.8232 8.7031 8.14067 9.3497 8.26929C9.9963 8.3979 10.6665 8.33189 11.2756 8.0796C11.8847 7.82731 12.4053 7.40007 12.7716 6.8519C13.1378 6.30374 13.3333 5.65927 13.3333 5C13.3333 4.11595 12.9821 3.2681 12.357 2.64298C11.7319 2.01786 10.8841 1.66667 10 1.66667Z" fill={isActive === 0 ? '#18356D' : '#666666'}  />
                    </g>
                    <defs>
                      <clipPath id="clip0_654_2396">
                        <rect width={20} height={20} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <p className={isActive === 0 ? 'profile_header_text_active' : 'profile_header_text'}>Личная информация</p>
                </NavLink>
              </Reveal>

              <Reveal>
                <NavLink to={'/mobile/profile/addres'} onClick={() => toggleActive(1)} className={`d-flex profile_item ${isActive == 1 ? 'active' : ''}`} style={{marginTop: '20px', textDecoration: 'none'}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                    <g clipPath="url(#clip0_654_2400)">
                      <path d="M9.96402 20.0068L9.38312 19.5088C8.5823 18.8383 1.58984 12.7993 1.58984 8.38199C1.58984 3.75707 5.3391 0.0078125 9.96402 0.0078125C14.5889 0.0078125 18.3382 3.75707 18.3382 8.38199C18.3382 12.7994 11.3457 18.8383 10.5482 19.5121L9.96402 20.0068ZM9.96402 1.81855C6.34086 1.82266 3.40473 4.75879 3.40062 8.38195C3.40062 11.157 7.70266 15.5902 9.96402 17.6192C12.2254 15.5893 16.5274 11.1537 16.5274 8.38195C16.5233 4.75879 13.5872 1.8227 9.96402 1.81855Z" fill={isActive === 1 ? '#18356D' : '#666666'}  />
                      <path d="M9.96398 11.7014C8.1307 11.7014 6.64453 10.2152 6.64453 8.38195C6.64453 6.54867 8.1307 5.0625 9.96398 5.0625C11.7973 5.0625 13.2834 6.54867 13.2834 8.38195C13.2834 10.2152 11.7973 11.7014 9.96398 11.7014ZM9.96398 6.72219C9.04734 6.72219 8.30426 7.46527 8.30426 8.38191C8.30426 9.29855 9.04734 10.0416 9.96398 10.0416C10.8806 10.0416 11.6237 9.29855 11.6237 8.38191C11.6237 7.46527 10.8807 6.72219 9.96398 6.72219Z" fill={isActive === 1 ? '#18356D' : '#666666'}  />
                    </g>
                    <defs>
                      <clipPath id="clip0_654_2400">
                        <rect width={20} height={20} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <p className={isActive === 1 ? 'profile_header_text_active' : 'profile_header_text'}>Мои адреса</p>
                </NavLink>
              </Reveal>

              <Reveal>
                <NavLink to={'/mobile/profile/checkout'} onClick={() => toggleActive(2)} className={`d-flex profile_item ${isActive == 2 ? 'active' : ''}`} style={{marginTop: '20px', textDecoration: 'none'}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                    <g clipPath="url(#clip0_654_2393)">
                      <path d="M3.33399 5.00045C3.00545 5.00131 2.68 4.93702 2.37647 4.81129C2.07294 4.68556 1.79735 4.50088 1.56565 4.26795L0.278986 3.12295C0.113889 2.97576 0.0140269 2.76901 0.00136818 2.54818C-0.0112905 2.32736 0.0642913 2.11055 0.211486 1.94545C0.358682 1.78036 0.565433 1.68049 0.786257 1.66783C1.00708 1.65518 1.22389 1.73076 1.38899 1.87795L2.70982 3.05629C2.78543 3.1412 2.87762 3.20974 2.98072 3.25769C3.08381 3.30565 3.19563 3.33199 3.30928 3.33512C3.42294 3.33824 3.53604 3.31807 3.64161 3.27585C3.74718 3.23363 3.84299 3.17025 3.92315 3.08962L6.92649 0.230453C7.08798 0.0866778 7.29904 0.0113017 7.51507 0.0202451C7.73111 0.0291884 7.93521 0.121751 8.08427 0.278382C8.23333 0.435013 8.31567 0.643448 8.31391 0.859662C8.31215 1.07588 8.22641 1.28294 8.07482 1.43712L5.08399 4.28212C4.8538 4.51097 4.58076 4.6922 4.28048 4.81546C3.9802 4.93871 3.65857 5.00158 3.33399 5.00045ZM20.0007 3.33379C20.0007 3.11277 19.9129 2.90081 19.7566 2.74453C19.6003 2.58825 19.3883 2.50045 19.1673 2.50045H10.834C10.613 2.50045 10.401 2.58825 10.2447 2.74453C10.0885 2.90081 10.0007 3.11277 10.0007 3.33379C10.0007 3.5548 10.0885 3.76676 10.2447 3.92304C10.401 4.07932 10.613 4.16712 10.834 4.16712H19.1673C19.3883 4.16712 19.6003 4.07932 19.7566 3.92304C19.9129 3.76676 20.0007 3.5548 20.0007 3.33379ZM5.08399 10.9488L8.07482 8.10379C8.1583 8.02947 8.22597 7.93912 8.27382 7.83811C8.32166 7.73711 8.3487 7.62751 8.35332 7.51584C8.35794 7.40417 8.34006 7.29272 8.30072 7.1881C8.26139 7.08349 8.20142 6.98785 8.12437 6.90689C8.04732 6.82593 7.95477 6.76129 7.85223 6.71683C7.74969 6.67236 7.63926 6.64898 7.5275 6.64807C7.41574 6.64716 7.30494 6.66874 7.20168 6.71152C7.09843 6.75431 7.00485 6.81743 6.92649 6.89712L3.92649 9.75629C3.76785 9.90798 3.55681 9.99264 3.33732 9.99264C3.11783 9.99264 2.90679 9.90798 2.74815 9.75629L1.42315 8.43545C1.26598 8.28365 1.05548 8.19966 0.836985 8.20156C0.618488 8.20346 0.409478 8.2911 0.254971 8.4456C0.100464 8.60011 0.0128234 8.80912 0.0109247 9.02762C0.00902603 9.24612 0.0930214 9.45662 0.24482 9.61379L1.56565 10.9346C2.03205 11.4011 2.66392 11.6644 3.32357 11.667C3.98322 11.6697 4.61719 11.4115 5.08732 10.9488H5.08399ZM20.0007 10.0005C20.0007 9.77944 19.9129 9.56748 19.7566 9.4112C19.6003 9.25492 19.3883 9.16712 19.1673 9.16712H10.834C10.613 9.16712 10.401 9.25492 10.2447 9.4112C10.0885 9.56748 10.0007 9.77944 10.0007 10.0005C10.0007 10.2215 10.0885 10.4334 10.2447 10.5897C10.401 10.746 10.613 10.8338 10.834 10.8338H19.1673C19.3883 10.8338 19.6003 10.746 19.7566 10.5897C19.9129 10.4334 20.0007 10.2215 20.0007 10.0005ZM5.08399 17.6155L8.07149 14.7705C8.15496 14.6961 8.22264 14.6058 8.27048 14.5048C8.31833 14.4038 8.34537 14.2942 8.34999 14.1825C8.35461 14.0708 8.33672 13.9594 8.29739 13.8548C8.25806 13.7502 8.19808 13.6545 8.12103 13.5736C8.04399 13.4926 7.95144 13.428 7.8489 13.3835C7.74636 13.339 7.63593 13.3156 7.52417 13.3147C7.4124 13.3138 7.3016 13.3354 7.19835 13.3782C7.0951 13.421 7.00151 13.4841 6.92315 13.5638L3.92315 16.423C3.84299 16.5036 3.74718 16.567 3.64161 16.6092C3.53604 16.6514 3.42294 16.6716 3.30928 16.6685C3.19563 16.6653 3.08381 16.639 2.98072 16.591C2.87762 16.5431 2.78543 16.4745 2.70982 16.3896L1.38899 15.2113C1.22389 15.0641 1.00708 14.9885 0.786257 15.0012C0.565433 15.0138 0.358682 15.1137 0.211486 15.2788C0.0642913 15.4439 -0.0112905 15.6607 0.00136818 15.8815C0.0140269 16.1023 0.113889 16.3091 0.278986 16.4563L1.56565 17.6013C2.03205 18.0678 2.66392 18.3311 3.32357 18.3337C3.98322 18.3364 4.61719 18.0782 5.08732 17.6155H5.08399ZM20.0007 16.6671C20.0007 16.4461 19.9129 16.2341 19.7566 16.0779C19.6003 15.9216 19.3883 15.8338 19.1673 15.8338H10.834C10.613 15.8338 10.401 15.9216 10.2447 16.0779C10.0885 16.2341 10.0007 16.4461 10.0007 16.6671C10.0007 16.8881 10.0885 17.1001 10.2447 17.2564C10.401 17.4127 10.613 17.5005 10.834 17.5005H19.1673C19.3883 17.5005 19.6003 17.4127 19.7566 17.2564C19.9129 17.1001 20.0007 16.8881 20.0007 16.6671Z" fill={isActive === 2 ? '#18356D' : '#666666'} />
                    </g>
                    <defs>
                      <clipPath id="clip0_654_2393">
                        <rect width={20} height={20} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <p className={isActive === 2 ? 'profile_header_text_active' : 'profile_header_text'}>Мои заказы</p>
                </NavLink>
              </Reveal>

              <Reveal>
                <div className={`d-flex profile_item`} style={{marginTop: '20px', textDecoration: 'none'}} onClick={handleLogout}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M16 17.0003L21 12.0003M21 12.0003L16 7.00031M21 12.0003H9M12 17.0003C12 17.2959 12 17.4437 11.989 17.5717C11.8748 18.9023 10.8949 19.9972 9.58503 20.2576C9.45903 20.2826 9.31202 20.299 9.01835 20.3316L7.99694 20.4451C6.46248 20.6156 5.69521 20.7008 5.08566 20.5058C4.27293 20.2457 3.60942 19.6518 3.26118 18.8728C3 18.2885 3 17.5165 3 15.9726V8.028C3 6.48407 3 5.71211 3.26118 5.12783C3.60942 4.34879 4.27293 3.75491 5.08566 3.49483C5.69521 3.29978 6.46246 3.38502 7.99694 3.55552L9.01835 3.66901C9.31212 3.70165 9.45901 3.71797 9.58503 3.74303C10.8949 4.00346 11.8748 5.09835 11.989 6.42891C12 6.55694 12 6.70473 12 7.00031" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                  <p className={'profile_header_text'}>Выйти</p>
                </div>
              </Reveal>
            </div>
          </div>

          <div style={{textAlign: 'left'}}>
            <Reveal>
              <h3 className='profile_page_title'>Личная информация</h3>
            </Reveal>

            <form onSubmit={(e) => { handleSubmit(e); handleUpdateBackend();}}>
              <Reveal>
                <input style={{width: '100%'}} type="text" className='input_profile' placeholder='Имя' name="name" value={formData.name} onChange={handleChange} />
              </Reveal>

              <Reveal>
                <input style={{width: '100%'}} type="text" className='input_profile' placeholder='Фамилия' name="lastName" value={formData.lastName} onChange={handleChange} />
              </Reveal>

              <Reveal>
                <InputMask style={{width: '100%'}} mask='99-99-9999' placeholder="Дата рождения" className='input_profile' value={formData.birthDate} name="birthDate" onChange={handleChange}></InputMask>
              </Reveal>

              <Reveal>
                <InputMask  style={{width: '100%'}} mask='+999 (99) 999-99-99' placeholder="Номер телефона" className='input_profile' value={formData.phoneNumber} name="phoneNumber" onChange={handleChange}></InputMask>
              </Reveal>

              <Reveal>
                <input style={{width: '100%'}} type="mail" className='input_profile' placeholder='E-mail' name='email' value={formData.email !== null ? formData.email : ''} onChange={handleChange} />
              </Reveal>

              <Reveal>
                <select style={{width: '100%', height: '45px', color: 'black'}} name="gender" className='input_profile' value={formData.gender} onChange={handleChange}>
                  <option disabled hidden value="">Пол</option>
                  <option value="1" selected={formData.gender === 1}>Мужской</option>
                  <option value="2" selected={formData.gender === 2}>Женский</option>
                </select>
              </Reveal>

              <Reveal>
                <button style={{width: '100%'}} type="submit" className='btn_profile mb-3'>Сохранить</button>
              </Reveal>
            </form>
          </div>
        </div>
      </center>
      
      <FooterMainMobile />
      <FooterBarMobile />
    </div>
  )
}

export default ProfileMobile