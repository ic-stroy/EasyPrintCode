import React, { useEffect, useLayoutEffect, useState } from 'react'
import HeaderMain from '../../../components/header'
import AdvantageMain from '../../../components/advantage'
import FooterMain from '../../../components/footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../main.css';
import ProfileHeader from '../../../components/profile_header';
import no_addres from '../../../layouts/images/address.svg';
import delete_addres from '../../../layouts/icons/delete_addres.svg';
import axios from 'axios';

function ProfileAddres() {
  const [trashCardData, setTrashCardData] = useState([]);
  const [cities, setCities] = useState([]);
  const [editAddressId, setEditAddressId] = useState(null);
  const [formData, setFormData] = useState({
    city_id: '',
    name: '',
    postcode: '',
    city_id: '',
    region: '',
  });
  const [formErrors, setFormErrors] = useState({
    region: false,
    city_id: false,
    name: false,
    postcode: false,
  });
  const [data, setData] = useState([]);
  const [dataGet, setDataGet] = useState([]);
  const [dataGetEdit, setDataEdit] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    document.title = 'Мои адреса'
  }, []);

  const handleEditAddress = (id) => {
    setEditAddressId(id);
  
    const selectedAddress = dataGet.data.find((address) => address.id === id);
    if (selectedAddress) {
      const selectedRegionData = data.find((region) => region.region === selectedAddress.region.name);
      if (selectedRegionData) {
        setCities(selectedRegionData.cities || []);
      } else {
        console.log('No selectedRegionData found');
      }
  
      setFormData({
        id: selectedAddress.id,
        city_id: selectedAddress.city.id,
        name: selectedAddress.name,
        postcode: selectedAddress.postcode,
        region: selectedAddress.region.name,
      });
    }

    if (id) {
      const selectedAddress = dataGet.data.find((address) => address.id === editAddressId);
      if (selectedAddress) {
        setFormData({
          id: selectedAddress.id,
          city_id: selectedAddress.city_id,
          name: selectedAddress.name,
          postcode: selectedAddress.postcode,
        });

        const selectedRegion = data.find((region) => {
          const selectedCity = region.cities.find((city) => city.id === selectedAddress.city_id);
          return selectedCity ? region.region === selectedCity.region : false;
        });

        if (selectedRegion) {
          setCities(selectedRegion.cities);
        }
      }
    } else {
      const initialRegion = data[0];
      if (initialRegion) {
        setFormData({
          city_id: initialRegion.cities[0]?.id,
          name: '',
          postcode: '',
        });
        setCities(initialRegion.cities);
      }
    }

    setDataEdit(selectedAddress);

    console.log(
      data.map((region) => (
        region
      ))
    );

    console.log(formData);
    console.log(dataGetEdit);
  };

  const handleCloseModal = () => {
    setFormData({
      city_id: '',
      name: '',
      postcode: '',
    });
    setEditAddressId(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  const handleChange = (e) => {
    const selectedRegion = e.target.value;
    setFormData({ ...formData, [e.target.name]: selectedRegion });

    const selectedRegionData = data.find((region) => region.region === selectedRegion);

    if (selectedRegionData) {
      const selectedCities = selectedRegionData.cities || [];
      setCities(selectedCities);
    }

    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.region === '' || formData.city_id === '' || formData.name === '' || formData.postcode === '') {
      toast.warning('Обязательно заполните все детали. Пожалуйста, проверьте все и отправьте повторно. Или обновите страницу еще раз и повторите попытку.');
      return;
    }

    const apiUrl = editAddressId ? `${process.env.REACT_APP_TWO}/set-address` : `${process.env.REACT_APP_TWO}/set-address`;

    axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((response) => {
        toast.success('Malumotlar saqlandi!');
        handleCloseModal();
        window.location.reload();
      })
      .catch((error) => {
        toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
      });
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const apiUrl = editAddressId ? `${process.env.REACT_APP_TWO}/edit-address` : `${process.env.REACT_APP_TWO}/edit-address`;

    axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((response) => {
        toast.success('Malumotlar saqlandi!');
        handleCloseModal();
        window.location.reload();
      })
      .catch((error) => {
        toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
      });
  };

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('userLocation'));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_TWO}/get-districts`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
        },
      })
      .then((response) => {
        setData(response.data.data);
        const initialRegion = response.data.data[0];
        setFormData({
          city_id: initialRegion.cities[0]?.id,
          name: '',
          postcode: ''
        });
        setCities(initialRegion.cities);
      })
      .catch((error) => {
        // toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
      });
  }, [token]);
  
  useEffect(() => {
    if (formData.region) {
      const selectedRegionData = data.find((region) => region.region === formData.region);
      const selectedCities = selectedRegionData ? selectedRegionData.cities : [];
      setCities(selectedCities);
    }
  }, [formData.region, data]);  

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/get-address`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
      }
    }).then((response) => {
      setDataGet(response.data);
    }).catch((error) => {
      // toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    });    
  }, []);

  const handleDeleteAddress = (id) => {
    axios
      .delete(`${process.env.REACT_APP_TWO}/destroy-address?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((response) => {
        toast.success('Адрес успешно удален!');
        window.location.reload();
      })
      .catch((error) => {
        toast.error('Ошибка при удалении адреса.');
      });
  };

  // useEffect(() => {
    
  // }, [editAddressId, data, dataGet.data]);

  return (
    <>
      <HeaderMain trashCardData={trashCardData} />
      <ToastContainer />

      <div className="container center" style={{marginTop: '120px'}}>
        <div className="d-flex justify-content-between" style={{width: '1200px'}}>
          <ProfileHeader />

          <div className='info_profile'>
            <h3 className='user_name'>Мои адреса</h3>

            <div>
              <div style={{height: '384px', overflow: 'scroll'}}>
                {dataGet.status === true ? dataGet.data.map((data2) => {
                  return (
                    <div className='user_address mb-3' key={data2.id}>
                      <div>
                        {data2.name}, {data2.region.name}, {data2.city.name}, {data2.postcode}
                      </div>
                      
                      <div>
                        <button onClick={() => handleEditAddress(data2.id)} style={{backgroundColor: 'transparent', border: 'none'}} data-bs-toggle="modal" data-bs-target="#exampleModal">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M18.205 1.79505C17.6951 1.28594 17.004 1 16.2835 1C15.5629 1 14.8718 1.28594 14.362 1.79505L1 15.157V19H4.84299L18.205 5.63803C18.7139 5.12805 18.9997 4.43701 18.9997 3.71654C18.9997 2.99607 18.7139 2.30503 18.205 1.79505ZM4.22499 17.5H2.5V15.775L12.4825 5.80003L14.2075 7.52503L4.22499 17.5ZM17.1445 4.57754L15.2642 6.45778L13.543 4.73279L15.4225 2.85554C15.6512 2.62679 15.9615 2.49828 16.285 2.49828C16.6085 2.49828 16.9187 2.62679 17.1475 2.85554C17.3762 3.08429 17.5047 3.39454 17.5047 3.71804C17.5047 4.04154 17.3762 4.35179 17.1475 4.58054L17.1445 4.57754Z" fill="#6396FC"/>
                          </svg>
                        </button>
                        
                        <button onClick={() => handleDeleteAddress(data2.id)} style={{backgroundColor: 'transparent', border: 'none'}}>
                          <img src={delete_addres} alt="delete_addres" />
                        </button>
                      </div>
                    </div>
                  );
                }) : (
                  <center style={{marginTop: '56px'}}>
                    <img src={no_addres} alt="no_addres" />
                    <p className='no_address_text'>Вы ещё не добавляли адрес</p>
                    <button className='no_address_button' data-bs-toggle="modal" data-bs-target="#exampleModal">Добавить адрес</button>
                  </center>
                )}
              </div>
            </div>

            {dataGet.status === true ? (
              <div className='d-flex justify-content-end mt-4' style={{marginRight: '142px'}}>
                <button className='no_address_button' data-bs-toggle="modal" data-bs-target="#exampleModal2">Добавить адрес</button>
              </div>
            ) : null}

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" style={{borderRadius: '24px', width: '520px'}}>
                <div className="modal-content" style={{borderRadius: '24px', width: '520px'}}>
                  <div className="modal-header text-center d-flex justify-content-center" style={{borderBottom: 'none', paddingTop: '48px'}}>
                    <center>
                      <h1 className="modal-title modal_title" id="exampleModalLabel">Ваш адрес</h1>
                    </center>
                  </div>
                  <div style={{padding: '48px'}} className="modal-body">
                    <form onSubmit={handleEdit}>
                      <div className="d-flex align-items-center mb-2 justify-content-between">
                        <p className='address_modal_text'>Область</p>

                        <select style={{border: formErrors.region ? '1px solid red' : 'none', margin: 'auto', marginLeft: '66px', width: '280px'}} className='input_profile' onChange={handleChange}>
                          {data.map((region) => (
                            <option selected={dataGetEdit.region && region.region === dataGetEdit.region.name} key={region.id} value={region.region}>
                              {region.region}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="d-flex align-items-center mb-2 justify-content-between">
                        <p className='address_modal_text'>Город</p>

                        <select style={{border: formErrors.city_id ? '1px solid red' : 'none', margin: 'auto', marginLeft: '87px', width: '280px'}} name="city_id" className='input_profile' value={formData.city} onChange={handleChange}>
                          {cities.map((city) => (
                            <option selected={dataGetEdit.city && city.id === dataGetEdit.city.id} key={city.id} value={city.id}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="d-flex align-items-center justify-content-between">
                        <p className='address_modal_text'>Ул. и дом</p>

                        <input style={{border: formErrors.name ? '1px solid red' : 'none', margin: 'auto', marginLeft: '59px', width: '280px'}} type="text" className='input_profile' placeholder="Ул. и дом" onfocus="(this.type='date')" name="name" value={formData.name} onChange={handleChange} />
                      </div>

                      <div className="d-flex align-items-center justify-content-between">
                        <p style={{marginRight: '0px', border: formErrors.postcode ? '1px solid red' : 'none'}} className='address_modal_text'>Почтовый индекс</p>

                        <input style={{marginRight: '40px', margin: 'auto'}} type="text" className='input_profile' placeholder="Почтовый индекс" name="postcode" value={formData.postcode} onChange={handleChange} />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
                        <button style={{width: '100%'}} type="submit" className='btn_profile'>Добавить адрес</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" style={{borderRadius: '24px', width: '520px'}}>
                <div className="modal-content" style={{borderRadius: '24px', width: '520px'}}>
                  <div className="modal-header text-center d-flex justify-content-center" style={{borderBottom: 'none', paddingTop: '48px'}}>
                    <center>
                      <h1 className="modal-title modal_title" id="exampleModalLabel">Ваш адрес</h1>
                    </center>
                  </div>
                  <div style={{padding: '48px'}} className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-2 justify-content-between">
                        <p className='address_modal_text'>Область</p>

                        <select style={{border: formErrors.region ? '1px solid red' : 'none', margin: 'auto', marginLeft: '66px', width: '280px'}} className='input_profile' onChange={handleChange}>
                          {data.map((region) => (
                            <option key={region.id} value={region.region}>
                              {region.region}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="d-flex align-items-center mb-2 justify-content-between">
                        <p className='address_modal_text'>Город</p>

                        <select style={{border: formErrors.city_id ? '1px solid red' : 'none', margin: 'auto', marginLeft: '87px', width: '280px'}} name="city_id" className='input_profile' value={formData.city} onChange={handleChange}>
                          {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="d-flex align-items-center justify-content-between">
                        <p className='address_modal_text'>Ул. и дом</p>

                        <input style={{border: formErrors.name ? '1px solid red' : 'none', margin: 'auto', marginLeft: '59px', width: '280px'}} type="text" className='input_profile' placeholder="Ул. и дом" onfocus="(this.type='date')" name="name" value={formData.name} onChange={handleChange} />
                      </div>

                      <div className="d-flex align-items-center justify-content-between">
                        <p style={{marginRight: '0px', border: formErrors.postcode ? '1px solid red' : 'none'}} className='address_modal_text'>Почтовый индекс</p>

                        <input style={{marginRight: '40px', margin: 'auto'}} type="text" className='input_profile' placeholder="Почтовый индекс" name="postcode" value={formData.postcode} onChange={handleChange} />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
                        <button style={{width: '100%'}} type="submit" className='btn_profile'>Добавить адрес</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdvantageMain />
      <FooterMain />
    </>
  );
}

export default ProfileAddres