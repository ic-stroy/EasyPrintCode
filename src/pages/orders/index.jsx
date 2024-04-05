import React, { useEffect, useLayoutEffect, useState } from 'react';
import HeaderMainCopy from '../../components/header copy';
import AdvantageMain from '../../components/advantage';
import FooterMain from '../../components/footer';
import double_order_header from '../../layouts/icons/for_a_double.svg'
import double_order_header2 from '../../layouts/icons/for_a_double_one.svg'
import lock_order_header from '../../layouts/icons/lock_order_header.svg'
import ulanish from '../../layouts/icons/ulanish.svg'
import qaytarib_olish from '../../layouts/icons/qaytarib_olish.svg'
import saved_order_modal from '../../layouts/images/saved_order_modal.svg'
import qollab_quvvatlash from '../../layouts/icons/qolab_quvvatlash.svg'
import order_modal_phone from '../../layouts/icons/order_modal_phone.svg'
import order_modal_telegram from '../../layouts/icons/order_modal_telegram.svg'
import cards from '../../layouts/images/cards.svg'
import './main.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState([]);
  const [addressId, setAddressId] = useState(null);
  const [trashCardData, setTrashCardData] = useState([]);
  const [sale, setSale] = useState('');
  const [total, setTotal] = useState('');
  const [delivery, setDelivery] = useState('');
  const [nullAddres, setNullAddres] = useState(false);
  const [getHome, setGetHome] = useState(false);
  const [nullName, setNullName] = useState(false);
  const [nullPhoneNumber, setNullPhoneNumber] = useState(false);
  const [products_total, setProducts_total] = useState('');
  const [editAddressId, setEditAddressId] = useState(null);
  const [adrse, setAdrse] = useState('');
  const [pickapAdrse, setPickapAdrse] = useState('');
  const [pickapAdrseCheck, setPickapAdrseCheck] = useState('');
  const [selectedPickapAdrs, setSelectedPickapAdrs] = useState(null);
  const [data, setData] = useState([]);
  const [dataModal, setDataModal] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [position, setPosition] = useState(window.pageYOffset)
  const [visible, setVisible] = useState(true) 
  const [formData, setFormData] = useState({
    city_id: '',
    name: '',
    postcode: '',
  });
  const [formErrors, setFormErrors] = useState({
    region: false,
    city_id: false,
    name: false,
    postcode: false,
  });

  useEffect(() => {
    document.title = 'Подтверждение заказа'
  }, []);

  const handleCloseModal = () => {
    setFormData({
      city_id: '',
      name: '',
      postcode: '',
    });
    setEditAddressId(null);
  };

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  useEffect(() => {
    const ordersString = localStorage.getItem('orders');
    try {
      const parsedOrders = ordersString ? JSON.parse(ordersString) : [];
      setOrders(parsedOrders);
    } catch (error) {
      toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    }
  }, []);
  // const pay = JSON.parse(localStorage.getItem('paymentDate'))

  const token = localStorage.getItem('token');
  const order_id = localStorage.getItem('order_id');

  const paymentDate = localStorage.getItem('paymentDate')
  const jsonPaymentDate = JSON.parse(paymentDate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_TWO}/order/get-order?order_id=${order_id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
          }
        });
        setSale(response.data.data.coupon_price);
        setTotal(response.data.data.price);
        setDelivery(response.data.data.discount_price);
        setProducts_total(response.data.data.grant_total);
        setOrders(response.data.data);
        setAdrse(response.data.data.list.length)
        // console.log(response.data.data);
      } catch (error) {
        toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
      }
    };

    fetchData();
  }, [token]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_TWO}/get-address`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
          }
        });
        setAddress(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_TWO}/pick-up-point`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            language: localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
          },
        });
        setPickapAdrse(response.data.data);
        setPickapAdrseCheck(response.data.data[0].id);
        if (response.data.data.length > 0) {
          setSelectedPickapAdrs(response.data.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

  const handlePickapAdrsChange = (index) => {
    setSelectedPickapAdrs(pickapAdrse[index]);
  };

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
        console.log(error);
      });
  }, [token]);

  setTimeout(() => {
    setNullAddres(false)
    setNullName(false)
    setNullPhoneNumber(false)
  }, 5000);

  function saveOrder() {
    var myHeaders = new Headers();
    myHeaders.append("language", "uz");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("order_id", localStorage.getItem('order_id') ? localStorage.getItem('order_id') : null);
    formdata.append("address_id", deliveryMethod === 'pickup' ? pickapAdrseCheck : addressId);
    if (addressId === null) {
      toast.warning(localStorage.getItem('selectedLanguage') === 'ru' ? 'Вы не можете отправить свой заказ. Потому что у тебя нет адреса. Выберите свой адрес и отправьте.' : `Buyurtmani yubora olmaysiz. Chunki sizda manzil yo'q. Manzilingizni tanlang va yuboring.`);
      setNullAddres(true)
      return;
    } else {
      formdata.append("address_id", deliveryMethod === 'pickup' ? pickapAdrseCheck : addressId);
    }
    formdata.append("receiver_name", localStorage.getItem('user_name') ? localStorage.getItem('user_name') : null);
    if (localStorage.getItem('user_name') === null) {
      toast.warning(localStorage.getItem('selectedLanguage') === 'ru' ? 'Похоже, ваше имя недоступно для подтверждения заказа. Пожалуйста, создайте себе имя на странице своего профиля.' : `Buyurtmani tasdiqlash uchun ismingiz mavjud emasga o'xshaydi. Iltimos, profil sahifangizda o'zingiz uchun nom yarating.`);
      setNullName(true)
      return;
    } else {
      formdata.append("receiver_name", localStorage.getItem('user_name') ? localStorage.getItem('user_name') : null);
    }
    formdata.append("receiver_phone", localStorage.getItem('user_phone_number') ? localStorage.getItem('user_phone_number') : null);
    if (localStorage.getItem('user_phone_number') === null) {
      toast.warning(localStorage.getItem('selectedLanguage') === 'ru' ? 'Ваш номер телефона для подтверждения заказа недоступен. Пожалуйста, подтвердите себя, добавив свой номер телефона на странице своего профиля.' : `Buyurtmani tasdiqlash uchun telefon raqamingiz mavjud emas. Profil sahifangizga telefon raqamingizni qoʻshish orqali oʻzingizni tasdiqlang.`);
      setNullPhoneNumber(true)
      return;
    } else {
      formdata.append("receiver_phone", localStorage.getItem('user_phone_number') ? localStorage.getItem('user_phone_number') : null);
    }
    formdata.append("payment_method", "1");
    formdata.append("user_card_id", "1");

    console.log("order_id:", localStorage.getItem('order_id') ? localStorage.getItem('order_id') : null);
    console.log("address_id:", deliveryMethod === 'pickup' ? pickapAdrseCheck : addressId);
    console.log("receiver_name:", localStorage.getItem('user_name') ? localStorage.getItem('user_name') : null);
    console.log("receiver_phone:", localStorage.getItem('user_phone_number') ? localStorage.getItem('user_phone_number') : null);
    console.log("payment_method:", "1");
    console.log("user_card_id:", "1");

    var requestOptions = {
      Accept: 'application/json',
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    // console.log(requestOptions);

    fetch(`${process.env.REACT_APP_TWO}/order/accepted/order`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === true) {
          // toast.success('Заказ успешно оформлен!');
          setTimeout(() => {
            // navigate('/');
            localStorage.setItem('counterValue', 0);
          }, 1500);
          setDataModal(result.data);
          // console.log(result);
        } else {
          toast.error('Заказ не был оформлен!');
        }
      })
      .catch(error =>  toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!'));
  }

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

  useEffect(() => {
    if (address.length > 0 && addressId === null) {
      setAddressId(address[0].id);
    }
  }, [address, addressId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.region === '' || formData.city_id === '' || formData.name === '' || formData.postcode === '') {
      toast.warning('Обязательно заполните все детали. Пожалуйста, проверьте все и отправьте повторно. Или обновите страницу еще раз и повторите попытку.');
      return;
    }

    const apiUrl = editAddressId ? `${process.env.REACT_APP_TWO}/edit-address` : `${process.env.REACT_APP_TWO}/set-address`;

    axios
      .post(apiUrl, formData, {
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

  const handleGetHome = () => {
    navigate('/');
  }

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

useEffect(() => {
  const token = localStorage.getItem('token');
  const path = window.location.pathname;

  if (!token && (path.startsWith('/profile') || path === '/profile/addres' || path === '/profile/checkout' || path === '/profile/payment')) {
    navigate('/');
  } else if (!token && (path.startsWith('/mobile/profile') || path === '/mobile/profile/addres' || path === '/mobile/profile/checkout' || path === '/mobile/checkout')) {
    navigate('/mobile/auth');
  } else if (path.startsWith('/checkout')) {
    navigate('/');
  } else {
    navigate('/');
  }
}, []);

  return (
    <div>
      <HeaderMainCopy trashCardData={trashCardData} />

      <center>
        <div className='white_background' style={{backgroundColor: '#ffffff', width: '77%', height: '6.613756613756614vw', position: 'relative', marginTop: '-6.5476190476190474vw', marginLeft: '21.891534391534393vw', paddingTop: '1.917989417989418vw', paddingLeft: '13.227513227513228vw', position: 'relative', zIndex: '100'}}>
          <div className="d-flex">
            {
              localStorage.getItem('selectedLanguage') === 'ru' ? 
                <img style={{marginRight: '13.227513227513228vw'}} src={lock_order_header} alt="lock_order_header" /> :
                <img style={{marginRight: '13.227513227513228vw'}} src={ulanish} alt="lock_order_header" />
            }
            <NavLink to={'/footer/exchange'}>
              {
                localStorage.getItem('selectedLanguage') === 'ru' ?
                  <img style={{marginRight: '3.1746031746031744vw'}} src={double_order_header2} alt="double_order_header2" /> :
                  <img style={{marginRight: '3.1746031746031744vw'}} src={qaytarib_olish} alt="double_order_header2" />
              }
            </NavLink>
            {
              localStorage.getItem('selectedLanguage') === 'ru' ?
                <img style={{cursor: 'pointer'}} data-bs-toggle="modal" data-bs-target="#exampleModal2" src={double_order_header} alt="double_order_header" /> :
                <img style={{cursor: 'pointer'}} data-bs-toggle="modal" data-bs-target="#exampleModal2" src={qollab_quvvatlash} alt="double_order_header" />
            }
          </div>
        </div>
      </center>

      <ToastContainer />

      {orders && orders.list && orders.list.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <>
          <div>
            <div className="container">
              <div className='basket_wrapper' style={{ marginTop: '48px' }}>
                <div className="d-flex justify-content-between">
                  <div>
                    <h2 className='order_title' style={{fontSize: localStorage.getItem('selectedLanguage') === 'ru' ? '40px' : '32px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Оформление заказа' : 'Buyurtmani rasmiylashtirish'}</h2>

                    <h3 className='order_subtitle' style={{marginTop: '48px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Покупатель' : 'Buyurtma qabul qiluvchi:'}</h3>

                    <input className='order_info' style={{border: nullName === true ? '1px solid red' : 'none'}} value={localStorage.getItem('user_name') ? localStorage.getItem('user_name') + ' ' + `${localStorage.getItem('user_last_name') ? localStorage.getItem('user_last_name') : ''}` : 'Имя и Фамилия*'}/>
                    <input className='order_info mt-2' style={{border: nullPhoneNumber === true ? '1px solid red' : 'none'}} value={localStorage.getItem('user_phone_number')} />

                    <h3 className='order_subtitle' style={{ marginTop: '32px' }}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Способ получения' : 'Qabul qilish usuli:'}</h3>

                    <label className='order_info'>
                      <input
                        style={{ cursor: 'pointer' }}
                        type="radio"
                        id="pickup"
                        name="deliveryMethod"
                        value="pickup"
                        checked={deliveryMethod === 'pickup'}
                        onChange={() => setDeliveryMethod('pickup')}
                      />
                      <label style={{ cursor: 'pointer' }} htmlFor="pickup">{localStorage.getItem('selectedLanguage') === 'ru' ? 'Пункт выдачи Easy Print' : 'Easy Print topshirish punkti'}</label>
                    </label>

                    {(deliveryMethod === 'tashkent' || deliveryMethod === 'homeDelivery') && (
                      <label className='order_info' style={{ backgroundColor: 'transparent', display: 'none' }}>
                        <input
                          style={{ cursor: 'pointer' }}
                          type="radio"
                          id="tashkent"
                          name="deliveryMethod"
                          value="tashkent"
                          checked={deliveryMethod === 'tashkent'}
                          onChange={() => setDeliveryMethod('tashkent')}
                        />
                        <label style={{ cursor: 'pointer' }} htmlFor="tashkent">Ташкентская область, город Ташкент</label>
                      </label>
                    )}

                    <label className='order_info mt-2'>
                      <input
                        style={{ cursor: 'pointer' }}
                        type="radio"
                        id="homeDelivery"
                        name="deliveryMethod"
                        value="homeDelivery"
                        checked={deliveryMethod === 'homeDelivery'}
                        onChange={() => setDeliveryMethod('homeDelivery')}
                      />
                      <label style={{ cursor: 'pointer' }} htmlFor="homeDelivery">{localStorage.getItem('selectedLanguage') === 'ru' ? 'Доставка до дома' : 'Kuryer orqali eshikkacha'}</label>
                    </label>

                    {deliveryMethod === 'pickup' && (
                      <div>
                        <h3 className='order_subtitle' style={{ marginTop: '32px' }}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Выберите пункт выдачи' : 'Topshirish punkti tanlang'}</h3>
                        {pickapAdrse && pickapAdrse.map((item, index) => (
                          <label className='order_info' key={index} style={{ backgroundColor: 'transparent' }}>
                            <input
                              style={{ cursor: 'pointer', position: 'absolute' }}
                              type="radio"
                              id={`pickapAdrs_${index}`}
                              value={index}
                              checked={selectedPickapAdrs === item}
                              onChange={() => {handlePickapAdrsChange(index); setPickapAdrseCheck(item.id)}}
                            />
                            <label style={{ cursor: 'pointer', color: '#18356D', marginLeft: '30px' }} htmlFor={`pickapAdrs_${index}`}>
                              {item.region ? item.region : ''} {item.id ? '' : `${localStorage.getItem('selectedLanguage') === 'ru' ? 'Информация не найдена' : 'Malumot topilmadi'}`} {item.city ? item.city : ''} {item.name ? item.name : ''}
                            </label>
                          </label>
                        ))}
                      </div>
                    )}

                    {(deliveryMethod === 'tashkent' || deliveryMethod === 'homeDelivery') && (
                      <p className='order_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Цена доставки будет зависеть от расстояния до вашего адреса' : `Yetkazib berish narxi sizning manzilingizgacha bo'lgan masofaga bog'liq bo'ladi`}</p>
                    )}

                    {(deliveryMethod === 'tashkent' || deliveryMethod === 'homeDelivery') && (
                      <>
                        <h3 className='order_subtitle' style={{marginTop: '32px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Адрес доставки' : 'Yetkazib berish manzili:'}</h3>

                        {address && address.length > 0 ? (
                          <>
                            <select onChange={(e) => {setAddressId(e.target.value); setNullAddres(false)}} className='order_info mt-2'>
                              {address.map((addr, index) => (
                                <option key={index} value={addr.id}>
                                  {`${addr.region.name} ${addr.city && addr.city.name ? `${addr.city.name}, ` : ''}${addr.name}, ${addr.postcode}`}
                                </option>
                              ))}
                            </select>

                            <center style={{marginTop: '28px'}}>
                              <button data-bs-toggle="modal" data-bs-target="#exampleModal" style={{border: 'none'}} className={'addres_btn'}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Добавить другой адрес' : 'Boshqa manzil kiritsh'}</button>
                            </center>
                          </>
                        ) : (
                          <>
                            <div data-bs-toggle="modal" data-bs-target="#exampleModal"  style={{border: nullAddres === true ? '1px solid red' : 'none'}} className='order_info'>
                              {localStorage.getItem('selectedLanguage') === 'ru' ? 'Адрес*' : 'Yetkazib berish*'}
                            </div>

                            <center style={{marginTop: '28px'}}>
                              <button data-bs-toggle="modal" data-bs-target="#exampleModal" style={{border: 'none'}} className={'addres_btn'}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Добавить адрес' : 'Manzil qo\'shish'}</button>
                            </center>
                          </>
                        )}
                      </>
                    )}

                    <h3 className='order_subtitle' style={{ marginTop: '32px' }}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Способ оплаты' : 'To\'lov turi'}</h3>

                    <label className='order_info'>
                      <input
                        style={{ cursor: 'pointer' }}
                        type="radio"
                        id="card"
                        name="pay"
                        value="30"
                        checked={selectedPaymentMethod === 'card'}
                        onChange={() => setSelectedPaymentMethod('card')}
                      />
                      <label style={{ cursor: 'pointer' }} htmlFor="card">{localStorage.getItem('selectedLanguage') === 'ru' ? 'Картой онлайн' : 'Karta orqali onlayn'}</label>
                    </label>

                    {selectedPaymentMethod === 'card' && (
                      <img src={cards} alt="cards" />
                    )}

                    <label className='order_info mt-2'>
                      <input style={{ cursor: 'pointer' }} type="radio" id="naxt" name="pay" value="60" checked={selectedPaymentMethod === 'cash'} onChange={() => setSelectedPaymentMethod('cash')} />
                      <label style={{ cursor: 'pointer' }} htmlFor="naxt">{localStorage.getItem('selectedLanguage') === 'ru' ? 'Наличными, при получении' : 'Naqd pul yoki karta orqali qabul qilganda'}</label>
                    </label>
                  </div>

                  <div className='order_data'>
                    <h2 className='order_title mb-3' style={{fontSize: localStorage.getItem('selectedLanguage') === 'ru' ? '40px' : '32px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Ваш заказ' : 'Buyurtmangiz'}</h2>

                    <div className="accordion" style={{borderRadius: '12px', marginBottom: '20px'}} id="accordionExample">
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button style={{borderRadius: '12px'}} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            {localStorage.getItem('selectedLanguage') === 'ru' ? 'Товары' : 'Buyurtmadagi mahsulotlar'} ({adrse})
                          </button>
                        </h2>
                        <div id="collapseOne" style={{borderRadius: '12px'}} className="accordion-collapse collapse" data-bs-parent="#accordionExample" >
                          <div className="accordion-body">
                            {orders && orders.list && orders.list.map((item, itemIndex) => (
                              <div key={itemIndex}>
                                <div className='d-flex'>
                                  <div>
                                    {item.images && item.images[0] && (
                                      // <img className='order_img' src={item.images[0]} alt={item.name} />
                                      <div className='order_img' style={{backgroundImage: `url(${item.images[0]})`, backgroundSize: item.relation_type === 'product' ? 'contain' : 'cover', backgroundColor: 'white', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}></div>
                                    )}
                                  </div>

                                  <div style={{marginLeft: '12px'}}>
                                    <p className='order_name hiided_text'>{item.name ? item.name : ''}</p>
                                    <p className='order_price'>{item.price} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}</p>
                                  </div>
                                </div>
                                <hr />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="basket_total" style={{width: '100%'}}>
                      <div>
                        <p className='basket_total_title' style={{marginBottom: '28px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Итог товаров' : 'Jami maxsulotlar'}</p>
                        <p className='basket_total_title' style={{marginBottom: '28px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Доставка' : 'Yetkazib berish'}</p>
                        <p className='basket_total_title' style={{marginBottom: '28px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Скидки' : 'Chegirmalar'}</p>
                        <p className='basket_total_title'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Итого' : 'Jami'}</p>
                      </div>
                      {/* <div className='d-flex flex-column' style={{position: 'absolute', right: '132px'}}>
                        <hr style={{width: '232px', position: 'relative', left: localStorage.getItem('selectedLanguage') === 'ru' ? '-5px' : '3px', top: '-3px'}} />
                        <hr style={{width: localStorage.getItem('selectedLanguage') === 'ru' ? '353px' : '298px', position: 'relative', left: localStorage.getItem('selectedLanguage') === 'ru' ? '-47px' : '-6px', top: '15px'}} />
                        <hr style={{width: '370px', position: 'relative', left: '-67px', top: '34px'}} />
                        <hr style={{width: '293px', position: 'relative', left: '-62px', top: '52px'}} />
                      </div> */}
                      <div style={{textAlign: 'right'}}>
                        <p className='basket_total_price' style={{marginBottom: '28px'}}>{Number(jsonPaymentDate?.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}</p>
                        <p className='basket_total_price' style={{marginBottom: '28px'}}>{deliveryMethod === 'tashkent' || deliveryMethod === 'homeDelivery' ? 'Яндекс Go' : `0 ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}`}</p>
                        <p className='basket_total_price' style={{marginBottom: '28px'}}>{Number(jsonPaymentDate?.discount_price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}</p>
                        <p className='basket_total_price'>{Number(jsonPaymentDate?.grant_total).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}</p>
                      </div>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '24px'}}>
                      <button data-bs-toggle="modal" data-bs-target="#exampleModal3" style={{width: '550px', margin: '0', textAlign: 'center', padding: '0'}} onClick={() => {saveOrder();}} className='hero_button center'>
                        {localStorage.getItem('selectedLanguage') === 'ru' ? 'Оформить заказ' : 'Buyurtmani rasmiylashtirish'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

      <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" style={{borderRadius: '24px', width: '520px'}}>
          <div className="modal-content" style={{borderRadius: '24px', width: '520px'}}>
            <div className="modal-header d-flex justify-content-between" style={{borderBottom: 'none', padding: '32px'}}>
              <div className="d-flex mt-4 flex-column">
                <h1 style={{fontFamily: 'Inter400', textAlign: 'left'}} className="modal-title modal_title" id="exampleModalLabel">{localStorage.getItem('selectedLanguage') === 'ru' ? 'Связаться с нами' : 'Biz bilan bogʻlanish'}</h1>
                <p className='address_modal_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Задайте вопрос нашим спецалистам в удобной вам форме' : 'Mutaxassislarimizga sizga qulay ijtimoiy tarmoq chati yoki telefon orqali savol bering:'}</p>
              </div>
              <button style={{marginTop: '-120px'}} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div style={{padding: '32px'}} className="modal-body">
              <div style={{marginTop: '-45px'}} className="d-flex">
                <div>
                  <img src={order_modal_telegram} alt="order_modal_telegram" />
                </div>

                <div>
                  <h4 className='order_modal_body_title'>Telegram</h4>
                  <p className='order_modal_body_text'>EasyPrint_Support_Bot</p>
                </div>
              </div>

              <div className="d-flex mt-3">
                <div>
                  <img src={order_modal_phone} alt="order_modal_phone" />
                </div>

                <div>
                  <NavLink to={"tel:+998990123456"} className='order_modal_body_title'>+998 99 012 34 56</NavLink>
                  <p className='order_modal_body_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Бесплатный звонок по Узбекистану' : 'O`zbekiston bo`ylab'}</p>
                </div>
              </div>

              <h4 className='order_modal_body_title' style={{marginLeft: '0px', marginTop: '32px', fontSize: '16px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Электронная почта поддержки:' : `Qo'llab-quvvatlash elektron manzili:`}</h4>
              <div style={{marginTop: '-4px', marginBottom: '50px'}}>
                <NavLink to={"mailto:support@easyprint.com"} className='order_modal_body_text_link'>support@easyprint.com</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" style={{borderRadius: '24px', width: '520px'}}>
          <div className="modal-content" style={{borderRadius: '24px', width: '520px'}}>
            <div className="modal-header d-flex justify-content-between" style={{borderBottom: 'none', padding: '32px'}}>
              <div style={{width: '100%'}} className="d-flex mt-4 flex-column">
                <div style={{display: 'flex', justifyContent: 'center', marginLeft: '25px'}}>
                  <img src={saved_order_modal} alt="saved_order_modal" />
                </div>
              </div>
              <button style={{marginTop: '-80px'}} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div style={{padding: '32px'}} className="modal-body">
              <div style={{marginTop: '-45px'}} className="d-flex">
                <p className='order_modal_body_text_link_link'>Заказ №{dataModal.code ? dataModal.code : '000'} оформлен. В день доставки вам придёт СМС с кодом. Покажите его, чтобы получить заказ</p>
              </div>

              <center>
                <div className='accept_modal_body'>
                  <p className='order_modal_body_text_opacity'>Где забирать</p>
                  <p className='order_modal_body_text'>{dataModal.address ? dataModal.address : 'г. Ташкент, Мирзо-Улугбекский район, массив Буюк Ипак Йули, 31 дом'}</p>

                  <p className='order_modal_body_text_opacity mt-2'>Часы работы</p>
                  <p className='order_modal_body_text'>10:00 - 20:00</p>

                  <p className='order_modal_body_text_opacity mt-2'>Когда забирать</p>
                  <p className='order_modal_body_text'>{dataModal.pick_up_time ? dataModal.pick_up_time : 'Завтра'}</p>
                </div>

                <div style={{cursor: 'pointer'}} data-bs-dismiss="modal" aria-label="Close" onClick={() => handleGetHome()} className='basket_promo_btn_price'>Продолжить покупки</div>
              </center>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <NavLink to={'/'} className='basket_promo_btn_price'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M2 10.9961C2.00487 11.5226 2.21684 12.0259 2.59 12.3971L6.88 16.7002C7.06736 16.8866 7.32082 16.9912 7.585 16.9912C7.84919 16.9912 8.10264 16.8866 8.29 16.7002C8.38373 16.6072 8.45812 16.4965 8.50889 16.3746C8.55966 16.2526 8.5858 16.1218 8.5858 15.9897C8.5858 15.8576 8.55966 15.7268 8.50889 15.6048C8.45812 15.4829 8.38373 15.3722 8.29 15.2792L5 11.9968L21 11.9968C21.2652 11.9968 21.5196 11.8914 21.7071 11.7037C21.8946 11.516 22 11.2615 22 10.9961C22 10.7307 21.8946 10.4762 21.7071 10.2885C21.5196 10.1008 21.2652 9.99538 21 9.99538L5 9.99538L8.29 6.70301C8.4783 6.51589 8.58462 6.26159 8.58556 5.99603C8.58649 5.73048 8.48198 5.47543 8.295 5.28699C8.10802 5.09855 7.8539 4.99216 7.58854 4.99122C7.32317 4.99028 7.06831 5.09487 6.88 5.28198L2.59 9.58508C2.21441 9.9587 2.00223 10.4661 2 10.9961Z" fill="white"/>
          </svg>
          {localStorage.getItem('selectedLanguage') === 'ru' ? 'Вернуться в корзину' : 'Savatga qaytish'}
        </NavLink>
      </div>

      <AdvantageMain />
      <FooterMain />
    </div>
  );
}

export default MyOrders;